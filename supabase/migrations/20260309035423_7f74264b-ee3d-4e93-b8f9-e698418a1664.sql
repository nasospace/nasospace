
-- Fix the trigger to include device_id (required NOT NULL column)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, device_id, display_name, email)
  VALUES (NEW.id, NEW.id::text, COALESCE(NEW.raw_user_meta_data->>'display_name', 'Explorer'), NEW.email);
  RETURN NEW;
END;
$$;
