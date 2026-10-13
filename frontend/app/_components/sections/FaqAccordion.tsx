import { ChevronDown } from "lucide-react";
import { FAQS } from "../../_lib/faq";

export function FaqAccordion() {
  return (
    <section
      id="faq"
      className="relative z-10 border-t border-slate-200/80 bg-slate-50/50 py-20"
    >
      <div className="mx-auto max-w-3xl scroll-mt-20 px-4 sm:px-6">
        <div className="text-center">
          <span className="inline-block rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand">
            Help & FAQ
          </span>
          <h2 className="mt-4 font-serif text-3xl tracking-tight text-slate-950 sm:text-4xl">
            Questions, answered
          </h2>
        </div>

        <div className="mt-10 space-y-3">
          {FAQS.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-slate-200/90 bg-white px-5 py-4 shadow-sm transition open:shadow-md"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-slate-900 [&::-webkit-details-marker]:hidden">
                {item.q}
                <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 transition group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
