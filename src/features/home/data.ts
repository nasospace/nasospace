/**
 * NASO Homepage — Static content data
 * Single source of truth for all homepage section content.
 */
import { ROUTES } from "@/config/routes";

/* ═══ Hero ═══ */
export const heroMarqueeWords = [
  "Outings",
  "Workshops",
  "Adventures",
  "Kits",
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

/* ═══ The Ecosystem (formerly Explore Worlds) ═══ */
export const worldCards = [
  {
    title: "The Chapters",
    emoji: "✦",
    desc: "100 unique, unrepeatable creative drops across Cairo. Our core movement.",
    href: ROUTES.EXPERIENCES,
    bg: "bg-primary",
    rotate: -2,
  },
  {
    title: "The Artifacts",
    emoji: "★",
    desc: "Physical kits designed for your own space. Bring the NASO ritual home.",
    href: ROUTES.SHOP,
    bg: "bg-secondary",
    rotate: 1,
  },
  {
    title: "The Studio",
    emoji: "✹",
    desc: "Custom-built experiences for private gatherings and corporate teams. We design the unforgettable.",
    href: ROUTES.CONTACT,
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
