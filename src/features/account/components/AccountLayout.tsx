import { Outlet } from "react-router-dom";
import { AccountNav } from "./AccountNav";

/**
 * AccountLayout — wraps all /account/* pages with shared navigation.
 * Uses <Outlet /> for nested routing (same pattern as RootLayout).
 */
export function AccountLayout() {
  return (
    <div className="container pb-section pt-8 md:pt-12">
      {/* Header area */}
      <div className="mb-8 md:mb-10">
        <p className="font-groovy text-xs uppercase tracking-widest text-muted-foreground">
          Your Space
        </p>
        <h1 className="mt-1 font-display text-3xl font-bold md:text-4xl">
          Account
        </h1>
      </div>

      {/* Tab navigation */}
      <div className="mb-8 border-b border-border pb-4">
        <AccountNav />
      </div>

      {/* Page content */}
      <Outlet />
    </div>
  );
}
