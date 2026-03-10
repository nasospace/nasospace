/**
 * Centralized route path constants.
 * Use these everywhere instead of hardcoding path strings.
 */
export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  EXPERIENCES: "/experiences",
  EXPERIENCE_DETAIL: "/experiences/:slug",
  WORKSHOPS: "/workshops",
  WORKSHOP_DETAIL: "/workshops/:slug",
  SERVICES: "/services",
  PORTFOLIO: "/portfolio",
  PORTFOLIO_DETAIL: "/portfolio/:slug",
  BLOG: "/blog",
  BLOG_DETAIL: "/blog/:slug",
  SHOP: "/shop",
  SHOP_DETAIL: "/shop/:slug",
  CART: "/cart",
  FAQ: "/faq",
  CONTACT: "/contact",
  INQUIRIES: "/inquiries",
  COMMUNITY_LOVE: "/community-love",
  ACCOUNT: "/account",
  ACCOUNT_SAVED: "/account/saved",
  ACCOUNT_REQUESTS: "/account/requests",
  ACCOUNT_SETTINGS: "/account/settings",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  ADMIN: "/admin",
  ADMIN_INQUIRIES: "/admin/inquiries",
  ADMIN_USERS: "/admin/users",
  ADMIN_SAVED: "/admin/saved",
  ADMIN_PRODUCTS: "/admin/products",
  ADMIN_EXPERIENCES: "/admin/experiences",
  ADMIN_WORKSHOPS: "/admin/workshops",
  ADMIN_PORTFOLIO: "/admin/portfolio",
  ADMIN_BLOG: "/admin/blog",
  ADMIN_FAQ: "/admin/faq",
  ADMIN_TESTIMONIALS: "/admin/testimonials",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

/** Route path helpers for dynamic segments */
export const routeHelpers = {
  experienceDetail: (slug: string) => `/experiences/${slug}` as const,
  workshopDetail: (slug: string) => `/workshops/${slug}` as const,
  portfolioDetail: (slug: string) => `/portfolio/${slug}` as const,
  blogDetail: (slug: string) => `/blog/${slug}` as const,
  shopDetail: (slug: string) => `/shop/${slug}` as const,
} as const;

/** Build an inquiry path with optional context for prefill */
export interface InquiryContext {
  type: "experience" | "workshop" | "portfolio" | "product";
  slug: string;
  title: string;
}

export function buildInquiryPath(context?: InquiryContext): string {
  if (!context) return ROUTES.INQUIRIES;
  const params = new URLSearchParams({
    ref: context.type,
    slug: context.slug,
    title: context.title,
  });
  return `${ROUTES.INQUIRIES}?${params.toString()}`;
}
