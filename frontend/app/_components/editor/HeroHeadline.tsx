"use client";

import { useEffect, useState } from "react";

const PHRASES = ["videos", "reels", "podcasts", "stories"];

export function HeroHeadline() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(PHRASES[0].length);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = PHRASES[phraseIdx];
    const timer = setTimeout(
      () => {
        if (!deleting) {
          if (charIdx < current.length) setCharIdx(charIdx + 1);
          else setTimeout(() => setDeleting(true), 1500);
        } else {
          if (charIdx > 0) setCharIdx(charIdx - 1);
          else {
            setDeleting(false);
            setPhraseIdx((phraseIdx + 1) % PHRASES.length);
          }
        }
      },
      deleting ? 45 : 95,
    );
    return () => clearTimeout(timer);
  }, [charIdx, deleting, phraseIdx]);

  return (
    <h1 className="font-serif text-4xl tracking-tight text-slate-950 sm:text-5xl md:text-6xl">
      make your {PHRASES[phraseIdx].slice(0, charIdx)}
      <span className="caret-blink ml-1.5 inline-block h-[1em] w-[3px] translate-y-[0.1em] bg-brand align-middle" />
    </h1>
  );
}
