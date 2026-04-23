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
    title: "Moments",
    emoji: "✦",
    desc: "Curated cultural adventures designed to be remembered. A new way to see Cairo, together.",
    href: ROUTES.EXPERIENCES,
    bg: "bg-primary",
    rotate: -2,
  },
  {
    title: "Workshops",
    emoji: "✿",
    desc: "Get your hands dirty with local artists. Walk in curious, leave with something you made — and a new skill.",
    href: ROUTES.WORKSHOPS,
    bg: "bg-secondary",
    rotate: 1,
  },
  {
    title: "Artifacts",
    emoji: "★",
    desc: "Exclusive drops and at-home experience kits. Pieces of the movement for your own sanctuary.",
    href: ROUTES.SHOP,
    bg: "bg-accent",
    rotate: -1,
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
