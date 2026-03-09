/**
 * Admin overview stats queries.
 */
import { supabase } from "@/integrations/supabase/client";

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
