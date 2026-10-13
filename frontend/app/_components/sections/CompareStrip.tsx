import Link from "next/link";
import { ArrowRight } from "lucide-react";

const COMPARISONS = [
  {
    id: "captions-ai",
    name: "Captions.ai",
    line: "Capify packages the whole post — hook and cover included — and adds behind-the-subject depth.",
  },
  {
    id: "submagic",
    name: "Submagic",
    line: "Costs less at entry, with a far larger template catalogue than stock B-roll tools.",
  },
  {
    id: "opusclip",
    name: "OpusClip",
    line: "OpusClip cuts long videos into many clips. Capify finishes the one short you already have.",
  },
  {
    id: "capcut",
    name: "CapCut",
    line: "Runs entirely in the browser and is AI-first — no app install, no timeline dragging.",
  },
];

export function CompareStrip() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div className="max-w-xl">
          <span className="inline-block rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand">
            Compare
          </span>
          <h2 className="mt-4 font-serif text-3xl tracking-tight text-slate-950 sm:text-4xl">
            How Capify stacks up
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            We list where each tool is genuinely stronger. No vendor copy, no
            exaggeration.
          </p>
        </div>
        <Link
          href="/compare"
          className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          Full comparison library <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {COMPARISONS.map((c) => (
          <Link
            key={c.id}
            href={`/compare#${c.id}`}
            className="group flex items-start gap-4 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
          >
            <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-sm font-black text-slate-500 transition group-hover:bg-brand-50 group-hover:text-brand">
              vs
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Capify vs {c.name}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-500">{c.line}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
