"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ChevronDown,
  CreditCard,
  Grid2X2,
  Home,
  Image as ImageIcon,
  LayoutTemplate,
  LogIn,
  LogOut,
  Menu,
  Sparkles,
  Video,
  X,
} from "lucide-react";
import { Logo, LogoMark } from "./Logo";
import { AuthModal } from "./auth/AuthModal";

function InstagramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="capify-ig-grad"
          x1="3"
          y1="21"
          x2="21"
          y2="3"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FEDA75" />
          <stop offset="0.24" stopColor="#FA7E1E" />
          <stop offset="0.5" stopColor="#D62976" />
          <stop offset="0.75" stopColor="#962FBF" />
          <stop offset="1" stopColor="#4F5BD5" />
        </linearGradient>
      </defs>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        fill="none"
        stroke="url(#capify-ig-grad)"
        strokeWidth="1.9"
      />
      <circle
        cx="12"
        cy="12"
        r="4"
        fill="none"
        stroke="url(#capify-ig-grad)"
        strokeWidth="1.9"
      />
      <circle cx="17.2" cy="6.8" r="1.1" fill="url(#capify-ig-grad)" />
    </svg>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolsExpanded, setToolsExpanded] = useState(true);
  const [toolsDropdown, setToolsDropdown] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const pathname = usePathname();
  const router = useRouter();

  // Sync state with ?modal=home-menu
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("modal") === "home-menu") {
      setMenuOpen(true);
    }
  }, []);

  const openMenu = () => {
    setMenuOpen(true);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("modal", "home-menu");
      window.history.replaceState(null, "", url.toString());
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("modal");
      window.history.replaceState(null, "", url.pathname + (url.search ? url.search : ""));
    }
  };

  useEffect(() => {
    closeMenu();
    setToolsDropdown(false);
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

  if (pathname?.startsWith("/studio")) {
    return null;
  }

  return (
    <>
      {/* ------------------------------------------------------------------- */}
      {/* Top Navbar */}
      {/* ------------------------------------------------------------------- */}
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1800px] items-center justify-between px-3 sm:h-16 sm:px-6">
          {/* Left: Mobile hamburger + Brand logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={openMenu}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="grid size-10 place-items-center rounded-xl border border-slate-200/90 bg-white text-slate-700 shadow-xs hover:bg-slate-50 transition lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link href="/" aria-label="Moonshot home" className="flex items-center gap-2">
              <LogoMark className="h-7 w-7 sm:h-8 sm:w-8" />
              <span className="font-sans text-[17px] font-semibold lowercase tracking-tight text-slate-900">
                capify
              </span>
            </Link>
          </div>

          {/* Center (Desktop only): Floating navigation pill */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-6 rounded-xl border border-slate-200/90 bg-white px-5 py-2 text-sm font-medium text-slate-600 shadow-xs lg:flex"
          >
            {/* Tools Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setToolsDropdown((v) => !v)}
                aria-expanded={toolsDropdown}
                className="flex items-center gap-1.5 hover:text-slate-900 transition cursor-pointer"
              >
                Tools
                <ChevronDown
                  className={`h-3.5 w-3.5 text-slate-400 transition-transform ${toolsDropdown ? "rotate-180" : ""}`}
                />
              </button>

              {toolsDropdown && (
                <div className="absolute left-0 top-full mt-2 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/10 z-50">
                  <Link
                    href="/tools/ai-thumbnail"
                    onClick={() => setToolsDropdown(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
                  >
                    <ImageIcon className="h-4 w-4 text-slate-500" />
                    AI thumbnail maker
                  </Link>
                  <Link
                    href="/tools/watermark-remover"
                    onClick={() => setToolsDropdown(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
                  >
                    <Video className="h-4 w-4 text-slate-500" />
                    Video watermark remover
                  </Link>
                  <Link
                    href="/tools/ai-watermark-remover"
                    onClick={() => setToolsDropdown(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
                  >
                    <Sparkles className="h-4 w-4 text-slate-500" />
                    Image cleaner
                  </Link>
                </div>
              )}
            </div>

            <Link href="/caption-templates" className="hover:text-slate-900 transition">
              Templates
            </Link>
            <Link href="/pricing" className="hover:text-slate-900 transition">
              Pricing
            </Link>
            <Link href="/#how-it-works" className="hover:text-slate-900 transition">
              How it works
            </Link>
            <Link href="/#faq" className="hover:text-slate-900 transition">
              FAQ
            </Link>

            <a
              href="https://www.instagram.com/moonshot.hq/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow on Instagram"
              className="grid size-7 place-items-center rounded-lg hover:bg-slate-50 transition"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
          </nav>

          {/* Right: Auth Button */}
          <div className="flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50 px-3 py-1.5">
                  <div className="grid h-6 w-6 place-items-center rounded-full bg-[#4F46E5] text-xs font-bold text-white uppercase">
                    {user.name.slice(0, 1)}
                  </div>
                  <span className="text-xs font-semibold text-slate-700 hidden sm:inline">
                    {user.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  title="Sign out"
                  className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setAuthOpen(true)}
                className="rounded-xl bg-[#4F46E5] px-4 sm:px-5 py-2 text-sm font-semibold text-white shadow-xs transition hover:bg-[#4338CA] active:scale-95 cursor-pointer"
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------------- */}
      {/* Moonshot 1-to-1 Home Menu Drawer / Modal (?modal=home-menu)        */}
      {/* ------------------------------------------------------------------- */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={closeMenu}
            className="fixed inset-0 z-[65] bg-black/40 backdrop-blur-xs transition-opacity duration-200"
            aria-hidden="true"
          />

          {/* Slideover / Drawer Sidebar */}
          <aside
            id="home-navigation"
            aria-label="Home navigation"
            className="fixed inset-y-0 left-0 z-[70] flex h-dvh w-[100dvw] sm:w-[380px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out"
          >
            {/* Top Bar: Close button + Brand Logo (No Sign In button here!) */}
            <div className="flex h-14 shrink-0 items-center border-b border-slate-100 px-3 sm:px-4">
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close menu"
                className="grid size-10 place-items-center rounded-lg text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <Link
                href="/"
                onClick={closeMenu}
                className="flex items-center gap-2 ml-2 transition hover:opacity-85"
              >
                <LogoMark className="h-7 w-7" />
                <span className="font-sans text-[17px] font-semibold lowercase tracking-tight text-slate-900">
                  capify
                </span>
              </Link>
            </div>

            {/* Navigation Body */}
            <div className="flex min-h-0 flex-1 flex-col justify-between overflow-y-auto px-3.5 py-3">
              <div className="space-y-1">
                {/* 1. Home (Active pill) */}
                <Link
                  href="/"
                  onClick={closeMenu}
                  aria-current={pathname === "/" ? "page" : undefined}
                  className={`flex min-h-11 w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                    pathname === "/"
                      ? "bg-[#EEF2FF] text-[#4F46E5] hover:bg-[#EEF2FF]"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Home className="h-[18px] w-[18px] shrink-0" />
                  Home
                </Link>

                {/* 2. Tools (Collapsible group) */}
                <details open={toolsExpanded} className="group mt-1">
                  <summary
                    onClick={(e) => {
                      e.preventDefault();
                      setToolsExpanded((v) => !v);
                    }}
                    className="flex min-h-11 w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer list-none select-none transition"
                  >
                    <Grid2X2 className="h-[18px] w-[18px] shrink-0 text-slate-700" />
                    Tools
                    <ChevronDown
                      className={`ml-auto h-4 w-4 text-slate-400 transition-transform ${
                        toolsExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </summary>

                  {toolsExpanded && (
                    <nav
                      aria-label="Tools"
                      className="mt-1 space-y-1 border-l border-slate-200 pl-2 ml-5"
                    >
                      <Link
                        href="/tools/ai-thumbnail"
                        onClick={closeMenu}
                        className="flex min-h-11 w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition"
                      >
                        <ImageIcon className="h-4 w-4 shrink-0 text-slate-500" />
                        AI thumbnail maker
                      </Link>
                      <Link
                        href="/tools/watermark-remover"
                        onClick={closeMenu}
                        className="flex min-h-11 w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition"
                      >
                        <Video className="h-4 w-4 shrink-0 text-slate-500" />
                        Video watermark remover
                      </Link>
                      <Link
                        href="/tools/ai-watermark-remover"
                        onClick={closeMenu}
                        className="flex min-h-11 w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition"
                      >
                        <Sparkles className="h-4 w-4 shrink-0 text-slate-500" />
                        Image cleaner
                      </Link>
                    </nav>
                  )}
                </details>

                {/* 3. Caption templates */}
                <Link
                  href="/caption-templates"
                  onClick={closeMenu}
                  className="flex min-h-11 w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition"
                >
                  <LayoutTemplate className="h-[18px] w-[18px] shrink-0 text-slate-700" />
                  Caption templates
                </Link>

                {/* 4. Pricing */}
                <Link
                  href="/pricing"
                  onClick={closeMenu}
                  className="flex min-h-11 w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition"
                >
                  <CreditCard className="h-[18px] w-[18px] shrink-0 text-slate-700" />
                  Pricing
                </Link>
              </div>

              {/* Bottom Footer Section */}
              <div className="mt-auto space-y-2 pt-4">
                {/* Help & FAQ + Instagram Row */}
                <div className="flex items-center justify-between px-1">
                  <Link
                    href="/#faq"
                    onClick={closeMenu}
                    className="flex min-h-10 items-center rounded-lg px-2 text-xs font-medium text-slate-500 hover:text-slate-900 transition"
                  >
                    Help &amp; FAQ
                  </Link>

                  <a
                    href="https://www.instagram.com/moonshot.hq/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow Moonshot on Instagram"
                    className="grid size-10 place-items-center rounded-lg hover:bg-slate-100 transition"
                  >
                    <InstagramIcon className="h-[18px] w-[18px]" />
                  </a>
                </div>

                {/* Moonshot-style Sign In Card */}
                <div
                  onClick={() => {
                    closeMenu();
                    setAuthOpen(true);
                  }}
                  className="flex w-full items-center gap-3 rounded-2xl bg-[#EEF2FF] p-3.5 text-left transition hover:bg-[#E0E7FF] cursor-pointer"
                >
                  <div className="grid size-10 shrink-0 place-items-center rounded-full bg-[#4F46E5] text-white shadow-xs">
                    <LogIn className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#4F46E5] leading-tight">
                      {user ? user.name : "Sign in"}
                    </span>
                    <span className="text-xs text-slate-500 font-medium leading-normal mt-0.5">
                      {user ? user.email : "Save and revisit your projects"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onSuccess={(u) => setUser(u)}
      />
    </>
  );
}
