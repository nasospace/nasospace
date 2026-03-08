import type { Experience } from "@/types/domains";
import type { ImageAsset } from "@/types/common";

/* ═══ Category System ═══ */

export const EXPERIENCE_CATEGORIES = [
  "outing",
  "workshop",
  "cultural",
  "adventure",
  "nightlife",
  "creative",
] as const;

export type ExperienceCategory = (typeof EXPERIENCE_CATEGORIES)[number];

export interface CategoryMeta {
  label: string;
  emoji: string;
  /** Tailwind bg class using design-system naso colors */
  color: string;
  /** Tailwind text class for contrast on the color */
  textColor: string;
}

export const CATEGORY_META: Record<ExperienceCategory, CategoryMeta> = {
  outing:    { label: "Outing",    emoji: "🌿", color: "bg-secondary",   textColor: "text-secondary-foreground" },
  workshop:  { label: "Workshop",  emoji: "🎨", color: "bg-naso-lilac",  textColor: "text-foreground" },
  cultural:  { label: "Cultural",  emoji: "🏛️", color: "bg-primary",     textColor: "text-primary-foreground" },
  adventure: { label: "Adventure", emoji: "⛰️", color: "bg-naso-coral",  textColor: "text-foreground" },
  nightlife: { label: "Nightlife", emoji: "🌙", color: "bg-naso-purple", textColor: "text-primary-foreground" },
  creative:  { label: "Creative",  emoji: "✂️", color: "bg-naso-pink",   textColor: "text-foreground" },
};

/* ═══ Experience Detail ═══ */

export interface ExperienceDetail extends Experience {
  category: ExperienceCategory;
  tags: string[];
  date: string;
  location: string;
  price: number;
  currency: string;
  capacity: number;
  difficulty: "easy" | "moderate" | "challenging";
  description: string;
  gallery: ImageAsset[];
  featured: boolean;
}

/* ═══ Filters ═══ */

export interface ExperienceFilters {
  category: ExperienceCategory | "all";
  search?: string;
}
