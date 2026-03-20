/**
 * Shared cached auth utility.
 * Uses getSession() (local cache) instead of getUser() (network call).
 * Import this in service files instead of calling supabase.auth.getUser() directly.
 */
import { supabase } from "@/integrations/supabase/client";

export async function getCachedUserId(): Promise<string | null> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.user?.id ?? null;
  } catch {
    return null;
  }
}
