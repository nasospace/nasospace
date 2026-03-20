/**
 * Admin role check — isolated for clean imports.
 */
import { supabase } from "@/integrations/supabase/client";
import { getCachedUserId } from "@/lib/auth/session";

export async function checkIsAdmin(): Promise<boolean> {
  const userId = await getCachedUserId();
  if (!userId) return false;

  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();

  if (error || !data) return false;
  return true;
}
