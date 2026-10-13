/**
 * Real curled Moonshot assets configuration.
 * All posters and MP4 preview videos are hosted locally in /moonshot/landing/
 */
export const MEDIA_BASE = "/moonshot/landing";

export const MEDIA = {
  hero: {
    karaokeThumb: `${MEDIA_BASE}/templates/karaoke-bar-e131c4108949-poster.jpg`,
  },
  popular: {
    card1_reach: `${MEDIA_BASE}/real-estate/reach-counter-7d8ceee71a96-poster.jpg`,
    card2_magenta: `${MEDIA_BASE}/real-estate/magenta-estate-3541bcb5526e-poster.jpg`,
    card3_afterglow: `${MEDIA_BASE}/templates/afterglow-mix-e0415548f933-poster.webp`,
    card4_discipline: `${MEDIA_BASE}/contentaware/ca-cutout-1ee462e5c02a-poster.jpg`,
  },
  kumar: {
    poster: `${MEDIA_BASE}/real-estate/reach-counter-7d8ceee71a96-poster.jpg`,
    video: `${MEDIA_BASE}/behind/kumar-84cdeaf52994.mp4`,
  },
  neon: {
    poster: `${MEDIA_BASE}/real-estate/magenta-estate-3541bcb5526e-poster.jpg`,
    video: `${MEDIA_BASE}/behind/ca-neon-5709d9cdbf1e.mp4`,
  },
  mix: {
    poster: `${MEDIA_BASE}/templates/afterglow-mix-e0415548f933-poster.webp`,
    video: `${MEDIA_BASE}/behind/ca-mix-69c6b78a1ff6.mp4`,
  },
  split: {
    poster: `${MEDIA_BASE}/contentaware/ca-cutout-1ee462e5c02a-poster.jpg`,
    video: `${MEDIA_BASE}/behind/ca-split-fd2e5b693bdf.mp4`,
  },
  depth: {
    poster: `${MEDIA_BASE}/behind/depth-bfdfff4acd47-poster.jpg`,
    video: `${MEDIA_BASE}/behind/depth-ad83f33e759c.mp4`,
  },
  yellow: {
    poster: `${MEDIA_BASE}/behind/ca-yellow-921777b92c5c-poster.jpg`,
    video: `${MEDIA_BASE}/behind/ca-yellow-8e17cb47c914.mp4`,
  },
  blue: {
    poster: `${MEDIA_BASE}/behind/ca-blue-c9268363e9af-poster.jpg`,
    video: `${MEDIA_BASE}/behind/ca-blue-1f6856cf72ea.mp4`,
  },
  editorial: {
    poster: `${MEDIA_BASE}/behind/ca-editorial-f23cc9529991-poster.jpg`,
    video: `${MEDIA_BASE}/behind/ca-editorial-9e20ec82a9a2.mp4`,
  },
  red: {
    poster: `${MEDIA_BASE}/behind/ca-red-6ee6408780ae-poster.jpg`,
    video: `${MEDIA_BASE}/behind/ca-red-e5ddc27493fe.mp4`,
  },
  behind: {
    kumar_poster: `${MEDIA_BASE}/real-estate/reach-counter-7d8ceee71a96-poster.jpg`,
    kumar_video: `${MEDIA_BASE}/behind/kumar-84cdeaf52994.mp4`,
    neon_poster: `${MEDIA_BASE}/real-estate/magenta-estate-3541bcb5526e-poster.jpg`,
    neon_video: `${MEDIA_BASE}/behind/ca-neon-5709d9cdbf1e.mp4`,
    mix_poster: `${MEDIA_BASE}/templates/afterglow-mix-e0415548f933-poster.webp`,
    mix_video: `${MEDIA_BASE}/behind/ca-mix-69c6b78a1ff6.mp4`,
    split_poster: `${MEDIA_BASE}/contentaware/ca-cutout-1ee462e5c02a-poster.jpg`,
    split_video: `${MEDIA_BASE}/behind/ca-split-fd2e5b693bdf.mp4`,
    depth_poster: `${MEDIA_BASE}/behind/depth-bfdfff4acd47-poster.jpg`,
    depth_video: `${MEDIA_BASE}/behind/depth-ad83f33e759c.mp4`,
    yellow_poster: `${MEDIA_BASE}/behind/ca-yellow-921777b92c5c-poster.jpg`,
    yellow_video: `${MEDIA_BASE}/behind/ca-yellow-8e17cb47c914.mp4`,
    blue_poster: `${MEDIA_BASE}/behind/ca-blue-c9268363e9af-poster.jpg`,
    blue_video: `${MEDIA_BASE}/behind/ca-blue-1f6856cf72ea.mp4`,
    editorial_poster: `${MEDIA_BASE}/behind/ca-editorial-f23cc9529991-poster.jpg`,
    editorial_video: `${MEDIA_BASE}/behind/ca-editorial-9e20ec82a9a2.mp4`,
    red_poster: `${MEDIA_BASE}/behind/ca-red-6ee6408780ae-poster.jpg`,
    red_video: `${MEDIA_BASE}/behind/ca-red-e5ddc27493fe.mp4`,
  },
} as const;
