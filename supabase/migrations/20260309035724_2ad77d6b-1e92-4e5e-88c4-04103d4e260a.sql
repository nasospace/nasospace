
-- ═══ CMS Portfolio Items ═══
CREATE TABLE public.cms_portfolio_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  summary TEXT NOT NULL,
  story TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'custom-events',
  tags JSONB NOT NULL DEFAULT '[]',
  location TEXT,
  date TEXT,
  audience_type TEXT,
  vibe TEXT,
  cover_image_src TEXT NOT NULL DEFAULT '',
  cover_image_alt TEXT NOT NULL DEFAULT '',
  gallery JSONB NOT NULL DEFAULT '[]',
  linked_experience_slug TEXT,
  linked_workshop_slug TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  published BOOLEAN NOT NULL DEFAULT true,
  testimonial_quote TEXT,
  testimonial_name TEXT
);

ALTER TABLE public.cms_portfolio_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read cms_portfolio_items" ON public.cms_portfolio_items FOR SELECT USING (published = true);

-- ═══ CMS Testimonials ═══
CREATE TABLE public.cms_testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  quote TEXT NOT NULL,
  source_type TEXT NOT NULL DEFAULT 'general',
  context_tag TEXT,
  image_url TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  published BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0
);

ALTER TABLE public.cms_testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read cms_testimonials" ON public.cms_testimonials FOR SELECT USING (published = true);

-- ═══ CMS Page Content (About + Contact in one flexible table) ═══
CREATE TABLE public.cms_page_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_key TEXT NOT NULL,
  section_key TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}',
  sort_order INT NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(page_key, section_key)
);

ALTER TABLE public.cms_page_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read cms_page_content" ON public.cms_page_content FOR SELECT USING (published = true);
