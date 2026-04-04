export type GenerationVariant = "text" | "random" | "custom" | "similar" | "search-from-liked";

function truncate(str: string, max: number): string {
  if (str.length <= max) return str;
  return str.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

/**
 * Returns an array of rotating status messages for the loading overlay.
 * `context` varies by variant:
 * - text: the user's prompt string
 * - custom: { primaryGoal: string }
 * - similar: { title: string }
 * - random / search-from-liked: not needed
 */
export function getGenerationMessages(
  variant: GenerationVariant,
  context?: string | { primaryGoal?: string; title?: string },
): string[] {
  switch (variant) {
    case "text": {
      const prompt = typeof context === "string" ? truncate(context, 80) : "your prompt";
      return [
        `Exploring angles for: "${prompt}"`,
        "Researching market opportunities…",
        "Crafting unique business ideas…",
        "Evaluating feasibility and potential…",
        "Polishing your personalized ideas…",
      ];
    }
    case "random":
      return [
        "Exploring diverse ideas across industries…",
        "Mixing SaaS, local services, AI tools, and more…",
        "Finding fresh, actionable concepts…",
        "Balancing creativity with practicality…",
        "Assembling your surprise batch…",
      ];
    case "custom": {
      const goal =
        context && typeof context === "object" && context.primaryGoal
          ? context.primaryGoal
          : "your goals";
      return [
        `Tailoring ideas to ${goal}…`,
        "Matching your time, budget, and skills…",
        "Filtering by your interests…",
        "Scoring difficulty and opportunity…",
        "Finalizing your custom batch…",
      ];
    }
    case "similar": {
      const title =
        context && typeof context === "object" && context.title
          ? truncate(context.title, 60)
          : "your idea";
      return [
        `Generating ideas similar to "${title}"…`,
        "Exploring related markets and audiences…",
        "Finding fresh twists on the theme…",
        "Evaluating new angles and niches…",
        "Putting the finishing touches on…",
      ];
    }
    case "search-from-liked":
      return [
        "Drawing from your liked ideas…",
        "Analyzing patterns in your favorites…",
        "Generating ideas that match your taste…",
        "Exploring new angles from what you love…",
        "Curating your personalized batch…",
      ];
    default:
      return ["Generating ideas…", "Almost there…", "Putting ideas together…"];
  }
}
