/**
 * Route guard component — redirects unauthenticated users to /sign-in.
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
    return <Navigate to={ROUTES.SIGN_IN} state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
}
