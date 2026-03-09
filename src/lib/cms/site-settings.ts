import { supabase } from "@/integrations/supabase/client";
import type { CmsSiteSettingRow } from "./types";

export const cmsSiteSettings = {
  async get(key: string): Promise<Record<string, unknown> | null> {
    const { data, error } = await supabase
      .from("cms_site_settings")
      .select("*")
      .eq("key", key)
      .single();

    if (error) {
      console.error(`[cms/site-settings] get(${key}) failed:`, error);
      return null;
    }
    return (data as unknown as CmsSiteSettingRow)?.value ?? null;
  },

  async getAll(): Promise<Record<string, Record<string, unknown>>> {
    const { data, error } = await supabase
      .from("cms_site_settings")
      .select("*");

    if (error) {
      console.error("[cms/site-settings] getAll failed:", error);
      return {};
    }

    const settings: Record<string, Record<string, unknown>> = {};
    for (const row of (data ?? []) as unknown as CmsSiteSettingRow[]) {
      settings[row.key] = row.value;
    }
    return settings;
  },
};
