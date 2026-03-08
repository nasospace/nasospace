import { ROUTES } from "./routes";

export const siteConfig = {
  name: "NASO",
  description:
    "Premium creative experiences, workshops, events, and products from Cairo.",
  url: "https://naso.co", // placeholder
  locale: "en",
  nav: [
    { label: "Home", href: ROUTES.HOME },
    { label: "Experiences", href: ROUTES.EXPERIENCES },
    { label: "Blog", href: ROUTES.BLOG },
    { label: "Shop", href: ROUTES.SHOP },
  ],
  social: {
    instagram: "https://instagram.com/naso",
    tiktok: "https://tiktok.com/@naso",
  },
} as const;
