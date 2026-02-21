import { NextResponse } from "next/server";
import { IDEAS_PROMPT_TEMPLATE } from "@/lib/prompts";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    prompt: IDEAS_PROMPT_TEMPLATE,
    placeholders: ["{{count}}", "{{userProfileSummary}}"],
    note: "This is the user message sent to OpenAI when generating ideas. See also /prompts page.",
  });
}
