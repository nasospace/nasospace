/**
 * Admin CMS CRUD service.
 * Provides create/update/delete for all CMS content domains.
 *
 * Migration note: All Supabase references are isolated here.
 * When migrating to owned Supabase, only update the client import.
 */
import { supabase } from "@/integrations/supabase/client";

export type CmsTable =
  | "cms_experiences"
  | "cms_workshops"
  | "cms_products"
  | "cms_portfolio_items"
  | "cms_blog_posts"
  | "cms_faq_items"
  | "cms_testimonials";

/* ═══ Helpers ═══ */

export async function fetchAllAdmin(table: CmsTable): Promise<Record<string, any>[]> {
  // Use explicit table calls to avoid deep type instantiation
  let result: { data: any; error: any };

  switch (table) {
    case "cms_experiences":
      result = await supabase.from("cms_experiences").select("*").order("created_at", { ascending: false });
      break;
    case "cms_workshops":
      result = await supabase.from("cms_workshops").select("*").order("created_at", { ascending: false });
      break;
    case "cms_products":
      result = await supabase.from("cms_products").select("*").order("created_at", { ascending: false });
      break;
    case "cms_portfolio_items":
      result = await supabase.from("cms_portfolio_items").select("*").order("created_at", { ascending: false });
      break;
  }

  if (result.error) {
    console.error(`[admin-cms] fetchAll ${table}:`, result.error);
    throw new Error(result.error.message);
  }
  return result.data ?? [];
}

export async function fetchOneAdmin(table: CmsTable, id: string): Promise<Record<string, any>> {
  let result: { data: any; error: any };

  switch (table) {
    case "cms_experiences":
      result = await supabase.from("cms_experiences").select("*").eq("id", id).single();
      break;
    case "cms_workshops":
      result = await supabase.from("cms_workshops").select("*").eq("id", id).single();
      break;
    case "cms_products":
      result = await supabase.from("cms_products").select("*").eq("id", id).single();
      break;
    case "cms_portfolio_items":
      result = await supabase.from("cms_portfolio_items").select("*").eq("id", id).single();
      break;
  }

  if (result.error) throw new Error(result.error.message);
  return result.data;
}

export async function createAdmin(table: CmsTable, record: Record<string, unknown>): Promise<Record<string, any>> {
  let result: { data: any; error: any };

  switch (table) {
    case "cms_experiences":
      result = await supabase.from("cms_experiences").insert(record as any).select().single();
      break;
    case "cms_workshops":
      result = await supabase.from("cms_workshops").insert(record as any).select().single();
      break;
    case "cms_products":
      result = await supabase.from("cms_products").insert(record as any).select().single();
      break;
    case "cms_portfolio_items":
      result = await supabase.from("cms_portfolio_items").insert(record as any).select().single();
      break;
  }

  if (result.error) throw new Error(result.error.message);
  return result.data;
}

export async function updateAdmin(table: CmsTable, id: string, updates: Record<string, unknown>): Promise<Record<string, any>> {
  const payload = { ...updates, updated_at: new Date().toISOString() };
  let result: { data: any; error: any };

  switch (table) {
    case "cms_experiences":
      result = await supabase.from("cms_experiences").update(payload as any).eq("id", id).select().single();
      break;
    case "cms_workshops":
      result = await supabase.from("cms_workshops").update(payload as any).eq("id", id).select().single();
      break;
    case "cms_products":
      result = await supabase.from("cms_products").update(payload as any).eq("id", id).select().single();
      break;
    case "cms_portfolio_items":
      result = await supabase.from("cms_portfolio_items").update(payload as any).eq("id", id).select().single();
      break;
  }

  if (result.error) throw new Error(result.error.message);
  return result.data;
}

export async function deleteAdmin(table: CmsTable, id: string): Promise<void> {
  let error: any;

  switch (table) {
    case "cms_experiences":
      ({ error } = await supabase.from("cms_experiences").delete().eq("id", id));
      break;
    case "cms_workshops":
      ({ error } = await supabase.from("cms_workshops").delete().eq("id", id));
      break;
    case "cms_products":
      ({ error } = await supabase.from("cms_products").delete().eq("id", id));
      break;
    case "cms_portfolio_items":
      ({ error } = await supabase.from("cms_portfolio_items").delete().eq("id", id));
      break;
  }

  if (error) throw new Error(error.message);
}

/* ═══ Slug helper ═══ */

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
