/**
 * NASO Homepage — Static content data
 * Single source of truth for all homepage section content.
 */
import { ROUTES } from "@/config/routes";

/* ═══ Hero ═══ */
export const heroMarqueeWords = [
  "Outings",
  "Workshops",
  "Events",
  "Products",
  "Art",
  "Culture",
  "Cairo",
  "Memories",
  "Moments",
  "Friends",
];

export const heroPaletteColors = [
  "bg-primary",
  "bg-secondary",
  "bg-accent",
  "bg-naso-lilac",
  "bg-naso-pink",
];

/* ═══ Explore Worlds ═══ */
export const worldCards = [
  {
    title: "Experiences",
    emoji: "✦",
    desc: "Curated outings and cultural adventures across Cairo. Group hangouts, date nights, solo explorations.",
    href: ROUTES.EXPERIENCES,
    bg: "bg-primary",
    rotate: -2,
  },
  {
    title: "Workshops",
    emoji: "✿",
    desc: "Hands-on creative sessions led by local artists. Pottery, painting, music, cooking, and more.",
    href: ROUTES.WORKSHOPS,
    bg: "bg-secondary",
    rotate: 1,
  },
  {
    title: "Shop",
    emoji: "★",
    desc: "Original products, creative goods, and limited drops you won't find anywhere else.",
    href: ROUTES.SHOP,
    bg: "bg-accent",
    rotate: -1,
  },
] as const;

/* ═══ Featured Experiences ═══ */
export const featuredExperiences = [
  {
    title: "Sunset at the Citadel",
    tag: "Outing",
    color: "bg-secondary",
    date: "Mar 22",
  },
  {
    title: "Pottery & Chill",
    tag: "Workshop",
    color: "bg-naso-purple",
    date: "Mar 28",
  },
  {
    title: "Cairo Jazz Night",
    tag: "Experience",
    color: "bg-primary",
    date: "Apr 5",
  },
] as const;

/* ═══ Bottom Ticker ═══ */
export const bottomTickerWords = [
  "NASO",
  "Cairo",
  "Creative",
  "Moments",
  "Outings",
  "Workshops",
  "Art",
  "Culture",
  "Friends",
  "Memories",
];
