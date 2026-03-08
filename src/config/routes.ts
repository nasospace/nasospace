/**
 * Centralized route path constants.
 * Use these everywhere instead of hardcoding path strings.
 */
export const ROUTES = {
  HOME: "/",
  EXPERIENCES: "/experiences",
  EXPERIENCE_DETAIL: "/experiences/:slug",
  WORKSHOPS: "/workshops",
  WORKSHOP_DETAIL: "/workshops/:slug",
  SERVICES: "/services",
  PORTFOLIO: "/portfolio",
  PORTFOLIO_DETAIL: "/portfolio/:slug",
  BLOG: "/blog",
  SHOP: "/shop",
  INQUIRIES: "/inquiries",
  ACCOUNT: "/account",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

/** Route path helpers for dynamic segments */
export const routeHelpers = {
  experienceDetail: (slug: string) => `/experiences/${slug}` as const,
  workshopDetail: (slug: string) => `/workshops/${slug}` as const,
} as const;

/** Build an inquiry path with optional context for prefill */
export interface InquiryContext {
  type: "experience" | "workshop";
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
