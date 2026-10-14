import type { Metadata } from "next";
import { PageHero } from "../_components/PageHero";

export const metadata: Metadata = {
  title: "Font Licences & Credits",
  description: "Font licensing information and open-source acknowledgements for Capify caption styles.",
};

const FONTS = [
  { name: "Bebas Neue", author: "Ryoichi Tsunekawa", license: "SIL Open Font License 1.1", use: "Creator Yellow, Bold Impact" },
  { name: "Montserrat", author: "Julieta Ulanovsky", license: "SIL Open Font License 1.1", use: "Luxe, Modern Minimal" },
  { name: "Plus Jakarta Sans", author: "Tokotype", license: "SIL Open Font License 1.1", use: "Dynamic, AI Edits" },
  { name: "Playfair Display", author: "Claus Eggers Sørensen", license: "SIL Open Font License 1.1", use: "Editorial, Fashion" },
  { name: "Archivo Black", author: "Omnibus-Type", license: "SIL Open Font License 1.1", use: "Viral, Punchy Hooks" },
  { name: "Inter", author: "Rasmus Andersson", license: "SIL Open Font License 1.1", use: "UI Elements & Clean Captions" },
  { name: "Anek Devanagari", author: "Ek Type", license: "SIL Open Font License 1.1", use: "Desi & Multilingual Captions" },
];

export default function LicensesPage() {
  return (
    <main className="relative overflow-x-hidden">
      <div className="blueprint-grid pointer-events-none fixed inset-0 z-0 opacity-[0.6]" />

      <PageHero
        badge="Legal & Credits"
        title="Font Licences & Open-Source Credits"
        subtitle="All typography used across Capify caption styles complies with the SIL Open Font License (OFL) or Apache 2.0 open-source standards."
      />

      <section className="relative z-10 mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="rounded-3xl border border-slate-200/90 bg-white p-8 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Typography Registry</h2>
          <div className="mt-6 divide-y divide-slate-100">
            {FONTS.map((font) => (
              <div key={font.name} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{font.name}</h3>
                  <p className="text-xs text-slate-500">By {font.author} • Used in {font.use}</p>
                </div>
                <span className="inline-flex self-start sm:self-center rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-700">
                  {font.license}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
