import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { POSTS, getPost } from "../../_lib/blog";
import { CtaBand } from "../../_components/sections/CtaBand";

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found" };
  return { title: post.title, description: post.excerpt };
}

const SECTIONS = [
  {
    heading: "Why it matters",
    body: "Most short-form advice optimises for the wrong thing. A caption that reads beautifully at a desk can vanish on a phone in bright light, and a hook that sounds sharp in your head can lose the first second on autoplay. Start from where the viewer actually is.",
  },
  {
    heading: "A rule you can reuse",
    body: "Treat every choice as either a clarity win or a distraction. If a style, animation or cut does not help a first-time viewer understand the line faster, it is working against the video. Capify templates are built around that trade-off by design.",
  },
  {
    heading: "Putting it into practice",
    body: "Upload the clip, pick the closest style, then clean the transcript until the words carry the meaning on their own. Add a hook line, choose a cover, and export. The whole pass should take minutes, not an afternoon.",
  },
];

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main className="relative overflow-x-hidden">
      <div className="blueprint-grid pointer-events-none fixed inset-0 z-0 opacity-[0.6]" />

      <article className="relative z-10 mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-brand hover:text-brand-600"
        >
          <ArrowRight className="h-3.5 w-3.5 rotate-180" /> Back to blog
        </Link>

        <div className={`mt-6 h-1.5 w-16 rounded-full bg-gradient-to-r ${post.accent}`} />

        <p className="mt-5 text-xs font-bold uppercase tracking-wide text-slate-400">
          {post.category} • {post.readingTime}
        </p>
        <h1 className="mt-3 font-serif text-3xl tracking-tight text-slate-950 sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-600">
          {post.excerpt}
        </p>

        <div className="mt-10 space-y-8">
          {SECTIONS.map((section) => (
            <section key={section.heading}>
              <h2 className="font-serif text-xl tracking-tight text-slate-950 sm:text-2xl">
                {section.heading}
              </h2>
              <p className="mt-3 text-base leading-8 text-slate-600">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </article>

      <CtaBand />
    </main>
  );
}
