"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Upload, Sparkles, Image as ImageIcon, Download, Check, RefreshCw, Wand2 } from "lucide-react";
import { PageHero } from "../../_components/PageHero";
import { CtaBand } from "../../_components/sections/CtaBand";

const STYLES = [
  { id: "creator", name: "High-Energy", desc: "Bold outline, neon contrast, expressive face zoom" },
  { id: "editorial", name: "Clean Editorial", desc: "Minimalist typography, film grain, luxury aesthetic" },
  { id: "split", name: "Before & After", desc: "Dual split-frame with dramatic comparison arrow" },
  { id: "dark", name: "Cinematic Dark", desc: "Moody lighting, glowing rim lights, suspenseful hook" },
];

export default function AiThumbnailPage() {
  const [aspect, setAspect] = useState<"9:16" | "16:9">("9:16");
  const [selectedStyle, setSelectedStyle] = useState("creator");
  const [headline, setHeadline] = useState("THIS CHANGED EVERYTHING");
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setPreviewImage(URL.createObjectURL(f));
    }
  };

  const generateThumbnail = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 1200);
  };

  return (
    <main className="relative overflow-x-hidden">
      <div className="blueprint-grid pointer-events-none fixed inset-0 z-0 opacity-[0.6]" />

      <PageHero
        badge="AI Tools"
        title="AI Thumbnail Maker"
        subtitle="Turn any video frame or portrait into a viral, high-CTR thumbnail with bold text overlays, facial enhancement, and custom backgrounds."
      />

      <section className="relative z-10 mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Controls Panel */}
          <div className="space-y-6 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm lg:col-span-5">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                1. Aspect Ratio
              </label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setAspect("9:16")}
                  className={`rounded-xl border py-2.5 text-xs font-semibold transition cursor-pointer ${
                    aspect === "9:16"
                      ? "border-indigo-600 bg-indigo-50/70 text-indigo-700 shadow-xs"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  9:16 (Shorts / Reels)
                </button>
                <button
                  type="button"
                  onClick={() => setAspect("16:9")}
                  className={`rounded-xl border py-2.5 text-xs font-semibold transition cursor-pointer ${
                    aspect === "16:9"
                      ? "border-indigo-600 bg-indigo-50/70 text-indigo-700 shadow-xs"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  16:9 (YouTube)
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                2. Upload Source Frame
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={handleFile}
                className="hidden"
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="mt-2 flex min-h-[110px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/60 p-4 text-center transition hover:border-indigo-400 hover:bg-indigo-50/20"
              >
                <Upload className="h-5 w-5 text-indigo-600" />
                <span className="mt-1.5 text-xs font-semibold text-slate-800">
                  Drop video or image frame
                </span>
                <span className="text-[11px] text-slate-400">PNG, JPG, MP4 up to 50MB</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                3. Style Preset
              </label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {STYLES.map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setSelectedStyle(st.id)}
                    className={`rounded-xl border p-2.5 text-left transition cursor-pointer ${
                      selectedStyle === st.id
                        ? "border-indigo-600 bg-indigo-50/60 text-indigo-900 shadow-xs"
                        : "border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <div className="text-xs font-bold">{st.name}</div>
                    <div className="mt-0.5 line-clamp-1 text-[10px] text-slate-400">{st.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                4. Hook Headline
              </label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="Short, punchy hook text..."
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>

            <button
              type="button"
              onClick={generateThumbnail}
              disabled={isGenerating}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#4F46E5] py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#4338CA] active:scale-98 cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" /> Generating AI Thumbnail…
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4" /> Generate Thumbnail
                </>
              )}
            </button>
          </div>

          {/* Live Studio Canvas Preview */}
          <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm lg:col-span-7">
            <div className="mb-4 flex w-full items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Preview Canvas
              </span>
              <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-bold text-indigo-600">
                {aspect} Ultra-HD
              </span>
            </div>

            <div
              className={`relative overflow-hidden rounded-2xl border-4 border-slate-900 bg-slate-950 shadow-2xl transition-all duration-300 ${
                aspect === "9:16" ? "aspect-[9/16] w-64 sm:w-72" : "aspect-[16/9] w-full max-w-lg"
              }`}
            >
              {/* Image Preview or placeholder */}
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Thumbnail frame"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 p-6 text-center text-white">
                  <ImageIcon className="h-12 w-12 text-indigo-400 opacity-60" />
                  <p className="mt-3 text-xs font-semibold text-indigo-200">
                    Upload a frame to preview AI generation
                  </p>
                </div>
              )}

              {/* Bold Headline Overlay */}
              {headline && (
                <div className="absolute inset-x-3 bottom-8 z-20 text-center">
                  <span className="inline-block -rotate-1 rounded-xl bg-[#DFFF3F] px-3 py-1 font-black text-slate-950 shadow-lg text-lg sm:text-xl tracking-tight uppercase">
                    {headline}
                  </span>
                </div>
              )}

              {/* Gradient vignette */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
            </div>

            <div className="mt-6 flex w-full max-w-sm items-center justify-center gap-3">
              <button
                type="button"
                className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800 cursor-pointer shadow-xs"
              >
                <Download className="h-3.5 w-3.5" /> Download HD PNG
              </button>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
