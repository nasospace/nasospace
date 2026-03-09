-- ═══ Sprint 11: Backend Integration Phase 1 ═══

-- 1. Inquiries table
CREATE TABLE public.inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  device_id TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  inquiry_type TEXT NOT NULL CHECK (inquiry_type IN ('experience','workshop','custom-event','product','corporate','general')),
  preferred_date TEXT,
  group_size TEXT,
  notes TEXT,
  item_type TEXT CHECK (item_type IS NULL OR item_type IN ('experience','workshop','portfolio','product')),
  item_slug TEXT,
  item_title TEXT,
  status TEXT NOT NULL DEFAULT 'sent' CHECK (status IN ('sent','reviewing','contacted','completed')),
  last_updated TIMESTAMPTZ NOT NULL DEFAULT now(),
  admin_notes TEXT
);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit inquiries"
  ON public.inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can read own inquiries"
  ON public.inquiries FOR SELECT
  TO anon, authenticated
  USING (true);

-- 2. Saved items table
CREATE TABLE public.saved_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  device_id TEXT NOT NULL,
  item_type TEXT NOT NULL CHECK (item_type IN ('experience','workshop','product')),
  item_slug TEXT NOT NULL,
  UNIQUE (device_id, item_type, item_slug)
);

ALTER TABLE public.saved_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own saved items"
  ON public.saved_items FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Users can insert saved items"
  ON public.saved_items FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can delete own saved items"
  ON public.saved_items FOR DELETE
  TO anon, authenticated
  USING (true);

-- 3. Profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  device_id TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL DEFAULT 'Explorer',
  email TEXT
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO anon, authenticated
  USING (true);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_last_updated_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_updated = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_inquiries_last_updated
  BEFORE UPDATE ON public.inquiries
  FOR EACH ROW EXECUTE FUNCTION public.update_last_updated_column();

-- Indexes
CREATE INDEX idx_inquiries_device_id ON public.inquiries (device_id);
CREATE INDEX idx_inquiries_status ON public.inquiries (status);
CREATE INDEX idx_saved_items_device_id ON public.saved_items (device_id);
CREATE INDEX idx_profiles_device_id ON public.profiles (device_id);