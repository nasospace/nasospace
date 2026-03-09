import { supabase } from "@/integrations/supabase/client";
import type { CmsExperienceRow } from "./types";

export const cmsExperiences = {
  async getAll(): Promise<CmsExperienceRow[]> {
    const { data, error } = await supabase
      .from("cms_experiences")
      .select("*")
      .order("date", { ascending: true });

    if (error) {
      console.error("[cms/experiences] getAll failed:", error);
      return [];
    }
    return (data ?? []) as unknown as CmsExperienceRow[];
  },

  async getBySlug(slug: string): Promise<CmsExperienceRow | null> {
    const { data, error } = await supabase
      .from("cms_experiences")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      console.error("[cms/experiences] getBySlug failed:", error);
      return null;
    }
    return data as unknown as CmsExperienceRow;
  },

  async getFeatured(): Promise<CmsExperienceRow[]> {
    const { data, error } = await supabase
      .from("cms_experiences")
      .select("*")
      .eq("featured", true)
      .order("date", { ascending: true });

    if (error) {
      console.error("[cms/experiences] getFeatured failed:", error);
      return [];
    }
    return (data ?? []) as unknown as CmsExperienceRow[];
  },

  async getByCategory(category: string): Promise<CmsExperienceRow[]> {
    const { data, error } = await supabase
      .from("cms_experiences")
      .select("*")
      .eq("category", category)
      .order("date", { ascending: true });

    if (error) {
      console.error("[cms/experiences] getByCategory failed:", error);
      return [];
    }
    return (data ?? []) as unknown as CmsExperienceRow[];
  },

  async getRelated(currentSlug: string, category: string, limit = 3): Promise<CmsExperienceRow[]> {
    const { data, error } = await supabase
      .from("cms_experiences")
      .select("*")
      .neq("slug", currentSlug)
      .order("featured", { ascending: false })
      .limit(limit + 3); // fetch extra to prioritize same category

    if (error) {
      console.error("[cms/experiences] getRelated failed:", error);
      return [];
    }

    const rows = (data ?? []) as unknown as CmsExperienceRow[];
    const sameCategory = rows.filter((r) => r.category === category);
    const others = rows.filter((r) => r.category !== category);
    return [...sameCategory, ...others].slice(0, limit);
  },
};
