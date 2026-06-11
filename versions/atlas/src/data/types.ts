export type CategorySlug =
  | "saas"
  | "ai-automation"
  | "side-project"
  | "content-creator"
  | "ecommerce"
  | "local-business"
  | "marketing"
  | "community"
  | "developer-tools"
  | "health-wellness";

export type AtlasIdea = {
  slug: string;
  title: string;
  hook: string; // one punchy sentence
  category: CategorySlug;
  difficulty: 1 | 2 | 3 | 4 | 5;
  capital: "under-500" | "500-5k" | "5k-plus";
  timeToFirstDollar: string; // e.g. "2–4 weeks"
  tags: string[]; // 3-5
  summary: string; // 2-3 sentences (also used as meta description)
  analysis: {
    market: string; // 2-4 sentences, concrete
    monetization: string; // 2-4 sentences, with realistic price points
    firstSteps: string[]; // 3-5 actionable bullets
    risks: string[]; // 2-4 honest risks
    whoThisIsFor: string; // 1-2 sentences
  };
};

export type AtlasCategory = {
  slug: CategorySlug;
  name: string;
  blurb: string;
  icon: string; // emoji used as a print-style glyph
};

export type AtlasCollection = {
  slug: string;
  title: string;
  blurb: string;
  ideaSlugs: string[];
};
