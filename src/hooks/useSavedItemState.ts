/**
 * Reusable hook for save button state.
 * Reads initial saved state from the backend and provides a toggle function.
 * Returns isSaved=false for unauthenticated users (no queries made).
 */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { isItemSaved, addSavedItem, removeSavedItem } from "@/server/services/savedItems";
import { useAuth } from "@/lib/auth";
import type { SavedItemType } from "@/features/account/types";

export function useSavedItemState(itemType: SavedItemType, itemSlug: string) {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const queryKey = ["saved-item", itemType, itemSlug];

  const { data: isSaved = false, isLoading } = useQuery({
    queryKey,
    queryFn: () => isItemSaved(itemType, itemSlug),
    staleTime: 30_000,
    // Don't fetch if not authenticated — saves always return false
    enabled: isAuthenticated,
  });

  const mutation = useMutation({
    mutationFn: async () => {
      if (isSaved) {
        return removeSavedItem(itemType, itemSlug);
      }
      return addSavedItem(itemType, itemSlug);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, !isSaved);
      return { previous };
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(queryKey, context?.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: ["saved-items"] });
    },
  });

  return {
    isSaved,
    isLoading: isAuthenticated ? isLoading : false,
    isPending: mutation.isPending,
    toggle: () => mutation.mutate(),
  };
}
