"use client";

import Link from "next/link";
import { Sparkles, Check, ArrowRight } from "lucide-react";
import { PageHero } from "../_components/PageHero";
import { EditorCard } from "../_components/editor/EditorCard";
import { FaqAccordion } from "../_components/sections/FaqAccordion";
import { CtaBand } from "../_components/sections/CtaBand";

export default function AiCaptionGeneratorPage() {
  return (
    <main className="relative overflow-x-hidden">
      <div className="blueprint-grid pointer-events-none fixed inset-0 z-0 opacity-[0.6]" />

      <PageHero
        badge="Free AI Generator"
        title="AI Caption Generator for Videos"
        subtitle="Automatically generate word-by-word animated captions for your short-form video. Supports 98+ languages with 99.4% speech accuracy and behind-the-subject depth."
      />

      <section className="relative z-10 mx-auto max-w-3xl px-4 py-6 sm:px-6">
        <EditorCard />
      </section>

      {/* Feature Value Prop */}
      <section className="relative z-10 mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm">
            <span className="flex size-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 font-bold">
              01
            </span>
            <h3 className="mt-4 text-base font-bold text-slate-900">Whisper Word Timing</h3>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
              Every single word is synced down to the millisecond so the word being spoken lights up right on cue.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm">
            <span className="flex size-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 font-bold">
              02
            </span>
            <h3 className="mt-4 text-base font-bold text-slate-900">Behind Subject Depth</h3>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
              AI separates the speaker from the background in real-time, placing large text cleanly behind the head.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm">
            <span className="flex size-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 font-bold">
              03
            </span>
            <h3 className="mt-4 text-base font-bold text-slate-900">252+ Caption Styles</h3>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
              Karaoke highlights, bold neon popups, minimalist editorial, and multilingual Indian font pairings.
            </p>
          </div>
        </div>
      </section>

      <FaqAccordion />
      <CtaBand />
    </main>
  );
}
