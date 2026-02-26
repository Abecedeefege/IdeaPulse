"use client";

import { useState } from "react";

type IdeaQuickActionsProps = {
  title: string;
  oneSentenceHook: string;
  shareText?: string;
  ideaUrl?: string;
  onSuggestMore?: () => void;
};

export default function IdeaQuickActions({
  title,
  oneSentenceHook,
  shareText,
  ideaUrl,
  onSuggestMore,
}: IdeaQuickActionsProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const summary = [title, oneSentenceHook].filter(Boolean).join(". ");
  const shareBlurb = shareText || summary;
  const url = ideaUrl || (typeof window !== "undefined" ? window.location.href : "");

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareBlurb + (url ? " " + url : ""))}`;

  const promptFurther = `Give me further insights on this idea: ${summary}`;
  const promptNoHuman = `How can this be done without human intervention: ${summary}`;

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-zinc-800">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-zinc-400 hover:text-violet-400 transition-colors"
      >
        Share on WhatsApp
      </a>
      <button
        type="button"
        onClick={() => copyToClipboard(promptFurther, "insights")}
        className="text-sm text-zinc-400 hover:text-violet-400 transition-colors"
      >
        {copied === "insights" ? "Copied" : "Copy prompt (AI insights)"}
      </button>
      <button
        type="button"
        onClick={() => copyToClipboard(promptNoHuman, "nohuman")}
        className="text-sm text-zinc-400 hover:text-violet-400 transition-colors"
      >
        {copied === "nohuman" ? "Copied" : "Copy prompt (no human)"}
      </button>
      {onSuggestMore ? (
        <button
          type="button"
          onClick={onSuggestMore}
          className="text-sm text-zinc-400 hover:text-violet-400 transition-colors"
        >
          Suggest more
        </button>
      ) : (
        <a href="/onboarding" className="text-sm text-zinc-400 hover:text-violet-400 transition-colors">
          Suggest more
        </a>
      )}
    </div>
  );
}
