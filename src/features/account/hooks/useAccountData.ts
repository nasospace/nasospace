/**
 * useAccountData — real data access point for the account area.
 *
 * Uses React Query + Supabase services.
 * When auth is added: swap getDeviceId() for auth.uid() in services — no hook changes.
 */
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getOrCreateProfile } from "@/server/services/account";
import { getSavedItems, getSavedItemCount } from "@/server/services/savedItems";
import { getInquiries, getInquiryCount } from "@/server/services/inquiries";
import { supabase } from "@/integrations/supabase/client";
import type { SavedItem, SavedItemType } from "../types";

/**
 * Enriches saved items with display data from CMS tables.
 * Products still use mock data (no CMS table yet — will move to commerce phase).
 */
async function enrichSavedItems(
  rows: { id: string; item_type: string; item_slug: string; created_at: string }[]
): Promise<SavedItem[]> {
  if (rows.length === 0) return [];

  // Group slugs by type for batch queries
  const experienceSlugs = rows.filter((r) => r.item_type === "experience").map((r) => r.item_slug);
  const workshopSlugs = rows.filter((r) => r.item_type === "workshop").map((r) => r.item_slug);
  const productSlugs = rows.filter((r) => r.item_type === "product").map((r) => r.item_slug);

  // Batch fetch from CMS tables
  const [expResult, wsResult] = await Promise.all([
    experienceSlugs.length > 0
      ? supabase.from("cms_experiences").select("slug, title, summary, cover_image_src, cover_image_alt, price, currency, location").in("slug", experienceSlugs)
      : Promise.resolve({ data: [] }),
    workshopSlugs.length > 0
      ? supabase.from("cms_workshops").select("slug, title, summary, cover_image_src, cover_image_alt, price, currency, location").in("slug", workshopSlugs)
      : Promise.resolve({ data: [] }),
  ]);

  // Build lookup maps
  const expMap = new Map((expResult.data ?? []).map((r) => [r.slug, r]));
  const wsMap = new Map((wsResult.data ?? []).map((r) => [r.slug, r]));

  // For products, use mock data until commerce CMS is built
  let prodMap = new Map<string, { slug: string; title: string; summary: string; cover_image_src: string; cover_image_alt: string; price: number; currency: string }>();
  if (productSlugs.length > 0) {
    try {
      const { MOCK_PRODUCTS } = await import("@/features/shop/data");
      for (const slug of productSlugs) {
        const prod = MOCK_PRODUCTS.find((p) => p.slug === slug);
        if (prod) {
          prodMap.set(slug, {
            slug: prod.slug,
            title: prod.title,
            summary: prod.summary,
            cover_image_src: prod.coverImage.src,
            cover_image_alt: prod.coverImage.alt,
            price: prod.price,
            currency: prod.currency,
          });
        }
      }
    } catch {
      // Mock data unavailable — skip products
    }
  }

  // Map rows to SavedItem
  return rows
    .map((row): SavedItem | null => {
      if (row.item_type === "experience") {
        const exp = expMap.get(row.item_slug);
        if (!exp) return null;
        return {
          id: row.id, type: "experience", slug: exp.slug, title: exp.title,
          summary: exp.summary, coverImage: { src: exp.cover_image_src, alt: exp.cover_image_alt },
          savedAt: row.created_at, price: exp.price, currency: exp.currency, meta: exp.location,
        };
      }
      if (row.item_type === "workshop") {
        const ws = wsMap.get(row.item_slug);
        if (!ws) return null;
        return {
          id: row.id, type: "workshop", slug: ws.slug, title: ws.title,
          summary: ws.summary, coverImage: { src: ws.cover_image_src, alt: ws.cover_image_alt },
          savedAt: row.created_at, price: ws.price, currency: ws.currency, meta: ws.location,
        };
      }
      if (row.item_type === "product") {
        const prod = prodMap.get(row.item_slug);
        if (!prod) return null;
        return {
          id: row.id, type: "product", slug: prod.slug, title: prod.title,
          summary: prod.summary, coverImage: { src: prod.cover_image_src, alt: prod.cover_image_alt },
          savedAt: row.created_at, price: prod.price, currency: prod.currency,
        };
      }
      return null;
    })
    .filter((item): item is SavedItem => item !== null);
}

export function useAccountData() {
  const profileQuery = useQuery({
    queryKey: ["account-profile"],
    queryFn: getOrCreateProfile,
    staleTime: 60_000,
  });

  const savedCountQuery = useQuery({
    queryKey: ["saved-items-count"],
    queryFn: getSavedItemCount,
    staleTime: 30_000,
  });

  const requestCountQuery = useQuery({
    queryKey: ["inquiry-count"],
    queryFn: getInquiryCount,
    staleTime: 30_000,
  });

  return {
    user: profileQuery.data ?? { id: "", name: "Explorer", email: "", joinedAt: "" },
    savedCount: savedCountQuery.data ?? 0,
    requestCount: requestCountQuery.data ?? 0,
    isLoading: profileQuery.isLoading || savedCountQuery.isLoading || requestCountQuery.isLoading,
    error: profileQuery.error || savedCountQuery.error || requestCountQuery.error,
  };
}

export function useSavedItems() {
  const [filter, setFilter] = useState<SavedItemType | "all">("all");

  const savedQuery = useQuery({
    queryKey: ["saved-items"],
    queryFn: async () => {
      const rows = await getSavedItems();
      return enrichSavedItems(rows);
    },
    staleTime: 30_000,
  });

  const allItems = savedQuery.data ?? [];

  const items = useMemo(() => {
    if (filter === "all") return allItems;
    return allItems.filter((item) => item.type === filter);
  }, [allItems, filter]);

  const counts = useMemo(() => ({
    all: allItems.length,
    experience: allItems.filter((i) => i.type === "experience").length,
    workshop: allItems.filter((i) => i.type === "workshop").length,
    product: allItems.filter((i) => i.type === "product").length,
  }), [allItems]);

  return {
    items,
    filter,
    setFilter,
    counts,
    isLoading: savedQuery.isLoading,
    error: savedQuery.error,
  };
}

export function useRequestHistory() {
  const requestsQuery = useQuery({
    queryKey: ["inquiries"],
    queryFn: getInquiries,
    staleTime: 30_000,
  });

  const requests = requestsQuery.data ?? [];

  return {
    requests,
    activeCount: requests.filter((r) => r.status !== "completed").length,
    completedCount: requests.filter((r) => r.status === "completed").length,
    isLoading: requestsQuery.isLoading,
    error: requestsQuery.error,
  };
}
