"use client";

import IdeaGenerationLoader from "@/components/IdeaGenerationLoader";
import { useIdeaGenerationRun } from "@/hooks/use-idea-generation-run";
import type { IdeaJson } from "@/types";

type Props =
  | { seedIdea: IdeaJson | Record<string, unknown>; context?: never }
  | { seedIdea?: never; context: string };

export default function GetSimilarIdeas(props: Props) {
  const { run, loading, messages, sessionKey } = useIdeaGenerationRun();

  const fetchSimilar = async () => {
    const meRes = await fetch("/api/me", { credentials: "include" });
    if (!meRes.ok) return { error: "Session unavailable. Refresh the page and try again." };

    const body = props.seedIdea ? { seedIdea: props.seedIdea } : { context: props.context };
    const res = await fetch("/api/similar-ideas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return { error: data.error || `Error ${res.status}` };
    return { batchId: data.batchId as string };
  };

  const handleClick = () => {
    const seedTitle = props.seedIdea
      ? String((props.seedIdea as Record<string, unknown>).title ?? "this idea")
      : undefined;
    void run(fetchSimilar, "similar", seedTitle ? { title: seedTitle } : props.context);
  };

  return (
    <div className="mt-6">
      <IdeaGenerationLoader show={loading} messages={messages} sessionKey={sessionKey} />
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-xl text-sm font-medium disabled:opacity-50"
      >
        {loading ? "Generating…" : "Get similar ideas"}
      </button>
    </div>
  );
}
