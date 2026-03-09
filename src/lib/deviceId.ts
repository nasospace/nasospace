/**
 * Temporary device-based identity for pre-auth development.
 *
 * Generates a stable UUID on first visit and persists it in localStorage.
 * When real auth is added, replace usages of getDeviceId() with auth.uid()
 * in the service layer — zero component changes needed.
 *
 * ⚠️ NOT a security mechanism. Development convenience only.
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
