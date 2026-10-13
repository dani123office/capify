"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Crown } from "lucide-react";
import type { Template } from "../../_lib/templates";

export function TemplateBadge({ template }: { template: Template }) {
  if (template.badge === "POPULAR" || template.badge === "TRENDING") {
    const color = template.badge === "POPULAR" ? "bg-[#d97706]" : "bg-[#0284c7]";
    return (
      <span
        className={`absolute -left-8 top-2 z-20 w-28 -rotate-45 py-0.5 text-center text-[9px] font-black uppercase tracking-wider text-white shadow-md ${color}`}
      >
        {template.badge}
      </span>
    );
  }
  if (template.badge === "PRO") {
    return (
      <span className="absolute right-3 top-3 z-20 flex items-center gap-1 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-black text-black shadow-md">
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
      className={`absolute left-3 top-3 z-20 rounded-md px-2 py-0.5 text-[9px] font-bold text-white shadow-sm ${chip}`}
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const cardClass = `group relative block aspect-[4/5] overflow-hidden rounded-[22px] border-2 bg-slate-950 text-left shadow-sm transition-all duration-300 hover:shadow-xl hover:ring-2 hover:ring-brand/40 ${
    selected ? "border-brand ring-2 ring-brand-500/30" : "border-slate-800/40"
  } ${className}`;

  const inner = (
    <>
      {/* Video preview with fallback poster */}
      {template.video ? (
        <video
          ref={videoRef}
          src={template.video}
          poster={template.poster}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <img
          src={template.poster}
          alt={template.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}

      {/* Diagonal / Corner Badge */}
      <TemplateBadge template={template} />

      {/* Bottom overlay info */}
      <span className="absolute inset-x-0 bottom-0 z-20 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3.5">
        <span className="truncate text-xs font-bold text-white drop-shadow-sm sm:text-sm">
          {template.name}
        </span>
        <span className="truncate text-[10px] font-medium text-slate-300">
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
