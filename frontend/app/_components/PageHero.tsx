import type { ReactNode } from "react";

export function PageHero({
  badge,
  title,
  subtitle,
  children,
}: {
  badge: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative z-10 border-b border-slate-200/70 bg-slate-50/40 px-4 py-16 text-center sm:px-6">
      <div className="mx-auto max-w-3xl">
        <span className="inline-block rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand">
          {badge}
        </span>
        <h1 className="mt-4 font-serif text-3xl tracking-tight text-slate-950 sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
