/**
 * useAdminAuth — hook to check admin role and protect admin routes.
 */
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { checkIsAdmin } from "@/server/services/admin";

export function useAdminAuth() {
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated || !user) {
      setIsAdmin(false);
      setIsChecking(false);
      return;
    }

    let cancelled = false;
    checkIsAdmin().then((result) => {
      if (!cancelled) {
        setIsAdmin(result);
        setIsChecking(false);
      }
    });

    return () => { cancelled = true; };
  }, [isAuthenticated, authLoading, user]);

  return {
    isAdmin: isAdmin === true,
    isLoading: authLoading || isChecking,
    isAuthenticated,
  };
}
