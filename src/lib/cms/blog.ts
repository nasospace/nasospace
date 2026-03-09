import { supabase } from "@/integrations/supabase/client";
import type { CmsBlogPostRow } from "./types";

export const cmsBlogPosts = {
  async getAll(): Promise<CmsBlogPostRow[]> {
    const { data, error } = await supabase
      .from("cms_blog_posts")
      .select("*")
      .order("publish_date", { ascending: false });

    if (error) {
      console.error("[cms/blog] getAll failed:", error);
      return [];
    }
    return (data ?? []) as unknown as CmsBlogPostRow[];
  },

  async getBySlug(slug: string): Promise<CmsBlogPostRow | null> {
    const { data, error } = await supabase
      .from("cms_blog_posts")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      console.error("[cms/blog] getBySlug failed:", error);
      return null;
    }
    return data as unknown as CmsBlogPostRow;
  },

  async getFeatured(): Promise<CmsBlogPostRow | null> {
    const { data, error } = await supabase
      .from("cms_blog_posts")
      .select("*")
      .eq("featured", true)
      .order("publish_date", { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error("[cms/blog] getFeatured failed:", error);
      return null;
    }
    return data as unknown as CmsBlogPostRow;
  },

  async getRelated(currentSlug: string, category: string, limit = 3): Promise<CmsBlogPostRow[]> {
    const { data, error } = await supabase
      .from("cms_blog_posts")
      .select("*")
      .neq("slug", currentSlug)
      .order("publish_date", { ascending: false })
      .limit(limit + 3);

    if (error) {
      console.error("[cms/blog] getRelated failed:", error);
      return [];
    }

    const rows = (data ?? []) as unknown as CmsBlogPostRow[];
    const sameCategory = rows.filter((r) => r.category === category);
    const others = rows.filter((r) => r.category !== category);
    return [...sameCategory, ...others].slice(0, limit);
  },
};
