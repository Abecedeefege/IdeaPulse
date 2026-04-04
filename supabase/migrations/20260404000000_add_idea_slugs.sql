-- Add slug column to ideas table for SEO-friendly URLs
ALTER TABLE ideas ADD COLUMN slug TEXT;

-- Backfill existing rows: kebab-case from title + last 6 chars of id
UPDATE ideas
SET slug = concat(
  left(
    regexp_replace(
      regexp_replace(
        regexp_replace(
          lower(trim(idea_json->>'title')),
          '[^\w\s-]', '', 'g'
        ),
        '[\s_]+', '-', 'g'
      ),
      '-+', '-', 'g'
    ),
    80
  ),
  '-',
  right(replace(id::text, '-', ''), 6)
)
WHERE slug IS NULL AND idea_json->>'title' IS NOT NULL;

-- For rows without a title, use 'idea-' + short id
UPDATE ideas
SET slug = concat('idea-', right(replace(id::text, '-', ''), 6))
WHERE slug IS NULL;

-- Now add uniqueness constraint
CREATE UNIQUE INDEX ideas_slug_unique ON ideas (slug);
