import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp, fadeUpDelay, staggerContainer } from "@/lib/motion";
import { Section } from "@/components/shared";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { ROUTES, buildInquiryPath, routeHelpers } from "@/config/routes";
import { useBlogPost, useRelatedBlogPosts } from "../hooks/useBlogPosts";
import { BLOG_CATEGORY_META } from "../types";
import { BlogGrid } from "./BlogGrid";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogDetailViewProps {
  slug: string;
}

export function BlogDetailView({ slug }: BlogDetailViewProps) {
  const { data: post, isLoading } = useBlogPost(slug);
  const { data: related = [] } = useRelatedBlogPosts(
    slug,
    post?.category ?? "",
    3
  );

  if (isLoading) {
    return (
      <Section>
        <div className="mx-auto max-w-3xl space-y-6">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-64 rounded-2xl" />
          <Skeleton className="h-96 rounded-2xl" />
        </div>
      </Section>
    );
  }

  if (!post) {
    return (
      <Section className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <h1 className="font-groovy text-3xl font-bold">Story Not Found</h1>
        <p className="mt-2 text-muted-foreground">
          This article doesn't exist or has been moved.
        </p>
        <Link
          to={ROUTES.BLOG}
          className="mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold text-primary underline underline-offset-4"
        >
          ← Back to Stories
        </Link>
      </Section>
    );
  }

  const meta = BLOG_CATEGORY_META[post.category];

  // Render content with basic markdown-like heading support
  const contentBlocks = post.content.split("\n\n").map((block, i) => {
    if (block.startsWith("## ")) {
      return (
        <h2
          key={i}
          className="mt-10 mb-4 font-display text-xl font-bold md:text-2xl"
        >
          {block.replace("## ", "")}
        </h2>
      );
    }
    if (block.startsWith("- ")) {
      const items = block.split("\n").filter((l) => l.startsWith("- "));
      return (
        <ul key={i} className="my-4 space-y-1.5 pl-5">
          {items.map((item, j) => (
            <li key={j} className="list-disc text-foreground/85 leading-relaxed">
              {item.replace("- ", "")}
            </li>
          ))}
        </ul>
      );
    }
    return (
      <p key={i} className="text-foreground/85 leading-[1.8]">
        {block}
      </p>
    );
  });

  return (
    <>
      {/* Article hero */}
      <Section spacing="lg" fullBleed className="relative overflow-hidden bg-naso-cream naso-dotgrid">
        <div className="container relative">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-3xl py-4"
          >
            <motion.div variants={fadeUp} className="mb-4">
              <Link
                to={ROUTES.BLOG}
                className="font-display text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Stories
              </Link>
            </motion.div>

            <motion.span
              variants={fadeUp}
              className="mb-3 inline-block font-display text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground"
            >
              {meta.emoji} {meta.label}
            </motion.span>

            <motion.h1
              variants={fadeUpDelay(0.1)}
              className="font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl"
            >
              {post.title}
            </motion.h1>

            <motion.div
              variants={fadeUpDelay(0.2)}
              className="mt-4 flex items-center gap-3 text-sm text-muted-foreground"
            >
              {post.authorName && (
                <>
                  <span className="font-display font-semibold text-foreground">
                    {post.authorName}
                  </span>
                  <span className="text-border">·</span>
                </>
              )}
              <time>{formatDate(post.publishDate)}</time>
              <span className="text-border">·</span>
              <span>{post.readingTime}</span>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* Cover image */}
      <MotionDiv className="-mt-4 px-4 md:px-0">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border">
          <img
            src={post.coverImage.src}
            alt={post.coverImage.alt}
            className="aspect-[2/1] w-full object-cover"
          />
        </div>
      </MotionDiv>

      {/* Article body */}
      <Section>
        <div className="mx-auto max-w-[680px] space-y-5 text-base md:text-[17px]">
          {contentBlocks}
        </div>
      </Section>

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="container mx-auto max-w-[680px] pb-8">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-foreground/15 px-3 py-1 font-display text-[10px] uppercase tracking-wider text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Linked content blocks */}
      {(post.linkedExperienceSlug || post.linkedWorkshopSlug || post.linkedPortfolioSlug) && (
        <Section className="border-t border-border">
          <div className="mx-auto max-w-[680px]">
            <MotionDiv>
              <h3 className="mb-4 font-display text-lg font-bold">
                Related from NASO
              </h3>
              <div className="flex flex-col gap-3 sm:flex-row">
                {post.linkedExperienceSlug && (
                  <LinkedBlock
                    label="Experience"
                    emoji="✦"
                    href={routeHelpers.experienceDetail(post.linkedExperienceSlug)}
                  />
                )}
                {post.linkedWorkshopSlug && (
                  <LinkedBlock
                    label="Workshop"
                    emoji="🎨"
                    href={routeHelpers.workshopDetail(post.linkedWorkshopSlug)}
                  />
                )}
                {post.linkedPortfolioSlug && (
                  <LinkedBlock
                    label="Portfolio"
                    emoji="📸"
                    href={routeHelpers.portfolioDetail(post.linkedPortfolioSlug)}
                  />
                )}
              </div>
            </MotionDiv>
          </div>
        </Section>
      )}

      {/* CTA */}
      <Section fullBleed className="bg-naso-cream naso-dotgrid">
        <div className="container">
          <MotionDiv className="mx-auto max-w-lg text-center">
            <h3 className="font-groovy text-xl font-bold md:text-2xl">
              Inspired?
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Explore our experiences or get in touch to create something together.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                to={ROUTES.EXPERIENCES}
                className={cn(
                  "rounded-full border-2 border-foreground bg-primary px-6 py-2.5",
                  "font-display text-xs font-bold uppercase tracking-wider text-primary-foreground",
                  "transition-shadow hover:shadow-retro"
                )}
              >
                Browse Experiences
              </Link>
              <Link
                to={buildInquiryPath()}
                className={cn(
                  "rounded-full border-2 border-foreground bg-card px-6 py-2.5",
                  "font-display text-xs font-bold uppercase tracking-wider text-foreground",
                  "transition-shadow hover:shadow-retro"
                )}
              >
                Get in Touch
              </Link>
            </div>
          </MotionDiv>
        </div>
      </Section>

      {/* Related posts */}
      {related.length > 0 && (
        <Section className="border-t border-border">
          <MotionDiv>
            <h2 className="mb-8 font-display text-2xl font-bold">More Stories</h2>
          </MotionDiv>
          <BlogGrid posts={related} />
        </Section>
      )}
    </>
  );
}

function LinkedBlock({ label, emoji, href }: { label: string; emoji: string; href: string }) {
  return (
    <Link
      to={href}
      className={cn(
        "flex flex-1 items-center gap-3 rounded-xl border border-border bg-card px-5 py-4",
        "transition-colors hover:border-foreground/30"
      )}
    >
      <span className="text-lg">{emoji}</span>
      <div>
        <p className="font-display text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <p className="text-sm font-display font-semibold text-foreground">
          View {label} →
        </p>
      </div>
    </Link>
  );
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}
