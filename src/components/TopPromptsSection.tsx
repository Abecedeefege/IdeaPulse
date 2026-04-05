"use client";

import { useState } from "react";
import Link from "next/link";
import { topPrompts } from "@/data/top-prompts";

function IconCopy({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function IconRocket({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

export function TopPromptsSection() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  };

  return (
    <section>
      <h2 className="text-2xl font-bold text-white mb-2">Top Prompts</h2>
      <p className="text-zinc-400 mb-8">Short prompts that unlock surprisingly powerful ideas. Copy one or let IdeaPulse run with it.</p>
      <div className="grid gap-3">
        {topPrompts.map((tp) => (
          <div
            key={tp.id}
            className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4"
          >
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium">&ldquo;{tp.prompt}&rdquo;</p>
              <p className="text-xs text-zinc-500 mt-1">{tp.description}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => copyToClipboard(tp.prompt, tp.id)}
                className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border border-zinc-700 text-zinc-300 hover:border-violet-500/50 hover:text-violet-300 transition-colors"
              >
                <IconCopy className="w-3.5 h-3.5" />
                {copied === tp.id ? "Copied!" : "Copy"}
              </button>
              <Link
                href={`/ideaHub?prompt=${encodeURIComponent(tp.prompt)}`}
                className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg bg-violet-600 text-white hover:bg-violet-500 transition-colors"
              >
                <IconRocket className="w-3.5 h-3.5" />
                Use as idea generator
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
