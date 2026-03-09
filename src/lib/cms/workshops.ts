import { supabase } from "@/integrations/supabase/client";
import type { CmsWorkshopRow } from "./types";

export const cmsWorkshops = {
  async getAll(): Promise<CmsWorkshopRow[]> {
    const { data, error } = await supabase
      .from("cms_workshops")
      .select("*")
      .order("date", { ascending: true });

    if (error) {
      console.error("[cms/workshops] getAll failed:", error);
      return [];
    }
    return (data ?? []) as unknown as CmsWorkshopRow[];
  },

  async getBySlug(slug: string): Promise<CmsWorkshopRow | null> {
    const { data, error } = await supabase
      .from("cms_workshops")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      console.error("[cms/workshops] getBySlug failed:", error);
      return null;
    }
    return data as unknown as CmsWorkshopRow;
  },

  async getFeatured(): Promise<CmsWorkshopRow[]> {
    const { data, error } = await supabase
      .from("cms_workshops")
      .select("*")
      .eq("featured", true)
      .order("date", { ascending: true });

    if (error) {
      console.error("[cms/workshops] getFeatured failed:", error);
      return [];
    }
    return (data ?? []) as unknown as CmsWorkshopRow[];
  },

  async getRelated(currentSlug: string, category: string, limit = 3): Promise<CmsWorkshopRow[]> {
    const { data, error } = await supabase
      .from("cms_workshops")
      .select("*")
      .neq("slug", currentSlug)
      .order("featured", { ascending: false })
      .limit(limit + 3);

    if (error) {
      console.error("[cms/workshops] getRelated failed:", error);
      return [];
    }

    const rows = (data ?? []) as unknown as CmsWorkshopRow[];
    const sameCategory = rows.filter((r) => r.category === category);
    const others = rows.filter((r) => r.category !== category);
    return [...sameCategory, ...others].slice(0, limit);
  },
};
