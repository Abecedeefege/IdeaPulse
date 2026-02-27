import { z } from "zod";

export const onboardingSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  email_frequency: z.enum(["daily", "weekly"]).default("weekly"),
  profile: z.object({
    primary_goal: z.string().optional(),
    constraints: z.object({
      time_per_week: z.string().optional(),
      budget: z.string().optional(),
      skills: z.string().optional(),
      risk_tolerance: z.string().optional(),
    }).optional(),
    interests: z.array(z.string()).optional(),
    preference_summary: z.string().optional(),
  }).optional().default({}),
});

export const profileUpdateSchema = z.object({
  email_frequency: z.enum(["daily", "weekly"]).default("weekly"),
  profile: z.object({
    primary_goal: z.string().optional(),
    constraints: z.object({
      time_per_week: z.string().optional(),
      budget: z.string().optional(),
      skills: z.string().optional(),
      risk_tolerance: z.string().optional(),
    }).optional(),
    interests: z.array(z.string()).optional(),
    preference_summary: z.string().optional(),
  }).optional().default({}),
});

export const feedbackSchema = z.object({
  content: z.string().min(1, "Feedback cannot be empty").max(2000, "Feedback too long"),
  token: z.string().optional(),
});

export const requestMoreSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
});

export const similarIdeasSchema = z.object({
  seedIdea: z.object({
    title: z.string().optional(),
    one_sentence_hook: z.string().optional(),
    why_it_could_work: z.string().optional(),
  }).optional(),
  context: z.string().optional(),
}).refine(
  (data) => data.seedIdea || (data.context && data.context.trim()),
  { message: "Provide seedIdea or context in body" }
);
