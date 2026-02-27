import { describe, it, expect } from "vitest";
import {
  onboardingSchema,
  profileUpdateSchema,
  feedbackSchema,
  requestMoreSchema,
  similarIdeasSchema,
} from "../validation";

describe("onboardingSchema", () => {
  it("accepts valid input", () => {
    const result = onboardingSchema.safeParse({
      email: "test@example.com",
      email_frequency: "daily",
      profile: { primary_goal: "side income", interests: ["SaaS", "AI"] },
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("test@example.com");
      expect(result.data.email_frequency).toBe("daily");
    }
  });

  it("rejects invalid email", () => {
    const result = onboardingSchema.safeParse({ email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects missing email", () => {
    const result = onboardingSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it("defaults email_frequency to weekly", () => {
    const result = onboardingSchema.safeParse({ email: "a@b.com" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email_frequency).toBe("weekly");
    }
  });

  it("trims email", () => {
    const result = onboardingSchema.safeParse({ email: "  user@test.com  " });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("user@test.com");
    }
  });
});

describe("profileUpdateSchema", () => {
  it("accepts valid input", () => {
    const result = profileUpdateSchema.safeParse({
      email_frequency: "daily",
      profile: { primary_goal: "grow business" },
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid frequency", () => {
    const result = profileUpdateSchema.safeParse({ email_frequency: "hourly" });
    expect(result.success).toBe(false);
  });
});

describe("feedbackSchema", () => {
  it("accepts valid feedback", () => {
    const result = feedbackSchema.safeParse({ content: "Great idea!" });
    expect(result.success).toBe(true);
  });

  it("rejects empty content", () => {
    const result = feedbackSchema.safeParse({ content: "" });
    expect(result.success).toBe(false);
  });

  it("rejects content over 2000 chars", () => {
    const result = feedbackSchema.safeParse({ content: "x".repeat(2001) });
    expect(result.success).toBe(false);
  });
});

describe("requestMoreSchema", () => {
  it("accepts valid email", () => {
    const result = requestMoreSchema.safeParse({ email: "user@test.com" });
    expect(result.success).toBe(true);
  });

  it("rejects non-email", () => {
    const result = requestMoreSchema.safeParse({ email: "nope" });
    expect(result.success).toBe(false);
  });
});

describe("similarIdeasSchema", () => {
  it("accepts seedIdea", () => {
    const result = similarIdeasSchema.safeParse({
      seedIdea: { title: "Test", one_sentence_hook: "Hook" },
    });
    expect(result.success).toBe(true);
  });

  it("accepts context string", () => {
    const result = similarIdeasSchema.safeParse({ context: "AI tools" });
    expect(result.success).toBe(true);
  });

  it("rejects empty body", () => {
    const result = similarIdeasSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});
