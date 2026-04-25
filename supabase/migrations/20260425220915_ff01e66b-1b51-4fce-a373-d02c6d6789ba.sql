-- ════════════════════════════════════════════════════════════════════
-- Phase 1: Add 100 Experiences journey columns to cms_experiences
-- ════════════════════════════════════════════════════════════════════

ALTER TABLE public.cms_experiences
  ADD COLUMN IF NOT EXISTS slot_number INTEGER,
  ADD COLUMN IF NOT EXISTS is_locked BOOLEAN NOT NULL DEFAULT true;

-- Range constraint: slot must be 1..100 when present
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'cms_experiences_slot_number_range'
  ) THEN
    ALTER TABLE public.cms_experiences
      ADD CONSTRAINT cms_experiences_slot_number_range
      CHECK (slot_number IS NULL OR (slot_number BETWEEN 1 AND 100));
  END IF;
END $$;

-- Unique slot per experience (allows multiple NULLs)
CREATE UNIQUE INDEX IF NOT EXISTS cms_experiences_slot_number_unique
  ON public.cms_experiences (slot_number)
  WHERE slot_number IS NOT NULL;

-- Existing experiences should be considered "unlocked" since they have real content.
-- Only future placeholder slots should be locked.
UPDATE public.cms_experiences SET is_locked = false WHERE is_locked = true;

-- ════════════════════════════════════════════════════════════════════
-- Migrate cms_workshops -> cms_experiences (idempotent via slug check)
-- ════════════════════════════════════════════════════════════════════

INSERT INTO public.cms_experiences (
  title, slug, summary, description, category, tags,
  date, location, price, currency, capacity, difficulty,
  cover_image_src, cover_image_alt, gallery,
  featured, published, is_locked
)
SELECT
  w.title,
  CASE
    WHEN EXISTS (SELECT 1 FROM public.cms_experiences e WHERE e.slug = w.slug)
      THEN 'ws-' || w.slug
    ELSE w.slug
  END AS slug,
  w.summary,
  w.description,
  'workshop'::text AS category,
  w.tags,
  w.date,
  w.location,
  w.price,
  w.currency,
  w.capacity,
  -- workshops use skill_level (beginner/intermediate/advanced); map to experience difficulty
  CASE
    WHEN w.skill_level = 'advanced' THEN 'challenging'
    WHEN w.skill_level = 'intermediate' THEN 'moderate'
    ELSE 'easy'
  END AS difficulty,
  w.cover_image_src,
  w.cover_image_alt,
  w.gallery,
  w.featured,
  w.published,
  false AS is_locked
FROM public.cms_workshops w
WHERE NOT EXISTS (
  -- skip if we've already migrated this workshop (matches by either original or ws- prefixed slug)
  SELECT 1 FROM public.cms_experiences e
  WHERE e.slug = w.slug OR e.slug = 'ws-' || w.slug
);