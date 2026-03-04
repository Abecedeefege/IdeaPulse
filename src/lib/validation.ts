import { z } from "zod";

const MAX_EMAIL_LEN = 255;
const MAX_STRING_LEN = 2000;
const MAX_INTEREST_LEN = 200;
const MAX_INTERESTS = 20;

const profileFieldsSchema = z.object({
  primary_goal: z.string().max(MAX_STRING_LEN).optional(),
  constraints: z.object({
    time_per_week: z.string().max(MAX_STRING_LEN).optional(),
    budget: z.string().max(MAX_STRING_LEN).optional(),
    skills: z.string().max(MAX_STRING_LEN).optional(),
    risk_tolerance: z.string().max(MAX_STRING_LEN).optional(),
  }).optional(),
  interests: z.array(z.string().max(MAX_INTEREST_LEN)).max(MAX_INTERESTS).optional(),
  preference_summary: z.string().max(MAX_STRING_LEN).optional(),
});

export const onboardingSchema = z.object({
  email: z.string().trim().toLowerCase().email("Invalid email address").max(MAX_EMAIL_LEN),
  email_frequency: z.enum(["daily", "weekly"]).default("weekly"),
  context: z.string().trim().max(MAX_STRING_LEN).optional(),
  profile: profileFieldsSchema.optional().default({}),
});

export const profileUpdateSchema = z.object({
  email_frequency: z.enum(["daily", "weekly"]).default("weekly"),
  profile: profileFieldsSchema.optional().default({}),
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
