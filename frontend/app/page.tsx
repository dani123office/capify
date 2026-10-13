import { HeroHeadline } from "./_components/editor/HeroHeadline";
import { EditorCard } from "./_components/editor/EditorCard";
import { TemplateShowcase } from "./_components/TemplateShowcase";
import { HowItWorks } from "./_components/sections/HowItWorks";
import { Features } from "./_components/sections/Features";
import { CompareStrip } from "./_components/sections/CompareStrip";
import { FaqAccordion } from "./_components/sections/FaqAccordion";
import { CtaBand } from "./_components/sections/CtaBand";

const STATS = [
  { value: "230+", label: "Caption templates" },
  { value: "14", label: "Template families" },
  { value: "85+", label: "Bundled fonts" },
  { value: "9:16", label: "1080×1920 export" },
];

export default function HomePage() {
  return (
    <main className="relative overflow-x-hidden">
      {/* Blueprint grid background */}
      <div className="blueprint-grid pointer-events-none fixed inset-0 z-0 opacity-[0.65]" />

      {/* Hero */}
      <section className="relative z-10 px-4 pb-10 pt-12 text-center">
        <HeroHeadline />
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base">
          Upload a raw clip and Capify edits it like a pro — captions, hook, music and
          cover for Reels, TikTok and Shorts. Then fine-tune anything.
        </p>

        <div className="mx-auto mt-9 max-w-3xl">
          <EditorCard />
        </div>

        <dl className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-slate-200/80 bg-white/70 px-4 py-3 backdrop-blur"
            >
              <dt className="font-serif text-2xl text-slate-900">{s.value}</dt>
              <dd className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <TemplateShowcase />
      <HowItWorks />
      <Features />
      <CompareStrip />
      <FaqAccordion />
      <CtaBand />
    </main>
  );
}
