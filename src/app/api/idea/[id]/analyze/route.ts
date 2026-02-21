import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";
import { verifyActionToken } from "@/lib/signed-links";
import { generateAnalysis, logRequest } from "@/lib/openai";
import type { IdeaJson } from "@/types";

const ANALYSES_PER_WEEK_FREE = Number(process.env.RATE_LIMIT_ANALYSES_PER_WEEK_FREE) ?? 0;

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) return NextResponse.redirect(new URL("/?error=invalid_link", req.url));
  const payload = await verifyActionToken(token);
  if (!payload || payload.action !== "analyze") return NextResponse.redirect(new URL("/?error=invalid_link", req.url));
  const base = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin;
  return NextResponse.redirect(new URL(`/analyze?ideaId=${payload.ideaId}&token=${encodeURIComponent(token)}`, base));
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const token = body.token ?? req.nextUrl.searchParams.get("token");
  if (!token) return NextResponse.json({ error: "Missing token" }, { status: 400 });
  const payload = await verifyActionToken(token);
  if (!payload || payload.action !== "analyze") return NextResponse.json({ error: "Invalid token" }, { status: 400 });

  const db = supabaseServer();
  const { data: ideaRow } = await db.from("ideas").select("id, idea_json, user_id").eq("id", payload.ideaId).single();
  if (!ideaRow) return NextResponse.json({ error: "Idea not found" }, { status: 404 });

  const { count } = await db.from("analyses").select("id", { count: "exact", head: true }).eq("user_id", payload.userId).gte("created_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());
  if (count !== null && count >= ANALYSES_PER_WEEK_FREE) return NextResponse.json({ error: "Analysis limit reached. Upgrade for more analyses.", paywall: true }, { status: 403 });

  const ideaJson = ideaRow.idea_json as IdeaJson;
  const { data: user } = await db.from("users").select("profile_json").eq("id", payload.userId).single();
  const userContext = user?.profile_json ? JSON.stringify(user.profile_json) : "";

  const { analysis, usage } = await generateAnalysis(ideaJson, userContext);
  const analysisMd = [
    `## Problem\n${analysis.problem}`,
    `## Target customer / persona\n${analysis.target_customer_persona}`,
    `## Value prop\n${analysis.value_prop}`,
    `## Competitive landscape\n${analysis.competitive_landscape}`,
    `## Differentiation / moat\n${analysis.differentiation_moat}`,
    `## GTM (first 30 days)\n${analysis.gtm_first_30_days}`,
    `## MVP scope (1 week)\n${analysis.mvp_scope_1_week}`,
    `## Risks & de-risk\n${analysis.risks_derisk}`,
    `## Monetization\n${analysis.monetization_paths}`,
  ].join("\n\n");

  await db.from("analyses").insert({
    user_id: payload.userId,
    idea_id: ideaRow.id,
    analysis_json: analysis,
    analysis_md: analysisMd,
    model: process.env.OPENAI_MODEL_DEEP ?? "gpt-4o",
    tokens_in: usage.prompt,
    tokens_out: usage.completion,
    cost_est: usage.costEst,
  });
  await logRequest({ userId: payload.userId, kind: "generate_analysis", model: process.env.OPENAI_MODEL_DEEP, tokensIn: usage.prompt, tokensOut: usage.completion, costEst: usage.costEst });
  await db.from("interactions").insert({ user_id: payload.userId, idea_id: ideaRow.id, type: "analyze", content_text: null });

  return NextResponse.json({ ok: true, analysisMd });
}
