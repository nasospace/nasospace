/**
 * Account data service.
 * Now uses authenticated user via Supabase Auth.
 */
import { supabase } from "@/integrations/supabase/client";
import type { AccountUser } from "@/features/account/types";

/**
 * Get profile for the currently authenticated user.
 */
export async function getOrCreateProfile(): Promise<AccountUser> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return {
      id: "",
      name: "Explorer",
      email: "",
      joinedAt: new Date().toISOString(),
    };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (profile) {
    return {
      id: profile.id,
      name: profile.display_name,
      email: profile.email ?? user.email ?? "",
      joinedAt: profile.created_at,
    };
  }

  // Fallback — trigger should have created it, but be safe
  return {
    id: user.id,
    name: user.user_metadata?.display_name ?? "Explorer",
    email: user.email ?? "",
    joinedAt: user.created_at,
  };
}
