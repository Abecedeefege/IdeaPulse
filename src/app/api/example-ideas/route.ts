import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { generateIdeas, logRequest } from "@/lib/openai";

const EXAMPLE_COOKIE_NAME = "example_ideas_count";
const FREE_QUOTA_LIMIT = 1000;

function checkEnv(): string | null {
  if (!process.env.OPENAI_API_KEY) return "OpenAI (add OPENAI_API_KEY in Vercel)";
  return null;
}

export async function POST() {
  try {
    const envError = checkEnv();
    if (envError) {
      return NextResponse.json(
        { error: `Server not configured: ${envError}` },
        { status: 503 }
      );
    }

    const cookieStore = await cookies();
    const current = parseInt(cookieStore.get(EXAMPLE_COOKIE_NAME)?.value ?? "0", 10) || 0;
    if (current >= FREE_QUOTA_LIMIT) {
      return NextResponse.json(
        {
          error:
            "You've used your free ideas. Sign up or log in to get more.",
        },
        { status: 403 }
      );
    }

    const { ideas, usage } = await generateIdeas("general audience", 10);

    await logRequest({
      kind: "example_ideas",
      model: process.env.OPENAI_MODEL_FAST,
      tokensIn: usage.prompt,
      tokensOut: usage.completion,
      costEst: usage.costEst,
    });

    const res = NextResponse.json({ ok: true, ideas });
    res.cookies.set(EXAMPLE_COOKIE_NAME, String(current + 1), {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
    return res;
  } catch (e) {
    console.error("example-ideas", e);
    return NextResponse.json(
      { error: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}

