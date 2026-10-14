import type { Metadata } from "next";
import { PageHero } from "../_components/PageHero";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions governing the use of the Capify platform.",
};

export default function TermsPage() {
  return (
    <main className="relative overflow-x-hidden">
      <div className="blueprint-grid pointer-events-none fixed inset-0 z-0 opacity-[0.6]" />

      <PageHero
        badge="Legal"
        title="Terms of Service"
        subtitle="Last updated: October 2026. Please read these terms carefully before using Capify."
      />

      <section className="relative z-10 mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-10 shadow-sm space-y-8 text-slate-600 text-sm leading-relaxed">
          <div>
            <h2 className="text-base font-bold text-slate-900">1. Acceptance of Terms</h2>
            <p className="mt-2">
              By accessing and using Capify (&ldquo;the Service&rdquo;), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this Service.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900">2. Description of Service</h2>
            <p className="mt-2">
              Capify provides automated video captioning, text animation, depth compositing, and editing software via the web interface. We may update, enhance, or modify features at our discretion.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900">3. User Content and Ownership</h2>
            <p className="mt-2">
              You retain all ownership rights to any video, audio, or text files you upload to Capify. We do not claim ownership of your intellectual property. By uploading content, you grant Capify a temporary, non-exclusive license solely for the purpose of processing, transcribing, and rendering your videos.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900">4. Subscriptions and Payments</h2>
            <p className="mt-2">
              Certain features require a paid subscription. Billing occurs on a recurring basis according to your chosen plan. You may cancel your subscription at any time through your account settings.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900">5. Prohibited Uses</h2>
            <p className="mt-2">
              You agree not to use the Service to generate illegal, defamatory, obscene, or infringing content. Any abuse of automated transcription APIs or reverse-engineering attempts will result in immediate termination of access.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
