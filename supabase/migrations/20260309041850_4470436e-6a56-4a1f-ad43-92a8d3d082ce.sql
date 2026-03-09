
-- Tighten the inquiry insert policy: require that device_id is not empty
-- (replaces the overly permissive WITH CHECK (true))
DROP POLICY IF EXISTS "Anyone can submit inquiries" ON public.inquiries;

CREATE POLICY "Anyone can submit inquiries"
  ON public.inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    -- Must provide a non-empty device_id
    length(trim(device_id)) > 0
    -- If authenticated, user_id must match the caller
    AND (
      auth.uid() IS NULL 
      OR user_id = auth.uid()
    )
  );
