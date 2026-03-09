import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "@/app/layout";
import { ROUTES } from "@/config/routes";
import { RequireAuth } from "@/lib/auth/RequireAuth";
import HomePage from "@/pages/Index";
import AboutPage from "@/pages/About";
import ExperiencesPage from "@/pages/Experiences";
import ExperienceDetailPage from "@/pages/ExperienceDetail";
import WorkshopsPage from "@/pages/Workshops";
import WorkshopDetailPage from "@/pages/WorkshopDetail";
import InquiriesPage from "@/pages/Inquiries";
import PortfolioPage from "@/pages/Portfolio";
import PortfolioDetailPage from "@/pages/PortfolioDetail";
import BlogPage from "@/pages/Blog";
import BlogDetailPage from "@/pages/BlogDetail";
import ShopPage from "@/pages/Shop";
import ProductDetailPage from "@/pages/ProductDetail";
import CartPage from "@/pages/Cart";
import FAQPage from "@/pages/FAQ";
import ContactPage from "@/pages/Contact";
import CommunityLovePage from "@/pages/CommunityLove";
import SignInPage from "@/pages/SignIn";
import SignUpPage from "@/pages/SignUp";
import ForgotPasswordPage from "@/pages/ForgotPassword";
import ResetPasswordPage from "@/pages/ResetPassword";
import NotFound from "@/pages/NotFound";
import { AccountLayout } from "@/features/account/components/AccountLayout";
import AccountPage from "@/pages/Account";
import AccountSavedPage from "@/pages/AccountSaved";
import AccountRequestsPage from "@/pages/AccountRequests";
import AccountSettingsPage from "@/pages/AccountSettings";

// Admin (lazy-ish but still static imports for router config)
import { RequireAdmin } from "@/features/admin/components/RequireAdmin";
import { AdminLayout } from "@/features/admin/components/AdminLayout";
import AdminOverviewPage from "@/pages/admin/AdminOverview";
import AdminInquiriesPage from "@/pages/admin/AdminInquiries";
import AdminUsersPage from "@/pages/admin/AdminUsers";
import AdminSavedItemsPage from "@/pages/admin/AdminSavedItems";
import AdminProductsPage from "@/pages/admin/AdminProducts";

/**
 * Central route definitions.
 */
export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: ROUTES.HOME, element: <HomePage /> },
      { path: ROUTES.ABOUT, element: <AboutPage /> },
      { path: ROUTES.EXPERIENCES, element: <ExperiencesPage /> },
      { path: ROUTES.EXPERIENCE_DETAIL, element: <ExperienceDetailPage /> },
      { path: ROUTES.WORKSHOPS, element: <WorkshopsPage /> },
      { path: ROUTES.WORKSHOP_DETAIL, element: <WorkshopDetailPage /> },
      { path: ROUTES.SERVICES, element: <PlaceholderPage title="Services" /> },
      { path: ROUTES.PORTFOLIO, element: <PortfolioPage /> },
      { path: ROUTES.PORTFOLIO_DETAIL, element: <PortfolioDetailPage /> },
      { path: ROUTES.BLOG, element: <BlogPage /> },
      { path: ROUTES.BLOG_DETAIL, element: <BlogDetailPage /> },
      { path: ROUTES.SHOP, element: <ShopPage /> },
      { path: ROUTES.SHOP_DETAIL, element: <ProductDetailPage /> },
      { path: ROUTES.CART, element: <CartPage /> },
      { path: ROUTES.FAQ, element: <FAQPage /> },
      { path: ROUTES.CONTACT, element: <ContactPage /> },
      { path: ROUTES.INQUIRIES, element: <InquiriesPage /> },
      { path: ROUTES.COMMUNITY_LOVE, element: <CommunityLovePage /> },

      /* ═══ Auth Pages ═══ */
      { path: ROUTES.SIGN_IN, element: <SignInPage /> },
      { path: ROUTES.SIGN_UP, element: <SignUpPage /> },
      { path: ROUTES.FORGOT_PASSWORD, element: <ForgotPasswordPage /> },
      { path: ROUTES.RESET_PASSWORD, element: <ResetPasswordPage /> },

      /* ═══ Account Area (protected + nested layout) ═══ */
      {
        path: ROUTES.ACCOUNT,
        element: (
          <RequireAuth>
            <AccountLayout />
          </RequireAuth>
        ),
        children: [
          { index: true, element: <AccountPage /> },
          { path: "saved", element: <AccountSavedPage /> },
          { path: "requests", element: <AccountRequestsPage /> },
          { path: "settings", element: <AccountSettingsPage /> },
        ],
      },

      { path: "*", element: <NotFound /> },
    ],
  },

  /* ═══ Admin Area (separate layout, no public header/footer) ═══ */
  {
    path: ROUTES.ADMIN,
    element: (
      <RequireAdmin>
        <AdminLayout />
      </RequireAdmin>
    ),
    children: [
      { index: true, element: <AdminOverviewPage /> },
      { path: "inquiries", element: <AdminInquiriesPage /> },
      { path: "users", element: <AdminUsersPage /> },
      { path: "saved", element: <AdminSavedItemsPage /> },
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
