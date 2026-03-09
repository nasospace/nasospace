import { supabase } from "@/integrations/supabase/client";
import type { CmsFaqItemRow } from "./types";

export const cmsFaq = {
  async getAll(): Promise<CmsFaqItemRow[]> {
    const { data, error } = await supabase
      .from("cms_faq_items")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("[cms/faq] getAll failed:", error);
      return [];
    }
    return (data ?? []) as unknown as CmsFaqItemRow[];
  },
};
