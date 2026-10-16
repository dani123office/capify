"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  Eye,
  Heart,
  MessageCircle,
  MoreVertical,
  Music,
  Send,
  Sparkles,
  Upload,
} from "lucide-react";

type Platform = "instagram" | "tiktok" | "youtube";

export default function SafeZonePage() {
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [showOverlay, setShowOverlay] = useState(true);
  const [showGuides, setShowGuides] = useState(true);
  const [videoUrl, setVideoUrl] = useState<string>(
    "https://cdn.kaizynn.com/moonshot/landing/contentaware/golden-hour-v2-poster.jpg"
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-900">
      {/* Hero Header */}
      <div className="border-b border-slate-200 bg-white px-4 py-12 text-center sm:px-6 sm:py-16">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-indigo-700">
          <Sparkles className="size-3.5" /> Free Creator Tool
        </span>
        <h1 className="mt-4 font-sans text-3xl font-black tracking-tight sm:text-5xl">
          Instagram Reels Safe Zone Guide
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
          Check if your captions, text hooks, and face get blocked by Instagram's buttons,
          caption overlay, and sound icon. Works for Instagram Reels, TikTok, and YouTube Shorts.
        </p>

        {/* Platform Selector */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center rounded-2xl bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setPlatform("instagram")}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                platform === "instagram"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Instagram Reels (9:16)
            </button>
            <button
              type="button"
              onClick={() => setPlatform("tiktok")}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                platform === "tiktok"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              TikTok (9:16)
            </button>
            <button
              type="button"
              onClick={() => setPlatform("youtube")}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                platform === "youtube"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              YouTube Shorts (9:16)
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] items-start">
          {/* Left Canvas Preview */}
          <div className="flex flex-col items-center">
            {/* 9:16 Phone Mockup Viewport */}
            <div className="relative aspect-[9/16] w-full max-w-[340px] overflow-hidden rounded-[36px] border-4 border-slate-900 bg-black shadow-2xl">
              {/* Video / Poster */}
              <img
                src={videoUrl}
                alt="Uploaded reel"
                className="h-full w-full object-cover"
              />

              {/* Safe Zone Grid / Overlay Guides */}
              {showGuides && (
                <div className="pointer-events-none absolute inset-0 z-20">
                  {/* Top Dead Zone (20% from top for stories/status/search) */}
                  <div className="absolute inset-x-0 top-0 h-[18%] bg-rose-500/20 border-b-2 border-dashed border-rose-400">
                    <span className="absolute left-3 top-3 rounded bg-rose-600/90 px-1.5 py-0.5 text-[9px] font-bold text-white">
                      Top Header Dead Zone (18%)
                    </span>
                  </div>

                  {/* Right Action Icons Dead Zone (approx 20% on right from bottom 50% to bottom 20%) */}
                  <div className="absolute bottom-[22%] right-0 top-[35%] w-[22%] bg-rose-500/20 border-l-2 border-dashed border-rose-400">
                    <span className="absolute bottom-2 right-2 rounded bg-rose-600/90 px-1.5 py-0.5 text-[8px] font-bold text-white text-right">
                      Buttons Zone
                    </span>
                  </div>

                  {/* Bottom Caption & Audio Dead Zone (32% from bottom) */}
                  <div className="absolute inset-x-0 bottom-0 h-[28%] bg-rose-500/25 border-t-2 border-dashed border-rose-400">
                    <span className="absolute bottom-3 left-3 rounded bg-rose-600/90 px-1.5 py-0.5 text-[9px] font-bold text-white">
                      Bottom UI & Caption Dead Zone (28%)
                    </span>
                  </div>

                  {/* Optimal Safe Caption Box */}
                  <div className="absolute inset-x-[12%] bottom-[30%] top-[25%] rounded-2xl border-2 border-dashed border-emerald-400 bg-emerald-500/10 flex items-center justify-center">
                    <span className="rounded-full bg-emerald-600 px-3 py-1 text-[11px] font-bold text-white shadow-md">
                      ✓ Optimal Safe Caption Area
                    </span>
                  </div>
                </div>
              )}

              {/* Real Instagram Platform UI Simulation */}
              {showOverlay && platform === "instagram" && (
                <div className="pointer-events-none absolute inset-0 z-30 flex flex-col justify-between p-4 text-white">
                  {/* Top bar */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="font-bold text-sm tracking-tight">Reels</span>
                    <span className="text-sm font-semibold">📷</span>
                  </div>

                  {/* Bottom Area: Left profile + Right actions */}
                  <div className="flex items-end justify-between pb-2">
                    {/* Left: User & Caption */}
                    <div className="max-w-[70%] space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="size-8 rounded-full bg-indigo-500 ring-2 ring-white" />
                        <span className="text-xs font-bold">@creator_studio</span>
                        <span className="rounded-md border border-white/60 px-2 py-0.5 text-[10px] font-semibold">
                          Follow
                        </span>
                      </div>
                      <p className="text-xs leading-snug line-clamp-2">
                        How to format your captions so Instagram buttons never block your hooks...{" "}
                        <span className="text-neutral-300 font-semibold">more</span>
                      </p>
                      <div className="flex items-center gap-1.5 text-[10px] text-neutral-300">
                        <Music className="size-3" />
                        <span>Original Audio — viral_sound</span>
                      </div>
                    </div>

                    {/* Right: Action Buttons */}
                    <div className="flex flex-col items-center gap-4 text-center">
                      <div className="flex flex-col items-center gap-0.5">
                        <Heart className="size-6 stroke-[2]" />
                        <span className="text-[10px] font-bold">42.8K</span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5">
                        <MessageCircle className="size-6 stroke-[2]" />
                        <span className="text-[10px] font-bold">814</span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5">
                        <Send className="size-5 stroke-[2]" />
                        <span className="text-[10px] font-bold">Share</span>
                      </div>
                      <MoreVertical className="size-5" />
                      <div className="size-6 rounded-md border-2 border-white bg-slate-800" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Upload Test Video Button */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={onFileChange}
              className="hidden"
            />
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-800 shadow-xs hover:bg-slate-50 transition"
              >
                <Upload className="size-3.5 text-indigo-600" /> Upload your own video/screenshot
              </button>
            </div>
          </div>

          {/* Right Control & Guide Panel */}
          <div className="space-y-6 text-left">
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm">
              <h2 className="text-base font-bold text-slate-900">Overlay Controls</h2>
              <div className="mt-4 space-y-3">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-semibold text-slate-700">Show Safe Zone Guides</span>
                  <input
                    type="checkbox"
                    checked={showGuides}
                    onChange={(e) => setShowGuides(e.target.checked)}
                    className="size-4 rounded accent-indigo-600"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-semibold text-slate-700">Show App UI Overlay</span>
                  <input
                    type="checkbox"
                    checked={showOverlay}
                    onChange={(e) => setShowOverlay(e.target.checked)}
                    className="size-4 rounded accent-indigo-600"
                  />
                </label>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Key Safe Zone Rules (1080×1920)
                </h3>
                <ul className="mt-3 space-y-2.5 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="size-4 shrink-0 text-emerald-600 mt-0.5" />
                    <span>
                      <strong>Top 220px:</strong> Reserved for status bar and profile headers. Keep hooks below this line.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="size-4 shrink-0 text-emerald-600 mt-0.5" />
                    <span>
                      <strong>Bottom 420px:</strong> Username, 2-line caption, and audio track cover this area.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="size-4 shrink-0 text-emerald-600 mt-0.5" />
                    <span>
                      <strong>Right 120px:</strong> Like, comment, share, and audio icons cover right edge.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="size-4 shrink-0 text-amber-500 mt-0.5" />
                    <span>
                      <strong>Capify auto-centers</strong> all captions directly in the optimal safe zone automatically.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mt-6">
                <Link
                  href="/"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 transition"
                >
                  <Sparkles className="size-4" /> Auto-Place Captions with Capify
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
