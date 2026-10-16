"use client";

import { useState, useRef, useCallback } from "react";
import { MEDIA } from "../../_lib/media";

interface RawVsEditSliderProps {
  onSelectStyle?: (styleName: string) => void;
}

export function RawVsEditSlider({ onSelectStyle }: RawVsEditSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeStyle, setActiveStyle] = useState<"dossier" | "boldface">("dossier");
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePositionFromEvent = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(pct);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    updatePositionFromEvent(e.clientX);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    updatePositionFromEvent(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const scrollToHero = (styleName: string) => {
    if (onSelectStyle) onSelectStyle(styleName);
    const dropzone = document.getElementById("dropzone-card");
    if (dropzone) {
      dropzone.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section id="see-it" className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-24 lg:px-10">
      <div className="mx-auto grid max-w-[1120px] gap-x-12 gap-y-8 md:grid-cols-[minmax(0,1fr)_minmax(0,340px)] md:grid-rows-[auto_1fr] lg:gap-x-20">
        {/* Left Column: Heading & Description */}
        <div className="min-w-0 md:col-start-1 md:row-start-1 md:self-end text-left">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-indigo-600">
            One take · one tap
          </p>
          <h2 className="max-w-[560px] text-[34px] font-black leading-[1.04] text-slate-900 md:text-[50px] tracking-tight">
            Drop in a raw take.{" "}
            <span className="font-serif font-normal italic text-indigo-600">
              Get the edit back.
            </span>
          </h2>
          <p className="mt-5 max-w-[500px] text-base leading-7 text-slate-600 md:text-lg">
            Left is the clip as filmed. Right is the same clip after one AI Edit:
            titles pulled from its own words, B-roll cut in on the pause, and the layout
            reframed around the speaker.
          </p>
        </div>

        {/* Style Selector Tabs & Features */}
        <div className="order-3 min-w-0 md:order-none md:col-start-1 md:row-start-2 text-left">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Compare a style">
            <button
              type="button"
              onClick={() => setActiveStyle("dossier")}
              className={`inline-flex h-9 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${
                activeStyle === "dossier"
                  ? "border-slate-900 bg-slate-900 text-white shadow-xs"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
              }`}
            >
              Dossier
            </button>
            <button
              type="button"
              onClick={() => setActiveStyle("boldface")}
              className={`inline-flex h-9 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${
                activeStyle === "boldface"
                  ? "border-slate-900 bg-slate-900 text-white shadow-xs"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
              }`}
            >
              Boldface
            </button>
          </div>

          <ul className="mt-6 max-w-[440px] border-t border-slate-200">
            <li className="flex items-center justify-between gap-4 border-b border-slate-200 py-3 text-sm font-semibold text-slate-900">
              Titles from your own words
              <span className="font-mono text-xs font-medium text-slate-400">auto</span>
            </li>
            <li className="flex items-center justify-between gap-4 border-b border-slate-200 py-3 text-sm font-semibold text-slate-900">
              B-roll cut in on the pause
              <span className="font-mono text-xs font-medium text-slate-400">auto</span>
            </li>
            <li className="flex items-center justify-between gap-4 border-b border-slate-200 py-3 text-sm font-semibold text-slate-900">
              Layout reframed around you
              <span className="font-mono text-xs font-medium text-slate-400">auto</span>
            </li>
          </ul>

          <button
            type="button"
            onClick={() => scrollToHero(activeStyle === "dossier" ? "blue-muse" : "boldface")}
            className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-indigo-600 px-6 text-sm font-bold text-white transition-colors hover:bg-indigo-700 active:scale-95 shadow-md shadow-indigo-600/20"
          >
            Try {activeStyle === "dossier" ? "Dossier" : "Boldface"} on your clip →
          </button>
        </div>

        {/* Right Column: Draggable 9:16 Split Screen Comparison Video */}
        <div className="order-2 mx-auto w-full max-w-[300px] md:order-none md:col-start-2 md:row-span-2 md:row-start-1 md:max-w-none md:self-center">
          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="relative aspect-[9/16] w-full cursor-ew-resize select-none overflow-hidden rounded-[26px] bg-[#121216] shadow-[0_34px_80px_-40px_rgba(16,16,14,0.7)] ring-1 ring-black/10 [touch-action:none]"
          >
            {/* Layer 1 (Left / Underneath): Raw clip */}
            <img
              src="https://cdn.kaizynn.com/moonshot/landing/home/golden-hour-raw-3bbb094314ce-poster.jpg"
              alt="Raw unedited clip"
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />

            {/* Layer 2 (Right / Clipped): Moonshot AI Edited Clip with Behind-the-subject captions */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                clipPath: `inset(0 0 0 ${sliderPosition}%)`,
              }}
            >
              <img
                src={
                  activeStyle === "dossier"
                    ? "https://cdn.kaizynn.com/moonshot/landing/templates/archive-mix-337b70d009e3-poster.webp"
                    : "https://cdn.kaizynn.com/moonshot/landing/contentaware/golden-hour-v2-poster.jpg"
                }
                alt="Moonshot AI edited clip"
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
              />
            </div>

            {/* Badges */}
            <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-xs">
              Raw
            </span>
            <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-indigo-600 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
              Moonshot
            </span>

            {/* Draggable Divider Line & ‹› Badge */}
            <div
              className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_8px_rgba(0,0,0,0.5)]"
              style={{ left: `${sliderPosition}%` }}
              aria-hidden="true"
            >
              <div className="absolute left-1/2 top-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-xs font-black tracking-widest text-slate-900 shadow-[0_6px_20px_rgba(0,0,0,0.35)]">
                ‹›
              </div>
            </div>
          </div>

          <p className="mt-3 text-center text-xs font-medium text-slate-400">
            Drag to compare
          </p>
        </div>
      </div>
    </section>
  );
}
