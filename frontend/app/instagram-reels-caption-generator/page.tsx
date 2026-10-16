"use client";

import Link from "next/link";
import { Sparkles, Check, ArrowRight } from "lucide-react";
import { PageHero } from "../_components/PageHero";
import { EditorCard } from "../_components/editor/EditorCard";
import { FaqAccordion } from "../_components/sections/FaqAccordion";
import { CtaBand } from "../_components/sections/CtaBand";

export default function InstagramReelsCaptionGeneratorPage() {
  return (
    <main className="relative overflow-x-hidden">
      <div className="blueprint-grid pointer-events-none fixed inset-0 z-0 opacity-[0.6]" />

      <PageHero
        badge="Instagram Reels"
        title="AI Caption Generator for Instagram Reels"
        subtitle="Auto-transcribe and format viral 9:16 vertical video captions guaranteed to fit within Instagram's safe zones without being covered by UI buttons or profile headers."
      />

      <section className="relative z-10 mx-auto max-w-3xl px-4 py-6 sm:px-6">
        <EditorCard />
      </section>

      <section className="relative z-10 mx-auto max-w-5xl px-4 py-16 sm:px-6 text-left">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl border border-indigo-200 bg-indigo-50/60 p-8">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Want to test your video safe zone first?</h3>
            <p className="mt-1 text-xs text-slate-600">
              Use our interactive free tool to preview where likes, audio labels, and comments overlay your video.
            </p>
          </div>
          <Link
            href="/instagram-reels-safe-zone"
            className="shrink-0 rounded-2xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-indigo-700 transition"
          >
            Launch Safe Zone Guide →
          </Link>
        </div>
      </section>

      <FaqAccordion />
      <CtaBand />
    </main>
  );
}
