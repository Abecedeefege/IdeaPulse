"use client";

type LightbulbLoaderProps = {
  show: boolean;
  label?: string;
};

export default function LightbulbLoader({ show, label = "Generating ideas…" }: LightbulbLoaderProps) {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-zinc-950/95 backdrop-blur-sm"
      aria-busy="true"
      aria-label={label}
    >
      <div className="relative h-32 w-24 flex-shrink-0 overflow-visible">
        {/* Bulb outline (SVG) */}
        <svg
          className="absolute inset-0 h-full w-full text-zinc-600"
          viewBox="0 0 48 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Bulb globe */}
          <path d="M24 8a14 14 0 0 1 14 14c0 7-6 12-14 18-8-6-14-11-14-18a14 14 0 0 1 14-14z" />
          {/* Base */}
          <path d="M20 40h8v4H20zM18 44h12v2H18zM20 46h8v4H20z" />
        </svg>
        {/* Fill layer: rises from bottom over 18s; parent has explicit height so % works */}
        <div
          className="absolute bottom-0 left-1/2 w-[70%] -translate-x-1/2 rounded-t-full bg-violet-500 animate-lightbulb-fill"
          style={{ minHeight: 0 }}
        />
      </div>
      <p className="text-sm font-medium text-zinc-400">{label}</p>
    </div>
  );
}
