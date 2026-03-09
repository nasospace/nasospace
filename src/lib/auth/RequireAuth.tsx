/**
 * Route guard component — redirects unauthenticated users to /sign-in.
 * Passes `from` state so sign-in can redirect back after auth.
 */
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./provider";
import { ROUTES } from "@/config/routes";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Preserve the full path + search so we can return after login
    const returnTo = location.pathname + location.search;
    return <Navigate to={ROUTES.SIGN_IN} state={{ from: returnTo }} replace />;
  }

  return <>{children}</>;
}
