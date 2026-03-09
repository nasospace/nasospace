import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { fadeUp, cardHover } from "@/lib/motion";
import { BLOG_CATEGORY_META, type BlogPost } from "../types";
import { routeHelpers } from "@/config/routes";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  /** Use horizontal layout for featured cards on larger screens */
  featured?: boolean;
}

export function BlogCard({ post, index = 0, featured = false }: BlogCardProps) {
  const meta = BLOG_CATEGORY_META[post.category];
  const detailPath = routeHelpers.blogDetail(post.slug);

  return (
    <motion.article
      variants={fadeUp}
      custom={index}
      className="h-full"
    >
      <motion.div
        whileHover={cardHover.lift}
        className="h-full"
      >
        <Link
          to={detailPath}
          className={cn(
            "group flex h-full flex-col overflow-hidden rounded-2xl bg-card",
            "border-[2px] border-foreground/10 transition-all duration-300 hover:border-foreground/25 hover:shadow-card",
            featured && "md:flex-row"
          )}
        >
          {/* Cover image */}
          <div
            className={cn(
              "relative overflow-hidden",
              featured
                ? "aspect-[16/10] md:aspect-auto md:w-1/2"
                : "aspect-[16/10]"
            )}
          >
            <img
              src={post.coverImage.src}
              alt={post.coverImage.alt}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              loading="lazy"
            />
          </div>

          {/* Content */}
          <div
            className={cn(
              "flex flex-1 flex-col px-5 py-5",
              featured && "md:justify-center md:px-8 md:py-6"
            )}
          >
            {/* Category label */}
            <span
              className="mb-2 inline-block w-fit font-groovy text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground"
            >
              {meta.emoji} {meta.label}
            </span>

            <h3
              className={cn(
                "font-display font-bold leading-snug",
                featured
                  ? "text-xl md:text-2xl"
                  : "text-base sm:text-lg"
              )}
            >
              {post.title}
            </h3>

            <p
              className={cn(
                "mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground",
                featured && "md:line-clamp-3 md:text-base"
              )}
            >
              {post.excerpt}
            </p>

            {/* Meta line */}
            <div className="mt-auto flex items-center gap-3 pt-4 text-[11px] text-muted-foreground">
              <time>{formatDate(post.publishDate)}</time>
              <span className="text-border">·</span>
              <span>{post.readingTime}</span>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.article>
  );
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
