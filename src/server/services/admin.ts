/**
 * Admin data service — centralized queries for admin dashboard.
 * All functions require the caller to be an admin (enforced by RLS).
 *
 * Migration note: All Supabase references are isolated here.
 * When migrating to owned Supabase, only update the client import.
 */
import { supabase } from "@/integrations/supabase/client";

/* ═══ Role check ═══ */

export async function checkIsAdmin(): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .eq("role", "admin")
    .maybeSingle();

  if (error || !data) return false;
  return true;
}

/* ═══ Overview stats ═══ */

export interface AdminOverviewStats {
  totalInquiries: number;
  pendingInquiries: number;
  totalProfiles: number;
  totalSavedItems: number;
}

export async function getOverviewStats(): Promise<AdminOverviewStats> {
  const [inquiriesRes, pendingRes, profilesRes, savedRes] = await Promise.all([
    supabase.from("inquiries").select("*", { count: "exact", head: true }),
    supabase.from("inquiries").select("*", { count: "exact", head: true }).eq("status", "sent"),
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("saved_items").select("*", { count: "exact", head: true }),
  ]);

  return {
    totalInquiries: inquiriesRes.count ?? 0,
    pendingInquiries: pendingRes.count ?? 0,
    totalProfiles: profilesRes.count ?? 0,
    totalSavedItems: savedRes.count ?? 0,
  };
}

/* ═══ Inquiries ═══ */

export interface AdminInquiry {
  id: string;
  name: string;
  email: string;
  inquiry_type: string;
  item_title: string | null;
  item_type: string | null;
  status: string;
  notes: string | null;
  admin_notes: string | null;
  created_at: string;
  last_updated: string;
  phone: string | null;
  preferred_date: string | null;
  group_size: string | null;
}

export async function getInquiries(opts?: {
  status?: string;
  limit?: number;
  offset?: number;
}): Promise<{ data: AdminInquiry[]; count: number }> {
  let query = supabase
    .from("inquiries")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (opts?.status) {
    query = query.eq("status", opts.status);
  }
  if (opts?.limit) {
    query = query.limit(opts.limit);
  }
  if (opts?.offset) {
    query = query.range(opts.offset, opts.offset + (opts.limit ?? 20) - 1);
  }

  const { data, error, count } = await query;
  if (error) {
    console.error("[admin] getInquiries failed:", error);
    return { data: [], count: 0 };
  }
  return { data: (data ?? []) as AdminInquiry[], count: count ?? 0 };
}

export async function updateInquiryStatus(
  inquiryId: string,
  status: string,
  adminNotes?: string
): Promise<boolean> {
  const update: Record<string, unknown> = { status };
  if (adminNotes !== undefined) {
    update.admin_notes = adminNotes;
  }

  const { error } = await supabase
    .from("inquiries")
    .update(update)
    .eq("id", inquiryId);

  if (error) {
    console.error("[admin] updateInquiryStatus failed:", error);
    return false;
  }
  return true;
}

/* ═══ Profiles ═══ */

export interface AdminProfile {
  id: string;
  user_id: string | null;
  display_name: string;
  email: string | null;
  created_at: string;
}

export async function getProfiles(opts?: {
  limit?: number;
  offset?: number;
}): Promise<{ data: AdminProfile[]; count: number }> {
  let query = supabase
    .from("profiles")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (opts?.limit) {
    query = query.limit(opts.limit);
  }
  if (opts?.offset) {
    query = query.range(opts.offset, opts.offset + (opts.limit ?? 20) - 1);
  }

  const { data, error, count } = await query;
  if (error) {
    console.error("[admin] getProfiles failed:", error);
    return { data: [], count: 0 };
  }
  return { data: (data ?? []) as AdminProfile[], count: count ?? 0 };
}

/* ═══ Saved Items ═══ */

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
