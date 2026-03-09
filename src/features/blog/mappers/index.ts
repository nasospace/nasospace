/**
 * Maps raw CMS blog post rows → BlogPost domain type.
 */
import type { CmsBlogPostRow } from "@/lib/cms/types";
import type { BlogPost, BlogCategory } from "../types";

export function mapCmsBlogPostToPost(row: CmsBlogPostRow): BlogPost {
  return {
    id: row.id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    category: row.category as BlogCategory,
    tags: Array.isArray(row.tags) ? row.tags : [],
    publishDate: row.publish_date ?? row.created_at,
    readingTime: row.reading_time,
    coverImage: {
      src: row.cover_image_src,
      alt: row.cover_image_alt,
    },
    featured: row.featured,
    authorName: row.author_name ?? undefined,
    linkedExperienceSlug: row.linked_experience_slug ?? undefined,
    linkedWorkshopSlug: row.linked_workshop_slug ?? undefined,
    linkedPortfolioSlug: row.linked_portfolio_slug ?? undefined,
  };
}

export function mapCmsBlogPostsToPosts(rows: CmsBlogPostRow[]): BlogPost[] {
  return rows.map(mapCmsBlogPostToPost);
}
