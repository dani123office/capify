/**
 * Real curled Moonshot assets configuration.
 * All posters and MP4 preview videos are hosted locally in /moonshot/landing/behind/
 */
export const MEDIA_BASE = "/moonshot/landing/behind";

export const MEDIA = {
  kumar: {
    poster: `${MEDIA_BASE}/kumar-360b77edb0ba-poster.jpg`,
    video: `${MEDIA_BASE}/kumar-84cdeaf52994.mp4`,
  },
  neon: {
    poster: `${MEDIA_BASE}/ca-neon-39f5be0f2f3c-poster.jpg`,
    video: `${MEDIA_BASE}/ca-neon-5709d9cdbf1e.mp4`,
  },
  mix: {
    poster: `${MEDIA_BASE}/ca-mix-c5b8aea4dd2a-poster.jpg`,
    video: `${MEDIA_BASE}/ca-mix-69c6b78a1ff6.mp4`,
  },
  split: {
    poster: `${MEDIA_BASE}/ca-split-4e05f91fa280-poster.jpg`,
    video: `${MEDIA_BASE}/ca-split-fd2e5b693bdf.mp4`,
  },
  depth: {
    poster: `${MEDIA_BASE}/depth-bfdfff4acd47-poster.jpg`,
    video: `${MEDIA_BASE}/depth-ad83f33e759c.mp4`,
  },
  yellow: {
    poster: `${MEDIA_BASE}/ca-yellow-921777b92c5c-poster.jpg`,
    video: `${MEDIA_BASE}/ca-yellow-8e17cb47c914.mp4`,
  },
  blue: {
    poster: `${MEDIA_BASE}/ca-blue-c9268363e9af-poster.jpg`,
    video: `${MEDIA_BASE}/ca-blue-1f6856cf72ea.mp4`,
  },
  editorial: {
    poster: `${MEDIA_BASE}/ca-editorial-f23cc9529991-poster.jpg`,
    video: `${MEDIA_BASE}/ca-editorial-9e20ec82a9a2.mp4`,
  },
  red: {
    poster: `${MEDIA_BASE}/ca-red-6ee6408780ae-poster.jpg`,
    video: `${MEDIA_BASE}/ca-red-e5ddc27493fe.mp4`,
  },
} as const;
