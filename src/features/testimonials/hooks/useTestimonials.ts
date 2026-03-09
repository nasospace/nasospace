/**
 * React Query hooks for CMS-backed testimonials.
 */
import { useQuery } from "@tanstack/react-query";
import { cmsTestimonials } from "@/lib/cms";
import { mapCmsTestimonialToItem } from "../mappers";
import type { Testimonial } from "../types";

export function useTestimonials() {
  return useQuery<Testimonial[]>({
    queryKey: ["cms-testimonials"],
    queryFn: async () => {
      const rows = await cmsTestimonials.fetchAll();
      return rows.map(mapCmsTestimonialToItem);
    },
    staleTime: 5 * 60_000,
  });
}
