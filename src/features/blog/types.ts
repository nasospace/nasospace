import type { BaseEntity, ImageAsset } from "@/types/common";

/* ═══ Category System ═══ */

export const BLOG_CATEGORIES = [
  "outing-ideas",
  "cairo-guides",
  "creative-living",
  "workshop-stories",
  "event-inspiration",
  "naso-journal",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export interface BlogCategoryMeta {
  label: string;
  emoji: string;
  /** Tailwind bg class using design-system naso colors */
  color: string;
  /** Tailwind text class for contrast */
  textColor: string;
}

export const BLOG_CATEGORY_META: Record<BlogCategory, BlogCategoryMeta> = {
  "outing-ideas":      { label: "Outing Ideas",      emoji: "🌿", color: "bg-secondary",   textColor: "text-secondary-foreground" },
  "cairo-guides":      { label: "Cairo Guides",      emoji: "🗺️", color: "bg-naso-coral",   textColor: "text-foreground" },
  "creative-living":   { label: "Creative Living",   emoji: "✂️", color: "bg-naso-pink",    textColor: "text-foreground" },
  "workshop-stories":  { label: "Workshop Stories",  emoji: "🎨", color: "bg-naso-lilac",   textColor: "text-foreground" },
  "event-inspiration": { label: "Event Inspiration", emoji: "✦",  color: "bg-naso-lemon",   textColor: "text-foreground" },
  "naso-journal":      { label: "NASO Journal",      emoji: "📓", color: "bg-naso-purple",  textColor: "text-primary-foreground" },
};

/* ═══ Blog Post ═══ */

export interface BlogPost extends BaseEntity {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  tags: string[];
  publishDate: string;
  readingTime: string;
  coverImage: ImageAsset;
  featured: boolean;
  authorName?: string;
  linkedExperienceSlug?: string;
  linkedWorkshopSlug?: string;
  linkedPortfolioSlug?: string;
}

/* ═══ Filters ═══ */

export interface BlogFilters {
  category: BlogCategory | "all";
  search?: string;
}
