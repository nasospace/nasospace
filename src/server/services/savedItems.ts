/**
 * Saved items persistence service.
 * Uses authenticated user_id. Returns empty/false if unauthenticated.
 *
 * Migration note: All Supabase references are isolated here.
 * When migrating to owned Supabase, only update the client import.
 */
import { supabase } from "@/integrations/supabase/client";
import { getCachedUserId } from "@/lib/auth/session";
import type { SavedItemType } from "@/features/account/types";

export interface SavedItemRow {
  id: string;
  item_type: string;
  item_slug: string;
  created_at: string;
}

export async function getSavedItems(typeFilter?: SavedItemType): Promise<SavedItemRow[]> {
  const userId = await getCachedUserId();
  if (!userId) return [];

  let query = supabase
    .from("saved_items")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (typeFilter) {
    query = query.eq("item_type", typeFilter);
  }

  const { data, error } = await query;
  if (error) {
    console.error("[savedItems] Fetch failed:", error);
    return [];
  }
  return data ?? [];
}

export async function isItemSaved(itemType: SavedItemType, itemSlug: string): Promise<boolean> {
  const userId = await getCachedUserId();
  if (!userId) return false;

  const { count, error } = await supabase
    .from("saved_items")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("item_type", itemType)
    .eq("item_slug", itemSlug);

  if (error) return false;
  return (count ?? 0) > 0;
}

export async function addSavedItem(itemType: SavedItemType, itemSlug: string): Promise<boolean> {
  const userId = await getCachedUserId();
  if (!userId) return false;

  const { error } = await supabase
    .from("saved_items")
    .insert({
      user_id: userId,
      device_id: userId, // keep column populated for backwards compat
      item_type: itemType,
      item_slug: itemSlug,
    });

  if (error) {
    // Unique constraint violation = already saved, treat as success
    if (error.code === "23505") return true;
    console.error("[savedItems] Add failed:", error);
    return false;
  }
  return true;
}

export async function removeSavedItem(itemType: SavedItemType, itemSlug: string): Promise<boolean> {
  const userId = await getCachedUserId();
  if (!userId) return false;

  const { error } = await supabase
    .from("saved_items")
    .delete()
    .eq("user_id", userId)
    .eq("item_type", itemType)
    .eq("item_slug", itemSlug);

  if (error) {
    console.error("[savedItems] Remove failed:", error);
    return false;
  }
  return true;
}

export async function getSavedItemCount(): Promise<number> {
  const userId = await getCachedUserId();
  if (!userId) return 0;

  const { count, error } = await supabase
    .from("saved_items")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  if (error) return 0;
  return count ?? 0;
}
