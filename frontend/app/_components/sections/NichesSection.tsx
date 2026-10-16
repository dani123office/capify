"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface NicheData {
  id: string;
  label: string;
  templates: {
    name: string;
    description: string;
    badge: string;
    poster: string;
  }[];
}

const NICHES: NicheData[] = [
  {
    id: "real-estate",
    label: "Real estate",
    templates: [
      {
        name: "Magenta Estate",
        description: "Bold architectural framing with luxury price callouts.",
        badge: "Tours",
        poster: "https://cdn.kaizynn.com/moonshot/landing/real-estate/magenta-estate-3541bcb5526e-poster.jpg",
      },
      {
        name: "Reach Counter",
        description: "Dynamic number roll-ups for price, square footage, and neighborhood perks.",
        badge: "Metrics",
        poster: "https://cdn.kaizynn.com/moonshot/landing/real-estate/reach-counter-7d8ceee71a96-poster.jpg",
      },
      {
        name: "Dimension Story",
        description: "Spatial 3D typography that follows camera motion down hallways.",
        badge: "Spatial",
        poster: "https://cdn.kaizynn.com/moonshot/landing/real-estate/dimension-story-ba1acfd1da9d-poster.jpg",
      },
    ],
  },
  {
    id: "coaches",
    label: "Coaches & educators",
    templates: [
      {
        name: "Blue Muse",
        description: "High-contrast karaoke highlight for tutorial and advice reels.",
        badge: "Education",
        poster: "https://cdn.kaizynn.com/moonshot/landing/templates/afterglow-mix-e0415548f933-poster.webp",
      },
      {
        name: "Headliner",
        description: "Punchy, authoritative typography with big bold hooks.",
        badge: "Viral",
        poster: "https://cdn.kaizynn.com/moonshot/landing/contentaware/ca-cutout-1ee462e5c02a-poster.jpg",
      },
      {
        name: "Multiline Aura",
        description: "Whole sentences displayed ahead of time for high lecture retention.",
        badge: "Lecture",
        poster: "https://cdn.kaizynn.com/moonshot/landing/multiline/ml-aura-061aa4b4fa90-poster.jpg",
      },
    ],
  },
  {
    id: "finance",
    label: "Finance & crypto",
    templates: [
      {
        name: "Ticker Green",
        description: "Bullish accents, chart zoom-ins, and currency auto-formatting.",
        badge: "Markets",
        poster: "https://cdn.kaizynn.com/moonshot/landing/contentaware/ghostline-v2-poster.jpg",
      },
      {
        name: "Deep Value",
        description: "Conservative, credible Swiss typeface for investment breakdowns.",
        badge: "Wealth",
        poster: "https://cdn.kaizynn.com/moonshot/landing/templates/archive-mix-337b70d009e3-poster.webp",
      },
      {
        name: "Neon Bull",
        description: "High-energy glow effects for breaking market alerts.",
        badge: "Crypto",
        poster: "https://cdn.kaizynn.com/moonshot/landing/real-estate/dimension-story-ba1acfd1da9d-poster.jpg",
      },
    ],
  },
  {
    id: "podcasters",
    label: "Podcasters & talkers",
    templates: [
      {
        name: "Dual Mic",
        description: "Speaker detection switching caption colors per guest automatically.",
        badge: "Dialogue",
        poster: "https://cdn.kaizynn.com/moonshot/landing/contentaware/golden-hour-v2-poster.jpg",
      },
      {
        name: "Story Wave",
        description: "Subtle animated waveform overlay keeping audio-only clips engaging.",
        badge: "Audio clip",
        poster: "https://cdn.kaizynn.com/moonshot/landing/home/broll-sketching-0aa5408eccae-poster.jpg",
      },
      {
        name: "Podcast Bold",
        description: "Fast-cadence single-word popups for funny podcast punchlines.",
        badge: "Humor",
        poster: "https://cdn.kaizynn.com/moonshot/landing/real-estate/reach-counter-7d8ceee71a96-poster.jpg",
      },
    ],
  },
];

export function NichesSection() {
  const [activeTab, setActiveTab] = useState("real-estate");
  const currentNiche = NICHES.find((n) => n.id === activeTab) || NICHES[0];

  return (
    <section id="niches" className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-24 lg:px-10">
      <div className="mx-auto max-w-[1120px] text-left">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-indigo-600">
          Use cases
        </p>
        <h2 className="max-w-[720px] text-[34px] font-black leading-[1.04] text-slate-900 md:text-[50px] tracking-tight">
          Pick your niche.{" "}
          <span className="font-serif font-normal italic text-indigo-600">
            Start from its templates.
          </span>
        </h2>

        {/* Tab Pills */}
        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Niches">
          {NICHES.map((niche) => (
            <button
              key={niche.id}
              type="button"
              role="tab"
              aria-selected={activeTab === niche.id}
              onClick={() => setActiveTab(niche.id)}
              className={`inline-flex h-10 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${
                activeTab === niche.id
                  ? "border-slate-900 bg-slate-900 text-white shadow-xs"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
              }`}
            >
              {niche.label}
            </button>
          ))}
        </div>

        {/* 3 Template Cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {currentNiche.templates.map((tpl, i) => (
            <div
              key={i}
              className="group overflow-hidden rounded-[22px] border border-slate-200/90 bg-white shadow-xs transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg"
            >
              <div className="relative aspect-[9/16] max-h-[360px] w-full overflow-hidden bg-black">
                <img
                  src={tpl.poster}
                  alt={tpl.name}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-xs">
                  {tpl.badge}
                </span>
              </div>
              <div className="p-5 text-left">
                <h3 className="text-base font-bold text-slate-900">{tpl.name}</h3>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                  {tpl.description}
                </p>
                <Link
                  href="/caption-templates"
                  className="mt-3.5 inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800"
                >
                  Use this template <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
