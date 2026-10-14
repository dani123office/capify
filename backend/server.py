import os
import re
import uuid
import shutil
import asyncio
import logging
from pathlib import Path
from typing import Optional
from datetime import datetime, timedelta, timezone

import cv2
import numpy as np

from fastapi import FastAPI, UploadFile, File, Form, BackgroundTasks, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel, Field

# Core engine imports
from behind_caption.pipeline import run as render_pipeline
from behind_caption.templates import list_templates, get_template

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s :: %(message)s",
)
log = logging.getLogger("capify")

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------
MAX_UPLOAD_MB = int(os.getenv("MAX_UPLOAD_MB", "200"))
MAX_UPLOAD_BYTES = MAX_UPLOAD_MB * 1024 * 1024
ALLOWED_VIDEO_EXTS = {".mp4", ".mov", ".webm", ".avi", ".mkv", ".m4v"}
ALLOWED_AUDIO_EXTS = {".mp3", ".wav", ".m4a", ".aac", ".ogg", ".flac"}
ALLOWED_SRT_EXTS = {".srt"}
ALLOWED_EXTS = ALLOWED_VIDEO_EXTS | ALLOWED_AUDIO_EXTS | ALLOWED_SRT_EXTS

# Rate limiting (simple in-memory – swap for Redis in production)
_rate_limit_store: dict[str, list[datetime]] = {}
RATE_LIMIT_WINDOW = timedelta(minutes=1)
RATE_LIMIT_MAX = 30  # requests per window per IP

# Job retention – auto-cleanup completed/failed jobs after this period
JOB_TTL = timedelta(hours=24)

# ---------------------------------------------------------------------------
# App setup
# ---------------------------------------------------------------------------
app = FastAPI(title="Capify AI - Video Behind Subject Engine", version="1.0.0")

# CORS – restrict to specific origins in production
_allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in _allowed_origins if o.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).parent
UPLOADS_DIR = BASE_DIR / "uploads"
OUTPUTS_DIR = BASE_DIR / "outputs"
UPLOADS_DIR.mkdir(exist_ok=True)
OUTPUTS_DIR.mkdir(exist_ok=True)

# In-memory Job store (replace with database in production)
JOBS: dict[str, dict] = {}


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
def _safe_id(raw: str) -> str:
    """Return only [a-zA-Z0-9_-] characters from *raw*."""
    return re.sub(r"[^a-zA-Z0-9_-]", "", raw)[:64]


def _rate_limit_check(client_ip: str) -> bool:
    """Return True if the client is within rate limits."""
    now = datetime.now(timezone.utc)
    window_start = now - RATE_LIMIT_WINDOW
    timestamps = _rate_limit_store.get(client_ip, [])
    # prune old
    timestamps = [t for t in timestamps if t > window_start]
    if len(timestamps) >= RATE_LIMIT_MAX:
        _rate_limit_store[client_ip] = timestamps
        return False
    timestamps.append(now)
    _rate_limit_store[client_ip] = timestamps
    return True


def _cleanup_old_jobs() -> None:
    """Remove jobs older than JOB_TTL and their output files."""
    now = datetime.now(timezone.utc)
    to_remove = []
    for jid, job in JOBS.items():
        updated = job.get("updated_at")
        if isinstance(updated, datetime) and now - updated > JOB_TTL:
            # Delete output file if it exists
            out = job.get("output_path")
            if out and Path(out).exists():
                try:
                    Path(out).unlink()
                except OSError:
                    pass
            to_remove.append(jid)
    for jid in to_remove:
        JOBS.pop(jid, None)
    if to_remove:
        log.info("Cleaned up %d old jobs", len(to_remove))


def _touch_job(job: dict) -> None:
    job["updated_at"] = datetime.now(timezone.utc)


# ---------------------------------------------------------------------------
# Middleware – rate limiting
# ---------------------------------------------------------------------------
@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    client_ip = request.client.host if request.client else "unknown"
    if not _rate_limit_check(client_ip):
        return JSONResponse(
            status_code=429,
            content={"detail": "Rate limit exceeded. Try again later."},
        )
    response = await call_next(request)
    return response


# ---------------------------------------------------------------------------
# Models
# ---------------------------------------------------------------------------
class RenderRequest(BaseModel):
    video_id: str = Field(..., min_length=1, max_length=64)
    template: str = Field(..., min_length=1, max_length=64)
    srt_content: Optional[str] = Field(None, max_length=100_000)
    smooth: Optional[float] = Field(0.5, ge=0.0, le=1.0)


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------
@app.get("/")
def index():
    return {"status": "ok", "service": "Capify AI Video Engine"}


