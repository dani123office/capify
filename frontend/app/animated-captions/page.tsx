"use client";

import Link from "next/link";
import { Sparkles, Check, ArrowRight } from "lucide-react";
import { PageHero } from "../_components/PageHero";
import { EditorCard } from "../_components/editor/EditorCard";
import { FaqAccordion } from "../_components/sections/FaqAccordion";
import { CtaBand } from "../_components/sections/CtaBand";

export default function AnimatedCaptionsPage() {
  return (
    <main className="relative overflow-x-hidden">
      <div className="blueprint-grid pointer-events-none fixed inset-0 z-0 opacity-[0.6]" />

      <PageHero
        badge="Kinetic Text"
        title="Animated Captions for Talking-Head Videos"
        subtitle="Bring your spoken words to life with kinetic typography, color-shifting word active highlights, smooth zoom pop-ups, and auto-synced sound effects."
      />

      <section className="relative z-10 mx-auto max-w-3xl px-4 py-6 sm:px-6">
        <EditorCard />
      </section>

      <section className="relative z-10 mx-auto max-w-5xl px-4 py-16 sm:px-6 text-left">
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          How animated captions boost average watch time
        </h2>
        <p className="mt-3 text-sm text-slate-600 max-w-2xl leading-relaxed">
          Silent scrolling accounts for over 70% of initial mobile reel views. Dynamic animations
          catch the viewer’s eye immediately and hold watch-time retention all the way to the end.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Karaoke Glow", desc: "Words shift color the millisecond they are vocalized." },
            { title: "Scale Pop", desc: "Punch-ins on emotional adjectives and keywords." },
            { title: "Sound Accents", desc: "Subtle clicks and whooshes placed automatically on cuts." },
            { title: "Behind Person", desc: "Cinematic layered text that does not occlude the creator." },
          ].map((item, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <FaqAccordion />
      <CtaBand />
    </main>
  );
}
