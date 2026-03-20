/**
 * Account data service.
 * Uses authenticated user via Supabase Auth.
 *
 * Migration note: All Supabase references are isolated here.
 * When migrating to owned Supabase, only update the client import.
 */
import { supabase } from "@/integrations/supabase/client";
import { getCachedUserId } from "@/lib/auth/session";
import type { AccountUser } from "@/features/account/types";

/**
 * Get profile for the currently authenticated user.
 * Returns a safe fallback if unauthenticated or on error.
 */
export async function getOrCreateProfile(): Promise<AccountUser> {
  try {
    const userId = await getCachedUserId();

    if (!userId) {

    if (!user) {
      return {
        id: "",
        name: "Explorer",
        email: "",
        joinedAt: new Date().toISOString(),
      };
    }

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (!error && profile) {
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
  } catch (err) {
    console.error("[account] getOrCreateProfile failed:", err);
    return {
      id: "",
      name: "Explorer",
      email: "",
      joinedAt: new Date().toISOString(),
    };
  }
}
