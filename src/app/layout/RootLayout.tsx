import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { RouteErrorBoundary } from "@/components/shared/RouteErrorBoundary";
import { PreviewModeBanner } from "@/components/shared/PreviewModeBanner";
import { useEffect } from "react";

/**
 * RootLayout — wraps all pages with global Header and Footer.
 */
export function RootLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <RouteErrorBoundary>
          <Outlet />
        </RouteErrorBoundary>
      </main>
      <Footer />
      <PreviewModeBanner />
    </div>
  );
}

