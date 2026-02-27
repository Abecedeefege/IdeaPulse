import * as jose from "jose";

function getSecret(): string {
  const secret = process.env.ACTION_LINK_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("ACTION_LINK_SECRET must be set and at least 32 characters");
  }
  return secret;
}

const ALG = "HS256";
const EXP = "7d";

export async function signActionPayload(
  ideaId: string,
  action: "like" | "dislike" | "feedback" | "analyze",
  userId: string
): Promise<string> {
  const secret = new TextEncoder().encode(getSecret());
  return new jose.SignJWT({ ideaId, action, userId })
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime(EXP)
    .sign(secret);
}

export async function verifyActionToken(token: string): Promise<{
  ideaId: string;
  action: string;
  userId: string;
} | null> {
  try {
    const secret = new TextEncoder().encode(getSecret());
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
