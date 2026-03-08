import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "@/app/layout";
import { ROUTES } from "@/config/routes";
import HomePage from "@/pages/Index";
import NotFound from "@/pages/NotFound";

/**
 * Central route definitions.
 * Each route maps to a page component — easy to migrate to Next.js file-based routing.
 */
export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: ROUTES.HOME, element: <HomePage /> },
      { path: ROUTES.EXPERIENCES, element: <PlaceholderPage title="Experiences" /> },
      { path: ROUTES.WORKSHOPS, element: <PlaceholderPage title="Workshops" /> },
      { path: ROUTES.SERVICES, element: <PlaceholderPage title="Services" /> },
      { path: ROUTES.PORTFOLIO, element: <PlaceholderPage title="Portfolio" /> },
      { path: ROUTES.BLOG, element: <PlaceholderPage title="Blog" /> },
      { path: ROUTES.SHOP, element: <PlaceholderPage title="Shop" /> },
      { path: ROUTES.INQUIRIES, element: <PlaceholderPage title="Inquiries" /> },
      { path: ROUTES.ACCOUNT, element: <PlaceholderPage title="Account" /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

/** Lightweight placeholder for routes not yet built */
function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="container flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-4xl font-bold">{title}</h1>
        <p className="mt-2 text-muted-foreground">Coming soon.</p>
      </div>
    </div>
  );
}
