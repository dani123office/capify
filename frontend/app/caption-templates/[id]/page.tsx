import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Crown } from "lucide-react";
import { TEMPLATES, getTemplate } from "../../_lib/templates";
import { TemplateCard } from "../../_components/templates/TemplateCard";

export function generateStaticParams() {
  return TEMPLATES.map((template) => ({ id: template.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/caption-templates/[id]">): Promise<Metadata> {
  const { id } = await params;
  const template = getTemplate(id);
  if (!template) return { title: "Template not found" };
  return {
    title: `${template.name} caption template`,
    description: `${template.name} — ${template.treatment}. Sentence font ${template.font}, accent font ${template.accentFont}.`,
  };
}

export default async function TemplateDetailPage({
  params,
}: PageProps<"/caption-templates/[id]">) {
  const { id } = await params;
  const template = getTemplate(id);
  if (!template) notFound();

  const sameFamily = TEMPLATES.filter(
    (t) => t.family === template.family && t.id !== template.id,
  );
  const related = (sameFamily.length ? sameFamily : TEMPLATES).slice(0, 4);

  return (
    <main className="relative overflow-x-hidden">
      <div className="blueprint-grid pointer-events-none fixed inset-0 z-0 opacity-[0.6]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-400">
          <Link href="/caption-templates" className="hover:text-brand">
            Caption templates
          </Link>
          <span>/</span>
          <span className="text-slate-600">{template.name}</span>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,380px)_1fr]">
          <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[28px] border border-slate-200 bg-slate-900 shadow-xl">
            <span
              className="block aspect-[9/16] w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${template.poster})` }}
            />
            {template.pro && (
              <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-1 text-[10px] font-black text-black shadow-md">
                <Crown className="h-3 w-3" /> PRO
              </span>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand">
                {template.family}
              </span>
              {template.badge && (
                <span className="rounded-full bg-slate-900/90 px-3 py-1 text-xs font-bold text-white">
                  {template.badge}
                </span>
              )}
            </div>

            <h1 className="mt-4 font-serif text-3xl tracking-tight text-slate-950 sm:text-5xl">
              {template.name}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">
              {template.treatment}. A designed caption style that ships with
              word-level motion, tuned line breaks and a matching accent face.
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-4 sm:max-w-md">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <dt className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                  Sentence font
                </dt>
                <dd className="mt-1 text-sm font-bold text-slate-900">
                  {template.font}
                </dd>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <dt className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                  Accent font
                </dt>
                <dd className="mt-1 text-sm font-bold text-slate-900">
                  {template.accentFont}
                </dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/#editor"
                className="flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white shadow-md shadow-indigo-500/25 transition hover:bg-brand-600"
              >
                Use this style <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/pricing"
                className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
              >
                See pricing
              </Link>
            </div>

            {template.pro && (
              <p className="mt-4 text-xs text-slate-400">
                Behind-the-subject and AI-powered templates are part of Pro.
              </p>
            )}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="font-serif text-2xl tracking-tight text-slate-950">
            More {template.family} styles
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {related.map((t) => (
              <TemplateCard key={t.id} template={t} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
