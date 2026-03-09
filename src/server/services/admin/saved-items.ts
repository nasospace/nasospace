/**
 * Admin saved-items queries — demand signals.
 */
import { supabase } from "@/integrations/supabase/client";

export interface SavedItemSignal {
  item_type: string;
  item_slug: string;
  created_at: string;
}

export async function getSavedItemsSignals(opts?: {
  limit?: number;
}): Promise<{ data: SavedItemSignal[]; count: number }> {
  const { data, error, count } = await supabase
    .from("saved_items")
    .select("item_type, item_slug, created_at", { count: "exact" })
    .order("created_at", { ascending: false })
    .limit(opts?.limit ?? 50);

  if (error) {
    console.error("[admin] getSavedItemsSignals failed:", error);
    return { data: [], count: 0 };
  }
  return { data: (data ?? []) as SavedItemSignal[], count: count ?? 0 };
}

export interface SavedItemAggregate {
  type: string;
  count: number;
}

export async function getSavedItemsAggregates(): Promise<SavedItemAggregate[]> {
  const { data, error } = await supabase
    .from("saved_items")
    .select("item_type");

  if (error) {
    console.error("[admin] getSavedItemsAggregates failed:", error);
    return [];
  }

  const counts: Record<string, number> = {};
  (data ?? []).forEach((row) => {
    counts[row.item_type] = (counts[row.item_type] ?? 0) + 1;
  });

  return Object.entries(counts)
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count);
}

export interface TopSavedItem {
  item_type: string;
  item_slug: string;
  count: number;
}

export async function getTopSavedItems(limit = 10): Promise<TopSavedItem[]> {
  const { data, error } = await supabase
    .from("saved_items")
    .select("item_type, item_slug");

  if (error || !data) return [];

  const counts: Record<string, { item_type: string; item_slug: string; count: number }> = {};
  data.forEach((row) => {
    const key = `${row.item_type}:${row.item_slug}`;
    if (!counts[key]) {
      counts[key] = { item_type: row.item_type, item_slug: row.item_slug, count: 0 };
    }
    counts[key].count++;
  });

  return Object.values(counts)
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}
