import type { Metadata } from "next";
import { PageHero } from "../_components/PageHero";
import { TemplateGallery } from "../_components/templates/TemplateGallery";
import { CtaBand } from "../_components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Caption templates",
  description:
    "Browse 250+ designed caption templates across 14 families — Behind the Person, Spatial, AI Edits, Multiline, Dynamic, Editorial, Creators, Desi and more.",
};

export default function CaptionTemplatesPage() {
  return (
    <main className="relative overflow-x-hidden">
      <div className="blueprint-grid pointer-events-none fixed inset-0 z-0 opacity-[0.6]" />

      <PageHero
        badge="Caption templates"
        title="250+ designed caption styles"
        subtitle="Every template sets the font pairing, colour, placement and per-word motion. Pick one, then edit the words in the transcript."
      />

      <TemplateGallery />
      <CtaBand />
    </main>
  );
}
