"use client";

import { useState } from "react";

interface LanguageScript {
  id: string;
  label: string;
  headline: string;
  sampleCaption: string;
  subPhrase: string;
  fontFamily: string;
}

const LANGUAGES: LanguageScript[] = [
  {
    id: "hinglish",
    label: "Hinglish",
    headline: "Hinglish in Latin letters",
    sampleCaption: "Jo bhi tumne seekha hai wo sab bhul jao",
    subPhrase: "English letters for Hindi voice",
    fontFamily: "font-sans",
  },
  {
    id: "english",
    label: "English",
    headline: "English Standard",
    sampleCaption: "Whatever you learned in college, forget it",
    subPhrase: "Instant punctuation and auto-capitalization",
    fontFamily: "font-sans",
  },
  {
    id: "hindi",
    label: "हिन्दी",
    headline: "Devanagari Hindi",
    sampleCaption: "जो भी तुमने सीखा है वो सब भूल जाओ",
    subPhrase: "Full conjunct and matra support with Poppins Deva",
    fontFamily: "font-sans",
  },
  {
    id: "gujarati",
    label: "ગુજરાતી",
    headline: "Gujarati Script",
    sampleCaption: "તમે જે શીખ્યા છો તે બધું ભૂલી જાઓ",
    subPhrase: "Anek Gujarati with custom kinetic kerning",
    fontFamily: "font-sans",
  },
  {
    id: "bengali",
    label: "বাংলা",
    headline: "Bangla Script",
    sampleCaption: "আপনি যা শিখেছেন তা সব ভুলে যান",
    subPhrase: "Hind Siliguri and Anek Bangla font pairing",
    fontFamily: "font-sans",
  },
  {
    id: "punjabi",
    label: "ਪੰਜਾਬੀ",
    headline: "Gurmukhi Punjabi",
    sampleCaption: "ਜੋ ਵੀ ਤੁਸੀਂ ਸਿੱਖਿਆ ਹੈ ਉਹ ਸਭ ਭੁੱਲ ਜਾਓ",
    subPhrase: "Mukta Mahee with bold energetic punch-in",
    fontFamily: "font-sans",
  },
  {
    id: "tamil",
    label: "தமிழ்",
    headline: "Tamil Script",
    sampleCaption: "நீங்கள் கற்றுக்கொண்ட அனைத்தையும் மறந்துவிடுங்கள்",
    subPhrase: "Anek Tamil with automatic baseline alignment",
    fontFamily: "font-sans",
  },
  {
    id: "telugu",
    label: "తెలుగు",
    headline: "Telugu Script",
    sampleCaption: "మీరు నేర్చుకున్నదంతా మర్చిపోండి",
    subPhrase: "Anek Telugu optimized for vertical video reels",
    fontFamily: "font-sans",
  },
];

export function LanguagesSection() {
  const [activeLang, setActiveLang] = useState<string>("gujarati");
  const current = LANGUAGES.find((l) => l.id === activeLang) || LANGUAGES[3];

  return (
    <section
      id="languages"
      className="border-b border-slate-200 bg-[#fbfaf7] px-5 py-16 md:px-8 md:py-24 lg:px-10"
    >
      <div className="mx-auto grid max-w-[1120px] items-center gap-10 md:grid-cols-2 lg:gap-16">
        {/* Left Column */}
        <div className="min-w-0 text-left">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Languages
          </p>
          <h2 className="max-w-[520px] text-[34px] font-black leading-[1.04] text-slate-900 md:text-[50px] tracking-tight">
            Say it once.{" "}
            <span className="font-serif font-normal italic text-indigo-600">
              Post it in Gujarati.
            </span>
          </h2>
          <p className="mt-5 max-w-[500px] text-base leading-7 text-slate-600 md:text-lg">
            Speak English, Hindi or Hinglish. Keep Hindi in its own script or in English
            letters, or translate the captions into 21 languages in the same style.
          </p>

          {/* Language Selector Pills */}
          <div className="mt-8 flex max-w-[520px] flex-wrap gap-2">
            {LANGUAGES.map((lang) => {
              const isSelected = activeLang === lang.id;
              return (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() => setActiveLang(lang.id)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    isSelected
                      ? "border border-slate-900 bg-slate-900 text-white shadow-xs scale-105"
                      : "border border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                  }`}
                >
                  {lang.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Dynamic Script Preview Card */}
        <div className="order-2 flex justify-center">
          <div className="relative aspect-[9/16] w-full max-w-[320px] overflow-hidden rounded-[26px] bg-[#121216] p-6 text-white shadow-2xl border border-slate-800">
            <img
              src="https://cdn.kaizynn.com/moonshot/landing/contentaware/golden-hour-v2-poster.jpg"
              alt="Speaker"
              className="absolute inset-0 h-full w-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />

            {/* Top Indicator */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white">
                {current.headline}
              </span>
              <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
            </div>

            {/* Center Dynamic Glowing Native Caption */}
            <div className="relative z-10 flex h-full flex-col justify-end pb-12 text-left">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-300">
                Live Transliteration
              </span>
              <h3 className="mt-2 text-2xl sm:text-3xl font-black leading-snug text-white [text-shadow:0_4px_16px_rgba(0,0,0,0.8)]">
                {current.sampleCaption}
              </h3>
              <p className="mt-2 text-xs text-neutral-300 font-mono">
                {current.subPhrase}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
