/**
 * Admin CMS CRUD service.
 * Provides typed create/update/delete for all CMS content domains.
 *
 * Migration note: All Supabase references are isolated here.
 * When migrating to owned Supabase, only update the client import.
 */
import { supabase } from "@/integrations/supabase/client";

type CmsTable =
  | "cms_experiences"
  | "cms_workshops"
  | "cms_products"
  | "cms_portfolio_items";

/* ═══ Generic helpers ═══ */

export async function fetchAllAdmin(table: CmsTable) {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(`[admin-cms] fetchAll ${table}:`, error);
    throw new Error(error.message);
  }
  return data ?? [];
}

export async function fetchOneAdmin(table: CmsTable, id: string) {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("id" as any, id)
    .single();

  if (error) {
    console.error(`[admin-cms] fetchOne ${table}:`, error);
    throw new Error(error.message);
  }
  return data;
}

export async function createAdmin(table: CmsTable, record: Record<string, unknown>) {
  const { data, error } = await supabase
    .from(table)
    .insert(record as any)
    .select()
    .single();

  if (error) {
    console.error(`[admin-cms] create ${table}:`, error);
    throw new Error(error.message);
  }
  return data;
}

export async function updateAdmin(table: CmsTable, id: string, updates: Record<string, unknown>) {
  const { data, error } = await supabase
    .from(table)
    .update({ ...updates, updated_at: new Date().toISOString() } as any)
    .eq("id" as any, id)
    .select()
    .single();

  if (error) {
    console.error(`[admin-cms] update ${table}:`, error);
    throw new Error(error.message);
  }
  return data;
}

export async function deleteAdmin(table: CmsTable, id: string): Promise<void> {
  const { error } = await supabase.from(table).delete().eq("id" as any, id);
  if (error) {
    console.error(`[admin-cms] delete ${table}:`, error);
    throw new Error(error.message);
  }
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
