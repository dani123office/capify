import { Sparkles } from "lucide-react";
import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Capify home"
      className={`flex items-center gap-2 text-ink transition hover:opacity-80 ${className}`}
    >
      <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand text-white shadow-sm shadow-indigo-500/30">
        <Sparkles className="h-4 w-4" strokeWidth={2.5} />
      </span>
      <span className="text-xl font-bold lowercase tracking-tight">capify</span>
    </Link>
  );
}
