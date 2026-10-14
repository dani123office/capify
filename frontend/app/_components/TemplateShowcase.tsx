"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import sectionsData from "../../lib/moonshot_homepage_sections.json";
import { TemplateCard } from "./templates/TemplateCard";
import type { Template } from "../_lib/templates";

export interface TemplateShowcaseProps {
  selectedId?: string;
  onSelectTemplate?: (t: Template) => void;
}

export function TemplateShowcase({
  selectedId,
  onSelectTemplate,
}: TemplateShowcaseProps) {
  const [activeTab, setActiveTab] = useState<string>("popular");
  const tablistRef = useRef<HTMLDivElement>(null);
  const isClickScrolling = useRef(false);

  // Set up IntersectionObserver to update active tab highlight on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const secId = entry.target.getAttribute("data-section-id");
            if (secId) {
              setActiveTab(secId);
              // Ensure the active tab button is scrolled into view in horizontal tab bar
              const tabBtn = document.getElementById(`tab-${secId}`);
              if (tabBtn && tablistRef.current) {
                tabBtn.scrollIntoView({
                  behavior: "smooth",
                  block: "nearest",
                  inline: "center",
                });
              }
            }
          }
        }
      },
      {
        rootMargin: "-90px 0px -70% 0px",
        threshold: 0,
      }
    );

    sectionsData.forEach((sec) => {
      const el = document.getElementById(`section-${sec.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (secId: string) => {
    setActiveTab(secId);
    isClickScrolling.current = true;
    const targetSection = document.getElementById(`section-${secId}`);
    if (targetSection) {
      const yOffset = -72; // height of sticky bar
      const y =
        targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setTimeout(() => {
      isClickScrolling.current = false;
    }, 800);
  };

  return (
    <div id="templates" className="relative z-10 mx-auto max-w-6xl px-4 pb-24 sm:px-6">
      {/* Sticky Top Category Tab Bar */}
      <div className="sticky top-0 z-40 -mx-4 mb-8 bg-white/95 px-4 py-2.5 backdrop-blur-md sm:-mx-6 sm:px-6 border-b border-slate-100">
        <div className="flex items-center justify-between gap-3">
          {/* Horizontal scrollable tablist */}
          <div
            ref={tablistRef}
            role="tablist"
            aria-label="Template categories"
            className="no-scrollbar flex flex-1 items-center gap-1.5 overflow-x-auto scroll-smooth py-1"
          >
            {sectionsData.map((sec) => {
              const isActive = activeTab === sec.id;
              return (
                <button
                  key={sec.id}
                  id={`tab-${sec.id}`}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => scrollToSection(sec.id)}
                  className={`group relative inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-brand"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <span>{sec.label}</span>
                  {sec.hasAi && (
                    <span
                      className={`rounded px-1.5 py-0.5 text-[9px] font-bold leading-none ${
                        isActive
                          ? "bg-brand/12 text-brand"
                          : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                      }`}
                    >
                      AI
                    </span>
                  )}
                  {isActive && (
                    <span
                      className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-brand"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Letters Language Selector Button */}
          <div className="flex shrink-0 items-center border-l border-slate-200 pl-2.5">
            <button
              type="button"
              className="group inline-flex shrink-0 items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs transition hover:border-slate-300"
            >
              abc <ChevronDown className="h-3 w-3 text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Continuous Vertical Shelf Sections */}
      <div className="flex flex-col gap-14 sm:gap-16">
        {sectionsData.map((sec) => (
          <section
            key={sec.id}
            id={`section-${sec.id}`}
            data-section-id={sec.id}
            aria-label={sec.label}
            className="flex min-w-0 scroll-mt-24 flex-col gap-4"
          >
            {/* Section Header */}
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-2.5">
              <div className="flex items-center gap-2">
                <span className="text-base font-semibold text-slate-900">
                  {sec.label}
                </span>
                {sec.hasAi && (
                  <span className="rounded bg-brand/12 px-1.5 py-0.5 text-[10px] font-bold leading-none text-brand">
                    AI
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 sm:text-sm">
                {sec.description}
              </p>
            </div>

            {/* Grid of Template Cards */}
            <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-5 md:grid-cols-4">
              {sec.cards.map((card) => {
                const tObj: Template = {
                  id: card.id,
                  name: card.name,
                  family: sec.label as Template["family"],
                  badge: (card as any).badge || (sec.id === "popular" ? "POPULAR" : null),
                  font: "Inter",
                  accentFont: "Inter",
                  treatment: card.treatment,
                  poster: card.poster || "",
                  video: card.video || undefined,
                };
                return (
                  <TemplateCard
                    key={`${sec.id}-${card.id}`}
                    template={tObj}
                    selected={selectedId === card.id}
                    onSelect={onSelectTemplate}
                  />
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
