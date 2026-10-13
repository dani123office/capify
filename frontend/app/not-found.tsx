import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-4 py-28 text-center sm:px-6">
      <p className="font-serif text-6xl text-slate-200 sm:text-7xl">404</p>
      <h1 className="mt-5 font-serif text-3xl tracking-tight text-slate-950 sm:text-4xl">
        This page took a different cut
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-500">
        The link you followed does not exist. Head back to the editor and keep
        creating.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white shadow-md shadow-indigo-500/25 transition hover:bg-brand-600"
        >
          Back home <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/caption-templates"
          className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
        >
          Browse templates
        </Link>
      </div>
    </main>
  );
}
