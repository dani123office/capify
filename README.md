# Capify AI

AI-powered video editor for short-form content (Reels, TikTok, YouTube Shorts). Transforms raw talking-head clips into post-ready vertical videos with behind-the-subject captions, hooks, covers, and 9:16 exports.

## Architecture

| Layer | Tech |
|-------|------|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS v4 |
| Backend | FastAPI, Uvicorn, OpenCV, MediaPipe, FFmpeg |
| Storage | In-memory job store (swap for DB in production) |

## Prerequisites

- Python 3.11+
- Node.js 20+
- FFmpeg (installed system-wide or via imageio-ffmpeg)

## Quick Start (Local Development)

### 1. Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
uvicorn server:app --reload --port 8000
```

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env.local   # adjust NEXT_PUBLIC_API_URL if needed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### One-click Windows launcher

```bat
run_capify.bat
```

## Docker (Production)

```bash
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

## Environment Variables

### Backend

| Variable | Default | Description |
|----------|---------|-------------|
| `ALLOWED_ORIGINS` | `http://localhost:3000` | Comma-separated CORS origins |
| `MAX_UPLOAD_MB` | `200` | Max upload file size in MB |
| `JOB_TTL_HOURS` | `24` | Hours before auto-cleanup of old jobs |

See `backend/.env.example`.

### Frontend

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | `http://127.0.0.1:8000` | Backend API base URL |

See `frontend/.env.example`.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check |
| `GET` | `/api/templates` | List engine render templates |
| `POST` | `/api/upload` | Upload video/audio file (max 200 MB) |
| `POST` | `/api/transcribe/{video_id}` | Transcribe video to SRT |
| `POST` | `/api/render` | Queue a render job |
| `GET` | `/api/status/{job_id}` | Poll render status |
| `GET` | `/api/download/{job_id}` | Download rendered MP4 |

## Testing

```bash
cd backend
python -m pytest tests/ -v
```

## CI/CD

GitHub Actions workflow (`.github/workflows/ci.yml`) runs backend tests and frontend build on every push/PR.

## License

Proprietary — All rights reserved.
