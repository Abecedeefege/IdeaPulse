"use client";

type FirehoseLoaderProps = {
  show: boolean;
  label?: string;
  contained?: boolean;
};

function LightbulbIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 40 56" aria-hidden="true">
      <defs>
        <linearGradient id="fb-glow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f59e0b"/>
          <stop offset="100%" stopColor="#f97316"/>
        </linearGradient>
        <linearGradient id="fb-glass" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.15"/>
        </linearGradient>
      </defs>
      <ellipse cx="20" cy="18" rx="14" ry="16" fill="url(#fb-glass)" stroke="#fbbf24" strokeWidth="0.8" strokeOpacity="0.6"/>
      <path d="M17 22 L20 12 L23 22" stroke="url(#fb-glow)" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <line x1="20" y1="12" x2="20" y2="8" stroke="#f59e0b" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="20" cy="16" r="6" fill="#fbbf24" opacity="0.25"/>
      <rect x="16" y="33" width="8" height="3" rx="1.5" fill="#a1a1aa"/>
      <rect x="16.5" y="37" width="7" height="2.5" rx="1" fill="#a1a1aa"/>
      <rect x="17" y="40" width="6" height="2" rx="1" fill="#a1a1aa"/>
    </svg>
  );
}

function SprinklerIcon() {
  return (
    <svg className="w-20 h-14 text-zinc-500" viewBox="0 0 80 50" aria-hidden="true">
      <rect x="25" y="0" width="30" height="8" rx="2" fill="currentColor"/>
      <rect x="35" y="8" width="10" height="12" rx="2" fill="currentColor"/>
      <path d="M30 6 L25 16" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <path d="M50 6 L55 16" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <path d="M33 20 L28 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.6"/>
      <path d="M47 20 L52 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.6"/>
      <path d="M40 20 L40 32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.6"/>
      {/* Water drops */}
      <ellipse cx="28" cy="36" rx="3" ry="4" fill="currentColor" opacity="0.4"/>
      <ellipse cx="40" cy="38" rx="3" ry="4" fill="currentColor" opacity="0.4"/>
      <ellipse cx="52" cy="36" rx="3" ry="4" fill="currentColor" opacity="0.4"/>
      <ellipse cx="34" cy="42" rx="2.5" ry="3.5" fill="currentColor" opacity="0.3"/>
      <ellipse cx="46" cy="42" rx="2.5" ry="3.5" fill="currentColor" opacity="0.3"/>
    </svg>
  );
}

const BULB_COUNT = 8;

function HoseContent({ label }: { label: string }) {
  return (
    <>
      <SprinklerIcon />
      <div className="relative h-36 w-56 overflow-hidden">
        {Array.from({ length: BULB_COUNT }, (_, i) => {
          const left = 15 + ((i * 37 + i * i * 7) % 70);
          const delay = i * 0.4;
          const duration = 2.0 + (i % 3) * 0.3;
          const size = 28 + (i % 3) * 6;
          return (
            <div
              key={i}
              className="absolute animate-fall-bulb"
              style={{
                width: size,
                height: size * 1.4,
                left: `${left}%`,
                top: "-20%",
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                transform: "translateX(-50%)",
              }}
            >
              <LightbulbIcon className="h-full w-full drop-shadow-lg" />
            </div>
          );
        })}
      </div>
      <p className="text-sm font-medium text-zinc-400">{label}</p>
      <div className="w-48 h-1 rounded-full bg-zinc-800 overflow-hidden">
        <div className="h-full rounded-full bg-violet-500 animate-firehose-progress" />
      </div>
    </>
  );
}

export default function FirehoseLoader({
  show,
  label = "Generating ideas…",
  contained = false,
}: FirehoseLoaderProps) {
  if (!show) return null;

  if (contained) {
    return (
      <div
        className="flex flex-col items-center justify-center gap-3 py-8 max-h-[40vh]"
        aria-busy="true"
        aria-label={label}
      >
        <HoseContent label={label} />
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-zinc-950/95 backdrop-blur-sm"
      aria-busy="true"
      aria-label={label}
    >
      <HoseContent label={label} />
    </div>
  );
}
