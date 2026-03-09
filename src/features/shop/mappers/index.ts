/**
 * Maps raw CMS product rows → ProductDetail domain type.
 * Protects UI from CMS/database schema changes.
 */
import type { CmsProductRow } from "@/lib/cms/types";
import type { ProductDetail, ProductCategory, StockStatus } from "../types";

export function mapCmsProductToDetail(row: CmsProductRow): ProductDetail {
  return {
    id: row.id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    title: row.title,
    slug: row.slug,
    summary: row.summary,
    description: row.description,
    category: row.category as ProductCategory,
    tags: Array.isArray(row.tags) ? row.tags : [],
    price: row.price,
    currency: row.currency,
    stockStatus: row.stock_status as StockStatus,
    featured: row.featured,
    limitedEdition: row.limited_edition,
    coverImage: {
      src: row.cover_image_src,
      alt: row.cover_image_alt,
    },
    gallery: Array.isArray(row.gallery) ? row.gallery : [],
    sizes: Array.isArray(row.sizes) ? row.sizes : undefined,
    colors: Array.isArray(row.colors) ? row.colors : undefined,
    linkedExperienceSlug: row.linked_experience_slug ?? undefined,
    linkedWorkshopSlug: row.linked_workshop_slug ?? undefined,
    linkedPortfolioSlug: row.linked_portfolio_slug ?? undefined,
  };
}

export function mapCmsProductsToDetails(rows: CmsProductRow[]): ProductDetail[] {
  return rows.map(mapCmsProductToDetail);
}
