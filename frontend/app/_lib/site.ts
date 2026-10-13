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
    ],
  },
  {
    title: "Compare",
    items: [
      { label: "Capify vs Captions.ai", href: "/compare#captions-ai" },
      { label: "Capify vs Submagic", href: "/compare#submagic" },
      { label: "Capify vs OpusClip", href: "/compare#opusclip" },
      { label: "Capify vs CapCut", href: "/compare#capcut" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Blog", href: "/blog" },
      { label: "Help & FAQ", href: "/#faq" },
      { label: "AI caption generator", href: "/#editor" },
      { label: "Text behind person", href: "/#how-it-works" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "/compare" },
      { label: "Contact", href: "mailto:hi@capify.ai" },
      { label: "Terms", href: "/compare" },
      { label: "Privacy", href: "/compare" },
    ],
  },
];
