-- Add account_type to users for quota and feature gating
ALTER TABLE users ADD COLUMN IF NOT EXISTS account_type TEXT NOT NULL DEFAULT 'free' CHECK (account_type IN ('free', 'pro', 'team'));

-- Migrate existing profile_json.plan to account_type where present
UPDATE users
SET account_type = CASE
  WHEN (profile_json->>'plan') IN ('pro', 'team') THEN (profile_json->>'plan')::TEXT
  ELSE 'free'
END
WHERE profile_json ? 'plan';

CREATE INDEX IF NOT EXISTS idx_users_account_type ON users(account_type);

COMMENT ON COLUMN users.account_type IS 'free, pro, or team - used for quota and feature gating';
