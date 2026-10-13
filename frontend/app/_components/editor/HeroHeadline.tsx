"use client";

import { useEffect, useState } from "react";

const WORDS = ["animated.", "pop.", "spatial.", "viral.", "glow."];

export function HeroHeadline() {
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(WORDS[0].length);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = WORDS[wordIdx];
    const timer = setTimeout(
      () => {
        if (!deleting) {
          if (charIdx < current.length) {
            setCharIdx((c) => c + 1);
          } else {
            setTimeout(() => setDeleting(true), 2000);
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
      deleting ? 45 : 90,
    );
    return () => clearTimeout(timer);
  }, [charIdx, deleting, wordIdx]);

  return (
    <h1 className="mx-auto max-w-4xl text-center text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
      <span className="font-sans lowercase">make your videos </span>
      <span className="font-serif italic font-black text-[#4f46e5] bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] bg-clip-text text-transparent">
        {WORDS[wordIdx].slice(0, charIdx)}
      </span>
      <span className="caret-blink ml-0.5 inline-block h-[0.82em] w-[3.5px] translate-y-[0.08em] bg-[#4f46e5] align-middle" />
    </h1>
  );
}
