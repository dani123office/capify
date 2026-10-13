import {
  Captions,
  Languages,
  Layers,
  MonitorPlay,
  MousePointerClick,
  Sparkles,
  Type,
  Wand2,
} from "lucide-react";

const FEATURES = [
  {
    icon: Captions,
    title: "Word-level AI captions",
    body: "Emphasis-aware transcription with word-level timestamps, so every emphasised word lands where you want it.",
  },
  {
    icon: Type,
    title: "Transcript-first editing",
    body: "Click any word to change it, cut filler, or tighten a line. The caption track stays in sync in real time.",
  },
  {
    icon: Layers,
    title: "Behind-the-subject depth",
    body: "Send words behind the speaker for the layered look — previewed live and pixel-accurate in the export.",
    pro: true,
  },
  {
    icon: Wand2,
    title: "Dynamic AI backgrounds",
    body: "One-click music-video treatments that paint scenes and cutaways around your kinetic captions.",
    pro: true,
  },
  {
    icon: Sparkles,
    title: "AI hooks + thumbnails",
    body: "Surface the strongest opening lines from your own transcript and generate cover options from the clip.",
  },
  {
    icon: Languages,
    title: "Hindi, Hinglish & Indic",
    body: "Dedicated recognition and Desi caption styles with native-script font pairings.",
  },
  {
    icon: MonitorPlay,
    title: "1080×1920 export",
    body: "H.264 MP4 at 9:16 by default. The preview and the export use the same composition.",
  },
  {
    icon: MousePointerClick,
    title: "No timeline, ever",
    body: "Everything runs in the browser. Pick a style, clean the transcript, export. Nothing to drag.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative z-10 border-y border-slate-200/80 bg-slate-50/50 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand">
            Features
          </span>
          <h2 className="mt-4 font-serif text-3xl tracking-tight text-slate-950 sm:text-4xl">
            The whole short, packaged
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">
            Not just captions. Capify finishes the post — captions, hook, cover and export —
            for talking-head creators.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-900 text-white">
                  <f.icon className="h-5 w-5" />
                </span>
                {f.pro && (
                  <span className="rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-black text-black">
                    PRO
                  </span>
                )}
              </div>
              <h3 className="mt-4 text-sm font-bold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
