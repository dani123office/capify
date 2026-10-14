import { MEDIA } from "./media";

export type TemplateFamily =
  | "Behind the Person"
  | "Spatial"
  | "AI Edits"
  | "Multiline"
  | "Dynamic"
  | "Editorial"
  | "Creators"
  | "Desi"
  | "Social"
  | "Playful";

export type TemplateBadge =
  | "POPULAR"
  | "TRENDING"
  | "NEW"
  | "PRO"
  | "CREATOR"
  | "DESI"
  | "AI"
  | null;

export type Template = {
  id: string;
  name: string;
  family: TemplateFamily;
  badge: TemplateBadge;
  /** Primary display font used for the sentence. */
  font: string;
  /** Accent font used for emphasised words. */
  accentFont: string;
  /** Short chip describing the motion / treatment. */
  treatment: string;
  poster: string;
  video?: string;
  pro?: boolean;
};

export const TEMPLATE_FAMILIES: { id: string; label: string; badge: string }[] = [
  { id: "popular", label: "Popular", badge: "AI" },
  { id: "ai_edits", label: "AI Edits", badge: "AI" },
  { id: "real_estate", label: "Real Estate", badge: "AI" },
  { id: "spatial", label: "Spatial", badge: "AI" },
  { id: "behind_person", label: "Behind the Person", badge: "AI" },
];

export const TEMPLATES: Template[] = [
  {
    id: "headliner",
    name: "Headliner",
    family: "Multiline",
    badge: "POPULAR",
    font: "Bebas Neue",
    accentFont: "Caveat",
    treatment: "Red condensed type against script",
    poster: MEDIA.headliner.poster,
    video: MEDIA.headliner.video,
  },
  {
    id: "blue-muse",
    name: "Blue Muse",
    family: "Multiline",
    badge: "POPULAR",
    font: "Playfair Display",
    accentFont: "Inter",
    treatment: "Playfair italic • ice-blue uppercase",
    poster: MEDIA.blueMuse.poster,
    video: MEDIA.blueMuse.video,
  },
  {
    id: "tabahi",
    name: "Tabahi",
    family: "Desi",
    badge: "TRENDING",
    font: "Bangers",
    accentFont: "Montserrat",
    treatment: "Full hype • comic caps Hinglish",
    poster: MEDIA.tabahi.poster,
    video: MEDIA.tabahi.video,
  },
  {
    id: "moments-pop",
    name: "Moments Pop",
    family: "AI Edits",
    badge: "PRO",
    font: "Inter Tight",
    accentFont: "Inter",
    treatment: "Bold lime & pink cards with stickers",
    poster: MEDIA.momentsPop.poster,
    video: MEDIA.momentsPop.video,
    pro: true,
  },
  {
    id: "dimension-story",
    name: "Dimension Story",
    family: "Spatial",
    badge: "NEW",
    font: "Bebas Neue",
    accentFont: "Bebas Neue",
    treatment: "3D spatial text",
    poster: MEDIA.dimensionStory.poster,
    video: MEDIA.dimensionStory.video,
    pro: true,
  },
  {
    id: "golden-hour",
    name: "Golden Hour",
    family: "Creators",
    badge: "CREATOR",
    font: "Playfair Display",
    accentFont: "Inter",
    treatment: "Cinematic warmth",
    poster: MEDIA.yellow.poster,
    video: MEDIA.yellow.video,
  },
  {
    id: "ghostline",
    name: "Ghostline",
    family: "Multiline",
    badge: "NEW",
    font: "Anton",
    accentFont: "Anton",
    treatment: "Stacked outline",
    poster: MEDIA.blue.poster,
    video: MEDIA.blue.video,
  },
  {
    id: "aura",
    name: "Aura",
    family: "Multiline",
    badge: "AI",
    font: "Montserrat",
    accentFont: "Caveat",
    treatment: "Soft multiline",
    poster: MEDIA.editorial.poster,
    video: MEDIA.editorial.video,
  },
  {
    id: "red-punch",
    name: "Red Punch",
    family: "Behind the Person",
    badge: "POPULAR",
    font: "Archivo Black",
    accentFont: "Poppins",
    treatment: "Behind subject • bold punch",
    poster: MEDIA.red.poster,
    video: MEDIA.red.video,
    pro: true,
  },
  {
    id: "spatial-glow",
    name: "Spatial Glow",
    family: "Spatial",
    badge: "TRENDING",
    font: "Inter Tight",
    accentFont: "Inter",
    treatment: "Depth extrusion",
    poster: MEDIA.depth.poster,
    video: MEDIA.depth.video,
    pro: true,
  },
  {
    id: "neon-reel",
    name: "Neon Reel",
    family: "Social",
    badge: "POPULAR",
    font: "Black Han Sans",
    accentFont: "Poppins",
    treatment: "High-contrast neon",
    poster: MEDIA.neon.poster,
    video: MEDIA.neon.video,
  },
  {
    id: "desi-impact",
    name: "Desi Impact",
    family: "Desi",
    badge: "DESI",
    font: "Anek Devanagari",
    accentFont: "Poppins",
    treatment: "Hindi / Hinglish punch",
    poster: MEDIA.kumar.poster,
    video: MEDIA.kumar.video,
  },
  {
    id: "ai-velocity",
    name: "AI Velocity",
    family: "AI Edits",
    badge: "AI",
    font: "Bebas Neue",
    accentFont: "Inter",
    treatment: "Smart cut-to-beat",
    poster: MEDIA.mix.poster,
    video: MEDIA.mix.video,
  },
  {
    id: "slow-mornings",
    name: "Slow Mornings",
    family: "Editorial",
    badge: "NEW",
    font: "Libre Baskerville",
    accentFont: "Inter",
    treatment: "Cream italic fade",
    poster: MEDIA.editorial.poster,
    video: MEDIA.editorial.video,
  },
  {
    id: "clean-sub",
    name: "Clean Sub",
    family: "Social",
    badge: "AI",
    font: "Inter Bold",
    accentFont: "Inter",
    treatment: "Minimal pill subtitle",
    poster: MEDIA.blue.poster,
    video: MEDIA.blue.video,
  },
  {
    id: "hormozi-green",
    name: "Hormozi Punch",
    family: "Creators",
    badge: "POPULAR",
    font: "Montserrat Black",
    accentFont: "Montserrat",
    treatment: "Acid green caps",
    poster: MEDIA.yellow.poster,
    video: MEDIA.yellow.video,
  },
];

export const POPULAR_TEMPLATES = TEMPLATES.filter((t) => t.badge !== null);

export function backendTemplateFor(templateId: string): string {
  const map: Record<string, string> = {
    kumar: "kumar",
    "magenta-estate": "magenta_estate",
    "afterglow-mix": "afterglow",
    discipline: "discipline",
    "dimension-story": "spatial",
    "golden-hour": "golden_hour",
    ghostline: "ghostline",
    aura: "aura",
    "red-punch": "red_punch",
    "neon-reel": "neon",
    "desi-impact": "desi",
    "slow-mornings": "editorial",
    "hormozi-green": "hormozi",
  };
  return map[templateId] ?? templateId;
}

export function getTemplate(id: string): Template | undefined {
  return TEMPLATES.find((t) => t.id === id);
}
