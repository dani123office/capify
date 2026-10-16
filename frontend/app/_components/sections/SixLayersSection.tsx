"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

interface Layer {
  id: string;
  name: string;
  description: string;
  meta: string;
  color: string;
}

const LAYERS: Layer[] = [
  {
    id: "captions",
    name: "Captions",
    description: "Every word timed, the one you're saying lit up.",
    meta: "252 styles",
    color: "#4F46E5",
  },
  {
    id: "broll",
    name: "B-roll",
    description: "Cutaways matched to what you say, as a split, a card or behind you.",
    meta: "14 layouts",
    color: "#0F8B8D",
  },
  {
    id: "zooms",
    name: "Zooms",
    description: "Punch-ins on the lines that matter, so one camera still feels cut.",
    meta: "auto",
    color: "#D08A00",
  },
  {
    id: "sfx",
    name: "Sound effects",
    description: "Whooshes and pops, placed on the cut.",
    meta: "1404 sounds",
    color: "#DB2777",
  },
  {
    id: "music",
    name: "Music",
    description: "A track picked for the mood and tempo of what you say.",
    meta: "135 tracks",
    color: "#7C3AED",
  },
  {
    id: "audio",
    name: "Clean audio",
    description: "Removes hum, hiss and room echo so the voice sits up front.",
    meta: "auto",
    color: "#16A34A",
  },
];

