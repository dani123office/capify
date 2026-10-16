"use client";

import Link from "next/link";
import { ArrowUpRight, Crown, Sparkles } from "lucide-react";

export function SignatureStylesSection() {
  return (
    <section
      id="signature-styles"
      className="border-b border-white/10 bg-[#10100e] px-5 py-16 text-white md:px-8 md:py-24 lg:px-10"
    >
      <div className="mx-auto max-w-[1180px] text-left">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#c7d2fe]">
          Beyond captions
        </p>
        <h2 className="max-w-[640px] text-[34px] font-black leading-[1.04] md:text-[50px] tracking-tight">
          Styles that do more than{" "}
          <span className="font-serif font-normal italic text-[#c7d2fe]">
            subtitle.
          </span>
        </h2>

        {/* Bento Grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr] lg:grid-rows-2">
          {/* Main Large Hero Card */}
          <article className="group relative isolate min-h-[300px] overflow-hidden rounded-[22px] bg-[#1a1a17] sm:col-span-2 sm:min-h-[480px] lg:col-span-1 lg:row-span-2 lg:min-h-[580px] border border-white/10 shadow-2xl">
            <img
              src="https://cdn.kaizynn.com/moonshot/landing/contentaware/golden-hour-v2-poster.jpg"
              alt="Golden Hour cutout style"
              className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_35%] transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0a0a09]/95 via-[#0a0a09]/40 via-40% to-transparent" />
            <span className="absolute left-3.5 top-3.5 rounded-full bg-[#10100e]/80 backdrop-blur-xs px-3 py-1 text-[11px] font-bold text-white border border-white/10">
              Behind the Person
            </span>
            <div className="absolute inset-x-5 bottom-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                Signature Style
              </span>
              <h3 className="mt-1 text-2xl font-bold text-white">Golden Hour</h3>
              <p className="mt-1.5 text-xs text-neutral-300 line-clamp-2">
                Multi-layer depth compositing places your kinetic words behind the speaker without masking by hand.
              </p>
              <Link
                href="/caption-templates/blue-muse"
                className="mt-3.5 inline-flex items-center gap-1 text-xs font-bold text-indigo-400 hover:text-indigo-300"
              >
                Explore template <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
          </article>

          {/* Card 2: Multiline */}
          <article className="group relative isolate min-h-[260px] overflow-hidden rounded-[22px] bg-[#1a1a17] border border-white/10 p-5 flex flex-col justify-between">
            <img
              src="https://cdn.kaizynn.com/moonshot/landing/multiline/ml-aura-061aa4b4fa90-poster.jpg"
              alt="Multiline Aura"
              className="absolute inset-0 -z-20 h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <span className="w-fit rounded-full bg-black/60 px-2.5 py-0.5 text-[10px] font-bold text-white border border-white/10">
              Multiline Aura
            </span>
            <div>
              <h3 className="text-lg font-bold text-white">Stacked Multiline</h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Full-sentence phrases with the currently spoken word glowing in vibrant neon.
              </p>
            </div>
          </article>

          {/* Card 3: Ghostline */}
          <article className="group relative isolate min-h-[260px] overflow-hidden rounded-[22px] bg-[#1a1a17] border border-white/10 p-5 flex flex-col justify-between">
            <img
              src="https://cdn.kaizynn.com/moonshot/landing/contentaware/ghostline-v2-poster.jpg"
              alt="Ghostline"
              className="absolute inset-0 -z-20 h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <span className="w-fit rounded-full bg-black/60 px-2.5 py-0.5 text-[10px] font-bold text-white border border-white/10">
              Ghostline
            </span>
            <div>
              <h3 className="text-lg font-bold text-white">Editorial Ghostline</h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Minimal luxury aesthetic for fashion, founders, and architect reels.
              </p>
            </div>
          </article>

          {/* Card 4: Reach Counter */}
          <article className="group relative isolate min-h-[260px] overflow-hidden rounded-[22px] bg-[#1a1a17] border border-white/10 p-5 flex flex-col justify-between">
            <img
              src="https://cdn.kaizynn.com/moonshot/landing/real-estate/reach-counter-7d8ceee71a96-poster.jpg"
              alt="Reach Counter"
              className="absolute inset-0 -z-20 h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <span className="w-fit rounded-full bg-black/60 px-2.5 py-0.5 text-[10px] font-bold text-white border border-white/10">
              Counter FX
            </span>
            <div>
              <h3 className="text-lg font-bold text-white">Real Estate Metrics</h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Animated currency and stat counters for listing tours.
              </p>
            </div>
          </article>

          {/* Card 5: Dimension Story */}
          <article className="group relative isolate min-h-[260px] overflow-hidden rounded-[22px] bg-[#1a1a17] border border-white/10 p-5 flex flex-col justify-between">
            <img
              src="https://cdn.kaizynn.com/moonshot/landing/real-estate/dimension-story-ba1acfd1da9d-poster.jpg"
              alt="Dimension Story"
              className="absolute inset-0 -z-20 h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <span className="w-fit rounded-full bg-black/60 px-2.5 py-0.5 text-[10px] font-bold text-white border border-white/10">
              Spatial 3D
            </span>
            <div>
              <h3 className="text-lg font-bold text-white">Dimension Story</h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                3D tilted camera typography synced to room reveals.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
