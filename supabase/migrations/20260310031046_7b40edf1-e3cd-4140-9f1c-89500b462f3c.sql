
-- Admin RLS policies for cms_blog_posts
CREATE POLICY "Admins can read all cms_blog_posts"
  ON public.cms_blog_posts FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert cms_blog_posts"
  ON public.cms_blog_posts FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update cms_blog_posts"
  ON public.cms_blog_posts FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete cms_blog_posts"
  ON public.cms_blog_posts FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Admin RLS policies for cms_faq_items
CREATE POLICY "Admins can read all cms_faq_items"
  ON public.cms_faq_items FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert cms_faq_items"
  ON public.cms_faq_items FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update cms_faq_items"
  ON public.cms_faq_items FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete cms_faq_items"
  ON public.cms_faq_items FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Admin RLS policies for cms_testimonials
CREATE POLICY "Admins can read all cms_testimonials"
  ON public.cms_testimonials FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert cms_testimonials"
  ON public.cms_testimonials FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update cms_testimonials"
  ON public.cms_testimonials FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete cms_testimonials"
  ON public.cms_testimonials FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));
