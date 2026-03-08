import type { Workshop } from "@/types/domains";
import type { ImageAsset } from "@/types/common";

/* ═══ Category System ═══ */

export const WORKSHOP_CATEGORIES = [
  "art",
  "pottery",
  "painting",
  "cooking",
  "music",
  "craft",
  "journaling",
  "diy",
] as const;

export type WorkshopCategory = (typeof WORKSHOP_CATEGORIES)[number];

export interface WorkshopCategoryMeta {
  label: string;
  emoji: string;
  /** Tailwind bg class using design-system naso colors */
  color: string;
  /** Tailwind text class for contrast on the color */
  textColor: string;
}

export const WORKSHOP_CATEGORY_META: Record<WorkshopCategory, WorkshopCategoryMeta> = {
  art:        { label: "Art",        emoji: "🎨", color: "bg-naso-lilac",  textColor: "text-foreground" },
  pottery:    { label: "Pottery",    emoji: "🏺", color: "bg-naso-coral",  textColor: "text-foreground" },
  painting:   { label: "Painting",   emoji: "🖌️", color: "bg-naso-pink",   textColor: "text-foreground" },
  cooking:    { label: "Cooking",    emoji: "🍳", color: "bg-naso-lemon",  textColor: "text-foreground" },
  music:      { label: "Music",      emoji: "🎵", color: "bg-naso-purple", textColor: "text-primary-foreground" },
  craft:      { label: "Craft",      emoji: "✂️", color: "bg-secondary",   textColor: "text-secondary-foreground" },
  journaling: { label: "Journaling", emoji: "📓", color: "bg-naso-cream",  textColor: "text-foreground" },
  diy:        { label: "DIY",        emoji: "🔧", color: "bg-primary",     textColor: "text-primary-foreground" },
};

/* ═══ Workshop Detail ═══ */

export interface WorkshopDetail extends Workshop {
  category: WorkshopCategory;
  tags: string[];
  date: string;
  location: string;
  price: number;
  currency: string;
  capacity: number;
  duration: string;
  skillLevel: "beginner" | "intermediate" | "advanced" | "all-levels";
  materialsIncluded: boolean;
  description: string;
  gallery: ImageAsset[];
  featured: boolean;
}

/* ═══ Filters ═══ */

export interface WorkshopFilters {
  category: WorkshopCategory | "all";
  search?: string;
}
