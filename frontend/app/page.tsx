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
      <section className="relative z-10 px-4 pb-4 pt-10 text-center sm:pt-14">
        <HeroHeadline />

        <div className="mx-auto mt-7 max-w-3xl">
          <EditorCard />
        </div>
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
