
-- Create CMS products table
CREATE TABLE public.cms_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  summary text NOT NULL,
  description text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'apparel',
  tags jsonb NOT NULL DEFAULT '[]'::jsonb,
  price integer NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'EGP',
  stock_status text NOT NULL DEFAULT 'in-stock',
  featured boolean NOT NULL DEFAULT false,
  limited_edition boolean NOT NULL DEFAULT false,
  cover_image_src text NOT NULL DEFAULT '',
  cover_image_alt text NOT NULL DEFAULT '',
  gallery jsonb NOT NULL DEFAULT '[]'::jsonb,
  sizes jsonb DEFAULT NULL,
  colors jsonb DEFAULT NULL,
  linked_experience_slug text DEFAULT NULL,
  linked_workshop_slug text DEFAULT NULL,
  linked_portfolio_slug text DEFAULT NULL,
  published boolean NOT NULL DEFAULT true
);

-- RLS: public read for published products
ALTER TABLE public.cms_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read cms_products"
  ON public.cms_products
  FOR SELECT
  USING (published = true);
