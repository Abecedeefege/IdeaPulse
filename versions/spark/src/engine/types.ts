export type Industry =
  | "saas"
  | "ai"
  | "ecommerce"
  | "content"
  | "local"
  | "health"
  | "fintech"
  | "education"
  | "devtools"
  | "community";

export type Tier = 1 | 2 | 3;
export type TierFilter = 0 | 1 | 2 | 3;

export type FullIdea = {
  id: string;
  title: string;
  hook: string;
  whyItWorks: string;
  firstStep: string;
  industry: Industry;
  budgetTier: Tier;
  effortTier: Tier;
  curated?: boolean;
};

export type Profile = {
  interests: Industry[];
  budgetTier: TierFilter;
  effortTier: TierFilter;
};

export const INDUSTRIES: { id: Industry; label: string; emoji: string }[] = [
  { id: "saas", label: "SaaS", emoji: "🧩" },
  { id: "ai", label: "AI & Automation", emoji: "🤖" },
  { id: "ecommerce", label: "E-commerce", emoji: "🛍️" },
  { id: "content", label: "Content & Creators", emoji: "🎬" },
  { id: "local", label: "Local Business", emoji: "📍" },
  { id: "health", label: "Health & Wellness", emoji: "💪" },
  { id: "fintech", label: "Fintech", emoji: "💸" },
  { id: "education", label: "Education", emoji: "🎓" },
  { id: "devtools", label: "Dev Tools", emoji: "🛠️" },
  { id: "community", label: "Community", emoji: "🫂" },
];

export function industryLabel(id: Industry): string {
  return INDUSTRIES.find((i) => i.id === id)?.label ?? id;
}

export function industryEmoji(id: Industry): string {
  return INDUSTRIES.find((i) => i.id === id)?.emoji ?? "✨";
}

export const BUDGET_FILTER_LABELS: Record<TierFilter, string> = {
  0: "Any budget",
  1: "Shoestring",
  2: "Moderate",
  3: "Funded",
};

export const EFFORT_FILTER_LABELS: Record<TierFilter, string> = {
  0: "Any effort",
  1: "Nights & weekends",
  2: "Part-time",
  3: "All-in",
};

export const BUDGET_TIER_LABELS: Record<Tier, string> = {
  1: "$ Shoestring",
  2: "$$ Moderate",
  3: "$$$ Funded",
};

export const EFFORT_TIER_LABELS: Record<Tier, string> = {
  1: "🌙 Nights & weekends",
  2: "⏳ Part-time",
  3: "🚀 All-in",
};
