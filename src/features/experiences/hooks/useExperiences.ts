/**
 * CMS-backed React Query hooks for experiences.
 */
import { useQuery } from "@tanstack/react-query";
import { cmsExperiences } from "@/lib/cms";
import { mapCmsExperiencesToDetails, mapCmsExperienceToDetail } from "../mappers";
import type { ExperienceDetail } from "../types";

export function useExperiences() {
  return useQuery({
    queryKey: ["cms", "experiences"],
    queryFn: async (): Promise<ExperienceDetail[]> => {
      const rows = await cmsExperiences.getAll();
      return mapCmsExperiencesToDetails(rows);
    },
    staleTime: 5 * 60_000,
  });
}

export function useExperience(slug: string) {
  return useQuery({
    queryKey: ["cms", "experience", slug],
    queryFn: async (): Promise<ExperienceDetail | null> => {
      const row = await cmsExperiences.getBySlug(slug);
      return row ? mapCmsExperienceToDetail(row) : null;
    },
    staleTime: 5 * 60_000,
    enabled: !!slug,
  });
}

export function useFeaturedExperiences() {
  return useQuery({
    queryKey: ["cms", "experiences", "featured"],
    queryFn: async (): Promise<ExperienceDetail[]> => {
      const rows = await cmsExperiences.getFeatured();
      return mapCmsExperiencesToDetails(rows);
    },
    staleTime: 5 * 60_000,
  });
}

export function useRelatedExperiences(currentSlug: string, category: string, limit = 3) {
  return useQuery({
    queryKey: ["cms", "experiences", "related", currentSlug],
    queryFn: async (): Promise<ExperienceDetail[]> => {
      const rows = await cmsExperiences.getRelated(currentSlug, category, limit);
      return mapCmsExperiencesToDetails(rows);
    },
    staleTime: 5 * 60_000,
    enabled: !!currentSlug,
  });
}
