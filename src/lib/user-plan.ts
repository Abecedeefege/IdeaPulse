import { supabaseServer } from "@/lib/supabase";

export type PlanType = "anonymous" | "free" | "pack" | "subscriber";

export type UserPlan = {
  planType: PlanType;
  packCreditsRemaining: number;
  subscriptionExpiresAt: Date | null;
  dailyIdeaLimit: number;
  isLifetimeCredits: boolean;
};

const DAILY_LIMITS: Record<PlanType, number> = {
  anonymous: 5,
  free: Number(process.env.DAILY_LIMIT_FREE) || 20,
  pack: 100,
  subscriber: Number(process.env.DAILY_LIMIT_SUBSCRIBER) || 100,
};

export function getDailyLimit(planType: PlanType): number {
  return DAILY_LIMITS[planType];
}

export function isPremium(planType: PlanType): boolean {
  return planType === "pack" || planType === "subscriber";
}

export async function getUserPlan(userId: string): Promise<UserPlan> {
  const db = supabaseServer();
  const { data } = await db
    .from("user_plans")
    .select("plan_type, pack_credits_remaining, subscription_expires_at")
    .eq("user_id", userId)
    .maybeSingle();

  if (!data) {
    return {
      planType: "free",
      packCreditsRemaining: 0,
      subscriptionExpiresAt: null,
      dailyIdeaLimit: DAILY_LIMITS.free,
      isLifetimeCredits: false,
    };
  }

  const planType = data.plan_type as PlanType;

  // Check if subscription has expired
  if (planType === "subscriber" && data.subscription_expires_at) {
    const expiresAt = new Date(data.subscription_expires_at);
    if (expiresAt < new Date()) {
      return {
        planType: "free",
        packCreditsRemaining: 0,
        subscriptionExpiresAt: expiresAt,
        dailyIdeaLimit: DAILY_LIMITS.free,
        isLifetimeCredits: false,
      };
    }
  }

  return {
    planType,
    packCreditsRemaining: data.pack_credits_remaining ?? 0,
    subscriptionExpiresAt: data.subscription_expires_at
      ? new Date(data.subscription_expires_at)
      : null,
    dailyIdeaLimit: DAILY_LIMITS[planType],
    isLifetimeCredits: planType === "pack",
  };
}
