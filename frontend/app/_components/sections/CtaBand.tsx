import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function CtaBand() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="relative overflow-hidden rounded-[32px] border border-slate-800 bg-slate-950 px-8 py-14 text-center shadow-2xl">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(600px circle at 50% 0%, rgba(99,102,241,0.35), transparent 60%)",
          }}
        />
        <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-wide text-indigo-300">
            <Sparkles className="h-3.5 w-3.5" /> Free to try
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl font-serif text-3xl tracking-tight text-white sm:text-4xl">
            Make your next short in minutes, not hours.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400">
            Upload a clip, preview every style, and only pay when you export. No
            card required to build.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/#editor"
              className="flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-brand-600"
            >
              Start creating free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              See pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
