import type { Metadata } from "next";
import { PageHero } from "../_components/PageHero";
import { PricingTables } from "../_components/pricing/PricingTables";
import { FaqAccordion } from "../_components/sections/FaqAccordion";
import { CtaBand } from "../_components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Free to preview and pay only when you export. Weekly, monthly and yearly plans for the Capify AI video editor.",
};

const MATRIX: { feature: string; free: string; creator: string; pro: string }[] = [
  { feature: "Preview captions in the editor", free: "5 min one-time", creator: "Unlimited", pro: "Unlimited" },
  { feature: "Export and download MP4", free: "—", creator: "Yes", pro: "Yes" },
  { feature: "Creator caption families", free: "—", creator: "Yes", pro: "Yes" },
  { feature: "Every caption template", free: "—", creator: "—", pro: "Yes" },
  { feature: "Behind-the-subject depth", free: "—", creator: "—", pro: "Yes" },
  { feature: "Dynamic AI backgrounds + AI Edits", free: "—", creator: "—", pro: "Yes" },
  { feature: "AI thumbnail preview", free: "15 credits / 90 days", creator: "1 lifetime", pro: "1 lifetime" },
  { feature: "Shared processing minutes", free: "5 one-time minutes", creator: "45 / week", pro: "60 / week" },
  { feature: "Watermark on export", free: "Yes", creator: "No", pro: "No" },
];

export default function PricingPage() {
  return (
    <main className="relative overflow-x-hidden">
      <div className="blueprint-grid pointer-events-none fixed inset-0 z-0 opacity-[0.6]" />

      <PageHero
        badge="Pricing"
        title="Simple pricing, no surprises"
        subtitle="Build and preview for free. Upgrade only when you are ready to export and publish."
      />

      <section className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <PricingTables />
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <h2 className="font-serif text-2xl tracking-tight text-slate-950 sm:text-3xl">
          What each plan includes
        </h2>
        <div className="mt-8 overflow-x-auto rounded-3xl border border-slate-200 shadow-sm">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-4">Feature</th>
                <th className="px-5 py-4">Free</th>
                <th className="px-5 py-4 text-brand">Creator</th>
                <th className="px-5 py-4">Pro</th>
              </tr>
            </thead>
            <tbody>
              {MATRIX.map((row) => (
                <tr key={row.feature} className="border-t border-slate-100 bg-white">
                  <td className="px-5 py-3.5 font-medium text-slate-700">
                    {row.feature}
                  </td>
                  <td className="px-5 py-3.5 text-slate-500">{row.free}</td>
                  <td className="px-5 py-3.5 font-medium text-slate-700">
                    {row.creator}
                  </td>
                  <td className="px-5 py-3.5 text-slate-500">{row.pro}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <FaqAccordion />
      <CtaBand />
    </main>
  );
}
