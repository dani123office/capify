import type { Metadata } from "next";
import { PageHero } from "../_components/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Capify collects, protects, and handles your data.",
};

export default function PrivacyPage() {
  return (
    <main className="relative overflow-x-hidden">
      <div className="blueprint-grid pointer-events-none fixed inset-0 z-0 opacity-[0.6]" />

      <PageHero
        badge="Legal"
        title="Privacy Policy"
        subtitle="Last updated: October 2026. Your privacy and video data security are our top priority."
      />

      <section className="relative z-10 mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-10 shadow-sm space-y-8 text-slate-600 text-sm leading-relaxed">
          <div>
            <h2 className="text-base font-bold text-slate-900">1. Information We Collect</h2>
            <p className="mt-2">
              We collect account information (such as your email address and name) when you register, as well as transient media files (videos, audio recordings, and subtitle files) that you upload for processing.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900">2. Media File Retention and Deletion</h2>
            <p className="mt-2">
              Uploaded video clips and rendered output files are automatically purged from our temporary processing servers after 24 hours. We never sell your videos or use your personal creative content to train public AI models without explicit opt-in consent.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900">3. Transcription and Speech Processing</h2>
            <p className="mt-2">
              Speech-to-text transcription is conducted using secure inference engines. Audio tracks are parsed strictly to extract timestamped dialogue for subtitles and are deleted promptly following job completion.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900">4. Cookies and Analytics</h2>
            <p className="mt-2">
              We use minimal, privacy-friendly cookies to maintain your login session and preserve UI preferences (such as selected caption styles and theme).
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900">5. Contacting Us</h2>
            <p className="mt-2">
              If you have any questions or data deletion requests regarding this policy, please reach out to privacy@capify.ai.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
