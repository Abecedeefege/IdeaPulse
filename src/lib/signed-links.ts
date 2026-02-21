import * as jose from "jose";

const SECRET = process.env.ACTION_LINK_SECRET || "default-dev-secret-min-32-chars";
const ALG = "HS256";
const EXP = "7d";

export async function signActionPayload(
  ideaId: string,
  action: "like" | "dislike" | "feedback" | "analyze",
  userId: string
): Promise<string> {
  const secret = new TextEncoder().encode(SECRET);
  return jose.sign(
    { ideaId, action, userId, iat: Math.floor(Date.now() / 1000) },
    secret,
    { algorithm: ALG, expiresIn: EXP }
  );
}

export async function verifyActionToken(token: string): Promise<{
  ideaId: string;
  action: string;
  userId: string;
} | null> {
  try {
    const secret = new TextEncoder().encode(SECRET);
    const { payload } = await jose.jwtVerify(token, secret, { algorithms: [ALG] });
    if (
      typeof payload.ideaId !== "string" ||
      typeof payload.action !== "string" ||
      typeof payload.userId !== "string"
    )
      return null;
    return { ideaId: payload.ideaId, action: payload.action, userId: payload.userId };
  } catch {
    return null;
  }
}

export function actionUrl(
  baseUrl: string,
  ideaId: string,
  action: "like" | "dislike" | "feedback" | "analyze",
  userId: string,
  token: string
): string {
  const path = action === "feedback" || action === "analyze" ? "" : `?token=${encodeURIComponent(token)}`;
  return `${baseUrl}/api/idea/${ideaId}/${action}${path}`;
}
