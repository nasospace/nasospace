
-- Admin write policies for cms_experiences
CREATE POLICY "Admins can insert cms_experiences"
ON public.cms_experiences FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update cms_experiences"
ON public.cms_experiences FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete cms_experiences"
ON public.cms_experiences FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admin write policies for cms_workshops
CREATE POLICY "Admins can insert cms_workshops"
ON public.cms_workshops FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update cms_workshops"
ON public.cms_workshops FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete cms_workshops"
ON public.cms_workshops FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admin write policies for cms_products
CREATE POLICY "Admins can insert cms_products"
ON public.cms_products FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update cms_products"
ON public.cms_products FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete cms_products"
ON public.cms_products FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admin write policies for cms_portfolio_items
CREATE POLICY "Admins can insert cms_portfolio_items"
ON public.cms_portfolio_items FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update cms_portfolio_items"
ON public.cms_portfolio_items FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete cms_portfolio_items"
ON public.cms_portfolio_items FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admin SELECT policies (admins should see all rows including unpublished)
CREATE POLICY "Admins can read all cms_experiences"
ON public.cms_experiences FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can read all cms_workshops"
ON public.cms_workshops FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can read all cms_products"
ON public.cms_products FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can read all cms_portfolio_items"
ON public.cms_portfolio_items FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
