"use client";

import Link from "next/link";
import { Sparkles, Check, ArrowRight } from "lucide-react";
import { PageHero } from "../_components/PageHero";
import { EditorCard } from "../_components/editor/EditorCard";
import { FaqAccordion } from "../_components/sections/FaqAccordion";
import { CtaBand } from "../_components/sections/CtaBand";

export default function TiktokCaptionGeneratorPage() {
  return (
    <main className="relative overflow-x-hidden">
      <div className="blueprint-grid pointer-events-none fixed inset-0 z-0 opacity-[0.6]" />

      <PageHero
        badge="TikTok Studio"
        title="AI TikTok Caption Generator"
        subtitle="Generate fast-paced, high-energy TikTok subtitles with emoji popups, trending color accents, and auto-synced word timings that boost FYP retention."
      />

      <section className="relative z-10 mx-auto max-w-3xl px-4 py-6 sm:px-6">
        <EditorCard />
      </section>

      <FaqAccordion />
      <CtaBand />
    </main>
  );
}
