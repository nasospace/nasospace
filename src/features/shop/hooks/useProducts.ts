/**
 * React Query hooks for product data.
 * Consumes CMS query layer + mapper — never raw DB rows in components.
 */
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchProductBySlug, fetchFeaturedProducts } from "@/lib/cms/products";
import { mapCmsProductToDetail, mapCmsProductsToDetails } from "../mappers";
import type { ProductDetail } from "../types";

const PRODUCTS_STALE = 5 * 60 * 1000; // 5 min

export function useProducts() {
  return useQuery<ProductDetail[]>({
    queryKey: ["cms-products"],
    queryFn: async () => {
      const rows = await fetchProducts();
      return mapCmsProductsToDetails(rows);
    },
    staleTime: PRODUCTS_STALE,
  });
}

export function useProduct(slug: string) {
  return useQuery<ProductDetail | null>({
    queryKey: ["cms-product", slug],
    queryFn: async () => {
      const row = await fetchProductBySlug(slug);
      return row ? mapCmsProductToDetail(row) : null;
    },
    staleTime: PRODUCTS_STALE,
    enabled: !!slug,
  });
}

export function useFeaturedProducts() {
  return useQuery<ProductDetail[]>({
    queryKey: ["cms-products-featured"],
    queryFn: async () => {
      const rows = await fetchFeaturedProducts();
      return mapCmsProductsToDetails(rows);
    },
    staleTime: PRODUCTS_STALE,
  });
}
