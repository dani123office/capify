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
  Upload,
  Volume2,
  X,
} from "lucide-react";
import { POPULAR_TEMPLATES, TEMPLATES, type Template } from "../../_lib/templates";
import { MEDIA } from "../../_lib/media";
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const pickerItems = useMemo(() => TEMPLATES.slice(0, 15), []);

  const onFile = (next: File | undefined) => {
    if (!next) return;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(next);
    setPreviewUrl(URL.createObjectURL(next));
    setOutput(null);
    setError(null);
  };

  const createVideo = async () => {
    if (!file) {
      fileInputRef.current?.click();
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
      setError(`Render engine not reachable. Please start the backend server.`);
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
    <div className="relative mx-auto w-full text-left">
      {/* Outer Card */}
      <div className="rounded-[28px] border border-slate-200/80 bg-white p-4 shadow-sm sm:p-6">
        {/* Inner Dashed Drop Area */}
        <div
          id="dropzone"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            onFile(e.dataTransfer.files?.[0]);
          }}
          className="group relative flex min-h-[170px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200/90 bg-[#fafbfc]/70 p-6 text-center transition hover:border-indigo-400 hover:bg-slate-50/60 sm:min-h-[190px]"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={fileMode === "video" ? "video/*" : ".srt,.vtt,text/plain"}
            onChange={(e) => onFile(e.target.files?.[0])}
            className="hidden"
          />

          {previewUrl && fileMode === "video" ? (
            <div
              className="relative aspect-[9/16] w-36 overflow-hidden rounded-xl border border-slate-200 bg-black shadow-md sm:w-40"
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
            >
              <video
                ref={previewRef}
                src={previewUrl}
                playsInline
                loop
                muted
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                className="absolute inset-0 z-10 grid place-items-center bg-black/30 text-white transition hover:bg-black/20"
              >
                {playing ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </button>
              <span className="absolute right-2 top-2 z-20 max-w-[80%] truncate rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-medium text-white">
                {file?.name}
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              {/* Dual App-like Badges */}
              <div className="flex items-center -space-x-2 transition group-hover:scale-105">
                <div className="grid h-10 w-10 -rotate-6 place-items-center rounded-xl bg-slate-900 text-white shadow-md">
                  <Film className="h-5 w-5" />
                </div>
                <div className="grid h-10 w-10 rotate-6 place-items-center rounded-xl bg-[#f59e0b] text-white shadow-md">
                  <Volume2 className="h-5 w-5" />
                </div>
              </div>

              {/* Title */}
              <p className="mt-1 text-[15px] font-semibold tracking-tight text-slate-900 sm:text-base">
                Drop your video or audio
              </p>

              {/* Action Pill + Formats */}
              <div className="mt-1 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5">
                <span className="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-indigo-600/40 bg-white px-4 py-1 text-xs font-semibold text-indigo-600 shadow-xs transition group-hover:bg-indigo-600 group-hover:text-white">
                  <Upload className="h-3.5 w-3.5" /> Choose file
                </span>
                <span className="text-xs font-medium text-slate-400">
                  MP4, MOV, WebM, MP3, WAV, M4A
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Bar: Template Picker + Toggle + Create video */}
        <div className="mt-4 flex flex-col items-center justify-between gap-3 px-1 sm:flex-row">
          {/* Left: Style Thumbnail & Dropdown */}
          <div className="flex w-full items-center gap-3 sm:w-auto">
            <div
              onClick={() => setPickerOpen((v) => !v)}
              className="h-11 w-11 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-cover bg-center shadow-xs transition hover:opacity-90"
              style={{ backgroundImage: `url(${MEDIA.hero.karaokeThumb})` }}
            />
            <div className="relative">
              <button
                type="button"
                onClick={() => setPickerOpen((v) => !v)}
                className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Pick a style <ArrowDown className="h-3.5 w-3.5" />
              </button>
              <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-500 font-medium">
                Captions in{" "}
                <span className="cursor-pointer font-semibold text-slate-700 underline decoration-dotted">
                  standard letters
                </span>
                <ChevronDown className="h-3 w-3 text-slate-400" />
              </div>

              {/* Template Dropdown Modal */}
              {pickerOpen && (
                <div className="absolute left-0 top-full z-40 mt-3 w-84 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl">
                  <div className="mb-2 flex items-center justify-between px-1">
                    <span className="text-xs font-bold text-slate-900">Choose Caption Style</span>
                    <button
                      type="button"
                      onClick={() => setPickerOpen(false)}
                      className="text-slate-400 hover:text-slate-700"
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
                            ? "border-indigo-600"
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

          {/* Right: Video/SRT toggle + Create Video button */}
          <div className="flex w-full items-center justify-end gap-3 sm:w-auto">
            {/* Pill toggle */}
            <div className="flex items-center rounded-full border border-slate-200/90 bg-slate-100/80 p-1">
              {(["video", "srt"] as FileMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setFileMode(mode)}
                  className={`rounded-full px-3.5 py-1 text-xs font-bold uppercase transition ${
                    fileMode === mode
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Create video action button */}
            <button
              type="button"
              disabled={isProcessing}
              onClick={createVideo}
              className="inline-flex items-center gap-2 rounded-xl bg-[#4338ca] px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-600/20 transition hover:bg-[#3730a3] active:scale-95 disabled:opacity-50"
            >
              {isProcessing ? "Processing…" : "Create video"}
            </button>
          </div>
        </div>
      </div>

      {/* Terms Notice */}
      <p className="mt-2.5 text-center text-[11px] font-medium text-slate-400">
        By uploading you agree to our{" "}
        <a href="#terms" className="underline hover:text-slate-600">
          Terms
        </a>
        .
      </p>

      {/* Processing Banner */}
      {isProcessing && (
        <div className="mt-3 flex items-center justify-center gap-3 rounded-xl border border-indigo-200 bg-indigo-50/80 p-3 text-xs font-semibold text-indigo-900">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
          {step}
        </div>
      )}

      {/* Output / Download Link */}
      {output && (
        <div className="mt-3 flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50/90 p-3 text-xs font-semibold text-emerald-900">
          <span>Video ready with behind-subject captions!</span>
          <a
            href={output}
            download
            className="rounded-lg bg-emerald-600 px-3 py-1 font-bold text-white hover:bg-emerald-700"
          >
            Download MP4
          </a>
        </div>
      )}

      {/* Error Banner */}
      {error && (
        <div className="mt-3 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-medium text-rose-700">
          {error}
        </div>
      )}
    </div>
  );
}
