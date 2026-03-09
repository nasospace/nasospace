/**
 * React Query hooks for CMS-backed portfolio data.
 */
import { useQuery } from "@tanstack/react-query";
import { cmsPortfolio } from "@/lib/cms";
import { mapCmsPortfolioToItem } from "../mappers";
import type { PortfolioItem } from "../types";

export function usePortfolioItems() {
  return useQuery<PortfolioItem[]>({
    queryKey: ["cms-portfolio"],
    queryFn: async () => {
      const rows = await cmsPortfolio.fetchAll();
      return rows.map(mapCmsPortfolioToItem);
    },
    staleTime: 5 * 60_000,
  });
}

export function usePortfolioItem(slug: string) {
  return useQuery<PortfolioItem | null>({
    queryKey: ["cms-portfolio", slug],
    queryFn: async () => {
      const row = await cmsPortfolio.fetchBySlug(slug);
      return row ? mapCmsPortfolioToItem(row) : null;
    },
    staleTime: 5 * 60_000,
    enabled: !!slug,
  });
}
