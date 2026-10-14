"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Upload, Sparkles, Image as ImageIcon, Download, Check, RefreshCw, Eraser } from "lucide-react";
import { PageHero } from "../../_components/PageHero";
import { CtaBand } from "../../_components/sections/CtaBand";

export default function ImageCleanerPage() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isCleaning, setIsCleaning] = useState(false);
  const [brushSize, setBrushSize] = useState(25);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setPreviewUrl(URL.createObjectURL(f));
    }
  };

  const cleanImage = () => {
    setIsCleaning(true);
    setTimeout(() => {
      setIsCleaning(false);
    }, 1000);
  };

  return (
    <main className="relative overflow-x-hidden">
      <div className="blueprint-grid pointer-events-none fixed inset-0 z-0 opacity-[0.6]" />

      <PageHero
        badge="AI Tools"
        title="Image Cleaner"
        subtitle="Erase unwanted objects, photobombers, text stickers, and blemishes from any photo or thumbnail frame with instant AI inpainting."
      />

      <section className="relative z-10 mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-8">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />

          {!previewUrl ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-[#fafbfc] p-8 text-center transition hover:border-indigo-500 hover:bg-indigo-50/20"
            >
              <div className="grid size-12 place-items-center rounded-2xl bg-indigo-50 text-indigo-600">
                <Eraser className="h-6 w-6" />
              </div>
              <h3 className="mt-3 text-base font-semibold text-slate-900">
                Drop your photo to clean
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                PNG, JPG, WebP. Brush over any object or watermark to vanish it seamlessly.
              </p>
              <span className="mt-4 rounded-full bg-[#4F46E5] px-4 py-2 text-xs font-bold text-white shadow-xs">
                Upload image
              </span>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative mx-auto max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-md">
                <img src={previewUrl} alt="Image to clean" className="h-full w-full object-contain max-h-[480px]" />
                {isCleaning && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 text-white backdrop-blur-xs">
                    <RefreshCw className="h-8 w-8 animate-spin text-indigo-400" />
                    <span className="mt-3 text-xs font-bold">Removing selected objects…</span>
                  </div>
                )}
              </div>

              {/* Brush & Action Bar */}
              <div className="mx-auto flex max-w-md items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-600">Brush Size:</span>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    value={brushSize}
                    onChange={(e) => setBrushSize(Number(e.target.value))}
                    className="h-1.5 w-28 accent-indigo-600 cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-slate-500">{brushSize}px</span>
                </div>

                <button
                  type="button"
                  onClick={cleanImage}
                  disabled={isCleaning}
                  className="flex items-center gap-2 rounded-xl bg-[#4F46E5] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#4338CA] cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="h-3.5 w-3.5" /> Clean Now
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
