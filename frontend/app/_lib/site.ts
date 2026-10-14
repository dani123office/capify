export const SITE = {
  name: "Capify",
  tagline: "AI video editor for short-form",
  url: "https://capify.ai",
  supportEmail: "hi@capify.ai",
  instagram: "https://www.instagram.com/",
  description:
    "Capify turns a raw talking-head clip into a post-ready vertical short — captions, hooks, covers and export, all in the browser.",
} as const;

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const TOOLS_NAV: NavItem[] = [
  {
    label: "Caption templates",
    href: "/caption-templates",
    description: "250+ designed caption styles across 14 families.",
  },
  {
    label: "Pricing",
    href: "/pricing",
    description: "Free to preview. Pay only when you export.",
  },
  {
    label: "How it works",
    href: "/#how-it-works",
    description: "From raw clip to finished short in four steps.",
  },
  {
    label: "FAQ",
    href: "/#faq",
    description: "Everything about minutes, plans and exports.",
  },
];

export const FOOTER_NAV: { title: string; items: NavItem[] }[] = [
  {
    title: "Product",
    items: [
      { label: "Home", href: "/" },
      { label: "Caption templates", href: "/caption-templates" },
      { label: "Pricing", href: "/pricing" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "AI thumbnail maker", href: "/tools/ai-thumbnail" },
      { label: "Video watermark remover", href: "/tools/watermark-remover" },
      { label: "Image cleaner", href: "/tools/ai-watermark-remover" },
    ],
  },
  {
    title: "Compare",
    items: [
      { label: "vs Captions.ai", href: "/compare/moonshot-vs-captions-ai" },
      { label: "vs VEED", href: "/compare/moonshot-vs-veed" },
      { label: "vs OpusClip", href: "/compare/moonshot-vs-opusclip" },
      { label: "Compare All", href: "/compare" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Blog", href: "/blog" },
      { label: "Help & FAQ", href: "/#faq" },
      { label: "Short-form guide", href: "/blog/short-form-video-workflow" },
      { label: "Caption safe zones", href: "/blog/where-to-put-captions-vertical-video" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Font Licences & Credits", href: "/licenses" },
      { label: "Copyright & IP", href: "/copyright" },
      { label: "Contact", href: "mailto:hi@capify.ai" },
    ],
  },
];
