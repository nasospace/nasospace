
-- 1. Add user_id column to profiles (nullable initially for migration)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
CREATE UNIQUE INDEX IF NOT EXISTS profiles_user_id_unique ON public.profiles(user_id);

-- 2. Add user_id column to saved_items (nullable initially)
ALTER TABLE public.saved_items ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- 3. Add user_id column to inquiries (nullable initially)
ALTER TABLE public.inquiries ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- 4. Create trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, email)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', 'Explorer'), NEW.email);
  RETURN NEW;
END;
$$;

-- Drop if exists to avoid duplicate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. Tighten RLS on profiles
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

CREATE POLICY "Authenticated users read own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Auto-insert profile via trigger"
  ON public.profiles FOR INSERT
  TO authenticated, service_role
  WITH CHECK (true);

CREATE POLICY "Users update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- 6. Tighten RLS on saved_items
DROP POLICY IF EXISTS "Users can read own saved items" ON public.saved_items;
DROP POLICY IF EXISTS "Users can insert saved items" ON public.saved_items;
DROP POLICY IF EXISTS "Users can delete own saved items" ON public.saved_items;

CREATE POLICY "Auth users read own saved items"
  ON public.saved_items FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Auth users insert saved items"
  ON public.saved_items FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Auth users delete own saved items"
  ON public.saved_items FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- 7. Tighten RLS on inquiries
DROP POLICY IF EXISTS "Anyone can submit inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Users can read own inquiries" ON public.inquiries;

-- Allow both anon and authenticated to submit (inquiry form is public)
CREATE POLICY "Anyone can submit inquiries"
  ON public.inquiries FOR INSERT
  WITH CHECK (true);

-- Only authenticated users can read their own inquiries
CREATE POLICY "Auth users read own inquiries"
  ON public.inquiries FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());
