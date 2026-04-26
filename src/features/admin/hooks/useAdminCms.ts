/**
 * React Query hooks for admin CMS CRUD.
 */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAllAdmin,
  fetchOneAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  bulkUpdatePublished,
  bulkDelete,
} from "@/server/services/admin/cms";

type CmsTable =
  | "cms_experiences"
  | "cms_workshops"
  | "cms_products"
  | "cms_portfolio_items"
  | "cms_blog_posts"
  | "cms_faq_items"
  | "cms_testimonials"
  | "cms_page_content";

export function useAdminList(table: CmsTable) {
  return useQuery({
    queryKey: ["admin", table],
    queryFn: () => fetchAllAdmin(table),
    staleTime: 30_000,
  });
}

export function useAdminItem(table: CmsTable, id: string | null) {
  return useQuery({
    queryKey: ["admin", table, id],
    queryFn: () => fetchOneAdmin(table, id!),
    enabled: !!id,
    staleTime: 30_000,
  });
}

export function useAdminCreate(table: CmsTable) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (record: Record<string, unknown>) => createAdmin(table, record),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", table] });
      qc.invalidateQueries({ queryKey: ["cms"] });
      qc.invalidateQueries({ queryKey: ["cms-page-content"] });
    },
  });
}

export function useAdminUpdate(table: CmsTable) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Record<string, unknown> }) =>
      updateAdmin(table, id, updates),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", table] });
      qc.invalidateQueries({ queryKey: ["cms"] });
      qc.invalidateQueries({ queryKey: ["cms-page-content"] });
    },
  });
}

export function useAdminDelete(table: CmsTable) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteAdmin(table, id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", table] });
      qc.invalidateQueries({ queryKey: ["cms"] });
      qc.invalidateQueries({ queryKey: ["cms-page-content"] });
    },
  });
}

export function useAdminBulkPublish(table: CmsTable) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ ids, published }: { ids: string[]; published: boolean }) =>
      bulkUpdatePublished(table, ids, published),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", table] });
      qc.invalidateQueries({ queryKey: ["cms"] });
      qc.invalidateQueries({ queryKey: ["cms-page-content"] });
    },
  });
}

export function useAdminBulkDelete(table: CmsTable) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (ids: string[]) => bulkDelete(table, ids),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", table] });
      qc.invalidateQueries({ queryKey: ["cms"] });
      qc.invalidateQueries({ queryKey: ["cms-page-content"] });
    },
  });
}
