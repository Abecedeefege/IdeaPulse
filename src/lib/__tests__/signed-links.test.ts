/**
 * @vitest-environment node
 */
import { describe, it, expect, vi, beforeEach } from "vitest";

beforeEach(() => {
  vi.stubEnv("ACTION_LINK_SECRET", "test-secret-that-is-at-least-32-characters-long");
  vi.resetModules();
});

describe("signed-links", () => {
  it("sign and verify roundtrip", async () => {
    const { signActionPayload, verifyActionToken } = await import("../signed-links");
    const token = await signActionPayload("idea-123", "like", "user-456");
    expect(typeof token).toBe("string");
    expect(token.length).toBeGreaterThan(10);

    const payload = await verifyActionToken(token);
    expect(payload).toEqual({
      ideaId: "idea-123",
      action: "like",
      userId: "user-456",
    });
  });

  it("rejects tampered token", async () => {
    const { signActionPayload, verifyActionToken } = await import("../signed-links");
    const token = await signActionPayload("idea-123", "like", "user-456");
    const tampered = token.slice(0, -5) + "xxxxx";
    const payload = await verifyActionToken(tampered);
    expect(payload).toBeNull();
  });

  it("rejects garbage string", async () => {
    const { verifyActionToken } = await import("../signed-links");
    const payload = await verifyActionToken("not-a-jwt");
    expect(payload).toBeNull();
  });

  it("throws without ACTION_LINK_SECRET", async () => {
    vi.stubEnv("ACTION_LINK_SECRET", "");
    vi.resetModules();
    const { signActionPayload } = await import("../signed-links");
    await expect(signActionPayload("id", "like", "uid")).rejects.toThrow(
      "ACTION_LINK_SECRET must be set"
    );
  });
});
