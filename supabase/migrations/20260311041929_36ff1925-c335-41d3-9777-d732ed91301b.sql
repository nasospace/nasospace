
-- Create public storage bucket for CMS images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('cms-images', 'cms-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

-- Allow authenticated admins to upload
CREATE POLICY "Admins can upload CMS images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'cms-images'
  AND public.has_role(auth.uid(), 'admin')
);

-- Allow admins to update their uploads
CREATE POLICY "Admins can update CMS images"
ON storage.objects FOR UPDATE TO authenticated
USING (
  bucket_id = 'cms-images'
  AND public.has_role(auth.uid(), 'admin')
);

-- Allow admins to delete images
CREATE POLICY "Admins can delete CMS images"
ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'cms-images'
  AND public.has_role(auth.uid(), 'admin')
);

-- Public read access (images are public)
CREATE POLICY "Anyone can view CMS images"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'cms-images');
