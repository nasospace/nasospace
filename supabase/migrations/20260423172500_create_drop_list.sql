CREATE TABLE IF NOT EXISTS public.drop_list (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    email text NOT NULL UNIQUE,
    source text
);

ALTER TABLE public.drop_list ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable insert for anonymous users" ON public.drop_list
    FOR INSERT
    TO public
    WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON public.drop_list
    FOR SELECT
    TO public
    USING (true);
