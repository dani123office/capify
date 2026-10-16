"use client";

import { useEffect, useRef, useState, use, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Clapperboard,
  Download,
  Eye,
  Folder,
  Mic,
  Minus,
  Music,
  Palette,
  Pause,
  Play,
  Plus,
  Redo,
  RotateCcw,
  Settings,
  Sliders,
  Smile,
  Sparkles,
  Subtitles,
  Undo,
  Volume2,
  Wand2,
  ZoomIn,
} from "lucide-react";
import { engine, type TranscriptWord } from "../../_lib/api";
import { POPULAR_TEMPLATES, TEMPLATES } from "../../_lib/templates";

// Default initial words matching Moonshot's Hindi/Hinglish demo: "Jo bhi tumne college mein sikha hai wo sab bhul jao"
const DEFAULT_WORDS_HINGLISH: TranscriptWord[] = [
  { word: "Jo", start: 0.2, end: 0.6 },
  { word: "bhi", start: 0.65, end: 0.95 },
  { word: "tumne", start: 1.0, end: 1.55 },
  { word: "college", start: 1.6, end: 2.15 },
  { word: "℗", start: 2.15, end: 2.55, is_pause: true },
  { word: "mein", start: 2.6, end: 2.95 },
  { word: "sikha", start: 3.0, end: 3.5 },
  { word: "hai", start: 3.55, end: 3.9 },
  { word: "℗", start: 3.9, end: 4.3, is_pause: true },
  { word: "wo", start: 4.35, end: 4.65 },
  { word: "sab", start: 4.7, end: 5.1 },
  { word: "bhul", start: 5.15, end: 5.65 },
  { word: "jao", start: 5.7, end: 6.2 },
];

const DEFAULT_WORDS_HINDI: TranscriptWord[] = [
  { word: "जो", start: 0.2, end: 0.6 },
  { word: "भी", start: 0.65, end: 0.95 },
  { word: "तुमने", start: 1.0, end: 1.55 },
  { word: "कॉलेज", start: 1.6, end: 2.15 },
  { word: "℗", start: 2.15, end: 2.55, is_pause: true },
  { word: "में", start: 2.6, end: 2.95 },
  { word: "सीखा", start: 3.0, end: 3.5 },
  { word: "है", start: 3.55, end: 3.9 },
  { word: "℗", start: 3.9, end: 4.3, is_pause: true },
  { word: "वो", start: 4.35, end: 4.65 },
  { word: "सब", start: 4.7, end: 5.1 },
  { word: "भूल", start: 5.15, end: 5.65 },
  { word: "जाओ", start: 5.7, end: 6.2 },
];

type ToolType =
  | "auto-edit"
  | "captions"
  | "styles"
  | "adjust"
  | "voice"
  | "music"
  | "b-roll"
  | "stickers"
  | "media"
  | "zoom"
  | "settings";

function formatTimecode(secs: number): string {
  if (isNaN(secs) || secs < 0) secs = 0;
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  const hundredths = Math.floor((secs % 1) * 100);
  return `${m}:${s.toString().padStart(2, "0")}.${hundredths.toString().padStart(2, "0")}`;
}

