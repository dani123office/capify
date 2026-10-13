import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Capify home"
      className={`flex items-center gap-2.5 text-slate-900 transition hover:opacity-85 ${className}`}
    >
      <span className="relative flex h-6 w-6 items-center justify-center rounded-full border-[2.2px] border-slate-900 bg-transparent">
        <span className="h-2.5 w-2.5 rounded-full bg-slate-900" />
      </span>
      <span className="text-[19px] font-bold lowercase tracking-tight text-slate-900">
        capify
      </span>
    </Link>
  );
}
