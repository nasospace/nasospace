import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Testimonial } from "../types";

interface TestimonialCardProps {
  testimonial: Testimonial;
  featured?: boolean;
  className?: string;
}

export function TestimonialCard({
  testimonial,
  featured = false,
  className,
}: TestimonialCardProps) {
  return (
    <motion.article
      className={cn(
        "group relative rounded-2xl border-2 border-foreground/10 bg-card p-6 md:p-8",
        "shadow-soft transition-all duration-300",
        "hover:border-foreground/20 hover:shadow-elevated hover:-translate-y-1",
        featured && "md:col-span-2 md:row-span-2 md:p-10",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative quote mark */}
      <span
        className={cn(
          "absolute -top-2 -left-1 font-groovy text-primary/20 select-none pointer-events-none",
          featured ? "text-[6rem] md:text-[8rem]" : "text-[4rem] md:text-[5rem]"
        )}
        aria-hidden
      >
        "
      </span>

      {/* Quote */}
      <blockquote
        className={cn(
          "relative z-10 font-display leading-relaxed text-foreground",
          featured
            ? "text-lg md:text-xl lg:text-2xl"
            : "text-base md:text-lg"
        )}
      >
        {testimonial.quote}
      </blockquote>

      {/* Attribution */}
      <footer className="mt-6 flex items-center gap-3">
        {testimonial.image ? (
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="h-10 w-10 rounded-full object-cover border-2 border-foreground/10"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 border-2 border-primary/20">
            <span className="font-groovy text-sm font-bold text-primary">
              {testimonial.name.charAt(0)}
            </span>
          </div>
        )}

        <div className="flex flex-col">
          <cite className="not-italic font-display font-semibold text-foreground text-sm">
            {testimonial.name}
          </cite>
          {testimonial.contextTag && (
            <span className="text-xs text-muted-foreground">
              {testimonial.contextTag}
            </span>
          )}
        </div>
      </footer>

      {/* Source type pill */}
      {testimonial.sourceType !== "general" && (
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center rounded-full bg-secondary/50 px-2.5 py-0.5 text-[10px] font-display font-medium uppercase tracking-wider text-secondary-foreground/70">
            {testimonial.sourceType}
          </span>
        </div>
      )}
    </motion.article>
  );
}
