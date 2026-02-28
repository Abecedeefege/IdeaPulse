"use client";

import { useState, useEffect } from "react";

export default function UsageBanner() {
  const [usage, setUsage] = useState<{ totalTokens: number; totalCostUsd: number } | null>(null);

  useEffect(() => {
    fetch("/api/usage")
      .then((r) => r.json())
      .then((data) => {
        if (data && typeof data.totalTokens === "number" && typeof data.totalCostUsd === "number") {
          setUsage(data);
        } else {
          setUsage({ totalTokens: 0, totalCostUsd: 0 });
        }
      })
      .catch(() => setUsage({ totalTokens: 0, totalCostUsd: 0 }));
  }, []);

  if (!usage) return null;

  return (
    <div className="text-center py-2 px-3 bg-zinc-900/50 border-b border-zinc-800 text-sm text-zinc-400">
      <span className="font-medium">Estimated tokens:</span>{" "}
      <span>{usage.totalTokens.toLocaleString()}</span>
      <span className="mx-2 text-zinc-600">•</span>
      <span className="font-medium">Estimated cost:</span>{" "}
      <span>${usage.totalCostUsd.toFixed(4)} USD</span>
    </div>
  );
}
