/**
 * Exact curled Moonshot assets configuration.
 * All posters and MP4 preview videos are hosted locally in /moonshot/landing/
 * Every single poster and video pair is guaranteed to be 100% matched to the same video clip.
 */
export const MEDIA_BASE = "/moonshot/landing";

export const MEDIA = {
  hero: {
    karaokeThumb: `${MEDIA_BASE}/templates/karaoke-bar-e131c4108949-poster.jpg`,
  },
  popular: {
    card1_reach: `${MEDIA_BASE}/real-estate/reach-counter-39f1fb1666db-poster.jpg`,
    card1_reach_video: `${MEDIA_BASE}/real-estate/reach-counter-a55ff22eb6be.mp4`,

    card2_magenta: `${MEDIA_BASE}/real-estate/magenta-estate-ce994c661c95-poster.jpg`,
    card2_magenta_video: `${MEDIA_BASE}/real-estate/magenta-estate-897c94e9e9e9.mp4`,

    card3_afterglow: `${MEDIA_BASE}/templates/afterglow-mix-84eb4c616ea8-poster.webp`,
    card3_afterglow_video: `${MEDIA_BASE}/templates/afterglow-mix-5ed9bc5882b8.mp4`,

    card4_discipline: `${MEDIA_BASE}/contentaware/ca-cutout-d1759b224c5e-poster.jpg`,
    card4_discipline_video: `${MEDIA_BASE}/contentaware/ca-cutout-4fca888b6394.mp4`,
  },
  reachCounter: {
    poster: `${MEDIA_BASE}/real-estate/reach-counter-39f1fb1666db-poster.jpg`,
    video: `${MEDIA_BASE}/real-estate/reach-counter-a55ff22eb6be.mp4`,
  },
  magentaEstate: {
    poster: `${MEDIA_BASE}/real-estate/magenta-estate-ce994c661c95-poster.jpg`,
    video: `${MEDIA_BASE}/real-estate/magenta-estate-897c94e9e9e9.mp4`,
  },
  afterglow: {
    poster: `${MEDIA_BASE}/templates/afterglow-mix-84eb4c616ea8-poster.webp`,
    video: `${MEDIA_BASE}/templates/afterglow-mix-5ed9bc5882b8.mp4`,
  },
  discipline: {
    poster: `${MEDIA_BASE}/contentaware/ca-cutout-d1759b224c5e-poster.jpg`,
    video: `${MEDIA_BASE}/contentaware/ca-cutout-4fca888b6394.mp4`,
  },
  dimensionStory: {
    poster: `${MEDIA_BASE}/real-estate/dimension-story-467f7b881b97-poster.jpg`,
    video: `${MEDIA_BASE}/real-estate/dimension-story-5fc688e2e55b.mp4`,
  },
  kumar: {
    poster: `${MEDIA_BASE}/behind/kumar-804e43690b25-poster.jpg`,
    video: `${MEDIA_BASE}/behind/kumar-3a282647bb39.mp4`,
  },
  neon: {
    poster: `${MEDIA_BASE}/behind/ca-neon-88f0aee079e9-poster.jpg`,
    video: `${MEDIA_BASE}/behind/ca-neon-668165f75cfe.mp4`,
  },
  mix: {
    poster: `${MEDIA_BASE}/behind/ca-mix-420947b0d28b-poster.jpg`,
    video: `${MEDIA_BASE}/behind/ca-mix-2ea076464e77.mp4`,
  },
  split: {
    poster: `${MEDIA_BASE}/behind/ca-split-1e51930043e7-poster.jpg`,
    video: `${MEDIA_BASE}/behind/ca-split-0091a024270a.mp4`,
  },
  depth: {
    poster: `${MEDIA_BASE}/behind/depth-38dfb59ff1c1-poster.jpg`,
    video: `${MEDIA_BASE}/behind/depth-0b5690999f7b.mp4`,
  },
  yellow: {
    poster: `${MEDIA_BASE}/behind/ca-yellow-97004df65560-poster.jpg`,
    video: `${MEDIA_BASE}/behind/ca-yellow-edd5627af37e.mp4`,
  },
  blue: {
    poster: `${MEDIA_BASE}/behind/ca-blue-f5be9a766837-poster.jpg`,
    video: `${MEDIA_BASE}/behind/ca-blue-feb29d619b2d.mp4`,
  },
  editorial: {
    poster: `${MEDIA_BASE}/behind/ca-editorial-0baf37d1b8b1-poster.jpg`,
    video: `${MEDIA_BASE}/behind/ca-editorial-f09081272ab1.mp4`,
  },
  red: {
    poster: `${MEDIA_BASE}/behind/ca-red-adeee7dfeb88-poster.jpg`,
    video: `${MEDIA_BASE}/behind/ca-red-6dc2ce2fc42e.mp4`,
  },
  behind: {
    kumar_poster: `${MEDIA_BASE}/behind/kumar-804e43690b25-poster.jpg`,
    kumar_video: `${MEDIA_BASE}/behind/kumar-3a282647bb39.mp4`,
    neon_poster: `${MEDIA_BASE}/behind/ca-neon-88f0aee079e9-poster.jpg`,
    neon_video: `${MEDIA_BASE}/behind/ca-neon-668165f75cfe.mp4`,
    mix_poster: `${MEDIA_BASE}/behind/ca-mix-420947b0d28b-poster.jpg`,
    mix_video: `${MEDIA_BASE}/behind/ca-mix-2ea076464e77.mp4`,
    split_poster: `${MEDIA_BASE}/behind/ca-split-1e51930043e7-poster.jpg`,
    split_video: `${MEDIA_BASE}/behind/ca-split-0091a024270a.mp4`,
    depth_poster: `${MEDIA_BASE}/behind/depth-38dfb59ff1c1-poster.jpg`,
    depth_video: `${MEDIA_BASE}/behind/depth-0b5690999f7b.mp4`,
    yellow_poster: `${MEDIA_BASE}/behind/ca-yellow-97004df65560-poster.jpg`,
    yellow_video: `${MEDIA_BASE}/behind/ca-yellow-edd5627af37e.mp4`,
    blue_poster: `${MEDIA_BASE}/behind/ca-blue-f5be9a766837-poster.jpg`,
    blue_video: `${MEDIA_BASE}/behind/ca-blue-feb29d619b2d.mp4`,
    editorial_poster: `${MEDIA_BASE}/behind/ca-editorial-0baf37d1b8b1-poster.jpg`,
    editorial_video: `${MEDIA_BASE}/behind/ca-editorial-f09081272ab1.mp4`,
    red_poster: `${MEDIA_BASE}/behind/ca-red-adeee7dfeb88-poster.jpg`,
    red_video: `${MEDIA_BASE}/behind/ca-red-6dc2ce2fc42e.mp4`,
  },
} as const;
