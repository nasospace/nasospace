/**
 * Centralized route path constants.
 * Use these everywhere instead of hardcoding path strings.
 */
export const ROUTES = {
  HOME: "/",
  EXPERIENCES: "/experiences",
  EXPERIENCE_DETAIL: "/experiences/:slug",
  WORKSHOPS: "/workshops",
  SERVICES: "/services",
  PORTFOLIO: "/portfolio",
  BLOG: "/blog",
  SHOP: "/shop",
  INQUIRIES: "/inquiries",
  ACCOUNT: "/account",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