@app.get("/api/templates")
def get_all_templates():
    tpl_names = list_templates()
    templates = []
    for name in tpl_names:
        t = get_template(name)
        templates.append({
            "id": name,
            "name": name.replace("_", " ").title(),
            "keyword_color": t.get("keyword", {}).get("color", "#FFFFFF"),
            "gradient": t.get("keyword", {}).get("gradient"),
            "animation": t.get("animation", {}).get("type", "pop"),
            "font": Path(t.get("keyword", {}).get("font", "font")).stem,
        })
    return {"templates": templates}


@app.post("/api/upload")
async def upload_video(file: UploadFile = File(...)):
    # --- extension check ---
    ext = Path(file.filename or "").suffix.lower()
    if ext not in ALLOWED_EXTS:
        raise HTTPException(
            status_code=400,
            detail=f"File type '{ext}' not allowed. Allowed: {', '.join(sorted(ALLOWED_EXTS))}",
        )

    # --- size check (stream to disk, abort if too large) ---
    job_id = str(uuid.uuid4())[:8]
    dest_path = UPLOADS_DIR / f"{job_id}{ext}"

    total_written = 0
    try:
        with open(dest_path, "wb") as buffer:
            while chunk := await file.read(1024 * 1024):  # 1 MB chunks
                total_written += len(chunk)
                if total_written > MAX_UPLOAD_BYTES:
                    buffer.close()
                    dest_path.unlink(missing_ok=True)
                    raise HTTPException(
                        status_code=413,
                        detail=f"File exceeds {MAX_UPLOAD_MB} MB limit.",
                    )
                buffer.write(chunk)
    except HTTPException:
        raise
    except Exception as e:
        dest_path.unlink(missing_ok=True)
        raise HTTPException(status_code=500, detail=f"Upload failed: {e}")

    # --- video metadata ---
    cap = cv2.VideoCapture(str(dest_path))
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
    frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    duration = frame_count / fps if fps > 0 else 0.0
    cap.release()

    now = datetime.now(timezone.utc)
    JOBS[job_id] = {
        "id": job_id,
        "video_path": str(dest_path),
        "duration": round(duration, 2),
        "resolution": f"{width}x{height}",
        "status": "uploaded",
        "progress": 0,
        "output_path": None,
        "error": None,
        "updated_at": now,
    }
    log.info("Uploaded video %s (%s, %.1fs)", job_id, ext, duration)

    return {
        "video_id": job_id,
        "duration": round(duration, 2),
        "resolution": f"{width}x{height}",
    }


_WHISPER_MODEL = None


def _get_whisper_model():
    global _WHISPER_MODEL
    if _WHISPER_MODEL is None:
        try:
            from faster_whisper import WhisperModel
            log.info("Loading faster-whisper tiny model...")
            _WHISPER_MODEL = WhisperModel("tiny", device="cpu", compute_type="int8")
            log.info("faster-whisper model loaded successfully")
        except Exception as e:
            log.warning("faster-whisper not available: %s", e)
            _WHISPER_MODEL = False
    return _WHISPER_MODEL if _WHISPER_MODEL is not False else None


def _format_srt_time(seconds: float) -> str:
    m, s = divmod(seconds, 60)
    h, m = divmod(m, 60)
    ms = int((s % 1) * 1000)
    return f"{int(h):02d}:{int(m):02d}:{int(s):02d},{ms:03d}"


def _generate_fallback_srt(duration: float) -> str:
    dur = max(duration, 3.0)
    phrases = [
        "Welcome to *Capify*",
        "Make your *captions* pop",
        "Engage your *audience* instantly",
        "Styled like *viral* videos",
        "Supercharge your *content* today",
    ]
    step = min(2.5, max(1.2, dur / max(1, len(phrases))))
    cues = []
    t = 0.2
    for i, phrase in enumerate(phrases):
        if t >= dur:
            break
        t_start = _format_srt_time(t)
        t_end = _format_srt_time(min(dur, t + step - 0.2))
        cues.append(f"{i + 1}\n{t_start} --> {t_end}\n{phrase}\n")
        t += step
    return "\n".join(cues)


