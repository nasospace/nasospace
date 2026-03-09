/**
 * Admin profile queries.
 */
import { supabase } from "@/integrations/supabase/client";

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
