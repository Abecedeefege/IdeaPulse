import { NextResponse } from "next/server";
import { sendMagicLinkServer } from "@/lib/auth-server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const redirectPath = typeof body.redirectPath === "string" ? body.redirectPath : "/dashboard";
    const result = await sendMagicLinkServer(email, redirectPath);

    if (!result.ok) {
      const status = result.error === "APP_URL_NOT_SET" ? 503 : 500;
      return NextResponse.json({ error: result.error }, { status });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("api/auth/magic-link", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
