import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "../../_components/PageHero";
import { CtaBand } from "../../_components/sections/CtaBand";
import { Check, X } from "lucide-react";

type Competitor = {
  slug: string;
  name: string;
  tagline: string;
  verdict: string;
  features: { name: string; capify: boolean | string; them: boolean | string }[];
};

const DATA: Record<string, Competitor> = {
  "moonshot-vs-captions-ai": {
    slug: "moonshot-vs-captions-ai",
    name: "Captions.ai",
    tagline: "The AI Video Editor Alternative to Captions.ai",
    verdict: "Captions.ai requires desktop software or heavy mobile apps for full feature sets. Capify operates directly in modern web browsers with instant real-time depth segmentation and 250+ designed typography templates without hidden exports limits.",
    features: [
      { name: "In-Browser Web Editor", capify: true, them: true },
      { name: "Behind-the-Person Spatial Captions", capify: "Included", them: "Paid Add-on" },
      { name: "Word-Level Karaoke Motion", capify: true, them: true },
      { name: "AI Thumbnail Generator Included", capify: true, them: false },
      { name: "Transparent Pricing (From $3/wk)", capify: true, them: false },
    ],
  },
  "moonshot-vs-veed": {
    slug: "moonshot-vs-veed",
    name: "VEED.io",
    tagline: "Capify vs VEED: Which Short-Form Editor Wins?",
    verdict: "VEED is a versatile full-timeline editor suited for corporate webinars and traditional horizontal videos. Capify is laser-focused on viral vertical shorts (Reels, TikTok, Shorts) with zero timeline friction and creator-grade typography.",
    features: [
      { name: "Zero-Timeline Transcript Editing", capify: true, them: false },
      { name: "Automated Depth Segmentation", capify: true, them: false },
      { name: "Creator Caption Presets (Hormozi, etc.)", capify: "250+", them: "Generic" },
      { name: "Export Speed (<60s on 1080p)", capify: true, them: false },
      { name: "Mobile Web Optimized", capify: true, them: false },
    ],
  },
  "moonshot-vs-opusclip": {
    slug: "moonshot-vs-opusclip",
    name: "OpusClip",
    tagline: "Capify vs OpusClip: From Raw Footage to Viral Short",
    verdict: "OpusClip is built to chop 1-hour podcasts into 10 bite-sized highlights. Capify is built for creators who already have a targeted 30-90 second clip and want the absolute highest-fidelity aesthetic, dynamic typography, and behind-subject depth.",
    features: [
      { name: "Single-Clip Studio Polish", capify: "Core Focus", them: "Secondary" },
      { name: "Custom Font & Motion Tuning", capify: true, them: "Limited" },
      { name: "Behind-the-Person Occlusion", capify: true, them: false },
      { name: "AI Watermark Remover", capify: true, them: false },
      { name: "Flexible Export without Token Burn", capify: true, them: false },
    ],
  },
  "moonshot-vs-captik": {
    slug: "moonshot-vs-captik",
    name: "Captik",
    tagline: "Capify vs Captik: Automated Caption Styling Compared",
    verdict: "Captik provides basic mobile subtitle burns, but lacks deep multi-layer B-roll inserts, spatial behind-the-person occlusion, and Indian regional multilingual typography. Capify gives you a full studio suite with zero software installation.",
    features: [
      { name: "Behind-the-Subject Captions", capify: true, them: false },
      { name: "B-Roll Cutaway Placement", capify: true, them: false },
      { name: "Multi-Language Scripts (Hinglish/Devanagari)", capify: true, them: "Basic" },
      { name: "Interactive Web Studio Editor", capify: true, them: false },
      { name: "High-Bitrate 4K Clean Export", capify: true, them: false },
    ],
  },
  "moonshot-vs-submagic": {
    slug: "moonshot-vs-submagic",
    name: "Submagic",
    tagline: "Capify vs Submagic: The AI Video Editor Showdown",
    verdict: "Submagic pioneered automated animated captions but charges high recurring monthly subscriptions with strict credit caps. Capify gives you 250+ designed styles, full behind-the-subject depth compositing, and transparent creator pricing.",
    features: [
      { name: "Transparent Pricing From $3/wk", capify: true, them: false },
      { name: "Depth Segmentation Included", capify: true, them: "Paid Tier" },
      { name: "Word-by-Word Timeline Scrubbing", capify: true, them: true },
      { name: "Native Hindi & Indian Font Suite", capify: true, them: false },
      { name: "Instant Zero-Credit Exports", capify: true, them: false },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/compare/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = DATA[slug];
  if (!item) return { title: "Comparison" };
  return {
    title: `Capify vs ${item.name} — Feature Comparison`,
    description: item.verdict,
  };
}

export default async function CompareDetailPage({
  params,
}: PageProps<"/compare/[slug]">) {
  const { slug } = await params;
  const item = DATA[slug];
  if (!item) notFound();

  return (
    <main className="relative overflow-x-hidden">
      <div className="blueprint-grid pointer-events-none fixed inset-0 z-0 opacity-[0.6]" />

      <PageHero
        badge="Comparison"
        title={`Capify vs ${item.name}`}
        subtitle={item.tagline}
      />

      <section className="relative z-10 mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Executive Summary</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            {item.verdict}
          </p>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-4">Capability</th>
                  <th className="px-5 py-4 text-[#4F46E5]">Capify</th>
                  <th className="px-5 py-4">{item.name}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {item.features.map((f) => (
                  <tr key={f.name} className="hover:bg-slate-50/50">
                    <td className="px-5 py-3.5 font-medium text-slate-800">{f.name}</td>
                    <td className="px-5 py-3.5 font-semibold text-[#4F46E5]">
                      {typeof f.capify === "boolean" ? (
                        f.capify ? <Check className="h-5 w-5 text-emerald-600" /> : <X className="h-5 w-5 text-slate-300" />
                      ) : (
                        f.capify
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-slate-500">
                      {typeof f.them === "boolean" ? (
                        f.them ? <Check className="h-5 w-5 text-emerald-600" /> : <X className="h-5 w-5 text-slate-300" />
                      ) : (
                        f.them
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#4F46E5] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#4338CA]"
            >
              Try Capify with your clip
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
