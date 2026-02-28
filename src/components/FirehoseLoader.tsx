"use client";

import Image from "next/image";

type FirehoseLoaderProps = {
  show: boolean;
  label?: string;
  contained?: boolean;
};

const BULB_COUNT = 5;
const BULB_SIZE = 48;

function LightbulbCluster({ label }: { label: string }) {
  return (
    <>
      <div className="relative flex items-center justify-center gap-2 h-24 w-72">
        {Array.from({ length: BULB_COUNT }, (_, i) => {
          const delay = i * 0.15;
          const duration = 2.2 + (i % 3) * 0.2;
          return (
            <div
              key={i}
              className="animate-bulb-dance drop-shadow-lg"
              style={{
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
              }}
            >
              <Image
                src="/lightbulb.png"
                alt=""
                width={BULB_SIZE}
                height={Math.round(BULB_SIZE * 1.4)}
                className="object-contain"
                aria-hidden
              />
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
        <LightbulbCluster label={label} />
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-zinc-950/95 backdrop-blur-sm"
      aria-busy="true"
      aria-label={label}
    >
      <LightbulbCluster label={label} />
    </div>
  );
}
