/**
 * Central media configuration.
 *
 * NOTE: poster URLs currently point at the public reference CDN so the clone
 * looks right during local development. Replace `MEDIA_BASE` (or the individual
 * entries) with your own licensed assets before deploying — these are
 * third-party marketing images.
 */
export const MEDIA_BASE = "/moonshot/landing";

export const MEDIA = {
  realEstate: {
    reachCounter: `${MEDIA_BASE}/real-estate/reach-counter-7d8ceee71a96-poster.jpg`,
    magentaEstate: `${MEDIA_BASE}/real-estate/magenta-estate-3541bcb5526e-poster.jpg`,
    dimensionStory: `${MEDIA_BASE}/real-estate/dimension-story-ba1acfd1da9d-poster.jpg`,
  },
  templates: {
    afterglowMix: `${MEDIA_BASE}/templates/afterglow-mix-e0415548f933-poster.webp`,
  },
  contentAware: {
    goldenHour: `${MEDIA_BASE}/contentaware/golden-hour-v2-poster.jpg`,
    ghostline: `${MEDIA_BASE}/contentaware/ghostline-v2-poster.jpg`,
    cutout: `${MEDIA_BASE}/contentaware/ca-cutout-1ee462e5c02a-poster.jpg`,
  },
  multiline: {
    aura: `${MEDIA_BASE}/multiline/ml-aura-061aa4b4fa90-poster.jpg`,
  },
} as const;
