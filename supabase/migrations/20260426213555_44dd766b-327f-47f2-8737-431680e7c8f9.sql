-- Ensure unique (page_key, section_key) for safe upserts
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'cms_page_content_page_section_unique'
  ) THEN
    ALTER TABLE public.cms_page_content
      ADD CONSTRAINT cms_page_content_page_section_unique UNIQUE (page_key, section_key);
  END IF;
END $$;

-- Seed default hero rows for every public page
INSERT INTO public.cms_page_content (page_key, section_key, content, sort_order, published) VALUES
  ('home',        'hero', '{"eyebrow":"NASO · Cairo Creative Movement","title":"Stop having boring weekends.","accent":"Live louder.","subtitle":"100 experiences. Workshops. Limited drops. NASO is the door — Cairo is the playground.","marker":"01 / 100","tone":"cream"}'::jsonb, 0, true),
  ('experiences', 'hero', '{"eyebrow":"The 100 Drop · Vol. 001","title":"100 experiences.","accent":"One unforgettable life.","subtitle":"A living journey of curated moments across Cairo. Each slot is a new place, a new craft, a new memory. Most are sealed. The unlocked ones are live and waiting.","marker":"100","tone":"cream"}'::jsonb, 0, true),
  ('shop',        'hero', '{"eyebrow":"Limited Drops","title":"Wear the movement.","accent":"Own the moment.","subtitle":"Apparel, kits, and objects from the NASO universe. Made in small batches. Built to outlive trends.","marker":"DROP · 01","tone":"lemon"}'::jsonb, 0, true),
  ('about',       'hero', '{"eyebrow":"The NASO Manifesto","title":"We don''t do boring.","accent":"Built in Cairo.","subtitle":"NASO is a creative movement turning ordinary weekends into memories you''ll talk about for years.","marker":"EST · 24","tone":"lilac"}'::jsonb, 0, true),
  ('contact',     'hero', '{"eyebrow":"Say Hi","title":"Let''s build something","accent":"unforgettable.","subtitle":"Brand collabs, custom events, press, or just a hello — drop us a line and we''ll get back fast.","marker":"DM · OPEN","tone":"coral"}'::jsonb, 0, true),
  ('faq',         'hero', '{"eyebrow":"Common Questions","title":"Everything you need","accent":"to know.","subtitle":"How NASO works, how to book, what to expect — answered.","marker":"FAQ","tone":"card"}'::jsonb, 0, true),
  ('blog',        'hero', '{"eyebrow":"NASO Journal","title":"Stories, guides,","accent":"& field notes.","subtitle":"Behind the scenes from Cairo''s most creative weekends.","marker":"READ","tone":"cream"}'::jsonb, 0, true),
  ('portfolio',   'hero', '{"eyebrow":"Past Work","title":"Events we''ve","accent":"made real.","subtitle":"A look back at the moments NASO has crafted with brands, communities, and collaborators.","marker":"WORK","tone":"lilac"}'::jsonb, 0, true),
  ('community',   'hero', '{"eyebrow":"Community Love","title":"Real people.","accent":"Real moments.","subtitle":"What our community says about the NASO experience.","marker":"LOVE","tone":"coral"}'::jsonb, 0, true)
ON CONFLICT (page_key, section_key) DO NOTHING;