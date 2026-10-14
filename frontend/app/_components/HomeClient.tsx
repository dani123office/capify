"use client";

import { useState } from "react";
import { HeroHeadline } from "./editor/HeroHeadline";
import { EditorCard } from "./editor/EditorCard";
import { TemplateShowcase } from "./TemplateShowcase";
import { HowItWorks } from "./sections/HowItWorks";
import { Features } from "./sections/Features";
import { CompareStrip } from "./sections/CompareStrip";
import { FaqAccordion } from "./sections/FaqAccordion";
import { CtaBand } from "./sections/CtaBand";
import { POPULAR_TEMPLATES, type Template } from "../_lib/templates";

export function HomeClient() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(POPULAR_TEMPLATES[1] || POPULAR_TEMPLATES[0]);

  const handleSelectTemplate = (t: Template) => {
    setSelectedTemplate(t);
    // Smooth scroll up to EditorCard dropzone
    const dropzone = document.getElementById("dropzone-card");
    if (dropzone) {
      dropzone.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <main className="relative overflow-x-hidden">
      {/* Blueprint grid background */}
      <div className="blueprint-grid pointer-events-none fixed inset-0 z-0 opacity-[0.65]" />

      {/* Hero */}
      <section className="relative z-10 px-4 pb-4 pt-10 text-center sm:pt-14">
        <HeroHeadline />

        <div id="dropzone-card" className="mx-auto mt-7 max-w-3xl">
          <EditorCard
            selectedTemplate={selectedTemplate}
            onSelectTemplate={setSelectedTemplate}
          />
        </div>
      </section>

      <TemplateShowcase
        selectedId={selectedTemplate?.id}
        onSelectTemplate={handleSelectTemplate}
      />
      <HowItWorks />
      <Features />
      <CompareStrip />
      <FaqAccordion />
      <CtaBand />
    </main>
  );
}
