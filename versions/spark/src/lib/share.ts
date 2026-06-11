import type { FullIdea } from "../engine/types";

/** Build a shareable URL for an idea: hash-based, so no server rewrites needed. */
export function ideaShareUrl(id: string): string {
  const { origin, pathname } = window.location;
  return `${origin}${pathname}#i=${encodeURIComponent(id)}`;
}

/** Read `#i=<id>` from the current URL, if present. */
export function getSharedIdeaId(): string | null {
  const hash = window.location.hash;
  const match = /^#i=(.+)$/.exec(hash);
  return match ? decodeURIComponent(match[1]) : null;
}

/** Remove the share hash after consuming it, without reloading. */
export function clearShareHash(): void {
  if (window.location.hash.startsWith("#i=")) {
    history.replaceState(null, "", window.location.pathname + window.location.search);
  }
}

export type ShareResult = "shared" | "copied" | "failed";

export async function shareIdea(idea: FullIdea): Promise<ShareResult> {
  const url = ideaShareUrl(idea.id);
  const text = `${idea.title} — ${idea.hook}`;

  if (typeof navigator.share === "function") {
    try {
      await navigator.share({ title: idea.title, text, url });
      return "shared";
    } catch (err) {
      // User cancelled or share failed — fall through to clipboard.
      if (err instanceof DOMException && err.name === "AbortError") return "failed";
    }
  }

  try {
    await navigator.clipboard.writeText(url);
    return "copied";
  } catch {
    // Legacy fallback.
    try {
      const ta = document.createElement("textarea");
      ta.value = url;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      return "copied";
    } catch {
      return "failed";
    }
  }
}
