/**
 * @deprecated Temporary device-based identity for pre-auth development.
 *
 * This module is a transitional mechanism from the pre-auth phase.
 * It is ONLY used by:
 * - AuthProvider (migration logic on first sign-in)
 * - migrate-device-data edge function
 *
 * DO NOT use getDeviceId() in new code. Use auth.uid() via the service layer.
 *
 * Can be fully removed once:
 * 1. All pre-auth device data has been migrated
 * 2. The migrate-device-data edge function is retired
 * 3. The device_id column is dropped from saved_items and inquiries tables
 */

const STORAGE_KEY = "naso_device_id";

export function getDeviceId(): string {
  let id = localStorage.getItem(STORAGE_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY, id);
  }
  return id;
}
