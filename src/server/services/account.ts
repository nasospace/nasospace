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
      .eq("user_id", userId)
      .single();

    if (!error && profile) {
      return {
        id: profile.id,
        name: profile.display_name,
        email: profile.email ?? "",
        joinedAt: profile.created_at,
      };
    }

    // Fallback — trigger should have created it, but be safe
    return {
      id: userId,
      name: "Explorer",
      email: "",
      joinedAt: new Date().toISOString(),
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
