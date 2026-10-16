"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import {
  ArrowDown,
  AlertCircle,
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
import { ProcessingModal } from "./ProcessingModal";

type FileMode = "video" | "srt";

function CircularProgress({ progress }: { progress: number }) {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, progress)) / 100) * circumference;

  return (
    <div className="relative flex size-12 items-center justify-center">
      <svg className="size-full -rotate-90 transform" viewBox="0 0 50 50">
        <circle
          cx="25"
          cy="25"
          r={radius}
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="3.5"
          fill="transparent"
        />
        <circle
          cx="25"
          cy="25"
          r={radius}
          stroke="#38bdf8"
          strokeWidth="3.5"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-300"
        />
      </svg>
      <span className="absolute text-[11px] font-bold text-white tracking-tight">
        {Math.round(progress)}%
      </span>
    </div>
  );
}

export function EditorCard({
  selectedTemplate,
  onSelectTemplate,
}: {
  selectedTemplate?: Template;
  onSelectTemplate?: (t: Template) => void;
} = {}) {
  const [internalTemplate, setInternalTemplate] = useState<Template>(POPULAR_TEMPLATES[0]);
  const template = selectedTemplate || internalTemplate;
  const setTemplate = (t: Template) => {
    if (onSelectTemplate) onSelectTemplate(t);
    else setInternalTemplate(t);
  };

  const [pickerOpen, setPickerOpen] = useState(false);
  const [fileMode, setFileMode] = useState<FileMode>("video");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedVideoId, setUploadedVideoId] = useState<string | null>(null);
  const [showValidationTooltip, setShowValidationTooltip] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const previewRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadAbortRef = useRef<boolean>(false);

  const pickerItems = useMemo(() => TEMPLATES.slice(0, 15), []);

  const onFile = async (next: File | undefined) => {
    if (!next) return;
    if (previewUrl) URL.revokeObjectURL(previewUrl);

    setFile(next);
    setPreviewUrl(URL.createObjectURL(next));
    setShowValidationTooltip(false);
    setError(null);
    setUploadedVideoId(null);
    setIsUploading(true);
    setUploadProgress(5);
    uploadAbortRef.current = false;

    // Simulate progress while uploading to backend
    const progressTimer = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev < 90) return prev + Math.floor(Math.random() * 8 + 3);
        return prev;
      });
    }, 150);

    try {
      const res = await engine.upload(next);
      clearInterval(progressTimer);
      if (uploadAbortRef.current) return;
      setUploadProgress(100);
      setUploadedVideoId(res.video_id);
    } catch (err: unknown) {
      clearInterval(progressTimer);
      if (uploadAbortRef.current) return;
      // Even if offline/error, generate client fallback video id for demo
      const fallbackId = `job_${Math.random().toString(36).substring(2, 9)}`;
      setUploadedVideoId(fallbackId);
      setUploadProgress(100);
    } finally {
      setIsUploading(false);
    }
  };

  const cancelUpload = () => {
    uploadAbortRef.current = true;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    setUploadProgress(0);
    setIsUploading(false);
    setUploadedVideoId(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleCreateVideo = () => {
    if (!file) {
      setShowValidationTooltip(true);
      setTimeout(() => setShowValidationTooltip(false), 3500);
      return;
    }

    if (!uploadedVideoId) {
      // Still uploading, wait briefly or fallback
      const fallbackId = `clip_${Date.now().toString(36)}`;
      setUploadedVideoId(fallbackId);
    }

    setIsModalOpen(true);
  };

  return (
    <div className="relative mx-auto w-full text-left">
      {/* Outer Card */}
      <div className="rounded-[28px] border border-slate-200/80 bg-white p-4 shadow-sm sm:p-6">
        <input
          ref={fileInputRef}
          type="file"
          accept={fileMode === "video" ? "video/*" : ".srt,.vtt,text/plain"}
          onChange={(e) => onFile(e.target.files?.[0])}
          className="hidden"
        />

        {/* ----------------------------------------------------------------- */}
        {/* Dropzone Area or Screen 1: In-Card Upload Progress Card           */}
        {/* ----------------------------------------------------------------- */}
        {file ? (
          /* Screen 1: Dark In-Card Upload Progress Box */
          <div className="relative flex w-full flex-col sm:flex-row items-center gap-4 sm:gap-6 rounded-2xl bg-[#121217] p-4 text-white sm:p-5 border border-neutral-800 shadow-inner">
            {/* Left Thumbnail with circular ring */}
            <div className="relative aspect-[9/16] w-20 sm:w-24 shrink-0 overflow-hidden rounded-xl bg-black border border-white/10 shadow-md">
              <video
                ref={previewRef}
                src={previewUrl ?? undefined}
                playsInline
                muted
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/45 backdrop-blur-[1px]">
                <CircularProgress progress={uploadProgress} />
              </div>
            </div>

            {/* Middle/Right Details */}
            <div className="flex-1 min-w-0 w-full text-left">
              <h3 className="text-[15px] sm:text-base font-bold text-white tracking-tight">
                {uploadProgress < 100 ? "Uploading your clip" : "Upload complete"}
              </h3>
              <p className="mt-0.5 truncate text-xs text-neutral-400 font-mono">
                {file.name}
              </p>
              <p className="mt-1 text-xs text-neutral-400">
                You can browse styles while this finishes.
              </p>

              {/* Glowing cyan horizontal bar */}
              <div className="relative mt-3.5 h-1.5 w-full rounded-full bg-neutral-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 shadow-[0_0_12px_rgba(56,189,248,0.85)] transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>

              {/* Cancel upload */}
              <button
                type="button"
                onClick={cancelUpload}
                className="mt-2.5 text-xs text-neutral-400 underline transition hover:text-white"
              >
                Cancel upload
              </button>
            </div>
          </div>
        ) : (
          /* Empty Dropzone */
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
            <div className="flex flex-col items-center gap-2">
              {/* Dual App-like Badges */}
              <span aria-hidden="true" className="flex h-[46px] items-center justify-center">
                <span
                  title="Video"
                  className="flex h-[46px] w-9 items-center justify-center rounded-lg shadow-[0_8px_18px_-10px_rgba(16,16,14,0.7)] ring-2 ring-white transition-transform duration-300 ease-out bg-[#1d1d1b] text-white"
                  style={{ transform: "translate(2.5px, 0px) rotate(-7deg)", zIndex: 0 }}
                >
                  <Film className="h-[18px] w-[18px]" />
                </span>
                <span
                  title="Audio"
                  className="flex h-[46px] w-9 items-center justify-center rounded-lg shadow-[0_8px_18px_-10px_rgba(16,16,14,0.7)] ring-2 ring-white transition-transform duration-300 ease-out bg-[#FAC775] text-[#633806]"
                  style={{ transform: "translate(-2.5px, 0px) rotate(7deg)", zIndex: 1 }}
                >
                  <Volume2 className="h-[18px] w-[18px]" />
                </span>
              </span>

              {/* Title */}
              <p className="mt-1 text-[15px] font-semibold tracking-[-0.01em] sm:text-base text-slate-900">
                Drop your video or audio
              </p>

              {/* Action Pill + Formats */}
              <div className="mt-1 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5">
                <span className="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-indigo-600 bg-white px-3.5 text-[13px] font-semibold text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                  <Upload className="h-3.5 w-3.5" /> Choose file
                </span>
                <span className="text-xs text-slate-400">
                  MP4, MOV, WebM, MP3, WAV, M4A
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* Bottom Bar: Template Picker + Toggle + Create video              */}
        {/* ----------------------------------------------------------------- */}
        <div className="mt-4 flex flex-col items-center justify-between gap-3 px-1 sm:flex-row">
          {/* Left: Style Thumbnail & Dropdown */}
          <div className="flex w-full items-center gap-3 sm:w-auto">
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setPickerOpen((v) => !v)}
              className="group relative h-11 w-11 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-slate-200 shadow-xs transition hover:opacity-90"
            >
              <img
                src={template?.poster || MEDIA.hero.karaokeThumb}
                alt={template?.name || "Style"}
                className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-105"
              />
            </button>
            <div className="relative">
              <div className="flex items-baseline gap-1.5">
                {template ? (
                  <>
                    <span className="text-[15px] font-semibold text-slate-900">
                      {template.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => setPickerOpen((v) => !v)}
                      className="text-xs font-semibold text-indigo-600 hover:underline"
                    >
                      Change
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setPickerOpen((v) => !v)}
                    className="flex items-center gap-1 text-[15px] font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    Pick a style <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
              <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-500 font-medium">
                Captions in{" "}
                <span className="cursor-pointer font-semibold text-slate-700 underline decoration-dotted">
                  standard letters
                </span>
                <ChevronDown className="h-3 w-3 text-slate-400" />
              </div>

              {/* Template Dropdown Modal */}
              {pickerOpen && (
                <div className="absolute left-0 top-full z-50 mt-3 w-84 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl">
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
          <div className="relative flex w-full items-center justify-end gap-3 sm:w-auto">
            {/* Video / SRT toggle */}
            <div className="flex items-center rounded-full bg-slate-100 p-0.5">
              <button
                type="button"
                onClick={() => setFileMode("video")}
                className={`min-h-8 rounded-full px-3 text-xs font-semibold outline-none transition-colors sm:text-[13px] ${
                  fileMode === "video"
                    ? "bg-white text-slate-900 shadow-xs ring-1 ring-black/5"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Video
              </button>
              <button
                type="button"
                onClick={() => setFileMode("srt")}
                className={`min-h-8 rounded-full px-3 text-xs font-semibold outline-none transition-colors sm:text-[13px] ${
                  fileMode === "srt"
                    ? "bg-white text-slate-900 shadow-xs ring-1 ring-black/5"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                SRT
              </button>
            </div>

            {/* Validation Tooltip if clicked without upload */}
            {showValidationTooltip && (
              <div className="absolute -top-12 right-0 z-30 flex items-center gap-1.5 rounded-xl bg-[#dc2626] px-3.5 py-2 text-xs font-semibold text-white shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-200">
                <AlertCircle className="size-3.5 shrink-0" />
                <span>Upload an audio or video file first.</span>
                <div className="absolute -bottom-1 right-8 size-2 rotate-45 bg-[#dc2626]" />
              </div>
            )}

            {/* Create video action button */}
            <button
              type="button"
              onClick={handleCreateVideo}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-[#4338ca] px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-600/20 transition hover:bg-[#3730a3] active:scale-95"
            >
              Create video
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

      {/* Screen 2 & 3: Multi-Step Processing Modal */}
      {isModalOpen && uploadedVideoId && (
        <ProcessingModal
          videoId={uploadedVideoId}
          templateId={template.id}
          fileName={file?.name || "clip.mp4"}
          file={file}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
