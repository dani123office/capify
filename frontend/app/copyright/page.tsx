import type { Metadata } from "next";
import { PageHero } from "../_components/PageHero";

export const metadata: Metadata = {
  title: "Copyright & IP Policy",
  description: "Intellectual property and copyright guidelines for Capify.",
};

export default function CopyrightPage() {
  return (
    <main className="relative overflow-x-hidden">
      <div className="blueprint-grid pointer-events-none fixed inset-0 z-0 opacity-[0.6]" />

      <PageHero
        badge="Legal"
        title="Copyright & IP Policy"
        subtitle="Protecting creator rights and respecting intellectual property across all video assets."
      />

      <section className="relative z-10 mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-10 shadow-sm space-y-8 text-slate-600 text-sm leading-relaxed">
          <div>
            <h2 className="text-base font-bold text-slate-900">1. Creator Ownership</h2>
            <p className="mt-2">
              Capify respects the intellectual property rights of others. You retain all copyright, trademark, and proprietary rights in the raw footage, audio tracks, and transcripts you process using our tool.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900">2. DMCA Takedown Notices</h2>
            <p className="mt-2">
              If you believe that any content hosted or processed through Capify infringes upon your copyright, please notify our designated agent with complete documentation, proof of ownership, and specific URLs at copyright@capify.ai.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900">3. Template Assets & Intellectual Property</h2>
            <p className="mt-2">
              The proprietary caption animation shaders, depth segmentation models, codebases, and brand logos of Capify are protected by applicable intellectual property laws. Unauthorized reproduction or resale of the platform is strictly prohibited.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
