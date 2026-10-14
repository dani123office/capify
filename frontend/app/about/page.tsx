import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "../_components/PageHero";
import { CtaBand } from "../_components/sections/CtaBand";
import { CheckCircle2, Sparkles, Video, Users, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "About Capify",
  description: "The AI video editor built specifically for short-form creators, marketers, and storytellers.",
};

export default function AboutPage() {
  return (
    <main className="relative overflow-x-hidden">
      <div className="blueprint-grid pointer-events-none fixed inset-0 z-0 opacity-[0.6]" />

      <PageHero
        badge="Company"
        title="Making pro video edits accessible to every creator"
        subtitle="Capify was built to remove the friction of editing vertical videos. We combine deep learning, typography, and motion design so you can publish stunning Reels, TikToks, and Shorts without touching a timeline."
      />

      <section className="relative z-10 mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div className="space-y-12">
          {/* Mission */}
          <div className="rounded-3xl border border-slate-200/90 bg-white p-8 shadow-sm">
            <h2 className="font-serif text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Why we built Capify
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600">
              Editing short-form video used to require multiple bloated desktop tools: Premiere Pro for cuts, After Effects for 3D text tracking behind people, Photoshop for thumbnails, and third-party subtitle auto-generators.
            </p>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">
              We asked a simple question: What if raw footage went in, and a polished, styled video came out immediately — rendered with professional typography, animated word highlights, and depth segmentation in under 60 seconds?
            </p>
          </div>

          {/* Pillars */}
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <Zap className="h-6 w-6 text-[#4F46E5]" />
              <h3 className="mt-4 text-base font-bold text-slate-900">Zero Learning Curve</h3>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                No complex timelines or keyframing. Just upload your video, pick a style, and your transcript is your editor.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <Sparkles className="h-6 w-6 text-[#4F46E5]" />
              <h3 className="mt-4 text-base font-bold text-slate-900">Studio Typography</h3>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                Crafted font pairings and motion curves modeled directly after top viral creators like Alex Hormozi and Ali Abdaal.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <Video className="h-6 w-6 text-[#4F46E5]" />
              <h3 className="mt-4 text-base font-bold text-slate-900">Spatial Depth</h3>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                Real-time human body segmentation allows captions to float naturally behind the speaker for an ultra-premium look.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
