/**
 * CMS-backed React Query hooks for blog posts.
 */
import { useQuery } from "@tanstack/react-query";
import { cmsBlogPosts } from "@/lib/cms";
import { mapCmsBlogPostsToPosts, mapCmsBlogPostToPost } from "../mappers";
import type { BlogPost } from "../types";

export function useBlogPosts() {
  return useQuery({
    queryKey: ["cms", "blog-posts"],
    queryFn: async (): Promise<BlogPost[]> => {
      const rows = await cmsBlogPosts.getAll();
      return mapCmsBlogPostsToPosts(rows);
    },
    staleTime: 5 * 60_000,
  });
}

export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: ["cms", "blog-post", slug],
    queryFn: async (): Promise<BlogPost | null> => {
      const row = await cmsBlogPosts.getBySlug(slug);
      return row ? mapCmsBlogPostToPost(row) : null;
    },
    staleTime: 5 * 60_000,
    enabled: !!slug,
  });
}

export function useFeaturedBlogPost() {
  return useQuery({
    queryKey: ["cms", "blog-posts", "featured"],
    queryFn: async (): Promise<BlogPost | null> => {
      const row = await cmsBlogPosts.getFeatured();
      return row ? mapCmsBlogPostToPost(row) : null;
    },
    staleTime: 5 * 60_000,
  });
}

export function useRelatedBlogPosts(currentSlug: string, category: string, limit = 3) {
  return useQuery({
    queryKey: ["cms", "blog-posts", "related", currentSlug],
    queryFn: async (): Promise<BlogPost[]> => {
      const rows = await cmsBlogPosts.getRelated(currentSlug, category, limit);
      return mapCmsBlogPostsToPosts(rows);
    },
    staleTime: 5 * 60_000,
    enabled: !!currentSlug,
  });
}
