/**
 * AuthProvider — manages Supabase Auth session state.
 * On first sign-in, migrates any device-ID-scoped data to the authenticated user.
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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const migrationRan = useRef(false);

  useEffect(() => {
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
      if (error) return { error: error.message };
      return {};
    },
    []
  );

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return { error: error.message };
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