function StudioContent({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const videoId = resolvedParams.id;
  const searchParams = useSearchParams();
  const templateParam = searchParams.get("template") || "blue-muse";

  const [activeTool, setActiveTool] = useState<ToolType>("captions");
  const [scriptMode, setScriptMode] = useState<"hinglish" | "hindi">("hinglish");
  const [words, setWords] = useState<TranscriptWord[]>(DEFAULT_WORDS_HINGLISH);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingWordText, setEditingWordText] = useState("");

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(10.52);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [sharperCutouts, setSharperCutouts] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string>("");

  const videoRef = useRef<HTMLVideoElement>(null);
  const timelineTrackRef = useRef<HTMLDivElement>(null);

  // Load video & transcript on mount
  useEffect(() => {
    // Set video src from backend API stream
    const url = engine.videoUrl(videoId);
    setVideoSrc(url);

    // Try fetching real transcript from backend
    async function loadTranscript() {
      try {
        const data = await engine.getTranscript(videoId);
        if (data.words && data.words.length > 0) {
          setWords(data.words);
        }
      } catch {
        // Fallback to demo words
      }
    }
    void loadTranscript();
  }, [videoId]);

  // Handle script switch between Hinglish (Latin) and Hindi (Devanagari)
  const toggleScript = (mode: "hinglish" | "hindi") => {
    setScriptMode(mode);
    if (mode === "hindi") {
      setWords(DEFAULT_WORDS_HINDI);
    } else {
      setWords(DEFAULT_WORDS_HINGLISH);
    }
  };

  // Video time update handler
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (videoRef.current.duration && !isNaN(videoRef.current.duration)) {
        setDuration(videoRef.current.duration);
      }
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      void videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const seekTo = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, Math.min(seconds, duration));
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineTrackRef.current) return;
    const rect = timelineTrackRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    seekTo(ratio * duration);
  };

  // Find currently active word
  const activeWord = words.find(
    (w) => !w.is_pause && currentTime >= w.start && currentTime <= w.end
  );

  const saveWordEdit = (index: number) => {
    if (editingWordText.trim()) {
      setWords((prev) => {
        const next = [...prev];
        next[index] = { ...next[index], word: editingWordText.trim() };
        return next;
      });
    }
    setEditingIndex(null);
  };

  return (
    <div className="flex h-screen w-screen flex-col bg-[#0c0c0f] text-white select-none overflow-hidden font-sans">
      {/* ------------------------------------------------------------------- */}
      {/* 1. Top Studio Header                                               */}
      {/* ------------------------------------------------------------------- */}
      <header className="flex h-13 shrink-0 items-center justify-between border-b border-white/10 bg-[#111116] px-4">
        {/* Left: Low-res preview pill */}
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-neutral-300">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Low-res preview
          </span>
        </div>

        {/* Center/Right: Undo/Redo + Upgrade + Home + Export */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="grid size-7 place-items-center rounded-lg text-neutral-400 hover:bg-white/10 hover:text-white transition"
            title="Undo"
          >
            <Undo className="size-3.5" />
          </button>
          <button
            type="button"
            className="grid size-7 place-items-center rounded-lg text-neutral-400 hover:bg-white/10 hover:text-white transition"
            title="Redo"
          >
            <Redo className="size-3.5" />
          </button>

          <button
            type="button"
            className="hidden sm:inline-flex items-center rounded-full border border-white/10 bg-[#1c1c22] px-3 py-1 text-xs font-semibold text-neutral-200 transition hover:bg-white/10"
          >
            Upgrade
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-neutral-300 transition hover:text-white hover:bg-white/5"
          >
            <ArrowLeft className="size-3.5" />
            Home
          </Link>

          <a
            href={engine.downloadUrl(videoId)}
            download
            className="inline-flex items-center gap-1.5 rounded-full bg-[#cbb06d] px-4 py-1.5 text-xs font-bold text-black shadow-sm transition hover:bg-[#d8be7c] active:scale-95"
          >
            <Download className="size-3.5" />
            Export
          </a>
        </div>
      </header>

      {/* ------------------------------------------------------------------- */}
      {/* 2. Middle Body: Left Dock + Center Canvas                           */}
      {/* ------------------------------------------------------------------- */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* Left Toolbar Dock (11 Tools from Moonshot) */}
        <aside className="flex w-16 shrink-0 flex-col items-center justify-between border-r border-white/10 bg-[#101014] py-2 z-20">
          <div className="flex flex-col items-center gap-1 w-full">
            {[
              { id: "auto-edit", label: "Auto-edit", icon: Wand2 },
              { id: "captions", label: "Captions", icon: Subtitles },
              { id: "styles", label: "Styles", icon: Palette },
              { id: "adjust", label: "Adjust", icon: Sliders },
              { id: "voice", label: "Voice", icon: Mic },
              { id: "music", label: "Music", icon: Music },
              { id: "b-roll", label: "B-roll", icon: Clapperboard },
              { id: "stickers", label: "Stickers", icon: Smile },
              { id: "media", label: "Media", icon: Folder },
              { id: "zoom", label: "Zoom", icon: ZoomIn },
            ].map((tool) => {
              const Icon = tool.icon;
              const isActive = activeTool === tool.id;
              return (
                <button
                  key={tool.id}
                  type="button"
                  onClick={() => setActiveTool(tool.id as ToolType)}
                  className={`flex w-13 flex-col items-center justify-center rounded-xl py-1.5 transition ${
                    isActive
                      ? "bg-indigo-600/30 text-indigo-400 font-semibold"
                      : "text-neutral-400 hover:bg-white/5 hover:text-neutral-200"
                  }`}
                >
                  <Icon className="size-4" />
                  <span className="mt-1 text-[9px] tracking-tight">{tool.label}</span>
                </button>
              );
            })}
          </div>

          {/* Settings at bottom */}
          <button
            type="button"
            onClick={() => setActiveTool("settings")}
            className="flex w-13 flex-col items-center justify-center rounded-xl py-1.5 text-neutral-400 hover:bg-white/5 hover:text-neutral-200 transition"
          >
            <Settings className="size-4" />
            <span className="mt-1 text-[9px]">Settings</span>
          </button>
        </aside>

        {/* Center Canvas */}
        <main className="relative flex flex-1 flex-col items-center justify-center bg-[#08080a] p-4 overflow-hidden">
          {/* Floating Pill: ✨ Get sharper cutouts > */}
          <div className="absolute top-4 z-20 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSharperCutouts((v) => !v)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-xs font-semibold backdrop-blur-md transition ${
                sharperCutouts
                  ? "border-amber-400/60 bg-amber-500/20 text-amber-200 shadow-[0_0_12px_rgba(251,191,36,0.4)]"
                  : "border-white/15 bg-black/60 text-neutral-200 hover:bg-black/80"
              }`}
            >
              <Sparkles className="size-3 text-amber-300" />
              <span>Get sharper cutouts</span>
              <ChevronRight className="size-3 text-neutral-400" />
            </button>
          </div>

          {/* Script switcher card (अ Hindi vs abc Hinglish) */}
          <div className="absolute right-4 top-4 z-20 rounded-2xl border border-white/10 bg-[#16161c]/90 p-2.5 backdrop-blur-md shadow-xl text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block px-1">
              Script
            </span>
            <div className="mt-1.5 flex items-center gap-1 rounded-xl bg-black/40 p-1">
              <button
                type="button"
                onClick={() => toggleScript("hindi")}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                  scriptMode === "hindi"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <span>अ</span>
                <span>Hindi</span>
              </button>
              <button
                type="button"
                onClick={() => toggleScript("hinglish")}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                  scriptMode === "hinglish"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <span>abc</span>
                <span>Hinglish</span>
              </button>
            </div>
          </div>

          {/* Vertical 9:16 Video Canvas Box */}
          <div
            className="group relative aspect-[9/16] max-h-[58vh] w-auto overflow-hidden rounded-2xl bg-black border border-white/10 shadow-2xl cursor-pointer"
            onClick={togglePlay}
          >
            <video
              ref={videoRef}
              src={videoSrc}
              playsInline
              loop
              onTimeUpdate={handleTimeUpdate}
              className="h-full w-full object-cover"
            />

            {/* Behind-subject Live Caption Preview Overlay */}
            {activeWord && (
              <div className="pointer-events-none absolute inset-x-0 bottom-24 flex items-center justify-center text-center px-4">
                <span className="rounded-xl bg-black/70 px-4 py-2 text-2xl font-black uppercase tracking-wide text-[#fbbf24] shadow-2xl backdrop-blur-xs border border-amber-400/40">
                  {activeWord.word}
                </span>
              </div>
            )}

            {/* Play/Pause center overlay when paused */}
            {!isPlaying && (
              <div className="absolute inset-0 grid place-items-center bg-black/30 backdrop-blur-[1px] transition">
                <div className="grid size-14 place-items-center rounded-full bg-white/20 text-white shadow-xl backdrop-blur-md">
                  <Play className="size-6 ml-0.5 fill-white" />
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* 3. Bottom Interactive Word-by-Word Timeline                         */}
      {/* ------------------------------------------------------------------- */}
      <footer className="h-56 shrink-0 border-t border-white/10 bg-[#121217] flex flex-col z-30 select-none">
        {/* Transport Toolbar */}
        <div className="flex h-11 shrink-0 items-center justify-between border-b border-white/5 px-4 bg-[#141419]">
          {/* Left: Play/Pause + Timecode */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={togglePlay}
              className="grid size-8 place-items-center rounded-lg bg-white/10 text-white hover:bg-white/20 transition active:scale-95"
            >
              {isPlaying ? (
                <Pause className="size-4 fill-white" />
              ) : (
                <Play className="size-4 ml-0.5 fill-white" />
              )}
            </button>
            <div className="font-mono text-xs font-semibold text-neutral-300">
              <span className="text-white">{formatTimecode(currentTime)}</span>
              <span className="text-neutral-500"> / {formatTimecode(duration)}</span>
            </div>
          </div>

          {/* Right: Zoom controls */}
          <div className="flex items-center gap-1 text-neutral-400">
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.2))}
              className="grid size-7 place-items-center rounded-md hover:bg-white/10 hover:text-white"
              title="Zoom out"
            >
              <Minus className="size-3.5" />
            </button>
            <span className="px-1 text-[11px] font-mono">{Math.round(zoomLevel * 100)}%</span>
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.2))}
              className="grid size-7 place-items-center rounded-md hover:bg-white/10 hover:text-white"
              title="Zoom in"
            >
              <Plus className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel(1)}
              className="ml-1 rounded-md px-2 py-0.5 text-xs font-medium hover:bg-white/10 hover:text-white"
            >
              Fit
            </button>
          </div>
        </div>

        {/* Tracks Area */}
        <div className="relative flex flex-1 overflow-x-auto overflow-y-hidden bg-[#0e0e12]">
          {/* Lane Header: 🎞 A-roll */}
          <div className="sticky left-0 top-0 z-20 flex w-28 shrink-0 flex-col border-r border-white/10 bg-[#14141a] px-3 py-2">
            <div className="flex items-center justify-between text-xs font-semibold text-neutral-300">
              <span className="flex items-center gap-1.5">
                <span>🎞</span>
                <span>A-roll</span>
              </span>
              <div className="flex items-center gap-1 text-neutral-500">
                <Eye className="size-3 hover:text-neutral-300 cursor-pointer" />
                <Volume2 className="size-3 hover:text-neutral-300 cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Timeline Track Body */}
          <div
            ref={timelineTrackRef}
            onClick={handleTimelineClick}
            className="relative flex flex-1 min-w-[900px] flex-col p-2 cursor-pointer select-none"
            style={{ width: `${zoomLevel * 100}%` }}
          >
            {/* Time Ruler Marks */}
            <div className="flex h-5 border-b border-white/10 text-[10px] font-mono text-neutral-500">
              {Array.from({ length: 11 }).map((_, i) => (
                <div key={i} className="flex-1 border-l border-white/10 pl-1">
                  {i}s
                </div>
              ))}
            </div>

            {/* Draggable Vertical Red Playhead Line */}
            <div
              className="pointer-events-none absolute bottom-0 top-0 z-30 w-0.5 bg-rose-500 shadow-[0_0_8px_#f43f5e]"
              style={{
                left: `${(currentTime / Math.max(0.1, duration)) * 100}%`,
              }}
            >
              <div className="absolute -top-1 -left-1.5 size-3.5 rotate-45 rounded-xs bg-rose-500 shadow-sm" />
            </div>

            {/* Word-by-Word Chips Lane */}
            <div className="mt-3 flex flex-wrap items-center gap-1.5 px-2">
              {words.map((item, idx) => {
                const isWordActive =
                  !item.is_pause && currentTime >= item.start && currentTime <= item.end;
                const isEditing = editingIndex === idx;

                if (item.is_pause) {
                  return (
                    <span
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        seekTo(item.start);
                      }}
                      className="inline-flex items-center rounded-md border border-neutral-700/60 bg-neutral-900 px-2 py-0.5 text-[10px] font-bold text-neutral-400 transition hover:border-neutral-500 hover:text-white"
                      title="Pause"
                    >
                      ℗
                    </span>
                  );
                }

                if (isEditing) {
                  return (
                    <div
                      key={idx}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 rounded-xl border border-indigo-500 bg-[#1c1c28] p-1"
                    >
                      <input
                        type="text"
                        autoFocus
                        value={editingWordText}
                        onChange={(e) => setEditingWordText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveWordEdit(idx);
                          if (e.key === "Escape") setEditingIndex(null);
                        }}
                        className="w-20 rounded bg-black/60 px-1.5 py-0.5 text-xs font-semibold text-white outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => saveWordEdit(idx)}
                        className="rounded bg-indigo-600 px-1.5 py-0.5 text-[10px] font-bold text-white hover:bg-indigo-500"
                      >
                        <Check className="size-3" />
                      </button>
                    </div>
                  );
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      seekTo(item.start);
                    }}
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      setEditingIndex(idx);
                      setEditingWordText(item.word);
                    }}
                    className={`inline-flex items-center rounded-xl border px-3 py-1.5 text-xs font-medium transition-all ${
                      isWordActive
                        ? "border-amber-400 bg-amber-400/20 text-amber-200 font-bold shadow-[0_0_12px_rgba(251,191,36,0.35)] scale-105"
                        : "border-neutral-700/80 bg-neutral-800/90 text-neutral-200 hover:border-neutral-500 hover:bg-neutral-700"
                    }`}
                  >
                    <span>{item.word}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function StudioPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div className="h-screen w-screen bg-[#0c0c0f]" />}>
      <StudioContent params={params} />
    </Suspense>
  );
}
