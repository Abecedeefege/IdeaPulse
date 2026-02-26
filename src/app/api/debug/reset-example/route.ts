import { NextResponse } from "next/server";

const EXAMPLE_COOKIE_NAME = "example_ideas_used";

/**
 * GET /api/debug/reset-example
 * Clears the example_ideas_used cookie so you can retry "Get random ideas".
 * Only available when NODE_ENV !== "production" or when ?key=DEBUG_EMAIL_CHECK_SECRET.
 */
export async function GET(req: Request) {
  if (process.env.NODE_ENV === "production") {
    const url = new URL(req.url);
    if (url.searchParams.get("key") !== process.env.DEBUG_EMAIL_CHECK_SECRET)
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(EXAMPLE_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
  return res;
}
