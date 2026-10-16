"use client";

import { Check, Calendar, Share2, Sparkles } from "lucide-react";

export function PublishSection() {
  const platforms = [
    { name: "Instagram Reels", icon: "📸", tag: "Safe-zone aligned" },
    { name: "YouTube Shorts", icon: "▶️", tag: "Auto-hook titles" },
    { name: "TikTok", icon: "🎵", tag: "Trending sound sync" },
    { name: "Facebook Reels", icon: "👥", tag: "Shared scheduler" },
  ];

  return (
    <section id="publish" className="border-b border-slate-200 bg-white px-5 py-16 md:px-8 md:py-24 lg:px-10">
      <div className="mx-auto max-w-[1120px] text-left">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-indigo-600">
          Post everywhere
        </p>
        <h2 className="max-w-[720px] text-[34px] font-black leading-[1.04] text-slate-900 md:text-[50px] tracking-tight">
          Finish once.{" "}
          <span className="font-serif font-normal italic text-indigo-600">
            Post to all 4
          </span>{" "}
          on one schedule.
        </h2>
        <p className="mt-5 max-w-[620px] text-base leading-7 text-slate-600 md:text-lg">
          Connect YouTube, Instagram, Facebook and Threads once. Every export can then post to all of
          them together, or go out on one shared schedule, with a caption written for each.
        </p>

        {/* 4 Connected Platform Cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {platforms.map((p, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 bg-[#fbfaf7] p-5 shadow-2xs transition hover:border-indigo-400 hover:bg-white hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{p.icon}</span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                  <Check className="size-3.5" /> Ready
                </span>
              </div>
              <h3 className="mt-3 text-base font-bold text-slate-900">{p.name}</h3>
              <p className="mt-1 text-xs text-slate-500 font-medium">{p.tag}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
