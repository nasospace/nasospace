/**
 * Auth abstraction layer.
 * Re-exports the provider and hook for clean imports.
 *
 * Migration note: This is the single entry point for auth across the app.
 * When migrating to owned Supabase, update provider.tsx internals only.
 */
export { AuthProvider, useAuth } from "./provider";
export { RequireAuth } from "./RequireAuth";
export type { AuthState, AuthActions } from "./provider";
