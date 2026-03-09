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
} from "@/server/services/admin/cms";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

type CmsTable =
  | "cms_experiences"
  | "cms_workshops"
  | "cms_products"
  | "cms_portfolio_items";

export function useAdminList<T extends CmsTable>(table: T) {
  return useQuery({
    queryKey: ["admin", table],
    queryFn: () => fetchAllAdmin(table),
    staleTime: 30_000,
  });
}

export function useAdminItem<T extends CmsTable>(table: T, id: string | null) {
  return useQuery({
    queryKey: ["admin", table, id],
    queryFn: () => fetchOneAdmin(table, id!),
    enabled: !!id,
    staleTime: 30_000,
  });
}

export function useAdminCreate<T extends CmsTable>(table: T) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (record: TablesInsert<T>) => createAdmin(table, record),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", table] });
      // Also invalidate public CMS queries
      qc.invalidateQueries({ queryKey: ["cms"] });
    },
  });
}

export function useAdminUpdate<T extends CmsTable>(table: T) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: TablesUpdate<T> }) =>
      updateAdmin(table, id, updates),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", table] });
      qc.invalidateQueries({ queryKey: ["cms"] });
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
    },
  });
}
