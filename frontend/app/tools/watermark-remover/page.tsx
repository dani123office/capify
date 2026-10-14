"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Upload, Video, Sparkles, Download, Check, RefreshCw, Scissors, ShieldCheck } from "lucide-react";
import { PageHero } from "../../_components/PageHero";
import { CtaBand } from "../../_components/sections/CtaBand";

export default function WatermarkRemoverPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mode, setMode] = useState<"auto" | "box">("auto");
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreviewUrl(URL.createObjectURL(f));
    }
  };

  const handleRemove = () => {
    if (!file) return;
    setIsProcessing(true);
    setProgress(15);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          return 100;
        }
        return p + 25;
      });
    }, 400);
  };

  return (
    <main className="relative overflow-x-hidden">
      <div className="blueprint-grid pointer-events-none fixed inset-0 z-0 opacity-[0.6]" />

      <PageHero
        badge="AI Tools"
        title="Video Watermark Remover"
        subtitle="Remove TikTok watermarks, logo stamps, timestamps and onscreen handles from any video with temporal AI inpainting that leaves zero blur artifacts."
      />

      <section className="relative z-10 mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-8">
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFile}
            className="hidden"
          />

          {!previewUrl ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-[#fafbfc] p-8 text-center transition hover:border-indigo-500 hover:bg-indigo-50/20"
            >
              <div className="grid size-12 place-items-center rounded-2xl bg-indigo-50 text-indigo-600">
                <Video className="h-6 w-6" />
              </div>
              <h3 className="mt-3 text-base font-semibold text-slate-900">
                Drop your watermarked video here
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                Supports MP4, MOV, WebM up to 200MB. Auto-detects TikTok & Reels bounces.
              </p>
              <span className="mt-4 rounded-full bg-[#4F46E5] px-4 py-2 text-xs font-bold text-white shadow-xs">
                Browse file
              </span>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative mx-auto aspect-[9/16] w-64 overflow-hidden rounded-2xl border border-slate-200 bg-black shadow-lg">
                <video src={previewUrl} controls className="h-full w-full object-cover" />
                {isProcessing && (
                  <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/70 p-4 text-center text-white backdrop-blur-xs">
                    <RefreshCw className="h-8 w-8 animate-spin text-indigo-400" />
                    <span className="mt-3 text-xs font-bold">
                      Inpainting watermark frames… {progress}%
                    </span>
                  </div>
                )}
              </div>

              <div className="mx-auto flex max-w-md flex-col gap-3">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setMode("auto")}
                    className={`rounded-xl border py-2.5 text-xs font-semibold transition cursor-pointer ${
                      mode === "auto"
                        ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                        : "border-slate-200 text-slate-600"
                    }`}
                  >
                    Auto-detect Watermarks
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("box")}
                    className={`rounded-xl border py-2.5 text-xs font-semibold transition cursor-pointer ${
                      mode === "box"
                        ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                        : "border-slate-200 text-slate-600"
                    }`}
                  >
                    Custom Corner Box
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleRemove}
                  disabled={isProcessing}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[#4F46E5] py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#4338CA] cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="h-4 w-4" /> Remove Watermark Now
                </button>
              </div>
            </div>
          )}

          {/* Feature Highlights */}
          <div className="mt-8 grid grid-cols-1 gap-4 border-t border-slate-100 pt-6 sm:grid-cols-3">
            <div className="flex items-start gap-3">
              <Check className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Zero Blur Residuals</h4>
                <p className="text-[11px] text-slate-500">Reconstructs pixels with optical flow.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Audio Preserved 100%</h4>
                <p className="text-[11px] text-slate-500">Keeps original bitrate and channels intact.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Batch Ready</h4>
                <p className="text-[11px] text-slate-500">Clean multiple clips simultaneously.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
