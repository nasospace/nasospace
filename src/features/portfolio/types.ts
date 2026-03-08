import type { BaseEntity, ImageAsset } from "@/types/common";

/* ═══ Category System ═══ */

export const PORTFOLIO_CATEGORIES = [
  "birthdays",
  "workshops",
  "group-outings",
  "couples",
  "corporate",
  "creative-nights",
  "custom-events",
] as const;

export type PortfolioCategory = (typeof PORTFOLIO_CATEGORIES)[number];

export interface PortfolioCategoryMeta {
  label: string;
  emoji: string;
  /** Tailwind bg class using design-system naso colors */
  color: string;
  /** Tailwind text class for contrast */
  textColor: string;
}

export const PORTFOLIO_CATEGORY_META: Record<PortfolioCategory, PortfolioCategoryMeta> = {
  birthdays:        { label: "Birthdays",       emoji: "🎂", color: "bg-naso-coral",  textColor: "text-foreground" },
  workshops:        { label: "Workshops",       emoji: "🎨", color: "bg-naso-lilac",  textColor: "text-foreground" },
  "group-outings":  { label: "Group Outings",   emoji: "🌿", color: "bg-secondary",   textColor: "text-secondary-foreground" },
  couples:          { label: "Couples",         emoji: "💛", color: "bg-naso-pink",   textColor: "text-foreground" },
  corporate:        { label: "Corporate",       emoji: "🏢", color: "bg-primary",     textColor: "text-primary-foreground" },
  "creative-nights":{ label: "Creative Nights", emoji: "🌙", color: "bg-naso-purple", textColor: "text-primary-foreground" },
  "custom-events":  { label: "Custom Events",   emoji: "✦",  color: "bg-naso-lemon",  textColor: "text-foreground" },
};

/* ═══ Portfolio Item ═══ */

export interface PortfolioItem extends BaseEntity {
  title: string;
  slug: string;
  summary: string;
  story: string;
  category: PortfolioCategory;
  tags: string[];
  location: string;
  date: string;
  audienceType: string;
  vibe: string;
  coverImage: ImageAsset;
  gallery: ImageAsset[];
  linkedExperienceSlug?: string;
  linkedWorkshopSlug?: string;
  featured: boolean;
  testimonialQuote?: string;
  testimonialName?: string;
}

/* ═══ Filters ═══ */

export interface PortfolioFilters {
  category: PortfolioCategory | "all";
}
