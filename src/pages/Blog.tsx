import { useState } from "react";
import { Section } from "@/components/shared";
import {
  BlogHero,
  BlogCategoryFilter,
  BlogCard,
  BlogGrid,
} from "@/features/blog/components";
import { MOCK_BLOG_POSTS, getFeaturedPost } from "@/features/blog/data";
import type { BlogCategory } from "@/features/blog/types";

export default function BlogPage() {
  const [active, setActive] = useState<BlogCategory | "all">("all");

  const featuredPost = getFeaturedPost();
  const filtered =
    active === "all"
      ? MOCK_BLOG_POSTS
      : MOCK_BLOG_POSTS.filter((p) => p.category === active);

  // Show featured card only when showing "all"
  const showFeatured = active === "all" && featuredPost;
  const gridPosts = showFeatured
    ? filtered.filter((p) => p.id !== featuredPost?.id)
    : filtered;

  return (
    <>
      <BlogHero />

      <Section>
        <div className="mb-8">
          <BlogCategoryFilter active={active} onChange={setActive} />
        </div>

        {/* Featured post — horizontal card */}
        {showFeatured && featuredPost && (
          <div className="mb-10">
            <BlogCard post={featuredPost} featured />
          </div>
        )}

        <BlogGrid key={active} posts={gridPosts} />
      </Section>
    </>
  );
}
