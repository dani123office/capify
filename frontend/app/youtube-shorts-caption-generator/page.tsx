"use client";

import Link from "next/link";
import { Sparkles, Check, ArrowRight } from "lucide-react";
import { PageHero } from "../_components/PageHero";
import { EditorCard } from "../_components/editor/EditorCard";
import { FaqAccordion } from "../_components/sections/FaqAccordion";
import { CtaBand } from "../_components/sections/CtaBand";

export default function YoutubeShortsCaptionGeneratorPage() {
  return (
    <main className="relative overflow-x-hidden">
      <div className="blueprint-grid pointer-events-none fixed inset-0 z-0 opacity-[0.6]" />

      <PageHero
        badge="YouTube Shorts"
        title="AI Caption Generator for YouTube Shorts"
        subtitle="Automatic 1080p subtitle generator designed for YouTube Shorts algorithms. Adds keyword highlights, high-converting hooks, and sound effects to your talking head shorts."
      />

      <section className="relative z-10 mx-auto max-w-3xl px-4 py-6 sm:px-6">
        <EditorCard />
      </section>

      <FaqAccordion />
      <CtaBand />
    </main>
  );
}
