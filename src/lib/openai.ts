import OpenAI from "openai";
import type { IdeaJson, AnalysisJson } from "@/types";
import { ideaJsonSchema, analysisJsonSchema } from "@/types";
import { buildIdeasPrompt, buildAnalysisPrompt } from "@/lib/prompts";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const modelFast = process.env.OPENAI_MODEL_FAST || "gpt-4o-mini";
const modelDeep = process.env.OPENAI_MODEL_DEEP || "gpt-4o";

export type TokenUsage = { prompt: number; completion: number; costEst: number };

function estimateCost(model: string, prompt: number, completion: number): number {
  const rates: Record<string, { in: number; out: number }> = {
    "gpt-4o-mini": { in: 0.15 / 1e6, out: 0.6 / 1e6 },
    "gpt-4o": { in: 2.5 / 1e6, out: 10 / 1e6 },
  };
  const r = rates[model] || rates["gpt-4o-mini"];
  return (prompt * r.in + completion * r.out) / 1000;
}

const ideaArrayJsonSchema = {
  type: "object" as const,
  properties: {
    ideas: {
      type: "array" as const,
      items: ideaJsonSchema,
    },
  },
  required: ["ideas"] as const,
  additionalProperties: false,
};

export async function generateIdeas(
  userProfileSummary: string,
  count: number = 10
): Promise<{ ideas: IdeaJson[]; usage: TokenUsage }> {
  const res = await client.chat.completions.create({
    model: modelFast,
    messages: [{ role: "user", content: buildIdeasPrompt(userProfileSummary, count) }],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "idea_array",
        strict: true,
        schema: ideaArrayJsonSchema,
      },
    },
  });

  const choice = res.choices?.[0];
  const usage = res.usage ?? { prompt_tokens: 0, completion_tokens: 0 };
  const promptTokens = usage.prompt_tokens;
  const completionTokens = usage.completion_tokens;
  const costEst = estimateCost(modelFast, promptTokens, completionTokens);

  let ideas: IdeaJson[] = [];
  const content = choice?.message?.content ?? "";
  try {
    const parsed = JSON.parse(content) as { ideas?: IdeaJson[] };
    ideas = Array.isArray(parsed.ideas) ? parsed.ideas : [];
    ideas = ideas.slice(0, count).filter((i: unknown) => validateIdea(i));
  } catch {
    ideas = [];
  }

  return { ideas, usage: { prompt: promptTokens, completion: completionTokens, costEst } };
}

function validateIdea(o: unknown): o is IdeaJson {
  if (!o || typeof o !== "object") return false;
  const a = o as Record<string, unknown>;
  return (
    typeof a.title === "string" &&
    typeof a.one_sentence_hook === "string" &&
    typeof a.why_it_could_work === "string" &&
    typeof a.difficulty_1_to_5 === "number" &&
    typeof a.first_step_under_30min === "string" &&
    typeof a.validate_question === "string" &&
    typeof a.share_text_tweet_sized === "string"
  );
}

const analysisJsonSchemaForApi = {
  type: "object" as const,
  properties: analysisJsonSchema.properties,
  required: analysisJsonSchema.required,
  additionalProperties: false,
};

export async function generateAnalysis(
  idea: IdeaJson,
  userContext: string
): Promise<{ analysis: AnalysisJson; usage: TokenUsage }> {
  const res = await client.chat.completions.create({
    model: modelDeep,
    messages: [
      { role: "user", content: buildAnalysisPrompt(JSON.stringify(idea), userContext) },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "analysis",
        strict: true,
        schema: analysisJsonSchemaForApi,
      },
    },
  });

  const choice = res.choices?.[0];
  const usage = res.usage ?? { prompt_tokens: 0, completion_tokens: 0 };
  const promptTokens = usage.prompt_tokens;
  const completionTokens = usage.completion_tokens;
  const costEst = estimateCost(modelDeep, promptTokens, completionTokens);

  let analysis: AnalysisJson | null = null;
  const content = choice?.message?.content ?? "";
  try {
    analysis = JSON.parse(content) as AnalysisJson;
  } catch {
    analysis = null;
  }

  if (!analysis) throw new Error("Failed to parse analysis JSON");
  return { analysis, usage: { prompt: promptTokens, completion: completionTokens, costEst } };
}

export async function logRequest(params: {
  userId?: string;
  kind: string;
  promptSanitized?: string;
  model?: string;
  tokensIn?: number;
  tokensOut?: number;
  costEst?: number;
  latencyMs?: number;
}) {
  const { supabaseServer } = await import("@/lib/supabase");
  const db = supabaseServer();
  await db.from("request_logs").insert({
    user_id: params.userId ?? null,
    kind: params.kind,
    prompt_sanitized: params.promptSanitized ?? null,
    model: params.model ?? null,
    tokens_in: params.tokensIn ?? null,
    tokens_out: params.tokensOut ?? null,
    cost_est: params.costEst ?? null,
    latency_ms: params.latencyMs ?? null,
  });
}
