"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BLOG_CATEGORIES, POSTS, type BlogCategory } from "../../_lib/blog";

export function BlogList() {
  const [category, setCategory] = useState<BlogCategory | "All">("All");

  const list =
    category === "All" ? POSTS : POSTS.filter((p) => p.category === category);

  return (
    <section className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-center gap-2">
        {(["All", ...BLOG_CATEGORIES] as const).map((c) => {
          const active = category === c;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-bold transition ${
                active
                  ? "border-brand bg-brand text-white shadow-sm shadow-indigo-500/20"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <span
              className={`block h-36 w-full bg-gradient-to-br ${post.accent}`}
            />
            <span className="flex flex-1 flex-col p-5">
              <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-brand">
                {post.category}
                <span className="text-slate-300">•</span>
                <span className="font-medium text-slate-400">
                  {post.readingTime}
                </span>
              </span>
              <span className="mt-3 text-base font-bold leading-snug text-slate-900 group-hover:text-brand">
                {post.title}
              </span>
              <span className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
                {post.excerpt}
              </span>
              <span className="mt-4 flex items-center gap-1 text-sm font-bold text-slate-900">
                Read article
                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
