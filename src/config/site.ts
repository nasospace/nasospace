import { ROUTES } from "./routes";

interface NavItem {
  label: string;
  href: string;
}

export const siteConfig = {
  name: "NASO",
  description:
    "Premium creative experiences, kits, and products from Cairo.",
  url: "https://naso.co", // TODO: Replace with final production domain before launch
  locale: "en",
  nav: [
    { label: "Home", href: ROUTES.HOME },
    { label: "The Manifesto", href: ROUTES.ABOUT },
    { label: "Experiences", href: ROUTES.EXPERIENCES },
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
    instagram: "https://instagram.com/nasospace", 
    tiktok: "https://tiktok.com/@nasospace",
    facebook: "https://facebook.com/nasospace",
    linkedin: "https://linkedin.com/company/nasospace",
  },
} as const;
