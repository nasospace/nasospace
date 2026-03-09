
-- CMS Content Tables for NASO
-- Public-read content tables with service-role-only writes

-- ═══ Experiences ═══
CREATE TABLE public.cms_experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  summary text NOT NULL,
  description text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'outing',
  tags jsonb NOT NULL DEFAULT '[]'::jsonb,
  date text,
  location text,
  price integer NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'EGP',
  capacity integer NOT NULL DEFAULT 20,
  difficulty text NOT NULL DEFAULT 'easy',
  cover_image_src text NOT NULL DEFAULT '',
  cover_image_alt text NOT NULL DEFAULT '',
  gallery jsonb NOT NULL DEFAULT '[]'::jsonb,
  featured boolean NOT NULL DEFAULT false,
  published boolean NOT NULL DEFAULT true
);

ALTER TABLE public.cms_experiences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read cms_experiences" ON public.cms_experiences FOR SELECT USING (published = true);

-- ═══ Workshops ═══
CREATE TABLE public.cms_workshops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  summary text NOT NULL,
  description text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'art',
  tags jsonb NOT NULL DEFAULT '[]'::jsonb,
  date text,
  location text,
  price integer NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'EGP',
  capacity integer NOT NULL DEFAULT 12,
  duration text NOT NULL DEFAULT '2 hours',
  skill_level text NOT NULL DEFAULT 'beginner',
  materials_included boolean NOT NULL DEFAULT true,
  cover_image_src text NOT NULL DEFAULT '',
  cover_image_alt text NOT NULL DEFAULT '',
  gallery jsonb NOT NULL DEFAULT '[]'::jsonb,
  featured boolean NOT NULL DEFAULT false,
  published boolean NOT NULL DEFAULT true
);

ALTER TABLE public.cms_workshops ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read cms_workshops" ON public.cms_workshops FOR SELECT USING (published = true);

-- ═══ Blog Posts ═══
CREATE TABLE public.cms_blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'naso-journal',
  tags jsonb NOT NULL DEFAULT '[]'::jsonb,
  publish_date text,
  reading_time text NOT NULL DEFAULT '5 min read',
  cover_image_src text NOT NULL DEFAULT '',
  cover_image_alt text NOT NULL DEFAULT '',
  featured boolean NOT NULL DEFAULT false,
  author_name text DEFAULT 'NASO Team',
  linked_experience_slug text,
  linked_workshop_slug text,
  linked_portfolio_slug text,
  published boolean NOT NULL DEFAULT true
);

ALTER TABLE public.cms_blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read cms_blog_posts" ON public.cms_blog_posts FOR SELECT USING (published = true);

-- ═══ FAQ Items ═══
CREATE TABLE public.cms_faq_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  group_id text NOT NULL,
  group_label text NOT NULL,
  group_emoji text NOT NULL DEFAULT '💬',
  question text NOT NULL,
  answer text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true
);

ALTER TABLE public.cms_faq_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read cms_faq_items" ON public.cms_faq_items FOR SELECT USING (published = true);

-- ═══ Site Settings ═══
CREATE TABLE public.cms_site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.cms_site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read cms_site_settings" ON public.cms_site_settings FOR SELECT USING (true);

-- Indexes
CREATE INDEX idx_cms_experiences_slug ON public.cms_experiences(slug);
CREATE INDEX idx_cms_experiences_category ON public.cms_experiences(category);
CREATE INDEX idx_cms_experiences_featured ON public.cms_experiences(featured) WHERE featured = true;
CREATE INDEX idx_cms_workshops_slug ON public.cms_workshops(slug);
CREATE INDEX idx_cms_workshops_category ON public.cms_workshops(category);
CREATE INDEX idx_cms_blog_posts_slug ON public.cms_blog_posts(slug);
CREATE INDEX idx_cms_blog_posts_category ON public.cms_blog_posts(category);
CREATE INDEX idx_cms_faq_items_group ON public.cms_faq_items(group_id, sort_order);
CREATE INDEX idx_cms_site_settings_key ON public.cms_site_settings(key);
