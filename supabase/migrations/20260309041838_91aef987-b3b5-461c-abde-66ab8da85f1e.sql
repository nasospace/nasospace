
-- Add unique constraint on saved_items to prevent duplicate saves at DB level
ALTER TABLE public.saved_items ADD CONSTRAINT saved_items_user_item_unique 
  UNIQUE (user_id, item_type, item_slug);

-- Add a device-id-based read policy for inquiries so anonymous users 
-- can view their own submissions in the same session (nice-to-have UX)
CREATE POLICY "Device users read own inquiries"
  ON public.inquiries
  FOR SELECT
  TO anon
  USING (device_id = 'anonymous' AND false);
-- Note: this policy intentionally blocks anon reads. 
-- Only authenticated users can view inquiry history.

-- Tighten inquiry insert: ensure name and email are not empty
CREATE OR REPLACE FUNCTION public.validate_inquiry_insert()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF trim(NEW.name) = '' THEN
    RAISE EXCEPTION 'Name cannot be empty';
  END IF;
  IF trim(NEW.email) = '' OR NEW.email NOT LIKE '%@%.%' THEN
    RAISE EXCEPTION 'Valid email is required';
  END IF;
  IF length(NEW.name) > 200 THEN
    RAISE EXCEPTION 'Name too long';
  END IF;
  IF length(NEW.email) > 320 THEN
    RAISE EXCEPTION 'Email too long';
  END IF;
  IF NEW.notes IS NOT NULL AND length(NEW.notes) > 5000 THEN
    RAISE EXCEPTION 'Notes too long';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_validate_inquiry_insert
  BEFORE INSERT ON public.inquiries
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_inquiry_insert();
