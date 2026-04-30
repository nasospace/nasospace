import type { Experience } from "@/types/domains";
import type { ImageAsset } from "@/types/common";

/* ═══ Category System ═══
   Experiences at NASO are 100 curated workshops — hands-on creative sessions.
   Categories reflect the *type of making*, not the setting.
*/

export const EXPERIENCE_CATEGORIES = [
  "art",
  "pottery",
  "painting",
  "cooking",
  "music",
  "craft",
  "journaling",
  "diy",
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
  art:        { label: "Art",        emoji: "🎨", color: "bg-naso-lilac",  textColor: "text-foreground" },
  pottery:    { label: "Pottery",    emoji: "🏺", color: "bg-naso-coral",  textColor: "text-foreground" },
  painting:   { label: "Painting",   emoji: "🖌️", color: "bg-naso-pink",   textColor: "text-foreground" },
  cooking:    { label: "Cooking",    emoji: "🍳", color: "bg-naso-lemon",  textColor: "text-foreground" },
  music:      { label: "Music",      emoji: "🎵", color: "bg-naso-purple", textColor: "text-primary-foreground" },
  craft:      { label: "Craft",      emoji: "✂️", color: "bg-secondary",   textColor: "text-secondary-foreground" },
  journaling: { label: "Journaling", emoji: "📓", color: "bg-naso-cream",  textColor: "text-foreground" },
  diy:        { label: "DIY",        emoji: "🔧", color: "bg-primary",     textColor: "text-primary-foreground" },
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
  /** 100 Experiences journey: position 1–100, or null if not in the journey. */
  slotNumber: number | null;
  /** Locked = sealed/mystery in the journey map. */
  isLocked: boolean;
}

/* ═══ Filters ═══ */

export interface ExperienceFilters {
  category: ExperienceCategory | "all";
  search?: string;
}
