export const ideaJsonSchema = {
  type: "object" as const,
  properties: {
    title: { type: "string" },
    one_sentence_hook: { type: "string" },
    why_it_could_work: { type: "string" },
    difficulty_1_to_5: { type: "integer", minimum: 1, maximum: 5 },
    first_step_under_30min: { type: "string" },
    validate_question: { type: "string" },
    share_text_tweet_sized: { type: "string" },
  },
  required: [
    "title",
    "one_sentence_hook",
    "why_it_could_work",
    "difficulty_1_to_5",
    "first_step_under_30min",
    "validate_question",
    "share_text_tweet_sized",
  ],
  additionalProperties: false,
} as const;

export type IdeaJson = {
  title: string;
  one_sentence_hook: string;
  why_it_could_work: string;
  difficulty_1_to_5: number;
  first_step_under_30min: string;
  validate_question: string;
  share_text_tweet_sized: string;
};

export const analysisJsonSchema = {
  type: "object" as const,
  properties: {
    problem: { type: "string" },
    target_customer_persona: { type: "string" },
    value_prop: { type: "string" },
    competitive_landscape: { type: "string" },
    differentiation_moat: { type: "string" },
    gtm_first_30_days: { type: "string" },
    mvp_scope_1_week: { type: "string" },
    risks_derisk: { type: "string" },
    monetization_paths: { type: "string" },
  },
  required: [
    "problem",
    "target_customer_persona",
    "value_prop",
    "competitive_landscape",
    "differentiation_moat",
    "gtm_first_30_days",
    "mvp_scope_1_week",
    "risks_derisk",
    "monetization_paths",
  ],
  additionalProperties: false,
} as const;

export type AnalysisJson = {
  problem: string;
  target_customer_persona: string;
  value_prop: string;
  competitive_landscape: string;
  differentiation_moat: string;
  gtm_first_30_days: string;
  mvp_scope_1_week: string;
  risks_derisk: string;
  monetization_paths: string;
};

export type InteractionType = "like" | "dislike" | "feedback" | "analyze";

export type UserProfile = {
  primary_goal?: string;
  constraints?: { time_per_week?: string; budget?: string; skills?: string; risk_tolerance?: string };
  interests?: string[];
  preference_summary?: string;
};
