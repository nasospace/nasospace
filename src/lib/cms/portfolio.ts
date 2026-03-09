/**
 * CMS query module — Portfolio items.
 */
import { supabase } from "@/integrations/supabase/client";
import type { CmsPortfolioItemRow } from "./types";

export const cmsPortfolio = {
  async fetchAll(): Promise<CmsPortfolioItemRow[]> {
    const { data, error } = await supabase
      .from("cms_portfolio_items")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) { console.error("[cms/portfolio]", error); return []; }
    return (data ?? []) as unknown as CmsPortfolioItemRow[];
  },

  async fetchBySlug(slug: string): Promise<CmsPortfolioItemRow | null> {
    const { data, error } = await supabase
      .from("cms_portfolio_items")
      .select("*")
      .eq("slug", slug)
      .single();
    if (error) return null;
    return data as unknown as CmsPortfolioItemRow;
  },

  async fetchFeatured(): Promise<CmsPortfolioItemRow[]> {
    const { data, error } = await supabase
      .from("cms_portfolio_items")
      .select("*")
      .eq("featured", true)
      .order("created_at", { ascending: false });
    if (error) return [];
    return (data ?? []) as unknown as CmsPortfolioItemRow[];
  },
};
