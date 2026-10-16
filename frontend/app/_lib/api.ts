import { backendTemplateFor } from "./templates";

/**
 * Base URL of the FastAPI render engine (see backend/server.py).
 * Override with NEXT_PUBLIC_API_URL when the engine runs elsewhere.
 */
export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

type JobStatus = "uploaded" | "queued" | "processing" | "completed" | "failed";

export type UploadResult = {
  video_id: string;
  duration: number;
  resolution: string;
};

export type StatusResult = {
  id: string;
  status: JobStatus;
  progress: number;
  error?: string | null;
};

async function toJson<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let detail = `${res.status} ${res.statusText}`;
    try {
      const data = (await res.json()) as { detail?: string };
      if (data.detail) detail = data.detail;
    } catch {
      /* non-JSON error body */
    }
    throw new Error(detail);
  }
  return (await res.json()) as T;
}

export type TranscriptWord = {
  word: string;
  start: number;
  end: number;
  is_pause?: boolean;
};

export type TranscriptResponse = {
  video_id: string;
  srt: string;
  words?: TranscriptWord[];
};

export const engine = {
  base: API_BASE,

  async upload(file: File): Promise<UploadResult> {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(`${API_BASE}/api/upload`, {
      method: "POST",
      body: form,
    });
    return toJson<UploadResult>(res);
  },

  async transcribe(videoId: string): Promise<TranscriptResponse> {
    const res = await fetch(`${API_BASE}/api/transcribe/${videoId}`, {
      method: "POST",
    });
    return toJson<TranscriptResponse>(res);
  },

  async getTranscript(videoId: string): Promise<TranscriptResponse> {
    const res = await fetch(`${API_BASE}/api/transcript/${videoId}`);
    return toJson<TranscriptResponse>(res);
  },

  async render(input: {
    videoId: string;
    templateId: string;
    srt: string;
    smooth?: number;
  }): Promise<{ status: string; job_id: string }> {
    const res = await fetch(`${API_BASE}/api/render`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        video_id: input.videoId,
        template: backendTemplateFor(input.templateId),
        srt_content: input.srt,
        smooth: input.smooth ?? 0.5,
      }),
    });
    return toJson<{ status: string; job_id: string }>(res);
  },

  async status(videoId: string): Promise<StatusResult> {
    const res = await fetch(`${API_BASE}/api/status/${videoId}`);
    return toJson<StatusResult>(res);
  },

  downloadUrl(videoId: string): string {
    return `${API_BASE}/api/download/${videoId}`;
  },

  videoUrl(videoId: string): string {
    return `${API_BASE}/api/video/${videoId}`;
  },
};

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
