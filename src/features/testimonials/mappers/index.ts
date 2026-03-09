/**
 * Testimonial mappers — transform CMS rows into domain types.
 */
import type { CmsTestimonialRow } from "@/lib/cms/types";
import type { Testimonial } from "../types";

export function mapCmsTestimonialToItem(row: CmsTestimonialRow): Testimonial {
  return {
    id: row.id,
    name: row.name,
    quote: row.quote,
    sourceType: row.source_type as Testimonial["sourceType"],
    contextTag: row.context_tag ?? undefined,
    image: row.image_url ?? undefined,
  };
}
