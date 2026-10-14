"use client";

import { useEffect, useState } from "react";

const WORDS = [
  {
    text: "pop.",
    lang: "en",
    fontFamily: '"Bangers", "Arial Black", sans-serif',
    className: "-rotate-1 bg-[#dfff3f] px-[0.09em] text-slate-900 shadow-xs",
    style: { letterSpacing: "0.015em" },
  },
  {
    text: "viral.",
    lang: "en",
    fontFamily: '"Archivo Black", "Arial Black", sans-serif',
    className: "text-transparent [-webkit-text-stroke:0.035em_#4338ca]",
    style: { letterSpacing: "-0.045em" },
  },
  {
    text: "animated.",
    lang: "en",
    fontFamily: '"Black Han Sans", Inter, sans-serif',
    className: "skew-x-[-7deg] text-[#4338ca]",
    style: { fontWeight: 700, letterSpacing: "-0.055em" },
  },
  {
    text: "mejor.",
    lang: "es",
    fontFamily: '"Sour Gummy", Inter, sans-serif',
    className:
      "text-slate-900 underline decoration-[#4338ca] decoration-[0.075em] underline-offset-[0.06em]",
    style: { fontWeight: 700, letterSpacing: "-0.035em" },
  },
  {
    text: "animé.",
    lang: "fr",
    fontFamily: '"Playfair Display", Georgia, serif',
    className: "text-[#4338ca] [text-shadow:0.045em_0.045em_0_#c7d2fe]",
    style: { fontStyle: "italic", fontWeight: 700, letterSpacing: "-0.045em" },
  },
  {
    text: "parfait.",
    lang: "fr",
    fontFamily: '"Lacquer", "Arial Black", sans-serif',
    className: "text-[#4338ca]",
    style: { letterSpacing: "-0.025em" },
  },
];

export function HeroHeadline() {
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(WORDS[0].text.length);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = WORDS[wordIdx].text;
    const timer = setTimeout(
      () => {
        if (!deleting) {
          if (charIdx < current.length) {
            setCharIdx((c) => c + 1);
          } else {
            setTimeout(() => setDeleting(true), 2200);
          }
        } else {
          if (charIdx > 0) {
            setCharIdx((c) => c - 1);
          } else {
            setDeleting(false);
            setWordIdx((w) => (w + 1) % WORDS.length);
          }
        }
      },
      deleting ? 50 : 100,
    );
    return () => clearTimeout(timer);
  }, [charIdx, deleting, wordIdx]);

  const active = WORDS[wordIdx];
  const displayed = active.text.slice(0, charIdx);

  return (
    <h1 className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
      <span className="font-sans font-semibold lowercase tracking-tight">
        make your videos
      </span>
      <span className="inline-grid place-items-start align-baseline normal-case">
        <span
          lang={active.lang}
          className={`inline-flex items-baseline whitespace-nowrap leading-none transition-all ${active.className}`}
          style={{ ...active.style, fontFamily: active.fontFamily }}
        >
          <span>{displayed}</span>
          <span className="caret-blink ml-[0.045em] inline-block h-[0.76em] w-[0.04em] translate-y-[0.05em] bg-current" />
        </span>
      </span>
    </h1>
  );
}
