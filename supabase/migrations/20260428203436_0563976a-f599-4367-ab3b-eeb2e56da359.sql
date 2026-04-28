CREATE TABLE public.drop_list (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'unknown',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX drop_list_email_unique ON public.drop_list (lower(email));

ALTER TABLE public.drop_list ENABLE ROW LEVEL SECURITY;

-- Anyone can sign up (anon + authenticated)
CREATE POLICY "Anyone can sign up to drop list"
ON public.drop_list
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(trim(email)) > 0
  AND email LIKE '%@%.%'
  AND length(email) <= 320
);

-- Only admins can read
CREATE POLICY "Admins can read drop_list"
ON public.drop_list
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete
CREATE POLICY "Admins can delete drop_list"
ON public.drop_list
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can update
CREATE POLICY "Admins can update drop_list"
ON public.drop_list
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));