import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Testimonial } from "../types";

interface TestimonialCardProps {
  testimonial: Testimonial;
  featured?: boolean;
  className?: string;
}

const sourceColors: Record<string, string> = {
  experience: "bg-primary/10 text-primary",
  workshop: "bg-secondary/40 text-secondary-foreground",
  event: "bg-accent/15 text-accent",
  product: "bg-naso-coral/15 text-naso-coral",
  general: "bg-muted text-muted-foreground",
};

export function TestimonialCard({
  testimonial,
  featured = false,
  className,
}: TestimonialCardProps) {
  return (
    <motion.article
      className={cn(
        "group relative flex flex-col justify-between rounded-2xl border border-border bg-card p-6 md:p-8",
        "shadow-soft transition-shadow duration-300",
        "hover:shadow-card",
        featured && "md:col-span-2 md:p-10",
        className
      )}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Decorative quote mark */}
      <span
        className={cn(
          "pointer-events-none absolute -top-3 left-4 select-none font-groovy leading-none text-primary/10",
          featured ? "text-[7rem]" : "text-[5rem]"
        )}
        aria-hidden
      >
        &ldquo;
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
      <footer className="mt-6 flex items-center gap-3 pt-4 border-t border-border/60">
        {/* Avatar initial */}
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <span className="font-groovy text-xs font-bold text-primary">
            {testimonial.name.charAt(0)}
          </span>
        </div>

        <div className="flex flex-col gap-0.5">
          <cite className="not-italic font-display text-sm font-semibold text-foreground">
            {testimonial.name}
          </cite>
          {testimonial.contextTag && (
            <span className={cn(
              "inline-block w-fit rounded-full px-2 py-0.5 text-[10px] font-display font-medium uppercase tracking-wider",
              sourceColors[testimonial.sourceType] ?? sourceColors.general
            )}>
              {testimonial.contextTag}
            </span>
          )}
        </div>
      </footer>
    </motion.article>
  );
}
