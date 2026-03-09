/**
 * CMS query module — Testimonials.
 */
import { supabase } from "@/integrations/supabase/client";
import type { CmsTestimonialRow } from "./types";

export const cmsTestimonials = {
  async fetchAll(): Promise<CmsTestimonialRow[]> {
    const { data, error } = await supabase
      .from("cms_testimonials")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) { console.error("[cms/testimonials]", error); return []; }
    return (data ?? []) as unknown as CmsTestimonialRow[];
  },

  async fetchFeatured(): Promise<CmsTestimonialRow[]> {
    const { data, error } = await supabase
      .from("cms_testimonials")
      .select("*")
      .eq("featured", true)
      .order("sort_order", { ascending: true });
    if (error) return [];
    return (data ?? []) as unknown as CmsTestimonialRow[];
  },
};
