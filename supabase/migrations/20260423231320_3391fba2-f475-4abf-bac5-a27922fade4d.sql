-- Admin write policies for cms_page_content
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='cms_page_content' AND policyname='Admins can insert cms_page_content') THEN
    CREATE POLICY "Admins can insert cms_page_content"
      ON public.cms_page_content
      FOR INSERT
      TO authenticated
      WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='cms_page_content' AND policyname='Admins can update cms_page_content') THEN
    CREATE POLICY "Admins can update cms_page_content"
      ON public.cms_page_content
      FOR UPDATE
      TO authenticated
      USING (public.has_role(auth.uid(), 'admin'::public.app_role))
      WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='cms_page_content' AND policyname='Admins can delete cms_page_content') THEN
    CREATE POLICY "Admins can delete cms_page_content"
      ON public.cms_page_content
      FOR DELETE
      TO authenticated
      USING (public.has_role(auth.uid(), 'admin'::public.app_role));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='cms_page_content' AND policyname='Admins can read all cms_page_content') THEN
    CREATE POLICY "Admins can read all cms_page_content"
      ON public.cms_page_content
      FOR SELECT
      TO authenticated
      USING (public.has_role(auth.uid(), 'admin'::public.app_role));
  END IF;
END $$;

-- Admin write policies for cms_site_settings
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='cms_site_settings' AND policyname='Admins can insert cms_site_settings') THEN
    CREATE POLICY "Admins can insert cms_site_settings"
      ON public.cms_site_settings
      FOR INSERT
      TO authenticated
      WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='cms_site_settings' AND policyname='Admins can update cms_site_settings') THEN
    CREATE POLICY "Admins can update cms_site_settings"
      ON public.cms_site_settings
      FOR UPDATE
      TO authenticated
      USING (public.has_role(auth.uid(), 'admin'::public.app_role))
      WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='cms_site_settings' AND policyname='Admins can delete cms_site_settings') THEN
    CREATE POLICY "Admins can delete cms_site_settings"
      ON public.cms_site_settings
      FOR DELETE
      TO authenticated
      USING (public.has_role(auth.uid(), 'admin'::public.app_role));
  END IF;
END $$;