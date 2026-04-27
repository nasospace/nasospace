/**
 * React Query hooks for CMS-backed page content.
 *
 * Preview mode: when an admin visits a public page with ?preview=1,
 * we fetch unpublished rows too so they can preview drafts before going live.
 */
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { cmsPageContent } from "@/lib/cms";
import type { CmsPageContentRow } from "@/lib/cms/types";
import { useAdminAuth } from "@/features/admin/hooks/useAdminAuth";

export function usePreviewMode(): boolean {
  const [params] = useSearchParams();
  const { isAdmin } = useAdminAuth();
  return isAdmin && params.get("preview") === "1";
}

export function usePageContent(pageKey: string) {
  const preview = usePreviewMode();
  return useQuery<CmsPageContentRow[]>({
    queryKey: ["cms-page-content", pageKey, preview ? "preview" : "live"],
    queryFn: () =>
      preview ? cmsPageContent.fetchPageAll(pageKey) : cmsPageContent.fetchPage(pageKey),
    staleTime: preview ? 0 : 10 * 60_000,
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
