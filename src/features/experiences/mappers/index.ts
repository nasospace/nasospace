/**
 * Maps raw CMS experience rows → ExperienceDetail domain type.
 * Protects UI from CMS schema changes.
 */
import type { CmsExperienceRow } from "@/lib/cms/types";
import type { ExperienceDetail, ExperienceCategory } from "../types";

export function mapCmsExperienceToDetail(row: CmsExperienceRow): ExperienceDetail {
  return {
    id: row.id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    title: row.title,
    slug: row.slug,
    summary: row.summary,
    description: row.description,
    category: row.category as ExperienceCategory,
    tags: Array.isArray(row.tags) ? row.tags : [],
    date: row.date ?? "",
    location: row.location ?? "",
    price: row.price,
    currency: row.currency,
    capacity: row.capacity,
    difficulty: row.difficulty as ExperienceDetail["difficulty"],
    coverImage: {
      src: row.cover_image_src,
      alt: row.cover_image_alt,
    },
    gallery: Array.isArray(row.gallery) ? row.gallery : [],
    featured: row.featured,
  };
}

export function mapCmsExperiencesToDetails(rows: CmsExperienceRow[]): ExperienceDetail[] {
  return rows.map(mapCmsExperienceToDetail);
}
