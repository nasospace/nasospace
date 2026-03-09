/**
 * CMS query layer for products.
 * All Supabase product queries live here — never in UI components.
 */
import { supabase } from "@/integrations/supabase/client";
import type { CmsProductRow } from "./types";

export async function fetchProducts(): Promise<CmsProductRow[]> {
  const { data, error } = await supabase
    .from("cms_products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[cms/products] fetchProducts failed:", error);
    return [];
  }
  return (data ?? []) as unknown as CmsProductRow[];
}

export async function fetchProductBySlug(slug: string): Promise<CmsProductRow | null> {
  const { data, error } = await supabase
    .from("cms_products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("[cms/products] fetchProductBySlug failed:", error);
    return null;
  }
  return (data ?? null) as unknown as CmsProductRow | null;
}

export async function fetchFeaturedProducts(): Promise<CmsProductRow[]> {
  const { data, error } = await supabase
    .from("cms_products")
    .select("*")
    .eq("featured", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[cms/products] fetchFeaturedProducts failed:", error);
    return [];
  }
  return (data ?? []) as unknown as CmsProductRow[];
}
