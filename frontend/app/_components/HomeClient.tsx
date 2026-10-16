"use client";

import { useState } from "react";
import { HeroHeadline } from "./editor/HeroHeadline";
import { EditorCard } from "./editor/EditorCard";
import { TemplateShowcase } from "./TemplateShowcase";
import { RawVsEditSlider } from "./sections/RawVsEditSlider";
import { SixLayersSection } from "./sections/SixLayersSection";
import { SignatureStylesSection } from "./sections/SignatureStylesSection";
import { NichesSection } from "./sections/NichesSection";
import { LanguagesSection } from "./sections/LanguagesSection";
import { PublishSection } from "./sections/PublishSection";
import { Features } from "./sections/Features";
import { CompareStrip } from "./sections/CompareStrip";
import { PricingTables } from "./pricing/PricingTables";
import { FaqAccordion } from "./sections/FaqAccordion";
import { CtaBand } from "./sections/CtaBand";
import { POPULAR_TEMPLATES, TEMPLATES, type Template } from "../_lib/templates";

export function HomeClient() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(
    POPULAR_TEMPLATES.find((t) => t.id === "blue-muse") || POPULAR_TEMPLATES[0]
  );

  const handleSelectTemplate = (t: Template) => {
    setSelectedTemplate(t);
    const dropzone = document.getElementById("dropzone-card");
    if (dropzone) {
      dropzone.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleSelectByName = (name: string) => {
    const found =
      TEMPLATES.find((t) => t.name.toLowerCase().includes(name.toLowerCase())) ||
      TEMPLATES.find((t) => t.id.toLowerCase().includes(name.toLowerCase()));
    if (found) {
      handleSelectTemplate(found);
    }
  };

  return (
    <main className="relative overflow-x-hidden">
      {/* Blueprint grid background */}
      <div className="blueprint-grid pointer-events-none fixed inset-0 z-0 opacity-[0.65]" />

      {/* 1. Hero / Upload Section (id="upload") */}
      <section id="upload" className="relative z-10 px-4 pb-4 pt-10 text-center sm:pt-14">
        <HeroHeadline />

        <div id="dropzone-card" className="mx-auto mt-7 max-w-3xl">
          <EditorCard
            selectedTemplate={selectedTemplate}
            onSelectTemplate={setSelectedTemplate}
          />
        </div>
      </section>

      {/* 2. Template Categories Carousel (Popular, AI Edits, Real Estate, Behind the Person, etc.) */}
      <TemplateShowcase
        selectedId={selectedTemplate?.id}
        onSelectTemplate={handleSelectTemplate}
      />

      {/* 3. Raw vs AI Edit Interactive Split-Screen Slider (id="see-it") */}
      <RawVsEditSlider onSelectStyle={handleSelectByName} />

      {/* 4. One upload. Six layers of editing. (id="how-it-works") */}
      <SixLayersSection />

      {/* 5. Beyond Captions: Signature Styles Dark Bento (id="signature-styles") */}
      <SignatureStylesSection />

      {/* 6. Use Cases by Niche (id="niches") */}
      <NichesSection />

      {/* 7. Languages: Indian & Global Multilingual Engine (id="languages") */}
      <LanguagesSection />

      {/* 8. Post Everywhere: 4-Platform Scheduler (id="publish") */}
      <PublishSection />

      {/* 9. Feature Breakdown */}
      <Features />

      {/* 10. Compare Strip */}
      <CompareStrip />

      {/* 11. Pricing Section (id="pricing") */}
      <section id="pricing" className="border-b border-slate-200 bg-[#fbfaf7] px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Simple Pricing
          </p>
          <h2 className="mt-2 text-3xl font-black text-slate-900 sm:text-5xl">
            Pick the plan for your output
          </h2>
          <p className="mt-3 text-slate-500 text-sm">
            Start free. Upgrade when you need unlimited 4K exports and AI voiceover.
          </p>
          <div className="mt-10">
            <PricingTables />
          </div>
        </div>
      </section>

      {/* 12. FAQ Section (id="faq") */}
      <FaqAccordion />

      {/* 13. Dark CTA Band */}
      <CtaBand />
    </main>
  );
}
