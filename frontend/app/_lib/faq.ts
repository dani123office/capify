export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "What exactly does Capify do?",
    a: "You upload a talking-head clip, pick a designed caption style, and clean up the words in the transcript. Capify writes a hook line, builds cover options, and exports a post-ready vertical MP4 (1080×1920) for Reels, TikTok and Shorts.",
  },
  {
    q: "Do I need to edit on a timeline?",
    a: "No. The transcript is the editor. Click a word to change it, cut filler, or tighten a line — the caption track resyncs automatically. There is no timeline to drag.",
  },
  {
    q: "How many caption templates are there?",
    a: "Over 250 active templates across 14 families, including Behind the Person, Spatial (3D), AI Edits, Multiline, Dynamic, Editorial, Creators, Desi and Social. Each template sets the font pairing, colour, placement and per-word motion.",
  },
  {
    q: "What is 'behind the subject' text?",
    a: "Words render behind the speaker for a layered depth look — live in the editor preview and pixel-accurate in the export. It is available on the Pro plan and uses subject matting on every frame.",
  },
  {
    q: "Can I export on the free plan?",
    a: "Free is preview-only and includes five one-time minutes for videos up to five minutes each. Export and download start on the Creator plan.",
  },
  {
    q: "How do shared minutes work?",
    a: "Paid plans include a weekly allowance shared between export and transcription. Export minutes charged against a plan are returned automatically when a render fails.",
  },
  {
    q: "Which languages are supported?",
    a: "Word-level transcription works across English and major languages, with dedicated handling for Hindi, Hinglish and other Indic languages and the matching Desi caption styles.",
  },
  {
    q: "What input files can I upload?",
    a: "MP4, MOV and WebM video, plus MP3, WAV and M4A audio. Paid plans accept clips up to 120 minutes within the plan's processing minutes.",
  },
];
