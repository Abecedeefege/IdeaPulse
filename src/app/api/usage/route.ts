import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = supabaseServer();
    const { data: rows } = await db.from("request_logs").select("tokens_in, tokens_out, cost_est");
    let totalTokens = 0;
    let totalCost = 0;
    for (const r of rows ?? []) {
      totalTokens += (r.tokens_in ?? 0) + (r.tokens_out ?? 0);
      totalCost += Number(r.cost_est ?? 0);
    }
    return NextResponse.json({ totalTokens, totalCostUsd: Math.round(totalCost * 10000) / 10000 });
  } catch {
    return NextResponse.json({ totalTokens: 0, totalCostUsd: 0 });
  }
}
