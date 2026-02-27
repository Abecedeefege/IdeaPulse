-- Enable Row Level Security on all tables

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE idea_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE request_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users: own row only
CREATE POLICY users_select_own ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY users_update_own ON users FOR UPDATE USING (auth.uid() = id);

-- Idea batches: own rows only
CREATE POLICY batches_select_own ON idea_batches FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY batches_insert_own ON idea_batches FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Ideas: own ideas + public ideas readable by everyone
CREATE POLICY ideas_select_own ON ideas FOR SELECT USING (user_id = auth.uid() OR is_public = true);
CREATE POLICY ideas_insert_own ON ideas FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Interactions: own rows only
CREATE POLICY interactions_select_own ON interactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY interactions_insert_own ON interactions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Analyses: own rows only
CREATE POLICY analyses_select_own ON analyses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY analyses_insert_own ON analyses FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Request logs: insert-only for authenticated users
CREATE POLICY logs_insert_auth ON request_logs FOR INSERT WITH CHECK (auth.uid() IS NOT NULL OR user_id IS NULL);

-- Profiles: own profile only
CREATE POLICY profiles_select_own ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY profiles_update_own ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY profiles_insert_own ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
