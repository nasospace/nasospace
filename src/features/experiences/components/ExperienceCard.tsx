import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { posterEnter, spring } from "@/lib/motion";
import { StickerBadge } from "@/components/shared";
import { CATEGORY_META, type ExperienceDetail } from "../types";
import { ROUTES } from "@/config/routes";

interface ExperienceCardProps {
  experience: ExperienceDetail;
  index?: number;
}

export function ExperienceCard({ experience, index = 0 }: ExperienceCardProps) {
  const meta = CATEGORY_META[experience.category];
  const detailPath = ROUTES.EXPERIENCES + "/" + experience.slug;

  return (
    <motion.div
      variants={posterEnter(index * 0.08)}
      layout
      className="h-full"
    >
      <motion.div
        whileHover={{ y: -6, rotate: 1 }}
        transition={spring}
        className="h-full"
      >
        <Link
          to={detailPath}
          className={cn(
            "group flex h-full flex-col overflow-hidden rounded-2xl",
            "border-[2.5px] border-foreground bg-card shadow-retro",
            "transition-shadow hover:shadow-retro-lg"
          )}
        >
          {/* Category color strip with halftone */}
          <div className={cn("relative h-28 sm:h-32", meta.color)}>
            <div className="naso-halftone absolute inset-0" />

            {/* Category badge overlapping strip bottom */}
            <div className="absolute -bottom-3 left-4">
              <StickerBadge
                variant="filled"
                rotate={-2}
                className={cn(meta.color, meta.textColor)}
              >
                {meta.emoji} {meta.label}
              </StickerBadge>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-1 flex-col px-5 pb-5 pt-6">
            <h3 className="font-groovy text-base font-bold leading-tight sm:text-lg">
              {experience.title}
            </h3>

            <p className="mt-1.5 text-xs text-muted-foreground">
              {experience.date} · {experience.location}
            </p>

            <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {experience.summary}
            </p>

            {/* Footer */}
            <div className="mt-auto flex items-end justify-between pt-4">
              {experience.difficulty !== "easy" && (
                <span className="rounded-full border border-foreground/20 px-2.5 py-0.5 font-display text-[10px] uppercase tracking-wider text-muted-foreground">
                  {experience.difficulty}
                </span>
              )}
              <span className="ml-auto font-groovy text-xs font-bold">
                {experience.price} {experience.currency}
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
