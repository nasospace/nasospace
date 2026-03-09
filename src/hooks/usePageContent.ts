/**
 * React Query hooks for CMS-backed page content (about, contact).
 */
import { useQuery } from "@tanstack/react-query";
import { cmsPageContent } from "@/lib/cms";
import type { CmsPageContentRow } from "@/lib/cms/types";

export function usePageContent(pageKey: string) {
  return useQuery<CmsPageContentRow[]>({
    queryKey: ["cms-page-content", pageKey],
    queryFn: () => cmsPageContent.fetchPage(pageKey),
    staleTime: 10 * 60_000,
  });
}

/** Helper to get a specific section's content from loaded page data */
export function getSection<T = Record<string, unknown>>(
  sections: CmsPageContentRow[] | undefined,
  sectionKey: string
): T | null {
  const row = sections?.find((s) => s.section_key === sectionKey);
  return row ? (row.content as unknown as T) : null;
}
