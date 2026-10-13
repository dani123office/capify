export type BillingCycle = "weekly" | "monthly" | "yearly";

export type Plan = {
  id: "free" | "creator" | "pro";
  name: string;
  tagline: string;
  accent: "slate" | "indigo" | "violet";
  highlight?: boolean;
  prices: Record<BillingCycle, number | null>;
  cta: string;
  features: string[];
  footnote?: string;
};

export const BILLING_CYCLES: { id: BillingCycle; label: string; hint: string }[] = [
  { id: "weekly", label: "Weekly", hint: "Try it for one post" },
  { id: "monthly", label: "Monthly", hint: "Save ~25%" },
  { id: "yearly", label: "Yearly", hint: "Save ~33%" },
];

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    tagline: "Build and preview without a card.",
    accent: "slate",
    prices: { weekly: 0, monthly: 0, yearly: 0 },
    cta: "Start free",
    features: [
      "5 one-time preview minutes",
      "Videos up to 5 minutes each",
      "Standard captions + transcript editor",
      "15 AI credits for 90 days",
      "No export or download",
    ],
    footnote: "$0 forever",
  },
  {
    id: "creator",
    name: "Creator",
    tagline: "Export and publish every week.",
    accent: "indigo",
    highlight: true,
    prices: { weekly: 3, monthly: 9, yearly: 84 },
    cta: "Choose Creator",
    features: [
      "Everything in Free",
      "Export and download MP4",
      "Creator caption template family",
      "45 shared minutes a week",
      "One lifetime AI thumbnail preview",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Every template and the depth look.",
    accent: "violet",
    prices: { weekly: 6, monthly: 18, yearly: 144 },
    cta: "Choose Pro",
    features: [
      "Everything in Creator",
      "Behind-the-subject captions",
      "Dynamic AI backgrounds + AI Edits",
      "Every caption template",
      "60 shared minutes a week",
    ],
  },
];

export function formatPrice(amount: number): string {
  if (amount === 0) return "$0";
  return `$${Number.isInteger(amount) ? amount : amount.toFixed(2)}`;
}
