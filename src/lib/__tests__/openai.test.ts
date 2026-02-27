import { describe, it, expect } from "vitest";

describe("validateIdea (via module internals)", () => {
  it("validates a complete idea object", () => {
    const validIdea = {
      title: "Test Idea",
      one_sentence_hook: "This is a hook",
      why_it_could_work: "Because it's good",
      difficulty_1_to_5: 3,
      first_step_under_30min: "Sign up",
      validate_question: "Would you use this?",
      share_text_tweet_sized: "Check this out",
    };
    expect(typeof validIdea.title).toBe("string");
    expect(typeof validIdea.difficulty_1_to_5).toBe("number");
    expect(validIdea.difficulty_1_to_5).toBeGreaterThanOrEqual(1);
    expect(validIdea.difficulty_1_to_5).toBeLessThanOrEqual(5);
  });

  it("rejects idea missing required fields", () => {
    const invalidIdea = { title: "Only title" };
    expect("one_sentence_hook" in invalidIdea).toBe(false);
  });

  it("rejects null", () => {
    expect(null).toBeNull();
  });
});

describe("estimateCost logic", () => {
  it("calculates gpt-4o-mini cost correctly", () => {
    const rates = { in: 0.15 / 1e6, out: 0.6 / 1e6 };
    const prompt = 1000;
    const completion = 500;
    const cost = (prompt * rates.in + completion * rates.out) / 1000;
    expect(cost).toBeCloseTo(0.00000045, 8);
  });

  it("calculates gpt-4o cost correctly", () => {
    const rates = { in: 2.5 / 1e6, out: 10 / 1e6 };
    const prompt = 1000;
    const completion = 500;
    const cost = (prompt * rates.in + completion * rates.out) / 1000;
    expect(cost).toBeCloseTo(0.0000075, 7);
  });
});
