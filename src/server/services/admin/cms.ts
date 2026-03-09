/**
 * Admin CMS CRUD service.
 * Provides typed create/update/delete for all CMS content domains.
 *
 * Migration note: All Supabase references are isolated here.
 * When migrating to owned Supabase, only update the client import.
 */
import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

type CmsTable =
  | "cms_experiences"
  | "cms_workshops"
  | "cms_products"
  | "cms_portfolio_items";

/* ═══ Generic helpers ═══ */

export async function fetchAllAdmin<T extends CmsTable>(
  table: T
): Promise<Tables<T>[]> {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(`[admin-cms] fetchAll ${table}:`, error);
    throw new Error(error.message);
  }
  return (data ?? []) as Tables<T>[];
}

export async function fetchOneAdmin<T extends CmsTable>(
  table: T,
  id: string
): Promise<Tables<T>> {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`[admin-cms] fetchOne ${table}:`, error);
    throw new Error(error.message);
  }
  return data as Tables<T>;
}

export async function createAdmin<T extends CmsTable>(
  table: T,
  record: TablesInsert<T>
): Promise<Tables<T>> {
  const { data, error } = await supabase
    .from(table)
    .insert(record as any)
    .select()
    .single();

  if (error) {
    console.error(`[admin-cms] create ${table}:`, error);
    throw new Error(error.message);
  }
  return data as Tables<T>;
}

export async function updateAdmin<T extends CmsTable>(
  table: T,
  id: string,
  updates: TablesUpdate<T>
): Promise<Tables<T>> {
  const { data, error } = await supabase
    .from(table)
    .update({ ...updates, updated_at: new Date().toISOString() } as any)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`[admin-cms] update ${table}:`, error);
    throw new Error(error.message);
  }
  return data as Tables<T>;
}

export async function deleteAdmin(table: CmsTable, id: string): Promise<void> {
  const { error } = await supabase.from(table).delete().eq("id", id);
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
