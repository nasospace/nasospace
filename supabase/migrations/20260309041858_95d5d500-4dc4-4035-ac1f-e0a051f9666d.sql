
-- Tighten profiles insert policy: only allow inserts where user_id matches auth.uid()
-- The handle_new_user trigger uses SECURITY DEFINER so bypasses RLS anyway
DROP POLICY IF EXISTS "Auto-insert profile via trigger" ON public.profiles;

CREATE POLICY "Auto-insert profile via trigger"
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());
