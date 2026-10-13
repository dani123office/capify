export type BlogCategory =
  | "Captions"
  | "Hooks & retention"
  | "Covers & thumbnails"
  | "AI media"
  | "Comparisons"
  | "Engineering"
  | "Workflow";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  readingTime: string;
  accent: string;
};

export const BLOG_CATEGORIES: BlogCategory[] = [
  "Captions",
  "Hooks & retention",
  "Covers & thumbnails",
  "AI media",
  "Comparisons",
  "Engineering",
  "Workflow",
];

export const POSTS: BlogPost[] = [
  {
    slug: "short-form-video-workflow",
    title: "A repeatable short-form workflow: claim to quality check",
    excerpt:
      "Claim, transcript, structure, captions, packaging, check. The six-step loop we use to ship a vertical short without guesswork.",
    category: "Workflow",
    readingTime: "7 min",
    accent: "from-indigo-500 to-blue-500",
  },
  {
    slug: "where-to-put-captions-vertical-video",
    title: "Where to put captions in a vertical video",
    excerpt:
      "A placement rule that survives Reels, TikTok, Shorts, platform controls, faces and the profile-grid crop.",
    category: "Captions",
    readingTime: "6 min",
    accent: "from-amber-500 to-orange-500",
  },
  {
    slug: "how-behind-subject-captions-work",
    title: "How behind-the-subject captions actually work",
    excerpt:
      "Browser WASM segmentation for instant preview plus GPU matting for export — and the compositing that sells the depth illusion.",
    category: "Engineering",
    readingTime: "9 min",
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    slug: "viral-caption-styles-psychology",
    title: "The psychology of high-retention caption styles",
    excerpt:
      "Box highlights, display emphasis, glows and behind-subject text — and the attention mechanism each one leans on.",
    category: "Captions",
    readingTime: "8 min",
    accent: "from-rose-500 to-pink-500",
  },
  {
    slug: "how-to-choose-ai-caption-generator",
    title: "How to choose an AI caption generator",
    excerpt:
      "A seven-test, 100-point benchmark you can run on one deliberately difficult clip before you pay for anything.",
    category: "Comparisons",
    readingTime: "10 min",
    accent: "from-emerald-500 to-teal-500",
  },
  {
    slug: "fix-auto-captions",
    title: "Six passes that fix any auto-caption export",
    excerpt:
      "Names, numbers, timing, line breaks, emphasis and the final file. A quality pass you can run in ten minutes.",
    category: "Captions",
    readingTime: "7 min",
    accent: "from-sky-500 to-cyan-500",
  },
  {
    slug: "reel-cover-size-safe-zone",
    title: "Reel cover size and safe zone, in one guide",
    excerpt:
      "Dimensions, interface bands and profile-grid crop behaviour so your cover survives every surface.",
    category: "Covers & thumbnails",
    readingTime: "5 min",
    accent: "from-orange-500 to-red-500",
  },
  {
    slug: "why-reels-get-no-views",
    title: "Why your Reels get no views",
    excerpt:
      "A four-branch diagnostic based on which part of the viewing funnel is actually broken.",
    category: "Hooks & retention",
    readingTime: "6 min",
    accent: "from-purple-500 to-indigo-500",
  },
  {
    slug: "talking-head-video-editing",
    title: "The seven-pass talking-head edit checklist",
    excerpt: "Tighten a creator-led talking-head video without adding visual noise.",
    category: "Workflow",
    readingTime: "8 min",
    accent: "from-teal-500 to-emerald-500",
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}
