"use client";

import Link from "next/link";
import { Crown } from "lucide-react";
import type { Template } from "../../_lib/templates";

export function TemplateBadge({ template }: { template: Template }) {
  if (template.badge === "POPULAR" || template.badge === "TRENDING") {
    const color = template.badge === "POPULAR" ? "bg-[#d97706]" : "bg-[#0284c7]";
    return (
      <span
        className={`absolute -left-8 top-2 z-10 w-28 -rotate-45 py-0.5 text-center text-[9px] font-black uppercase tracking-wider text-white shadow-sm ${color}`}
      >
        {template.badge}
      </span>
    );
  }
  if (template.badge === "PRO") {
    return (
      <span className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-black text-black shadow-md">
        <Crown className="h-2.5 w-2.5" /> PRO
      </span>
    );
  }
  if (!template.badge) return null;
  const chip =
    template.badge === "NEW"
      ? "bg-purple-600/90"
      : template.badge === "DESI"
        ? "bg-rose-600/90"
        : template.badge === "CREATOR"
          ? "bg-emerald-600/90"
          : "bg-slate-900/70";
  return (
    <span
      className={`absolute left-3 top-3 z-10 rounded-md px-2 py-0.5 text-[9px] font-bold text-white ${chip}`}
    >
      {template.badge}
    </span>
  );
}

export function TemplateCard({
  template,
  selected = false,
  onSelect,
  className = "",
}: {
  template: Template;
  selected?: boolean;
  onSelect?: (template: Template) => void;
  className?: string;
}) {
  const cardClass = `group relative block aspect-[4/5] overflow-hidden rounded-[22px] border-2 bg-slate-900 text-left shadow-sm transition-all duration-300 hover:shadow-xl ${
    selected ? "border-brand ring-2 ring-brand-500/20" : "border-transparent"
  } ${className}`;

  const inner = (
    <>
      <span
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${template.poster})` }}
      />
      <TemplateBadge template={template} />
      <span className="absolute inset-x-0 bottom-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3">
        <span className="truncate text-xs font-bold text-white sm:text-sm">
          {template.name}
        </span>
        <span className="truncate text-[10px] text-slate-300">
          {template.treatment} • {template.font}
        </span>
      </span>
    </>
  );

  if (onSelect) {
    return (
      <button
        type="button"
        onClick={() => onSelect(template)}
        className={cardClass}
      >
        {inner}
      </button>
    );
  }

  return (
    <Link href={`/caption-templates/${template.id}`} className={cardClass}>
      {inner}
    </Link>
  );
}
