/**
 * Account data service.
 * Composes profile + counts for the account dashboard.
 */
import { supabase } from "@/integrations/supabase/client";
import { getDeviceId } from "@/lib/deviceId";
import type { AccountUser } from "@/features/account/types";

/**
 * Get or create profile for current device.
 * Returns the user-facing profile shape.
 */
export async function getOrCreateProfile(): Promise<AccountUser> {
  const deviceId = getDeviceId();

  // Try to get existing profile
  const { data: existing } = await supabase
    .from("profiles")
    .select("*")
    .eq("device_id", deviceId)
    .single();

  if (existing) {
    return {
      id: existing.id,
      name: existing.display_name,
      email: existing.email ?? "",
      joinedAt: existing.created_at,
    };
  }

  // Create new profile on first visit
  const { data: created, error } = await supabase
    .from("profiles")
    .insert({ device_id: deviceId })
    .select()
    .single();

  if (error || !created) {
    console.error("[account] Profile creation failed:", error);
    // Return fallback — never block the UI
    return {
      id: deviceId,
      name: "Explorer",
      email: "",
      joinedAt: new Date().toISOString(),
    };
  }

  return {
    id: created.id,
    name: created.display_name,
    email: created.email ?? "",
    joinedAt: created.created_at,
  };
}
