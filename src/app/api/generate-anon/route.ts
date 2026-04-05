import { NextResponse } from "next/server";
import { generateIdeas, logRequest } from "@/lib/openai";
import type { IdeaJson } from "@/types";

function checkEnv(): string | null {
  if (!process.env.OPENAI_API_KEY) return "OpenAI (add OPENAI_API_KEY in Vercel)";
  return null;
}

/**
 * Anonymous idea generation — generates 5 ideas without auth.
 * Client-side localStorage tracks that only 1 batch is allowed.
 */
export async function POST(req: Request) {
  try {
    const envError = checkEnv();
    if (envError) {
      return NextResponse.json({ error: `Server not configured: ${envError}` }, { status: 503 });
    }

    const body = await req.json().catch(() => ({}));
    const context = typeof body.context === "string" ? body.context.trim() : "";
    const summary = context || "general audience";

    const { ideas, usage } = await generateIdeas(summary, 5);
    await logRequest({
      kind: "generate_anon",
      model: process.env.OPENAI_MODEL_FAST,
      tokensIn: usage.prompt,
      tokensOut: usage.completion,
      costEst: usage.costEst,
    });

    return NextResponse.json({
      ok: true,
      ideas: ideas as IdeaJson[],
      promptSignup: true,
    });
  } catch (e) {
    console.error("generate-anon", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
