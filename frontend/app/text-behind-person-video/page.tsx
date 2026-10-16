"use client";

import Link from "next/link";
import { Sparkles, Check, ArrowRight } from "lucide-react";
import { PageHero } from "../_components/PageHero";
import { EditorCard } from "../_components/editor/EditorCard";
import { FaqAccordion } from "../_components/sections/FaqAccordion";
import { CtaBand } from "../_components/sections/CtaBand";

export default function TextBehindPersonVideoPage() {
  return (
    <main className="relative overflow-x-hidden">
      <div className="blueprint-grid pointer-events-none fixed inset-0 z-0 opacity-[0.6]" />

      <PageHero
        badge="Depth Segmentation"
        title="Put Text Behind Person in Video Automatically"
        subtitle="No Adobe Premiere rotoscoping. No green screens. Upload your raw talking head clip and Capify's AI separates the subject from the background, placing animated 3D text behind you in seconds."
      />

      <section className="relative z-10 mx-auto max-w-3xl px-4 py-6 sm:px-6">
        <EditorCard />
      </section>

      <section className="relative z-10 mx-auto max-w-5xl px-4 py-16 sm:px-6 text-left">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900">01. Automatic Subject Detection</h3>
            <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
              MediaPipe neural depth networks track hair strands, hand gestures, and body contours in full 1080p resolution.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900">02. Temporal Mask Smoothing</h3>
            <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
              Optical flow stabilization prevents flickering or jittery edges around the speaker’s shoulders.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900">03. 100% Browser + Local Render</h3>
            <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
              Export high-bitrate MP4 with zero quality compression ready for direct upload to TikTok and Reels.
            </p>
          </div>
        </div>
      </section>

      <FaqAccordion />
      <CtaBand />
    </main>
  );
}
