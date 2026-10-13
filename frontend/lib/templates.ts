// Auto-generated Moonshot 1-to-1 reverse-engineered template definitions
export interface CaptionTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  fontFamily: string;
  fontStyle: string;
  textTransform: string;
  fontSizePx: number;
  color: string;
  emphasisColor: string;
  captionEffect: string;
  animIn: string;
  strokeColor: string;
  strokePx: number;
  behindSubject: boolean;
  behindScale: number;
  positionYPct: number;
  maxWordsPerLine: number;
  letterSpacingEm: number;
  textGradient?: string[];
  rawConfig: Record<string, any>;
}

import templatesData from "./templates_db.json";

export const TEMPLATES: CaptionTemplate[] = templatesData.flatMap((t) =>
  Array.isArray(t.textGradient) ? [t as unknown as CaptionTemplate] : [],
);

export const CATEGORIES = Array.from(new Set(TEMPLATES.map((t) => t.category)));

export function getTemplateById(id: string): CaptionTemplate | undefined {
  return TEMPLATES.find((t) => t.id === id);
}
