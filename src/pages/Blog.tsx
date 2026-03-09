import { useState } from "react";
import { Section } from "@/components/shared";
import { SEOHead } from "@/components/shared/SEOHead";
import {
  BlogHero,
  BlogCategoryFilter,
  BlogCard,
  BlogGrid,
} from "@/features/blog/components";
import { useBlogPosts, useFeaturedBlogPost } from "@/features/blog/hooks/useBlogPosts";
import type { BlogCategory } from "@/features/blog/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogPage() {
  const [active, setActive] = useState<BlogCategory | "all">("all");
  const { data: posts = [], isLoading } = useBlogPosts();
  const { data: featuredPost } = useFeaturedBlogPost();

  const filtered =
    active === "all"
      ? posts
      : posts.filter((p) => p.category === active);

  const showFeatured = active === "all" && featuredPost;
  const gridPosts = showFeatured
    ? filtered.filter((p) => p.id !== featuredPost?.id)
    : filtered;

  return (
    <>
      <SEOHead
        title="Blog"
        description="Read stories, insights, and behind-the-scenes from NASO — covering creativity, culture, experiences, and everything in between."
      />
      <BlogHero />

      <Section>
        <div className="mb-8">
          <BlogCategoryFilter active={active} onChange={setActive} />
        </div>

        {isLoading ? (
          <div className="space-y-6">
            <Skeleton className="h-48 rounded-2xl" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-64 rounded-2xl" />
              ))}
            </div>
          </div>
        ) : (
          <>
            {showFeatured && featuredPost && (
              <div className="mb-10">
                <BlogCard post={featuredPost} featured />
              </div>
            )}
            <BlogGrid key={active} posts={gridPosts} />
          </>
        )}
      </Section>
    </>
  );
}
