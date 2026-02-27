import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
  OPENAI_API_KEY: z.string().min(1).optional(),
  OPENAI_MODEL_FAST: z.string().default("gpt-4o-mini"),
  OPENAI_MODEL_DEEP: z.string().default("gpt-4o"),
  RESEND_API_KEY: z.string().min(1).optional(),
  EMAIL_FROM: z.string().default("IdeaPulse <onboarding@resend.dev>"),
  NEXT_PUBLIC_APP_URL: z.string().default("http://localhost:3000"),
  ACTION_LINK_SECRET: z.string().min(32).optional(),
  CRON_SECRET: z.string().optional(),
  RATE_LIMIT_IDEAS_PER_DAY: z.coerce.number().default(10),
  RATE_LIMIT_ANALYSES_PER_WEEK_FREE: z.coerce.number().default(0),
});

export type Env = z.infer<typeof envSchema>;

function loadEnv(): Env {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    const formatted = result.error.issues
      .map((i) => `  ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    console.error(`[env] Invalid environment variables:\n${formatted}`);
    throw new Error(`Invalid environment variables:\n${formatted}`);
  }
  return result.data;
}

export const env = loadEnv();

export function requireSupabase() {
  if (!env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is required");
  }
}

export function requireOpenAI() {
  if (!env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is required");
  }
}

export function requireResend() {
  if (!env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is required");
  }
}
