import type { Metadata } from "next";
import { PageHero } from "../_components/PageHero";
import { BlogList } from "../_components/blog/BlogList";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guides on captions, hooks, retention, covers and the workflow behind short-form video that actually gets watched.",
};

export default function BlogIndexPage() {
  return (
    <main className="relative overflow-x-hidden">
      <div className="blueprint-grid pointer-events-none fixed inset-0 z-0 opacity-[0.6]" />

      <PageHero
        badge="Blog"
        title="Guides for short-form creators"
        subtitle="Practical, opinionated writing on captions, retention, covers and shipping a vertical short you are proud of."
      />

      <BlogList />
    </main>
  );
}