@app.post("/api/transcribe/{video_id}")
async def auto_transcribe(video_id: str):
    video_id = _safe_id(video_id)
    if video_id not in JOBS:
        raise HTTPException(status_code=404, detail="Video not found")

    job = JOBS[video_id]
    _touch_job(job)
    video_path = job["video_path"]
    srt_path = UPLOADS_DIR / f"{video_id}.srt"

    srt_content = ""
    try:
        model = _get_whisper_model()
        if model is not None:
            segments, _ = model.transcribe(video_path, word_timestamps=True)
            cues = []
            cue_idx = 1
            for s in segments:
                t_start = _format_srt_time(s.start)
                t_end = _format_srt_time(s.end)
                words = s.text.strip().split()
                if words:
                    mid = len(words) // 2
                    words[mid] = f"*{words[mid]}*"
                    text = " ".join(words)
                    cues.append(f"{cue_idx}\n{t_start} --> {t_end}\n{text}\n")
                    cue_idx += 1
            if cues:
                srt_content = "\n".join(cues)
    except Exception as e:
        log.warning("Whisper transcription failed for %s: %s", video_id, e)

    # If Whisper is not installed or audio has no speech, generate timed fallback cues
    if not srt_content.strip():
        duration = float(job.get("duration") or 5.0)
        srt_content = _generate_fallback_srt(duration)
        log.info("Generated fallback captions for %s (duration %.1fs)", video_id, duration)

    # Sanitize SRT – strip control characters except \n \r \t
    srt_content = re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f]", "", srt_content)

    with open(srt_path, "w", encoding="utf-8") as f:
        f.write(srt_content)

    return {"video_id": video_id, "srt": srt_content}


def _run_render_worker(job_id: str, video_path: str, srt_path: str, template: str, out_path: str, smooth: float):
    try:
        if job_id not in JOBS:
            log.warning("Job %s no longer exists, skipping render", job_id)
            return

        JOBS[job_id]["status"] = "processing"
        JOBS[job_id]["progress"] = 20
        _touch_job(JOBS[job_id])

        render_pipeline(
            video=video_path,
            srt=srt_path,
            template=template,
            out=out_path,
            segmenter="mediapipe",
            smooth=smooth,
        )

        if job_id not in JOBS:
            return

        JOBS[job_id]["status"] = "completed"
        JOBS[job_id]["progress"] = 100
        JOBS[job_id]["output_path"] = out_path
        _touch_job(JOBS[job_id])
        log.info("Render completed for job %s", job_id)
    except Exception as e:
        log.exception("Render failed for job %s", job_id)
        if job_id in JOBS:
            JOBS[job_id]["status"] = "failed"
            JOBS[job_id]["error"] = str(e)
            _touch_job(JOBS[job_id])


@app.post("/api/render")
async def start_render(req: RenderRequest, bg_tasks: BackgroundTasks):
    video_id = _safe_id(req.video_id)
    template = _safe_id(req.template)

    if video_id not in JOBS:
        raise HTTPException(status_code=404, detail="Video not found")

    job = JOBS[video_id]
    _touch_job(job)
    srt_path = UPLOADS_DIR / f"{video_id}.srt"

    if req.srt_content:
        # Sanitize user-provided SRT
        srt_clean = re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f]", "", req.srt_content)
        with open(srt_path, "w", encoding="utf-8") as f:
            f.write(srt_clean)

    if not srt_path.exists():
        raise HTTPException(status_code=400, detail="Subtitles (SRT) required")

    out_file = OUTPUTS_DIR / f"{video_id}_{template}.mp4"
    job["status"] = "queued"
    job["progress"] = 5
    _touch_job(job)

    bg_tasks.add_task(
        _run_render_worker,
        job_id=video_id,
        video_path=job["video_path"],
        srt_path=str(srt_path),
        template=template,
        out_path=str(out_file),
        smooth=req.smooth or 0.5,
    )

    return {"status": "started", "job_id": video_id}


@app.get("/api/status/{job_id}")
def check_status(job_id: str):
    job_id = _safe_id(job_id)
    if job_id not in JOBS:
        raise HTTPException(status_code=404, detail="Job not found")
    job = JOBS[job_id]
    return {
        "id": job_id,
        "status": job["status"],
        "progress": job.get("progress", 0),
        "error": job.get("error"),
    }


@app.get("/api/download/{job_id}")
def download_rendered_video(job_id: str):
    job_id = _safe_id(job_id)
    if job_id not in JOBS or not JOBS[job_id].get("output_path"):
        raise HTTPException(status_code=404, detail="Output video not ready")
    path = Path(JOBS[job_id]["output_path"])
    if not path.exists():
        raise HTTPException(status_code=404, detail="File does not exist")
    _touch_job(JOBS[job_id])
    return FileResponse(path, media_type="video/mp4", filename=f"capify_{path.name}")


from contextlib import asynccontextmanager

@app.router.lifespan_context
async def lifespan(app: FastAPI):
    """Startup/shutdown lifecycle."""
    _cleanup_old_jobs()
    log.info("Capify backend started – %d jobs in memory", len(JOBS))
    yield


# ---------------------------------------------------------------------------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
