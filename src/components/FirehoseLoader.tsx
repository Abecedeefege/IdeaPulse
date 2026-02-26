"use client";

type FirehoseLoaderProps = {
  show: boolean;
  label?: string;
  contained?: boolean;
};

function BulbIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M24 8a14 14 0 0 1 14 14c0 7-6 12-14 18-8-6-14-11-14-18a14 14 0 0 1 14-14z" />
      <path d="M20 40h8v4H20zM18 44h12v2H18zM20 46h8v4H20z" />
    </svg>
  );
}

const BULB_COUNT = 12;
const BULB_SIZE = 28;

function HoseContent({ label }: { label: string }) {
  return (
    <>
      <div className="relative h-40 w-48 flex-shrink-0 overflow-visible">
        <svg
          className="absolute left-0 top-2 h-12 w-16 text-zinc-600"
          viewBox="0 0 64 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden
        >
          <path d="M0 24 L40 24 L48 12 L48 36 L40 24" />
          <ellipse cx="44" cy="24" rx="4" ry="10" fill="currentColor" fillOpacity="0.2" />
        </svg>
        <div className="absolute left-10 top-4 right-0 bottom-0">
          {Array.from({ length: BULB_COUNT }, (_, i) => (
            <div
              key={i}
              className="absolute text-violet-400/90 animate-firehose-bulb"
              style={{
                width: BULB_SIZE,
                height: (BULB_SIZE * 64) / 48,
                left: `${8 + (i % 4) * 22}px`,
                top: `${(i % 3) * 18}px`,
                animationDelay: `${i * 0.35}s`,
                animationDuration: "2.2s",
              }}
            >
              <BulbIcon className="h-full w-full drop-shadow-md" />
            </div>
          ))}
        </div>
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
        className="flex flex-col items-center justify-center gap-4 py-8 max-h-[30vh]"
        aria-busy="true"
        aria-label={label}
      >
        <HoseContent label={label} />
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-zinc-950/95 backdrop-blur-sm"
      aria-busy="true"
      aria-label={label}
    >
      <HoseContent label={label} />
    </div>
  );
}
