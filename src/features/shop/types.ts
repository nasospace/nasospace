import type { BaseEntity, ImageAsset } from "@/types/common";

/* ═══ Category System ═══ */

export const PRODUCT_CATEGORIES = [
  "apparel",
  "stationery",
  "art-kits",
  "creative-tools",
  "gifts",
  "limited-drops",
  "accessories",
  "home-studio",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export interface ProductCategoryMeta {
  label: string;
  emoji: string;
  color: string;
  textColor: string;
}

export const PRODUCT_CATEGORY_META: Record<ProductCategory, ProductCategoryMeta> = {
  apparel:          { label: "Apparel",        emoji: "👕", color: "bg-naso-coral",  textColor: "text-foreground" },
  stationery:       { label: "Stationery",     emoji: "📓", color: "bg-naso-lemon",  textColor: "text-foreground" },
  "art-kits":       { label: "Art Kits",       emoji: "🎨", color: "bg-naso-lilac",  textColor: "text-foreground" },
  "creative-tools": { label: "Creative Tools", emoji: "✂️", color: "bg-secondary",   textColor: "text-secondary-foreground" },
  gifts:            { label: "Gifts",          emoji: "🎁", color: "bg-naso-pink",   textColor: "text-foreground" },
  "limited-drops":  { label: "Limited Drops",  emoji: "✦",  color: "bg-primary",     textColor: "text-primary-foreground" },
  accessories:      { label: "Accessories",    emoji: "👜", color: "bg-naso-purple", textColor: "text-primary-foreground" },
  "home-studio":    { label: "Home Studio",    emoji: "🏠", color: "bg-naso-cream",  textColor: "text-foreground" },
};

/* ═══ Stock Status ═══ */

export type StockStatus = "in-stock" | "low-stock" | "sold-out";

/* ═══ Product Detail ═══ */

export interface ProductDetail extends BaseEntity {
  title: string;
  slug: string;
  summary: string;
  description: string;
  category: ProductCategory;
  tags: string[];
  price: number;
  currency: string;
  stockStatus: StockStatus;
  featured: boolean;
  limitedEdition?: boolean;
  coverImage: ImageAsset;
  gallery: ImageAsset[];
  sizes?: string[];
  colors?: string[];
  linkedExperienceSlug?: string;
  linkedWorkshopSlug?: string;
  linkedPortfolioSlug?: string;
}

/* ═══ Filters ═══ */

export interface ProductFilters {
  category: ProductCategory | "all";
  search?: string;
}
