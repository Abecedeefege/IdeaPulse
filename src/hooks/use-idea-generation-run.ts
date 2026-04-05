"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { getGenerationMessages, type GenerationVariant } from "@/lib/idea-generation-messages";

const MIN_LOADING_MS = 10_000;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type FetchResult = { batchId: string } | { error: string; redirect?: string };

/**
 * Shared hook for idea generation flows.
 * Returns loading state, rotating messages, a session key (for progress bar reset),
 * and a `run` function that manages fetch + 10s minimum + redirect.
 */
export function useIdeaGenerationRun() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<string[]>(["Generating ideas…"]);
  const sessionKeyRef = useRef(0);
  const [sessionKey, setSessionKey] = useState(0);

  const run = useCallback(
    async (
      fetchFn: () => Promise<FetchResult>,
      variant: GenerationVariant,
      context?: string | { primaryGoal?: string; title?: string },
    ) => {
      sessionKeyRef.current += 1;
      setSessionKey(sessionKeyRef.current);
      setMessages(getGenerationMessages(variant, context));
      setLoading(true);

      try {
        const [result] = await Promise.all([fetchFn(), delay(MIN_LOADING_MS)]);

        if ("error" in result) {
          setLoading(false);
          if (result.redirect) {
            router.push(result.redirect);
          } else {
            alert(result.error);
          }
          return;
        }

        if (result.batchId === "anon") {
          router.push("/results-anon");
        } else {
          router.push(`/results?batch=${encodeURIComponent(result.batchId)}`);
        }
        // Keep loading=true until navigation unmounts this component
      } catch {
        setLoading(false);
        alert("Network error. Try again.");
      }
    },
    [router],
  );

  return { run, loading, messages, sessionKey };
}
