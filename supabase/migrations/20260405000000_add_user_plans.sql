-- User tiers: user_plans table, idea_profile on users, soft-delete on ideas

-- 1. New table: user_plans
CREATE TABLE user_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  plan_type TEXT NOT NULL DEFAULT 'free'
    CHECK (plan_type IN ('free', 'pack', 'subscriber')),
  pack_credits_remaining INTEGER NOT NULL DEFAULT 0,
  subscription_starts_at TIMESTAMPTZ,
  subscription_expires_at TIMESTAMPTZ,
  paypal_subscription_id TEXT,
  paypal_payer_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_user_plans_user ON user_plans(user_id);
CREATE INDEX idx_user_plans_type ON user_plans(plan_type);

-- 2. Add idea_profile to users
ALTER TABLE users ADD COLUMN idea_profile TEXT DEFAULT '';

-- 3. Add is_deleted to ideas (soft delete)
ALTER TABLE ideas ADD COLUMN is_deleted BOOLEAN NOT NULL DEFAULT false;

-- 4. RLS for user_plans
ALTER TABLE user_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY plans_select_own ON user_plans FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY plans_insert_own ON user_plans FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY plans_update_own ON user_plans FOR UPDATE USING (auth.uid() = user_id);

-- 5. Test accounts seed data
INSERT INTO users (email, profile_json) VALUES
  ('free@itamoa.com', '{"primary_goal":"side project"}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO users (email, profile_json) VALUES
  ('pack@itamoa.com', '{"primary_goal":"freelance"}')
ON CONFLICT (email) DO NOTHING;

INSERT INTO users (email, profile_json) VALUES
  ('sub@itamoa.com', '{"primary_goal":"startup"}')
ON CONFLICT (email) DO NOTHING;

-- Assign plans
INSERT INTO user_plans (user_id, plan_type, pack_credits_remaining)
SELECT id, 'free', 0 FROM users WHERE email = 'free@itamoa.com'
ON CONFLICT (user_id) DO UPDATE SET plan_type = 'free';

INSERT INTO user_plans (user_id, plan_type, pack_credits_remaining)
SELECT id, 'pack', 100 FROM users WHERE email = 'pack@itamoa.com'
ON CONFLICT (user_id) DO UPDATE SET plan_type = 'pack', pack_credits_remaining = 100;

INSERT INTO user_plans (user_id, plan_type, subscription_starts_at, subscription_expires_at)
SELECT id, 'subscriber', now(), now() + INTERVAL '1 year'
FROM users WHERE email = 'sub@itamoa.com'
ON CONFLICT (user_id) DO UPDATE SET plan_type = 'subscriber',
  subscription_starts_at = now(), subscription_expires_at = now() + INTERVAL '1 year';
