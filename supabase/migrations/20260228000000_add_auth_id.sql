-- Add auth_id column to link app users to Supabase Auth users
ALTER TABLE users ADD COLUMN IF NOT EXISTS auth_id UUID UNIQUE;

-- Create index for fast lookups
CREATE INDEX IF NOT EXISTS idx_users_auth_id ON users(auth_id);

-- Drop old RLS policies that used auth.uid() = id (broken: different UUIDs)
DROP POLICY IF EXISTS users_select_own ON users;
DROP POLICY IF EXISTS users_update_own ON users;
DROP POLICY IF EXISTS batches_select_own ON idea_batches;
DROP POLICY IF EXISTS batches_insert_own ON idea_batches;
DROP POLICY IF EXISTS ideas_select_own ON ideas;
DROP POLICY IF EXISTS ideas_insert_own ON ideas;
DROP POLICY IF EXISTS interactions_select_own ON interactions;
DROP POLICY IF EXISTS interactions_insert_own ON interactions;
DROP POLICY IF EXISTS analyses_select_own ON analyses;
DROP POLICY IF EXISTS analyses_insert_own ON analyses;
DROP POLICY IF EXISTS logs_insert_auth ON request_logs;

-- Helper: get app user_id from auth.uid()
-- We use a subquery pattern since Supabase doesn't support custom functions in all plans

-- Users: select/update own row via auth_id
CREATE POLICY users_select_own ON users FOR SELECT
  USING (auth_id = auth.uid());
CREATE POLICY users_update_own ON users FOR UPDATE
  USING (auth_id = auth.uid());

-- Idea batches: own rows via user_id linked through auth_id
CREATE POLICY batches_select_own ON idea_batches FOR SELECT
  USING (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));
CREATE POLICY batches_insert_own ON idea_batches FOR INSERT
  WITH CHECK (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));

-- Ideas: own + public readable
CREATE POLICY ideas_select_own ON ideas FOR SELECT
  USING (is_public = true OR user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));
CREATE POLICY ideas_insert_own ON ideas FOR INSERT
  WITH CHECK (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));

-- Interactions: own rows
CREATE POLICY interactions_select_own ON interactions FOR SELECT
  USING (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));
CREATE POLICY interactions_insert_own ON interactions FOR INSERT
  WITH CHECK (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));

-- Analyses: own rows
CREATE POLICY analyses_select_own ON analyses FOR SELECT
  USING (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));
CREATE POLICY analyses_insert_own ON analyses FOR INSERT
  WITH CHECK (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));

-- Request logs: insert for any authenticated user
CREATE POLICY logs_insert_auth ON request_logs FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL OR user_id IS NULL);
