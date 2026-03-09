/**
 * useAccountData — single data access point for the account area.
 *
 * Currently returns mock data. When auth/backend is added:
 * 1. Replace mock imports with API calls (e.g. via @tanstack/react-query)
 * 2. Add loading/error states
 * 3. No component changes needed — they consume these hooks unchanged.
 */
import { useMemo, useState, useCallback } from "react";
import { MOCK_USER, MOCK_SAVED_ITEMS, MOCK_REQUESTS } from "../data";
import type { SavedItemType } from "../types";

export function useAccountData() {
  return useMemo(
    () => ({
      user: MOCK_USER,
      savedItems: MOCK_SAVED_ITEMS,
      requests: MOCK_REQUESTS,
      savedCount: MOCK_SAVED_ITEMS.length,
      requestCount: MOCK_REQUESTS.length,
    }),
    []
  );
}

export function useSavedItems() {
  const [filter, setFilter] = useState<SavedItemType | "all">("all");

  const items = useMemo(() => {
    if (filter === "all") return MOCK_SAVED_ITEMS;
    return MOCK_SAVED_ITEMS.filter((item) => item.type === filter);
  }, [filter]);

  const counts = useMemo(() => ({
    all: MOCK_SAVED_ITEMS.length,
    experience: MOCK_SAVED_ITEMS.filter((i) => i.type === "experience").length,
    workshop: MOCK_SAVED_ITEMS.filter((i) => i.type === "workshop").length,
    product: MOCK_SAVED_ITEMS.filter((i) => i.type === "product").length,
  }), []);

  return { items, filter, setFilter, counts };
}

export function useRequestHistory() {
  return useMemo(
    () => ({
      requests: MOCK_REQUESTS,
      activeCount: MOCK_REQUESTS.filter((r) => r.status !== "completed").length,
      completedCount: MOCK_REQUESTS.filter((r) => r.status === "completed").length,
    }),
    []
  );
}
