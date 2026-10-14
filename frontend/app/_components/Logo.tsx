import Link from "next/link";

export function LogoMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="180 130 760 760"
      fill="none"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="capify-moon" cx="36%" cy="32%" r="80%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="55%" stopColor="#EEF2FF" />
          <stop offset="100%" stopColor="#AEB4F2" />
        </radialGradient>
        <linearGradient id="capify-comet" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#4F46E5" stopOpacity="0" />
          <stop offset="70%" stopColor="#818CF8" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#C7CBFF" stopOpacity="1" />
        </linearGradient>
      </defs>
      <circle cx="560" cy="510" r="290" fill="#10101B" />
      <path
        d="M250 800 L560 510"
        stroke="url(#capify-comet)"
        strokeWidth="24"
        strokeLinecap="round"
        opacity="0.9"
      />
      <circle cx="560" cy="510" r="220" fill="url(#capify-moon)" />
      <circle cx="656" cy="422" r="33" fill="#4F46E5" />
      <circle cx="492" cy="572" r="17" fill="#C7CBF2" opacity="0.5" />
      <circle cx="580" cy="602" r="10" fill="#C7CBF2" opacity="0.38" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Capify home"
      className={`flex items-center gap-2 text-slate-900 transition hover:opacity-85 ${className}`}
    >
      <LogoMark className="h-7 w-7" />
      <span className="font-sans text-[17px] font-semibold lowercase tracking-tight text-slate-900">
        capify
      </span>
    </Link>
  );
}
