import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

/**
 * RootLayout — wraps all pages with global Header and Footer.
 * Maps to Next.js `app/layout.tsx` on migration.
 */
export function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
