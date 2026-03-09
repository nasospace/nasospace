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
import { MOCK_EXPERIENCES } from "@/features/experiences/data";
import { MOCK_WORKSHOPS } from "@/features/workshops/data";
import { MOCK_PRODUCTS } from "@/features/shop/data";
import type { SavedItem, SavedItemType } from "../types";

/** Catalog lookup for enriching saved items with display data */
function enrichSavedItem(itemType: string, itemSlug: string, savedAt: string, id: string): SavedItem | null {
  if (itemType === "experience") {
    const exp = MOCK_EXPERIENCES.find((e) => e.slug === itemSlug);
    if (!exp) return null;
    return {
      id, type: "experience", slug: exp.slug, title: exp.title,
      summary: exp.summary, coverImage: exp.coverImage, savedAt,
      price: exp.price, currency: exp.currency, meta: exp.location,
    };
  }
  if (itemType === "workshop") {
    const ws = MOCK_WORKSHOPS.find((w) => w.slug === itemSlug);
    if (!ws) return null;
    return {
      id, type: "workshop", slug: ws.slug, title: ws.title,
      summary: ws.summary, coverImage: ws.coverImage, savedAt,
      price: ws.price, currency: ws.currency, meta: ws.location,
    };
  }
  if (itemType === "product") {
    const prod = MOCK_PRODUCTS.find((p) => p.slug === itemSlug);
    if (!prod) return null;
    return {
      id, type: "product", slug: prod.slug, title: prod.title,
      summary: prod.summary, coverImage: prod.coverImage, savedAt,
      price: prod.price, currency: prod.currency,
    };
  }
  return null;
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
    queryFn: () => getSavedItems(),
    staleTime: 30_000,
  });

  const allItems = useMemo(() => {
    if (!savedQuery.data) return [];
    return savedQuery.data
      .map((row) => enrichSavedItem(row.item_type, row.item_slug, row.created_at, row.id))
      .filter((item): item is SavedItem => item !== null);
  }, [savedQuery.data]);

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
