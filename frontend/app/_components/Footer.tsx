import Link from "next/link";
import { AtSign } from "lucide-react";
import { Logo } from "./Logo";
import { FOOTER_NAV, SITE } from "../_lib/site";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              {SITE.description}
            </p>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-brand-200 hover:text-brand"
              aria-label="Capify on Instagram"
            >
              <AtSign className="h-4 w-4" />
            </a>
          </div>

          {FOOTER_NAV.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <li key={`${group.title}-${item.label}`}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-600 transition hover:text-brand"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-6 sm:flex-row">
          <p className="text-xs text-slate-400">
            © {SITE.name} — {SITE.tagline}. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-slate-400">
            <Link href="/#faq" className="transition hover:text-brand">
              Terms
            </Link>
            <Link href="/#faq" className="transition hover:text-brand">
              Privacy
            </Link>
            <a href={`mailto:${SITE.supportEmail}`} className="transition hover:text-brand">
              {SITE.supportEmail}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
