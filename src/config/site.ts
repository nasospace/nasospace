import { ROUTES } from "./routes";

interface NavItem {
  label: string;
  href: string;
}

export const siteConfig = {
  name: "NASO",
  description:
    "Premium creative experiences, workshops, events, and products from Cairo.",
  url: "https://naso.co", // TODO: Replace with final production domain before launch
  locale: "en",
  nav: [
    { label: "Home", href: ROUTES.HOME },
    { label: "Manifesto", href: ROUTES.ABOUT },
    { label: "Moments", href: ROUTES.EXPERIENCES },
    { label: "Workshops", href: ROUTES.WORKSHOPS },
    { label: "Artifacts", href: ROUTES.SHOP },
    { label: "Connect", href: ROUTES.CONTACT },
  ] as NavItem[],
  moreNav: [
    { label: "Community Love", href: ROUTES.COMMUNITY_LOVE },
    { label: "FAQ", href: ROUTES.FAQ },
    { label: "Portfolio", href: ROUTES.PORTFOLIO },
    { label: "Blog", href: ROUTES.BLOG },
  ] as NavItem[],
  social: {
    instagram: "https://instagram.com/naso", // TODO: Replace with real Instagram handle
    tiktok: "https://tiktok.com/@naso", // TODO: Replace with real TikTok handle
  },
} as const;
