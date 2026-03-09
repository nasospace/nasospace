/**
 * Admin inquiry queries and mutations.
 */
import { supabase } from "@/integrations/supabase/client";

export interface AdminInquiry {
  id: string;
  name: string;
  email: string;
  inquiry_type: string;
  item_title: string | null;
  item_type: string | null;
  item_slug: string | null;
  status: string;
  notes: string | null;
  admin_notes: string | null;
  created_at: string;
  last_updated: string;
  phone: string | null;
  preferred_date: string | null;
  group_size: string | null;
}

export interface InquiryFilterOpts {
  status?: string;
  inquiryType?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

export async function getInquiries(opts?: InquiryFilterOpts): Promise<{ data: AdminInquiry[]; count: number }> {
  let query = supabase
    .from("inquiries")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (opts?.status) {
    query = query.eq("status", opts.status);
  }
  if (opts?.inquiryType) {
    query = query.eq("inquiry_type", opts.inquiryType);
  }
  if (opts?.search) {
    const term = `%${opts.search}%`;
    query = query.or(`name.ilike.${term},email.ilike.${term},item_title.ilike.${term}`);
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

export async function getInquiryTypes(): Promise<string[]> {
  const { data, error } = await supabase
    .from("inquiries")
    .select("inquiry_type");

  if (error || !data) return [];
  const types = [...new Set(data.map((d) => d.inquiry_type))].sort();
  return types;
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

export async function updateInquiryAdminNotes(
  inquiryId: string,
  adminNotes: string
): Promise<boolean> {
  const { error } = await supabase
    .from("inquiries")
    .update({ admin_notes: adminNotes })
    .eq("id", inquiryId);

  if (error) {
    console.error("[admin] updateInquiryAdminNotes failed:", error);
    return false;
  }
  return true;
}
