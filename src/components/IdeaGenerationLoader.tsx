"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const BULB_COUNT = 5;
const BULB_SIZE = 48;
const ROTATION_INTERVAL_MS = 2500;

type Props = {
  show: boolean;
  messages: string[];
  sessionKey: string | number;
};

function LightbulbCluster() {
  return (
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
  );
}

export default function IdeaGenerationLoader({ show, messages, sessionKey }: Props) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (!show || messages.length <= 1) return;
    setMessageIndex(0);
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, ROTATION_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [show, messages]);

  if (!show) return null;

  const currentMessage = messages[messageIndex] || "Generating ideas…";

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-zinc-950/95 backdrop-blur-sm"
      aria-busy="true"
      aria-label={currentMessage}
    >
      <LightbulbCluster />
      <p className="text-sm font-medium text-zinc-400 text-center max-w-md px-4 transition-opacity duration-300">
        {currentMessage}
      </p>
      <div className="w-48 h-1 rounded-full bg-zinc-800 overflow-hidden">
        <div
          key={sessionKey}
          className="h-full rounded-full bg-violet-500 animate-firehose-progress"
        />
      </div>
    </div>
  );
}
