/**
 * Auth abstraction layer.
 * Re-exports the provider and hook for clean imports.
 */
export { AuthProvider, useAuth } from "./provider";
export type { AuthState, AuthActions } from "./provider";
