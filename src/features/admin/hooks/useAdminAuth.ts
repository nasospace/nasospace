/**
 * useAdminAuth — hook to check admin role and protect admin routes.
 * Uses React Query to cache the role check (avoids re-fetching on every mount).
 */
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth";
import { checkIsAdmin } from "@/server/services/admin";

export function useAdminAuth() {
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();

  const { data: isAdmin, isLoading: roleLoading } = useQuery({
    queryKey: ["admin-role", user?.id ?? "anon"],
    queryFn: checkIsAdmin,
    enabled: !authLoading && isAuthenticated && !!user,
    staleTime: 5 * 60_000, // 5 min — role rarely changes mid-session
    gcTime: 10 * 60_000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return {
    isAdmin: isAdmin === true,
    isLoading: authLoading || (isAuthenticated && roleLoading && isAdmin === undefined),
    isAuthenticated,
  };
}
