"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
  TEMPLATES,
  TEMPLATE_FAMILIES,
  type Template,
} from "../../_lib/templates";
import { TemplateCard } from "./TemplateCard";

const FAMILY_BY_TAB: Record<string, Template["family"]> = {
  behind_person: "Behind the Person",
  spatial: "Spatial",
  ai_edits: "AI Edits",
  multiline: "Multiline",
  dynamic: "Dynamic",
  editorial: "Editorial",
  creators: "Creators",
  desi: "Desi",
  social: "Social",
};

export function TemplateGallery() {
  const [family, setFamily] = useState<string>("all");
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TEMPLATES.filter((t) => {
      const matchesFamily =
        family === "all"
          ? true
          : family === "popular"
            ? t.badge !== null
            : t.family === FAMILY_BY_TAB[family];
      const matchesQuery =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.family.toLowerCase().includes(q) ||
        t.font.toLowerCase().includes(q) ||
        t.treatment.toLowerCase().includes(q);
      return matchesFamily && matchesQuery;
    });
  }, [family, query]);

  const chips = [{ id: "all", label: "All" }, ...TEMPLATE_FAMILIES];

  return (
    <section className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {chips.map((c) => {
            const active = family === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setFamily(c.id)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-bold transition ${
                  active
                    ? "border-brand bg-brand text-white shadow-sm shadow-indigo-500/20"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        <label className="flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm lg:w-72">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search templates, fonts…"
            className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />
        </label>
      </div>

      <p className="mt-6 text-xs font-medium text-slate-400">
        {list.length} {list.length === 1 ? "style" : "styles"}
      </p>

      {list.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
          <p className="text-sm font-semibold text-slate-700">
            No templates match your search.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setFamily("all");
            }}
            className="mt-3 text-sm font-bold text-brand hover:text-brand-600"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4">
          {list.map((t) => (
            <TemplateCard key={t.id} template={t} />
          ))}
        </div>
      )}
    </section>
  );
}
