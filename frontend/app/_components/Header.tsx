"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, ArrowRight, User, LogOut } from "lucide-react";
import { Logo } from "./Logo";
import { TOOLS_NAV } from "../_lib/site";
import { AuthModal } from "./auth/AuthModal";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
    setToolsOpen(false);
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("capify_user");
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch {
          // ignore
        }
      }
    }
  }, [pathname]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("capify_user");
    }
    setUser(null);
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
        <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-4 py-3 sm:px-6">
          {/* Left: mobile menu toggle + desktop nav */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-95 lg:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            <nav className="hidden items-center gap-1 lg:flex">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setToolsOpen((v) => !v)}
                  aria-expanded={toolsOpen}
                  className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  Tools
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition ${toolsOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {toolsOpen && (
                  <div className="absolute left-0 top-full mt-2 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/5">
                    {TOOLS_NAV.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded-xl px-3 py-2.5 transition hover:bg-slate-50"
                      >
                        <span className="text-sm font-semibold text-slate-900">
                          {item.label}
                        </span>
                        {item.description && (
                          <span className="mt-0.5 block text-xs text-slate-500">
                            {item.description}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/caption-templates"
                className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                Templates
              </Link>
              <Link
                href="/pricing"
                className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                Pricing
              </Link>
            </nav>
          </div>

          {/* Center: brand */}
          <div className="flex justify-center">
            <Logo />
          </div>

          {/* Right: auth */}
          <div className="flex items-center justify-end gap-2">
            {user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50 px-3 py-1.5">
                  <div className="grid h-7 w-7 place-items-center rounded-full bg-brand text-xs font-bold text-white uppercase">
                    {user.name.slice(0, 1)}
                  </div>
                  <span className="text-xs font-bold text-slate-700 hidden sm:inline">
                    {user.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  title="Sign out"
                  className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setAuthOpen(true)}
                className="rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white shadow-md shadow-brand/20 transition hover:bg-brand-600 active:scale-95 cursor-pointer"
              >
                Sign in
              </button>
            )}
          </div>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div className="border-t border-slate-200/70 bg-white lg:hidden">
            <nav className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
              {TOOLS_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  {item.label}
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </Link>
              ))}
              <div className="mt-4 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    setAuthOpen(true);
                  }}
                  className="w-full rounded-xl bg-brand py-2.5 text-center text-sm font-bold text-white shadow-sm"
                >
                  {user ? "Signed in as " + user.name : "Sign in / Sign up"}
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onSuccess={(u) => setUser(u)}
      />
    </>
  );
}
