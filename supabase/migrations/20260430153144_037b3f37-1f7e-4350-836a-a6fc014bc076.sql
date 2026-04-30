-- 1. Delete non-workshop experiences
DELETE FROM public.cms_experiences
WHERE slug IN (
  'sunset-at-the-citadel',
  'cairo-jazz-night',
  'street-art-walk-muizz',
  'wadi-degla-hike',
  'collage-night',
  'rooftop-film-club',
  'fayoum-overnight'
);

-- 2. Re-categorize remaining experiences to workshop-style categories
UPDATE public.cms_experiences SET category = 'pottery'    WHERE slug = 'pottery-and-chill';
UPDATE public.cms_experiences SET category = 'art'        WHERE slug = 'collage-night-cut-and-compose';
UPDATE public.cms_experiences SET category = 'painting'   WHERE slug = 'watercolor-botanicals';
UPDATE public.cms_experiences SET category = 'music'      WHERE slug = 'beat-making-lab';
UPDATE public.cms_experiences SET category = 'cooking'    WHERE slug = 'cook-like-teta';
UPDATE public.cms_experiences SET category = 'craft'      WHERE slug = 'tote-bag-screen-printing';
UPDATE public.cms_experiences SET category = 'journaling' WHERE slug = 'journal-your-year';
UPDATE public.cms_experiences SET category = 'diy'        WHERE slug = 'build-a-terrarium';

-- 3. Drop the cms_workshops table (fully removed)
DROP TABLE IF EXISTS public.cms_workshops CASCADE;

-- 4. Drop workshop link columns from related tables
ALTER TABLE public.cms_blog_posts       DROP COLUMN IF EXISTS linked_workshop_slug;
ALTER TABLE public.cms_portfolio_items  DROP COLUMN IF EXISTS linked_workshop_slug;
ALTER TABLE public.cms_products         DROP COLUMN IF EXISTS linked_workshop_slug;