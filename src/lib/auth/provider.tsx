/**
 * AuthProvider — manages Supabase Auth session state.
 * On first sign-in, migrates any device-ID-scoped data to the authenticated user.
 *
 * Migration note: All Supabase auth references are isolated here.
 * When migrating to owned Supabase, only update the client import.
 */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

const DEVICE_ID_KEY = "naso_device_id";
const MIGRATION_DONE_KEY = "naso_device_migration_done";

export interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface AuthActions {
  signUp: (email: string, password: string, displayName?: string) => Promise<{ error?: string }>;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
}

type AuthContextValue = AuthState & AuthActions;

const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * Migrate device-scoped saved items and inquiries to the authenticated user.
 * Runs once per device via an edge function that uses service_role.
 *
 * @deprecated Device-ID migration is a transitional mechanism.
 * This function and the edge function it calls can be removed once all
 * pre-auth device data has been migrated or is no longer needed.
 */
async function migrateDeviceData(session: Session) {
  const deviceId = localStorage.getItem(DEVICE_ID_KEY);
  const alreadyDone = localStorage.getItem(MIGRATION_DONE_KEY);
  if (!deviceId || alreadyDone) return;

  try {
    const { data, error } = await supabase.functions.invoke("migrate-device-data", {
      body: { deviceId },
    });

    if (!error && data?.success) {
      localStorage.setItem(MIGRATION_DONE_KEY, "true");
      if (data.migratedSaved > 0 || data.migratedInquiries > 0) {
        console.info(
          `[auth] Migrated ${data.migratedSaved} saved items, ${data.migratedInquiries} inquiries from device`
        );
      }
    }
  } catch (e) {
    // Non-blocking — don't break auth flow
    console.warn("[auth] Device data migration failed:", e);
  }
}

/** Normalize common Supabase auth error messages into user-friendly text */
function friendlyAuthError(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("invalid login credentials")) return "Incorrect email or password.";
  if (lower.includes("email not confirmed")) return "Please verify your email before signing in.";
  if (lower.includes("user already registered")) return "An account with this email already exists. Try signing in.";
  if (lower.includes("password") && lower.includes("characters")) return "Password must be at least 6 characters.";
  if (lower.includes("rate limit") || lower.includes("too many")) return "Too many attempts. Please wait a moment and try again.";
  if (lower.includes("network") || lower.includes("fetch")) return "Network error. Please check your connection.";
  return message;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const migrationRan = useRef(false);

  useEffect(() => {
    // Set up listener BEFORE getSession (per Supabase best practices)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);

      // Trigger migration on sign-in events
      if (session && (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") && !migrationRan.current) {
        migrationRan.current = true;
        migrateDeviceData(session);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = useCallback(
    async (email: string, password: string, displayName?: string) => {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { display_name: displayName || "Explorer" },
        },
      });
      if (error) return { error: friendlyAuthError(error.message) };
      return {};
    },
    []
  );

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return { error: friendlyAuthError(error.message) };
    return {};
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const value: AuthContextValue = {
    user,
    session,
    isLoading,
    isAuthenticated: !!session,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
