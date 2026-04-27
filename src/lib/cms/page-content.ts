/**
 * CMS query module — Page content (about, contact, home sections, etc.).
 *
 * fetchPage     — public, only published rows (RLS filters anyway, but we filter explicitly).
 * fetchPageAll  — admin/preview mode, returns drafts too. RLS only allows this for admins.
 */
import { supabase } from "@/integrations/supabase/client";
import type { CmsPageContentRow } from "./types";

export const cmsPageContent = {
  async fetchPage(pageKey: string): Promise<CmsPageContentRow[]> {
    const { data, error } = await supabase
      .from("cms_page_content")
      .select("*")
      .eq("page_key", pageKey)
      .eq("published", true)
      .order("sort_order", { ascending: true });
    if (error) { console.error("[cms/page-content]", error); return []; }
    return (data ?? []) as unknown as CmsPageContentRow[];
  },

  async fetchPageAll(pageKey: string): Promise<CmsPageContentRow[]> {
    const { data, error } = await supabase
      .from("cms_page_content")
      .select("*")
      .eq("page_key", pageKey)
      .order("sort_order", { ascending: true });
    if (error) { console.error("[cms/page-content/all]", error); return []; }
    return (data ?? []) as unknown as CmsPageContentRow[];
  },

  async fetchSection(pageKey: string, sectionKey: string): Promise<CmsPageContentRow | null> {
    const { data, error } = await supabase
      .from("cms_page_content")
      .select("*")
      .eq("page_key", pageKey)
      .eq("section_key", sectionKey)
      .eq("published", true)
      .single();
    if (error) return null;
    return data as unknown as CmsPageContentRow;
  },
};
