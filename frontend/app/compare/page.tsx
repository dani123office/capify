import type { Metadata } from "next";
import { PageHero } from "../_components/PageHero";
import { CtaBand } from "../_components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Compare",
  description:
    "How Capify compares with Captions.ai, Submagic, OpusClip and CapCut — including where each tool is genuinely stronger.",
};

type Comparison = {
  id: string;
  name: string;
  blurb: string;
  rows: { feature: string; capify: string; them: string }[];
};

const COMPARISONS: Comparison[] = [
  {
    id: "captions-ai",
    name: "Captions.ai",
    blurb:
      "Both are AI-first editors for talking-head video. Capify packages the whole post and adds behind-the-subject depth.",
    rows: [
      { feature: "Behind-the-subject captions", capify: "Yes (Pro)", them: "Add-on" },
      { feature: "Hook + cover generation", capify: "Included", them: "Partial" },
      { feature: "Browser editor", capify: "Yes", them: "Yes" },
      { feature: "Free tier", capify: "Preview + 5 min", them: "Limited" },
    ],
  },
  {
    id: "submagic",
    name: "Submagic",
    blurb:
      "Submagic is strong on stock B-roll and a very large template catalogue. Capify competes on cost and depth looks.",
    rows: [
      { feature: "Template catalogue", capify: "250+ across 14 families", them: "Very large" },
      { feature: "Stock B-roll library", capify: "AI backgrounds (Pro)", them: "Extensive" },
      { feature: "Entry price", capify: "From $3/week", them: "Higher" },
      { feature: "Text behind subject", capify: "Yes (Pro)", them: "—" },
    ],
  },
  {
    id: "opusclip",
    name: "OpusClip",
    blurb:
      "OpusClip specialises in slicing long videos into many clips. Capify finishes the one short you already have.",
    rows: [
      { feature: "Long-to-many clipping", capify: "—", them: "Core strength" },
      { feature: "Single short polish", capify: "Core strength", them: "Secondary" },
      { feature: "Transcript-first editing", capify: "Yes", them: "Limited" },
      { feature: "Behind-the-subject", capify: "Yes (Pro)", them: "—" },
    ],
  },
  {
    id: "capcut",
    name: "CapCut",
    blurb:
      "CapCut is a full timeline editor with a mobile-first workflow. Capify removes the timeline entirely.",
    rows: [
      { feature: "Timeline editing", capify: "None by design", them: "Full" },
      { feature: "Browser only", capify: "Yes", them: "Mostly desktop/mobile app" },
      { feature: "AI caption styling", capify: "250+ templates", them: "Basic presets" },
      { feature: "Learning curve", capify: "Minutes", them: "Steeper" },
    ],
  },
];

export default function ComparePage() {
  return (
    <main className="relative overflow-x-hidden">
      <div className="blueprint-grid pointer-events-none fixed inset-0 z-0 opacity-[0.6]" />

      <PageHero
        badge="Compare"
        title="How Capify stacks up"
        subtitle="We list where each tool is genuinely stronger. No vendor copy, no exaggeration — just the trade-offs."
      />

      <div className="relative z-10 mx-auto max-w-5xl space-y-16 px-4 py-16 sm:px-6">
        {COMPARISONS.map((c) => (
          <section key={c.id} id={c.id} className="scroll-mt-24">
            <h2 className="font-serif text-2xl tracking-tight text-slate-950 sm:text-3xl">
              Capify vs {c.name}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500">
              {c.blurb}
            </p>

            <div className="mt-6 overflow-x-auto rounded-3xl border border-slate-200 shadow-sm">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-4">Feature</th>
                    <th className="px-5 py-4 text-brand">Capify</th>
                    <th className="px-5 py-4">{c.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {c.rows.map((row) => (
                    <tr key={row.feature} className="border-t border-slate-100 bg-white">
                      <td className="px-5 py-3.5 font-medium text-slate-700">
                        {row.feature}
                      </td>
                      <td className="px-5 py-3.5 font-semibold text-brand">
                        {row.capify}
                      </td>
                      <td className="px-5 py-3.5 text-slate-500">{row.them}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>

      <CtaBand />
    </main>
  );
}