export function SixLayersSection() {
  const [activeLayers, setActiveLayers] = useState<Record<string, boolean>>({
    captions: true,
    broll: true,
    zooms: true,
    sfx: true,
    music: true,
    audio: true,
  });

  const toggleLayer = (id: string) => {
    setActiveLayers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const watchItBuildAgain = async () => {
    // Turn all off
    setActiveLayers({
      captions: false,
      broll: false,
      zooms: false,
      sfx: false,
      music: false,
      audio: false,
    });

    const keys = ["audio", "zooms", "broll", "sfx", "music", "captions"];
    for (let i = 0; i < keys.length; i++) {
      await new Promise((res) => setTimeout(res, 350));
      setActiveLayers((prev) => ({ ...prev, [keys[i]]: true }));
    }
  };

  return (
    <section
      id="how-it-works"
      className="border-b border-slate-200 bg-[#fbfaf7] px-5 py-16 md:px-8 md:py-24 lg:px-10"
    >
      <div className="mx-auto grid max-w-[1120px] gap-x-10 gap-y-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:grid-rows-[auto_1fr] lg:gap-x-16">
        {/* Left Header */}
        <div className="min-w-0 md:col-start-1 md:row-start-1 text-left">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-indigo-600">
            What Moonshot adds
          </p>
          <h2 className="max-w-[520px] text-[34px] font-black leading-[1.04] text-slate-900 md:text-[50px] tracking-tight">
            One upload.{" "}
            <span className="font-serif font-normal italic text-indigo-600">
              Six layers
            </span>{" "}
            of editing.
          </h2>
          <p className="mt-5 max-w-[460px] text-base leading-7 text-slate-600">
            Watch each layer land on the raw take, then switch any of them off to see what it adds.
          </p>
        </div>

        {/* 6 Layer Switches */}
        <div className="order-3 min-w-0 md:order-none md:col-start-1 md:row-start-2 text-left">
          <ul className="grid gap-2">
            {LAYERS.map((layer) => {
              const isOn = activeLayers[layer.id];
              return (
                <li key={layer.id}>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={isOn}
                    onClick={() => toggleLayer(layer.id)}
                    className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 rounded-xl border border-slate-200/90 bg-white px-3.5 py-3 text-left transition hover:border-slate-300 shadow-2xs"
                  >
                    {/* iOS style toggle switch */}
                    <span
                      className="relative h-5 w-9 shrink-0 rounded-full transition-colors"
                      style={{ background: isOn ? layer.color : "#d1d5db" }}
                      aria-hidden="true"
                    >
                      <span
                        className={`absolute top-0.5 size-4 rounded-full bg-white shadow-xs transition-[left] duration-200 ${
                          isOn ? "left-[18px]" : "left-[2px]"
                        }`}
                      />
                    </span>

                    <span className="min-w-0">
                      <span className="block text-[15px] font-extrabold text-slate-900">
                        {layer.name}
                      </span>
                      <span className="block text-[13px] leading-5 text-slate-500">
                        {layer.description}
                      </span>
                    </span>

                    <span className="font-mono text-xs font-semibold text-indigo-600">
                      {layer.meta}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-5">
            <button
              type="button"
              onClick={watchItBuildAgain}
              className="inline-flex h-10 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-2xs transition hover:border-slate-400 hover:text-slate-900 active:scale-95"
            >
              <Sparkles className="size-3.5 text-amber-500" />
              Watch it build again
            </button>
          </div>
        </div>

        {/* Right: 3D Exploded Layer Stack Illustration */}
        <div
          className="order-2 min-w-0 md:order-none md:col-start-2 md:row-span-2 md:row-start-1 md:self-center"
          aria-hidden="true"
        >
          <div className="relative mx-auto flex h-[520px] w-full max-w-[340px] items-center justify-center [perspective:1200px]">
            {/* The 3D tilted container */}
            <div
              className="relative size-64 transition-transform duration-700 sm:size-72"
              style={{
                transform: "rotateX(48deg) rotateZ(-26deg)",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Floor Shadow */}
              <div
                className="absolute inset-x-0 -bottom-10 h-32 rounded-full bg-slate-900/10 blur-xl"
                style={{ transform: "translateZ(-40px)" }}
              />

              {/* Plane 0: Raw Take */}
              <div
                className="absolute inset-0 overflow-hidden rounded-2xl border border-slate-300 bg-[#121216] shadow-xl"
                style={{ transform: "translateZ(0px)" }}
              >
                <img
                  src="https://cdn.kaizynn.com/moonshot/landing/home/golden-hour-raw-3bbb094314ce-poster.jpg"
                  alt="Raw take"
                  className="h-full w-full object-cover"
                />
                <span className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-0.5 text-[10px] font-bold text-white">
                  Raw take
                </span>
              </div>

              {/* Plane 1: Zooms */}
              {activeLayers.zooms && (
                <div
                  className="absolute inset-0 rounded-2xl border-2 border-dashed border-[#D08A00]/70 bg-amber-500/10 backdrop-blur-[1px] transition-all duration-300"
                  style={{ transform: "translateZ(45px)" }}
                >
                  <span className="absolute right-2 top-2 rounded bg-[#D08A00] px-1.5 py-0.5 text-[9px] font-bold text-white">
                    1.14× Zoom
                  </span>
                </div>
              )}

              {/* Plane 2: B-roll */}
              {activeLayers.broll && (
                <div
                  className="absolute inset-x-2 top-2 h-1/2 overflow-hidden rounded-xl border border-[#0F8B8D]/80 bg-[#0F8B8D]/20 shadow-lg backdrop-blur-xs transition-all duration-300"
                  style={{ transform: "translateZ(90px)" }}
                >
                  <img
                    src="https://cdn.kaizynn.com/moonshot/landing/home/broll-coffee-0a1f67cab983-poster.jpg"
                    alt="B-roll insert"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute bottom-1 left-2 rounded bg-[#0F8B8D] px-1.5 py-0.5 text-[9px] font-bold text-white">
                    B-roll card
                  </span>
                </div>
              )}

              {/* Plane 3: Captions */}
              {activeLayers.captions && (
                <div
                  className="absolute inset-0 flex items-center justify-center rounded-2xl border border-indigo-400/60 bg-indigo-900/15 backdrop-blur-[1px] transition-all duration-300"
                  style={{ transform: "translateZ(135px)" }}
                >
                  <span className="rounded-xl bg-black/75 px-3 py-1.5 text-base font-black uppercase tracking-tight text-white shadow-2xl border border-indigo-400/40">
                    when you <span className="text-[#F4D774]">force</span> them
                  </span>
                  <span className="absolute bottom-2 left-2 rounded bg-indigo-600 px-1.5 py-0.5 text-[9px] font-bold text-white">
                    Captions
                  </span>
                </div>
              )}

              {/* Plane 4: Clean Audio / Music */}
              {(activeLayers.audio || activeLayers.music) && (
                <div
                  className="absolute inset-x-4 bottom-2 flex h-8 items-center justify-center gap-1 rounded-lg border border-emerald-400/50 bg-emerald-950/40 backdrop-blur-xs transition-all duration-300"
                  style={{ transform: "translateZ(175px)" }}
                >
                  {[30, 60, 45, 90, 75, 40, 80, 50, 70, 35, 85, 60].map((h, i) => (
                    <span
                      key={i}
                      className="w-1 rounded-full bg-emerald-400 transition-all duration-300"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                  <span className="absolute -top-3 left-2 rounded bg-emerald-600 px-1.5 py-0.5 text-[8px] font-bold text-white">
                    Clean audio
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
