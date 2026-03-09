import { ROUTES } from "./routes";

export const siteConfig = {
  name: "NASO",
  description:
    "Premium creative experiences, workshops, events, and products from Cairo.",
  url: "https://naso.co", // placeholder
  locale: "en",
  nav: [
    { label: "Home", href: ROUTES.HOME },
    { label: "About", href: ROUTES.ABOUT },
    { label: "Experiences", href: ROUTES.EXPERIENCES },
    { label: "Workshops", href: ROUTES.WORKSHOPS },
    { label: "Shop", href: ROUTES.SHOP },
    { label: "Community Love", href: ROUTES.COMMUNITY_LOVE },
    { label: "FAQ", href: ROUTES.FAQ },
    { label: "Contact", href: ROUTES.CONTACT },
  ],
  social: {
    instagram: "https://instagram.com/naso",
    tiktok: "https://tiktok.com/@naso",
  },
} as const;
