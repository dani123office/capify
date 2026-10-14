"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { TEMPLATES, POPULAR_TEMPLATES, TEMPLATE_FAMILIES, type Template } from "../_lib/templates";
import { TemplateCard } from "./templates/TemplateCard";

const FAMILY_BY_TAB: Record<string, Template["family"]> = {
  behind_person: "Behind the Person",
  real_estate: "Behind the Person",
  spatial: "Spatial",
  ai_edits: "AI Edits",
  multiline: "Multiline",
  dynamic: "Dynamic",
  editorial: "Editorial",
  creators: "Creators",
  desi: "Desi",
  social: "Social",
};

const FAMILY_COPY: Record<string, string> = {
  popular: "Community favourites, trending styles, and something worth trying.",
  real_estate: "Clean styles and property tours with subtle spatial tracking.",
  behind_person: "Words locked behind the speaker for a layered depth look.",
  spatial: "3D spatial text that pushes and pulls with the beat.",
  ai_edits: "One-click edits that cut the clip to the caption rhythm.",
  multiline: "Stacked, multi-line layouts built for longer sentences.",
  dynamic: "Karaoke flips, glows and kinetic squash-and-stretch.",
  editorial: "High-fashion serif stacks and magazine treatments.",
  creators: "Warm cinematic looks tuned for talking heads.",
  desi: "Hinglish and Indic styles with native-script font pairings.",
  social: "Box highlights and clean styles that read at small sizes.",
};

export function TemplateShowcase({
  initial = "popular",
  selectedId,
  onSelectTemplate,
}: {
  initial?: string;
  selectedId?: string;
  onSelectTemplate?: (t: Template) => void;
}) {
  const [family, setFamily] = useState(initial);
  const [internalSelected, setInternalSelected] = useState<string>("blue-muse");
  const selected = selectedId || internalSelected;

  const handleSelect = (t: Template) => {
    setInternalSelected(t.id);
    if (onSelectTemplate) {
      onSelectTemplate(t);
    }
  };

  const list =
    family === "popular"
      ? POPULAR_TEMPLATES
      : TEMPLATES.filter((t) => t.family === FAMILY_BY_TAB[family]);

  return (
    <section id="templates" className="relative z-10 mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <div className="no-scrollbar flex items-center justify-between gap-4 overflow-x-auto border-t border-slate-200/80 pb-4 pt-6">
        <div className="flex items-center gap-6 sm:gap-8">
          {TEMPLATE_FAMILIES.map((cat) => {
            const isActive = family === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFamily(cat.id)}
                className={`relative flex items-center gap-1.5 whitespace-nowrap pb-2 text-sm font-bold transition ${
                  isActive
                    ? "border-b-2 border-brand text-brand"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {cat.label}
                <span className="rounded bg-brand-100 px-1.5 py-0.5 text-[9px] font-black text-brand">
                  {cat.badge}
                </span>
              </button>
            );
          })}
        </div>
        <button
          type="button"
          className="flex shrink-0 items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          abc <ChevronDown className="h-3 w-3" />
        </button>
      </div>

      <div className="mb-6 mt-4 flex items-center gap-2">
        <span className="text-xs font-bold capitalize text-slate-900">
          {family.replace(/_/g, " ")}
        </span>
        <span className="rounded bg-brand-100 px-1.5 py-0.5 text-[9px] font-black text-brand">
          AI
        </span>
        <span className="ml-1 text-xs text-slate-400">{FAMILY_COPY[family]}</span>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4">
        {list.map((card) => (
          <TemplateCard
            key={card.id}
            template={card}
            selected={selected === card.id}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </section>
  );
}
