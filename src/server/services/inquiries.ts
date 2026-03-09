/**
 * Inquiry persistence service.
 * Uses authenticated user_id when available. Allows public (anonymous) submission.
 *
 * Migration note: All Supabase references are isolated here.
 * When migrating to owned Supabase, only update the client import.
 */
import { supabase } from "@/integrations/supabase/client";
import type { InquiryFormData, InquirySubmissionResult } from "@/features/inquiries/types";
import type { RequestHistoryItem, RequestStatus } from "@/features/account/types";
import type { InquiryType } from "@/features/inquiries/types";

async function getUserId(): Promise<string | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user?.id ?? null;
  } catch {
    return null;
  }
}

export async function submitInquiry(data: InquiryFormData): Promise<InquirySubmissionResult> {
  const userId = await getUserId();

  const { error, data: row } = await supabase
    .from("inquiries")
    .insert({
      user_id: userId,
      device_id: userId ?? "anonymous",
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone?.trim() || null,
      inquiry_type: data.inquiryType,
      preferred_date: data.preferredDate || null,
      group_size: data.groupSize || null,
      notes: data.notes?.trim() || null,
      item_type: data.itemType || null,
      item_slug: data.itemSlug || null,
      item_title: data.itemTitle || null,
    })
    .select("id")
    .single();

  if (error) {
    console.error("[inquiries] Submit failed:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }

  return { success: true, message: "Request sent!", inquiryId: row.id };
}

export async function getInquiries(): Promise<RequestHistoryItem[]> {
  const userId = await getUserId();
  if (!userId) return [];

  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[inquiries] Fetch failed:", error);
    return [];
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    inquiryType: row.inquiry_type as InquiryType,
    itemTitle: row.item_title ?? undefined,
    submittedAt: row.created_at,
    status: row.status as RequestStatus,
    lastUpdated: row.last_updated,
    notes: row.admin_notes ?? undefined,
  }));
}

export async function getInquiryCount(): Promise<number> {
  const userId = await getUserId();
  if (!userId) return 0;

  const { count, error } = await supabase
    .from("inquiries")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  if (error) return 0;
  return count ?? 0;
}
