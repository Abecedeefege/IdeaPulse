-- Profiles linked to app users for personalization

create table if not exists profiles (
  id uuid primary key references users(id) on delete cascade,
  email text not null,
  email_frequency text not null default 'weekly' check (email_frequency in ('daily','weekly')),
  primary_goal text,
  constraints_json jsonb default '{}',
  interests text[] default '{}',
  preference_summary text default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_profiles_email on profiles(email);

