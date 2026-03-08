/**
 * Auth abstraction layer.
 * Will be backed by Clerk or Supabase Auth — swap implementation here.
 */

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
}

export interface AuthClient {
  getCurrentUser(): Promise<AuthUser | null>;
  signIn(email: string, password: string): Promise<AuthUser>;
  signOut(): Promise<void>;
}

export const authClient: AuthClient = {
  async getCurrentUser() {
    return null;
  },
  async signIn() {
    throw new Error("[Auth] Client not configured yet.");
  },
  async signOut() {
    console.warn("[Auth] Client not configured yet.");
  },
};
