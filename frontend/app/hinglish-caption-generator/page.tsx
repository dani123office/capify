"use client";

import Link from "next/link";
import { Sparkles, Check, ArrowRight } from "lucide-react";
import { PageHero } from "../_components/PageHero";
import { EditorCard } from "../_components/editor/EditorCard";
import { FaqAccordion } from "../_components/sections/FaqAccordion";
import { CtaBand } from "../_components/sections/CtaBand";

export default function HinglishCaptionGeneratorPage() {
  return (
    <main className="relative overflow-x-hidden">
      <div className="blueprint-grid pointer-events-none fixed inset-0 z-0 opacity-[0.6]" />

      <PageHero
        badge="Indian Creator Studio"
        title="Hinglish Caption Generator for Reels & Shorts"
        subtitle="Speak Hindi, caption in English letters. The only AI video editor built natively for Indian creators — perfectly phonetic Hinglish transcription with 1-click Devanagari toggle."
      />

      <section className="relative z-10 mx-auto max-w-3xl px-4 py-6 sm:px-6">
        <EditorCard />
      </section>

      {/* Script Comparison Demo */}
      <section className="relative z-10 mx-auto max-w-5xl px-4 py-16 sm:px-6 text-left">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Native Dual-Script Engine
            </span>
            <h2 className="mt-2 text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              One spoken audio take. Two presentation formats.
            </h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Standard transcription engines fail on Hinglish because they try to translate into formal English or struggle with Devanagari phonetics. Capify handles both natively.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-indigo-200 bg-indigo-50/50 p-5">
              <span className="rounded-md bg-indigo-600 px-2 py-0.5 text-[10px] font-bold text-white">
                abc Hinglish (Latin Alphabet)
              </span>
              <p className="mt-3 text-lg font-black text-slate-900">
                &ldquo;Jo bhi tumne college mein sikha hai wo sab bhul jao&rdquo;
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Most popular format for Indian tech, finance, and lifestyle creators on Instagram.
              </p>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5">
              <span className="rounded-md bg-amber-600 px-2 py-0.5 text-[10px] font-bold text-white">
                अ Hindi (Devanagari Script)
              </span>
              <p className="mt-3 text-lg font-black text-slate-900">
                &ldquo;जो भी तुमने कॉलेज में सीखा है वो सब भूल जाओ&rdquo;
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Formatted with Poppins Deva and Anek font pairings with full matra and conjunct support.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FaqAccordion />
      <CtaBand />
    </main>
  );
}
