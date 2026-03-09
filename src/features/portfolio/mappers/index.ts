/**
 * Portfolio mappers — transform CMS rows into domain types.
 */
import type { CmsPortfolioItemRow } from "@/lib/cms/types";
import type { PortfolioItem, PortfolioCategory } from "../types";

export function mapCmsPortfolioToItem(row: CmsPortfolioItemRow): PortfolioItem {
  return {
    id: row.id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    title: row.title,
    slug: row.slug,
    summary: row.summary,
    story: row.story,
    category: row.category as PortfolioCategory,
    tags: Array.isArray(row.tags) ? row.tags : [],
    location: row.location ?? "",
    date: row.date ?? "",
    audienceType: row.audience_type ?? "",
    vibe: row.vibe ?? "",
    coverImage: { src: row.cover_image_src, alt: row.cover_image_alt },
    gallery: Array.isArray(row.gallery) ? row.gallery : [],
    linkedExperienceSlug: row.linked_experience_slug ?? undefined,
    linkedWorkshopSlug: row.linked_workshop_slug ?? undefined,
    featured: row.featured,
    testimonialQuote: row.testimonial_quote ?? undefined,
    testimonialName: row.testimonial_name ?? undefined,
  };
}
