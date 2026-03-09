/**
 * CMS-backed React Query hook for FAQ content.
 */
import { useQuery } from "@tanstack/react-query";
import { cmsFaq } from "@/lib/cms";
import { mapCmsFaqItemsToCategories } from "../mappers";
import type { FAQCategory } from "../types";

export function useFaqCategories() {
  return useQuery({
    queryKey: ["cms", "faq"],
    queryFn: async (): Promise<FAQCategory[]> => {
      const rows = await cmsFaq.getAll();
      return mapCmsFaqItemsToCategories(rows);
    },
    staleTime: 10 * 60_000,
  });
}
