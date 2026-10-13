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
  pro?: boolean;
};

export const TEMPLATE_FAMILIES: { id: string; label: string; badge: string }[] = [
  { id: "popular", label: "Popular", badge: "AI" },
  { id: "behind_person", label: "Behind the Person", badge: "PRO" },
  { id: "spatial", label: "Spatial", badge: "3D" },
  { id: "ai_edits", label: "AI Edits", badge: "AI" },
  { id: "multiline", label: "Multiline", badge: "AI" },
  { id: "dynamic", label: "Dynamic", badge: "AI" },
  { id: "editorial", label: "Editorial", badge: "AI" },
  { id: "creators", label: "Creators", badge: "AI" },
  { id: "desi", label: "Desi", badge: "HI" },
  { id: "social", label: "Social", badge: "AI" },
];

export const TEMPLATES: Template[] = [
  {
    id: "kumar",
    name: "Kumar",
    family: "Behind the Person",
    badge: "POPULAR",
    font: "Playfair Display",
    accentFont: "Poppins",
    treatment: "Behind subject • red serif",
    poster: MEDIA.realEstate.reachCounter,
    pro: true,
  },
  {
    id: "magenta-estate",
    name: "Magenta Estate",
    family: "Dynamic",
    badge: "POPULAR",
    font: "Montserrat Black",
    accentFont: "Montserrat",
    treatment: "Glow & banner",
    poster: MEDIA.realEstate.magentaEstate,
  },
  {
    id: "afterglow-mix",
    name: "Afterglow Mix",
    family: "Creators",
    badge: "TRENDING",
    font: "Josefin Sans",
    accentFont: "Josefin Sans",
    treatment: "Kinetic glow",
    poster: MEDIA.templates.afterglowMix,
  },
  {
    id: "discipline",
    name: "Discipline",
    family: "Editorial",
    badge: "PRO",
    font: "Didot / Serif",
    accentFont: "Inter",
    treatment: "Magazine 3D stack",
    poster: MEDIA.contentAware.cutout,
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
    poster: MEDIA.realEstate.dimensionStory,
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
    poster: MEDIA.contentAware.goldenHour,
  },
  {
    id: "ghostline",
    name: "Ghostline",
    family: "Multiline",
    badge: "NEW",
    font: "Anton",
    accentFont: "Anton",
    treatment: "Stacked outline",
    poster: MEDIA.contentAware.ghostline,
  },
  {
    id: "aura",
    name: "Aura",
    family: "Multiline",
    badge: "AI",
    font: "Montserrat",
    accentFont: "Caveat",
    treatment: "Soft multiline",
    poster: MEDIA.multiline.aura,
  },
  {
    id: "checkpoint",
    name: "Checkpoint",
    family: "Dynamic",
    badge: "AI",
    font: "Plus Jakarta Sans",
    accentFont: "Plus Jakarta Sans",
    treatment: "Karaoke colour flip",
    poster: MEDIA.realEstate.reachCounter,
  },
  {
    id: "highlighter",
    name: "Highlighter",
    family: "Social",
    badge: "AI",
    font: "Inter",
    accentFont: "Inter",
    treatment: "Box highlight",
    poster: MEDIA.templates.afterglowMix,
  },
  {
    id: "neon-drop",
    name: "Neon Drop",
    family: "Spatial",
    badge: "AI",
    font: "Anton",
    accentFont: "Anton",
    treatment: "Neon glow",
    poster: MEDIA.contentAware.goldenHour,
    pro: true,
  },
  {
    id: "bollywood",
    name: "Bollywood",
    family: "Desi",
    badge: "DESI",
    font: "Biryani",
    accentFont: "Kalam",
    treatment: "Hinglish word pop",
    poster: MEDIA.realEstate.magentaEstate,
  },
  {
    id: "script-pop",
    name: "Script Pop",
    family: "Playful",
    badge: "CREATOR",
    font: "Caveat",
    accentFont: "Poppins",
    treatment: "Handwritten accent",
    poster: MEDIA.multiline.aura,
  },
  {
    id: "paper-cut",
    name: "Paper Cut",
    family: "Editorial",
    badge: "AI",
    font: "Playfair Display",
    accentFont: "Josefin Sans",
    treatment: "Editorial serif",
    poster: MEDIA.contentAware.cutout,
  },
  {
    id: "impact-stack",
    name: "Impact Stack",
    family: "Dynamic",
    badge: "AI",
    font: "Bebas Neue",
    accentFont: "Bebas Neue",
    treatment: "Squash & stretch",
    poster: MEDIA.contentAware.ghostline,
  },
  {
    id: "soft-focus",
    name: "Soft Focus",
    family: "Creators",
    badge: "AI",
    font: "Josefin Sans",
    accentFont: "Inter",
    treatment: "Blur-in reveal",
    poster: MEDIA.realEstate.dimensionStory,
  },
];

export const POPULAR_TEMPLATES = TEMPLATES.filter((t) =>
  ["kumar", "magenta-estate", "afterglow-mix", "discipline", "dimension-story", "golden-hour"].includes(
    t.id,
  ),
);

export function getTemplate(id: string): Template | undefined {
  return TEMPLATES.find((t) => t.id === id);
}

/**
 * Maps a front-end template id to a render template bundled with the FastAPI
 * engine (see backend/behind_caption/templates/*.json). The engine ships four
 * base looks, so richer web templates fall back to the closest match.
 */
export const BACKEND_TEMPLATE_BY_ID: Record<string, string> = {
  kumar: "editorial",
  "magenta-estate": "dynamic",
  "afterglow-mix": "creator_yellow",
  discipline: "editorial",
  "dimension-story": "dynamic",
  "golden-hour": "creator_yellow",
  ghostline: "dynamic",
  aura: "luxe",
  checkpoint: "dynamic",
  highlighter: "creator_yellow",
  "neon-drop": "luxe",
  bollywood: "dynamic",
  "script-pop": "creator_yellow",
  "paper-cut": "editorial",
  "impact-stack": "dynamic",
  "soft-focus": "luxe",
};

export function backendTemplateFor(id: string): string {
  return BACKEND_TEMPLATE_BY_ID[id] ?? "dynamic";
}
