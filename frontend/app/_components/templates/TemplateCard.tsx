"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Crown } from "lucide-react";
import type { Template } from "../../_lib/templates";

export function TemplateBadge({ template }: { template: Template }) {
  if (template.badge === "POPULAR" || template.badge === "TRENDING") {
    const color =
      template.badge === "POPULAR" ? "bg-[#eab308]" : "bg-[#06b6d4]";
    return (
      <span
        className={`absolute -left-8 top-2.5 z-20 w-28 -rotate-45 py-0.5 text-center text-[9px] font-black uppercase tracking-wider text-black shadow-md ${color}`}
      >
        {template.badge}
      </span>
    );
  }
  if (template.badge === "PRO") {
    return (
      <span className="absolute right-3 top-3 z-20 flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-0.5 text-[10px] font-black text-black shadow-md">
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
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const cardClass = `group relative block aspect-[4/5] overflow-hidden rounded-[24px] border-2 bg-slate-950 text-left shadow-sm transition-all duration-300 hover:shadow-2xl ${
    selected ? "border-indigo-600 ring-2 ring-indigo-500/30" : "border-slate-800/40"
  } ${className}`;

  const inner = (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative h-full w-full overflow-hidden"
    >
      {/* Video element (plays on hover) */}
      {template.video && (
        <video
          ref={videoRef}
          src={template.video}
          loop
          muted
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      )}

      {/* Poster image: visible by default, fades on hover if video available */}
      <img
        src={template.poster}
        alt={template.name}
        className={`pointer-events-none absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-300 ${
          hovered && template.video ? "opacity-0" : "opacity-100"
        } group-hover:scale-105`}
      />

      {/* Diagonal / Corner Badge */}
      <TemplateBadge template={template} />

      {/* Bottom overlay info (gradient + label) */}
      <span className="absolute inset-x-0 bottom-0 z-20 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3.5">
        <span className="truncate text-xs font-bold text-white drop-shadow-sm sm:text-sm">
          {template.name}
        </span>
        <span className="truncate text-[10px] font-medium text-slate-300">
          {template.treatment} • {template.font}
        </span>
      </span>
    </div>
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
