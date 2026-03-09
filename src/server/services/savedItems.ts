/**
 * Saved items persistence service.
 * Manages save/unsave for experiences, workshops, and products.
 */
import { supabase } from "@/integrations/supabase/client";
import { getDeviceId } from "@/lib/deviceId";
import type { SavedItemType } from "@/features/account/types";

export interface SavedItemRow {
  id: string;
  item_type: string;
  item_slug: string;
  created_at: string;
}

export async function getSavedItems(typeFilter?: SavedItemType): Promise<SavedItemRow[]> {
  let query = supabase
    .from("saved_items")
    .select("*")
    .eq("device_id", getDeviceId())
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
  const { count, error } = await supabase
    .from("saved_items")
    .select("*", { count: "exact", head: true })
    .eq("device_id", getDeviceId())
    .eq("item_type", itemType)
    .eq("item_slug", itemSlug);

  if (error) return false;
  return (count ?? 0) > 0;
}

export async function addSavedItem(itemType: SavedItemType, itemSlug: string): Promise<boolean> {
  const { error } = await supabase
    .from("saved_items")
    .insert({
      device_id: getDeviceId(),
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
  const { error } = await supabase
    .from("saved_items")
    .delete()
    .eq("device_id", getDeviceId())
    .eq("item_type", itemType)
    .eq("item_slug", itemSlug);

  if (error) {
    console.error("[savedItems] Remove failed:", error);
    return false;
  }
  return true;
}

export async function getSavedItemCount(): Promise<number> {
  const { count, error } = await supabase
    .from("saved_items")
    .select("*", { count: "exact", head: true })
    .eq("device_id", getDeviceId());

  if (error) return 0;
  return count ?? 0;
}
