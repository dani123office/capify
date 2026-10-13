import { Upload, Palette, Type, Download } from "lucide-react";

const STEPS = [
  {
    icon: Upload,
    title: "Upload your clip",
    body: "Drop a talking-head video or audio file. Capify accepts MP4, MOV, WebM, MP3, WAV and M4A.",
  },
  {
    icon: Palette,
    title: "Pick a caption style",
    body: "Choose from designed templates. Each one sets the font pairing, colour, placement and motion.",
  },
  {
    icon: Type,
    title: "Edit the transcript",
    body: "The transcript is the editor. Fix a word or cut a sentence and the captions resync automatically.",
  },
  {
    icon: Download,
    title: "Export and post",
    body: "Render a 1080×1920 MP4 with a hook and cover, ready for Reels, TikTok and Shorts.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative z-10 mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6"
    >
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-block rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand">
          How it works
        </span>
        <h2 className="mt-4 font-serif text-3xl tracking-tight text-slate-950 sm:text-4xl">
          Raw clip in. Pro edit out.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">
          No timeline, no rotoscoping, no app install. Four steps from an unedited clip to
          something you can post.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => (
          <div
            key={step.title}
            className="relative rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <span className="absolute right-5 top-5 font-serif text-3xl text-slate-200">
              {i + 1}
            </span>
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 text-brand">
              <step.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-base font-bold text-slate-900">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
