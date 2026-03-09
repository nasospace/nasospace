/**
 * Maps raw CMS workshop rows → WorkshopDetail domain type.
 */
import type { CmsWorkshopRow } from "@/lib/cms/types";
import type { WorkshopDetail, WorkshopCategory } from "../types";

export function mapCmsWorkshopToDetail(row: CmsWorkshopRow): WorkshopDetail {
  return {
    id: row.id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    title: row.title,
    slug: row.slug,
    summary: row.summary,
    description: row.description,
    category: row.category as WorkshopCategory,
    tags: Array.isArray(row.tags) ? row.tags : [],
    date: row.date ?? "",
    location: row.location ?? "",
    price: row.price,
    currency: row.currency,
    capacity: row.capacity,
    duration: row.duration,
    skillLevel: row.skill_level as WorkshopDetail["skillLevel"],
    materialsIncluded: row.materials_included,
    coverImage: {
      src: row.cover_image_src,
      alt: row.cover_image_alt,
    },
    gallery: Array.isArray(row.gallery) ? row.gallery : [],
    featured: row.featured,
  };
}

export function mapCmsWorkshopsToDetails(rows: CmsWorkshopRow[]): WorkshopDetail[] {
  return rows.map(mapCmsWorkshopToDetail);
}
