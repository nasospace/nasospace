import { createBrowserRouter, Navigate, useParams } from "react-router-dom";
import { RootLayout } from "@/app/layout";
import { ROUTES } from "@/config/routes";
import { RequireAuth } from "@/lib/auth/RequireAuth";
import HomePage from "@/pages/Index";
import AboutPage from "@/pages/About";
import ExperiencesPage from "@/pages/Experiences";
import ExperienceDetailPage from "@/pages/ExperienceDetail";
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
import PrivacyPage from "@/pages/Privacy";
import TermsPage from "@/pages/Terms";
import NotFound from "@/pages/NotFound";
import { AccountLayout } from "@/features/account/components/AccountLayout";
import AccountPage from "@/pages/Account";
import AccountSavedPage from "@/pages/AccountSaved";
import AccountRequestsPage from "@/pages/AccountRequests";
import AccountSettingsPage from "@/pages/AccountSettings";

// Admin
import { RequireAdmin } from "@/features/admin/components/RequireAdmin";
import { AdminLayout } from "@/features/admin/components/AdminLayout";
import AdminOverviewPage from "@/pages/admin/AdminOverview";
import AdminInquiriesPage from "@/pages/admin/AdminInquiries";
import AdminUsersPage from "@/pages/admin/AdminUsers";
import AdminSavedItemsPage from "@/pages/admin/AdminSavedItems";
import AdminProductsPage from "@/pages/admin/AdminProducts";
import AdminExperiencesPage from "@/pages/admin/AdminExperiences";
import AdminPortfolioPage from "@/pages/admin/AdminPortfolio";
import AdminBlogPage from "@/pages/admin/AdminBlog";
import AdminFaqPage from "@/pages/admin/AdminFaq";
import AdminTestimonialsPage from "@/pages/admin/AdminTestimonials";
import AdminPageContentPage from "@/pages/admin/AdminPageContent";

/** Redirect /workshops/:slug -> /experiences/:slug while preserving the slug. */
function WorkshopSlugRedirect() {
  const { slug } = useParams();
  return <Navigate to={slug ? `/experiences/${slug}` : "/experiences"} replace />;
}

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

      /* Legacy workshop routes — permanent redirect to experiences */
      { path: "/workshops", element: <Navigate to="/experiences" replace /> },
      { path: "/workshops/:slug", element: <WorkshopSlugRedirect /> },

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
      { path: ROUTES.PRIVACY, element: <PrivacyPage /> },
      { path: ROUTES.TERMS, element: <TermsPage /> },

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
      { path: "products", element: <AdminProductsPage /> },
      { path: "experiences", element: <AdminExperiencesPage /> },
      /* /admin/workshops removed — workshops now managed inside Experiences */
      { path: "workshops", element: <Navigate to="/admin/experiences" replace /> },
      { path: "portfolio", element: <AdminPortfolioPage /> },
      { path: "blog", element: <AdminBlogPage /> },
      { path: "faq", element: <AdminFaqPage /> },
      { path: "testimonials", element: <AdminTestimonialsPage /> },
      { path: "page-content", element: <AdminPageContentPage /> },
    ],
  },
]);
