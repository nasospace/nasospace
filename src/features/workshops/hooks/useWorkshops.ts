/**
 * CMS-backed React Query hooks for workshops.
 */
import { useQuery } from "@tanstack/react-query";
import { cmsWorkshops } from "@/lib/cms";
import { mapCmsWorkshopsToDetails, mapCmsWorkshopToDetail } from "../mappers";
import type { WorkshopDetail } from "../types";

export function useWorkshops() {
  return useQuery({
    queryKey: ["cms", "workshops"],
    queryFn: async (): Promise<WorkshopDetail[]> => {
      const rows = await cmsWorkshops.getAll();
      return mapCmsWorkshopsToDetails(rows);
    },
    staleTime: 5 * 60_000,
  });
}

export function useWorkshop(slug: string) {
  return useQuery({
    queryKey: ["cms", "workshop", slug],
    queryFn: async (): Promise<WorkshopDetail | null> => {
      const row = await cmsWorkshops.getBySlug(slug);
      return row ? mapCmsWorkshopToDetail(row) : null;
    },
    staleTime: 5 * 60_000,
    enabled: !!slug,
  });
}

export function useRelatedWorkshops(currentSlug: string, category: string, limit = 3) {
  return useQuery({
    queryKey: ["cms", "workshops", "related", currentSlug],
    queryFn: async (): Promise<WorkshopDetail[]> => {
      const rows = await cmsWorkshops.getRelated(currentSlug, category, limit);
      return mapCmsWorkshopsToDetails(rows);
    },
    staleTime: 5 * 60_000,
    enabled: !!currentSlug,
  });
}
