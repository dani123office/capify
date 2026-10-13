"use client";

import { useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  Check,
  ChevronDown,
  Crown,
  Film,
  Pause,
  Play,
  Sparkles,
  Upload,
  Volume2,
  X,
} from "lucide-react";
import { POPULAR_TEMPLATES, TEMPLATES, type Template } from "../../_lib/templates";
import { engine, sleep } from "../../_lib/api";

type FileMode = "video" | "srt";

export function EditorCard() {
  const [template, setTemplate] = useState<Template>(POPULAR_TEMPLATES[0]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [fileMode, setFileMode] = useState<FileMode>("video");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState("");
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const previewRef = useRef<HTMLVideoElement>(null);

  const pickerItems = useMemo(() => TEMPLATES.slice(0, 12), []);

  const onFile = (next: File | undefined) => {
    if (!next) return;
    // Revoke previous blob URL to prevent memory leak
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(next);
    setPreviewUrl(URL.createObjectURL(next));
    setOutput(null);
    setError(null);
  };

  const createVideo = async () => {
    if (!file) {
      setPickerOpen(false);
      document
        .getElementById("dropzone")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsProcessing(true);
    setOutput(null);
    setError(null);

    try {
      setStep("Uploading your clip…");
      const { video_id } = await engine.upload(file);

      setStep("Analyzing speech with word-level transcription…");
      const { srt } = await engine.transcribe(video_id);

      setStep("Segmenting the subject and compositing depth…");
      await engine.render({ videoId: video_id, templateId: template.id, srt });

      let status = await engine.status(video_id);
      while (status.status !== "completed" && status.status !== "failed") {
        setStep(`Encoding 1080×1920 MP4… ${status.progress ?? 0}%`);
        await sleep(1500);
        status = await engine.status(video_id);
      }

      if (status.status === "failed") {
        throw new Error(status.error ?? "Render failed");
      }

      setOutput(engine.downloadUrl(video_id));
    } catch {
      // Engine offline or unreachable — show error, don't set blob URL as output
      setError(
        `Render engine not reachable at ${engine.base}. Start the backend and try again.`,
      );
      setOutput(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const togglePlay = () => {
    const v = previewRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <div
      id="editor"
      className="w-full scroll-mt-24 rounded-[28px] border border-slate-200/90 bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-6"
    >
      {/* Dropzone */}
      <div
        id="dropzone"
        className="group relative flex flex-col items-center justify-center rounded-[22px] border-2 border-dashed border-slate-200 bg-slate-50/40 px-6 py-10 text-center transition hover:border-brand-200"
      >
        <input
          type="file"
          accept="video/*,audio/*,.srt"
          aria-label="Upload a video or audio file"
          onChange={(e) => onFile(e.target.files?.[0])}
          className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
        />

        {previewUrl ? (
          <div className="relative w-full max-w-xs overflow-hidden rounded-2xl border border-slate-200 bg-black shadow-lg">
            <video
              ref={previewRef}
              src={previewUrl}
              className="aspect-[9/16] w-full object-cover"
              playsInline
              muted
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="absolute bottom-3 left-3 z-20 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-slate-900 shadow-md backdrop-blur transition hover:bg-white"
              aria-label={playing ? "Pause preview" : "Play preview"}
            >
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <span className="absolute right-3 top-3 z-20 max-w-[70%] truncate rounded-lg bg-black/60 px-2 py-1 text-[10px] font-medium text-white backdrop-blur">
              {file?.name}
            </span>
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-center -space-x-2.5 transition group-hover:scale-105">
              <div className="grid h-11 w-11 -rotate-6 place-items-center rounded-xl bg-slate-800 text-white shadow-md">
                <Film className="h-5 w-5" />
              </div>
              <div className="grid h-11 w-11 rotate-6 place-items-center rounded-xl bg-amber-500 text-white shadow-md">
                <Volume2 className="h-5 w-5" />
              </div>
            </div>
            <h3 className="mb-3 text-base font-bold text-slate-800 sm:text-lg">
              Drop your video or audio
            </h3>
            <span className="mb-3 flex items-center gap-2 rounded-full border border-brand-500 bg-white px-5 py-2 text-xs font-semibold text-brand shadow-sm transition group-hover:bg-brand-50 sm:text-sm">
              <Upload className="h-3.5 w-3.5" /> Choose file
            </span>
            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
              MP4, MOV, WebM, MP3, WAV, M4A
            </p>
          </>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center justify-between gap-4 pt-5 sm:flex-row">
        <div className="flex w-full items-center gap-3 sm:w-auto">
          <div
            className="h-12 w-12 shrink-0 rounded-xl border border-slate-200 bg-slate-900 bg-cover bg-center shadow-sm"
            style={{ backgroundImage: `url(${template.poster})` }}
          />
          <div className="relative">
            <button
              type="button"
              onClick={() => setPickerOpen((v) => !v)}
              className="flex items-center gap-1 text-sm font-bold leading-none text-brand transition hover:text-brand-600"
            >
              {template.name} <ArrowDown className="h-3 w-3" />
            </button>
            <span className="mt-1 flex items-center gap-1 text-xs font-medium text-slate-500">
              Captions in{" "}
              <span className="font-semibold text-slate-700 underline decoration-dotted">
                {template.font}
              </span>
              <ChevronDown className="h-3 w-3" />
            </span>

            {pickerOpen && (
              <div className="absolute left-0 top-full z-30 mt-3 w-80 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-900/10">
                <div className="mb-2 flex items-center justify-between px-1">
                  <span className="text-xs font-bold text-slate-900">Pick a style</span>
                  <button
                    type="button"
                    onClick={() => setPickerOpen(false)}
                    aria-label="Close"
                    className="text-slate-400 transition hover:text-slate-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="grid max-h-72 grid-cols-3 gap-2 overflow-y-auto pr-1">
                  {pickerItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setTemplate(item);
                        setPickerOpen(false);
                      }}
                      className={`group relative aspect-[4/5] overflow-hidden rounded-xl border-2 transition ${
                        template.id === item.id
                          ? "border-brand"
                          : "border-transparent hover:border-slate-200"
                      }`}
                    >
                      <span
                        className="absolute inset-0 bg-cover bg-center transition group-hover:scale-105"
                        style={{ backgroundImage: `url(${item.poster})` }}
                      />
                      <span className="absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-black/80 to-transparent px-1.5 pb-1 pt-4 text-[9px] font-semibold text-white">
                        {item.name}
                      </span>
                      {item.pro && (
                        <Crown className="absolute right-1 top-1 h-3 w-3 text-amber-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex w-full items-center justify-end gap-3 sm:w-auto">
          <div className="flex items-center rounded-xl border border-slate-200/80 bg-slate-100 p-1">
            {(["video", "srt"] as FileMode[]).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setFileMode(mode)}
                className={`rounded-lg px-3 py-1 text-xs font-bold uppercase transition ${
                  fileMode === mode
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={createVideo}
            disabled={isProcessing}
            className="rounded-xl bg-brand px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-500/25 transition hover:bg-brand-600 active:scale-95 disabled:opacity-60"
          >
            {isProcessing ? "Processing…" : "Create video"}
          </button>
        </div>
      </div>

      <p className="mt-4 text-center text-[11px] text-slate-400">
        By uploading you agree to our{" "}
        <a href="#faq" className="underline hover:text-slate-600">
          Terms
        </a>
        .
      </p>

      {isProcessing && (
        <div className="mt-4 flex items-center justify-between rounded-xl border border-brand-200 bg-brand-50 p-4">
          <div className="flex items-center gap-3">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
            <span className="text-xs font-semibold text-brand-700">{step}</span>
          </div>
          <span className="hidden text-xs font-bold text-brand-600 sm:block">
            AI engine running
          </span>
        </div>
      )}

      {error && !isProcessing && (
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs font-medium text-amber-800">
          {error}
        </div>
      )}

      {output && !isProcessing && (
        <div className="mt-4 flex flex-col items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 sm:flex-row">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
            <Check className="h-4 w-4" /> Reel ready in the {template.name} style
          </div>
          <a
            href={output}
            download={`capify-${template.id}.mp4`}
            className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white transition hover:bg-slate-800"
          >
            <Sparkles className="h-3.5 w-3.5" /> Download video
          </a>
        </div>
      )}
    </div>
  );
}
