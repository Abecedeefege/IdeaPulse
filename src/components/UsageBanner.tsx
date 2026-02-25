"use client";

import { useState, useEffect } from "react";

export default function UsageBanner() {
  const [usage, setUsage] = useState<{ totalTokens: number; totalCostUsd: number } | null>(null);

  useEffect(() => {
    fetch("/api/usage")
      .then((r) => r.json())
      .then(setUsage)
      .catch(() => setUsage({ totalTokens: 0, totalCostUsd: 0 }));
  }, []);

  if (!usage) return null;

  return (
    <div className="text-center py-2 px-3 bg-zinc-900/50 border-b border-zinc-800 text-sm text-zinc-400">
      <span className="font-medium">AI usage (project total):</span>{" "}
      <span>{usage.totalTokens.toLocaleString()} tokens</span>
      <span className="mx-2">|</span>
      <span>Est. USD: ${usage.totalCostUsd.toFixed(4)}</span>
    </div>
  );
}
