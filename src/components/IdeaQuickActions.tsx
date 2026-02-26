"use client";

import { useState } from "react";

type IdeaQuickActionsProps = {
  title: string;
  oneSentenceHook: string;
  whyItCouldWork?: string;
  firstStepUnder30min?: string;
  shareText?: string;
  ideaUrl?: string;
  onSuggestMore?: () => void;
};

const AI_INSIGHTS_PROMPT = (
  title: string,
  hook: string,
  why: string
) => `You are a startup advisor. For this business idea, provide concise, actionable insights: (1) market and timing, (2) main risks and how to de-risk, (3) one non-obvious way to validate it quickly, (4) a simple metric to track early progress.

Idea: ${title}. ${hook}. ${why}`;

const NO_HUMAN_PROMPT = (
  title: string,
  hook: string,
  why: string,
  firstStep: string
) => `For this business idea, outline a step-by-step execution plan that minimizes human effort: tools, automation, and processes so one person (or no full-time human) can run it. Include: key automations, what to build vs buy, and where to use AI or scripts.

Idea: ${title}. ${hook}. ${why}. First step suggested: ${firstStep}`;

function IconWhatsApp({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function IconCopy({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function IconAutomation({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <path d="M8 16h.01M16 16h.01M12 16h.01" />
    </svg>
  );
}

function IconSuggest({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

export default function IdeaQuickActions({
  title,
  oneSentenceHook,
  whyItCouldWork = "",
  firstStepUnder30min = "",
  shareText,
  ideaUrl,
  onSuggestMore,
}: IdeaQuickActionsProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const summary = [title, oneSentenceHook].filter(Boolean).join(". ");
  const shareBlurb = shareText || summary;
  const url = ideaUrl || (typeof window !== "undefined" ? window.location.href : "");
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareBlurb + (url ? " " + url : ""))}`;

  const promptAiInsights = AI_INSIGHTS_PROMPT(title, oneSentenceHook, whyItCouldWork || summary);
  const promptNoHuman = NO_HUMAN_PROMPT(title, oneSentenceHook, whyItCouldWork || summary, firstStepUnder30min || "Not specified.");

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  };

  const iconSize = "w-4 h-4 shrink-0";

  return (
    <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-zinc-800">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-violet-400 transition-colors"
      >
        <IconWhatsApp className={iconSize} />
        Share
      </a>
      <button
        type="button"
        onClick={() => copyToClipboard(promptAiInsights, "insights")}
        className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-violet-400 transition-colors"
      >
        <IconCopy className={iconSize} />
        {copied === "insights" ? "Copied" : "Copy AI insights prompt"}
      </button>
      <button
        type="button"
        onClick={() => copyToClipboard(promptNoHuman, "nohuman")}
        title="Copy prompt: how to run this with minimal human effort (automation, tools, AI)"
        className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-violet-400 transition-colors"
      >
        <IconAutomation className={iconSize} />
        {copied === "nohuman" ? "Copied" : "No-human prompt"}
      </button>
      {onSuggestMore ? (
        <button
          type="button"
          onClick={onSuggestMore}
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-violet-400 transition-colors"
        >
          <IconSuggest className={iconSize} />
          Suggest more
        </button>
      ) : (
        <a href="/signup" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-violet-400 transition-colors">
          <IconSuggest className={iconSize} />
          Suggest more
        </a>
      )}
    </div>
  );
}
