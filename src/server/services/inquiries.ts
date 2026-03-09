/**
 * Inquiry persistence service.
 * All DB access for inquiry submissions lives here.
 */
import { supabase } from "@/integrations/supabase/client";
import { getDeviceId } from "@/lib/deviceId";
import type { InquiryFormData, InquirySubmissionResult } from "@/features/inquiries/types";
import type { RequestHistoryItem, RequestStatus } from "@/features/account/types";
import type { InquiryType } from "@/features/inquiries/types";

export async function submitInquiry(data: InquiryFormData): Promise<InquirySubmissionResult> {
  const { error, data: row } = await supabase
    .from("inquiries")
    .insert({
      device_id: getDeviceId(),
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
  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .eq("device_id", getDeviceId())
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
  const { count, error } = await supabase
    .from("inquiries")
    .select("*", { count: "exact", head: true })
    .eq("device_id", getDeviceId());

  if (error) return 0;
  return count ?? 0;
}
