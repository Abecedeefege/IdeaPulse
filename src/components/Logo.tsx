import Link from "next/link";

type LogoProps = {
  showWordmark?: boolean;
  className?: string;
};

export default function Logo({ showWordmark = true, className }: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 group${className ? ` ${className}` : ""}`}
    >
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-700/50 shadow-lg shadow-amber-900/20 overflow-hidden">
        <svg
          aria-hidden="true"
          viewBox="0 0 32 32"
          className="h-7 w-7 transition-transform duration-200 group-hover:-translate-y-0.5"
        >
          <defs>
            <linearGradient id="logo-glow" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f59e0b"/>
              <stop offset="100%" stopColor="#f97316"/>
            </linearGradient>
            <linearGradient id="logo-glass" x1="0.5" y1="0" x2="0.5" y2="1">
              <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.1"/>
            </linearGradient>
          </defs>
          <ellipse cx="16" cy="12" rx="7" ry="8" fill="url(#logo-glass)" stroke="#fbbf24" strokeWidth="0.6" strokeOpacity="0.5"/>
          <path d="M14 14 L16 8 L18 14" stroke="url(#logo-glow)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <line x1="16" y1="8" x2="16" y2="6" stroke="#f59e0b" strokeWidth="1" strokeLinecap="round"/>
          <circle cx="16" cy="11" r="3.5" fill="#fbbf24" opacity="0.25"/>
          <rect x="13.5" y="19" width="5" height="1.5" rx="0.75" fill="#a1a1aa"/>
          <rect x="14" y="21" width="4" height="1.2" rx="0.6" fill="#a1a1aa"/>
          <line x1="16" y1="2" x2="16" y2="3.5" stroke="#fbbf24" strokeWidth="0.8" strokeLinecap="round" opacity="0.5"/>
          <line x1="8" y1="6" x2="9.5" y2="7" stroke="#fbbf24" strokeWidth="0.6" strokeLinecap="round" opacity="0.3"/>
          <line x1="24" y1="6" x2="22.5" y2="7" stroke="#fbbf24" strokeWidth="0.6" strokeLinecap="round" opacity="0.3"/>
        </svg>
      </span>
      {showWordmark && (
        <span className="text-base font-semibold tracking-tight text-white group-hover:text-violet-200 transition-colors">
          IdeaPulse
        </span>
      )}
    </Link>
  );
}
