-- Add anonymous_id column to users for tracking anonymous visitors.
-- When a visitor later claims their account, their anonymous ideas
-- are transferred to the real user and the anonymous record is deleted.

ALTER TABLE users ADD COLUMN anonymous_id TEXT UNIQUE;
CREATE INDEX idx_users_anonymous_id ON users(anonymous_id);
