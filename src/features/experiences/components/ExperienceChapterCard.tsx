/**
 * ExperienceChapterCard — Premium editorial card for live experiences.
 * 
 * Each experience is presented as a "chapter" — a collectible memory card
 * with immersive hover states, emotional tags, atmospheric overlays,
 * and a premium editorial feel.
 */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { posterEnter, cardHover } from "@/lib/motion";
import { CATEGORY_META, type ExperienceDetail } from "../types";
import { MOOD_META } from "./MoodFilter";
import { routeHelpers } from "@/config/routes";
import { ArrowUpRight, MapPin, Users, Calendar } from "lucide-react";

interface ExperienceChapterCardProps {
  experience: ExperienceDetail;
  index?: number;
}

export function ExperienceChapterCard({ experience, index = 0 }: ExperienceChapterCardProps) {
  const meta = CATEGORY_META[experience.category];
  const detailPath = routeHelpers.experienceDetail(experience.slug);
  
  // Find emotional mood label
  const moodEntry = Object.entries(MOOD_META).find(([, m]) => m.maps === experience.category);
  const moodLabel = moodEntry ? MOOD_META[moodEntry[0] as keyof typeof MOOD_META].label : meta.label;
  const moodEmoji = moodEntry ? MOOD_META[moodEntry[0] as keyof typeof MOOD_META].emoji : meta.emoji;
  const moodTagline = moodEntry ? MOOD_META[moodEntry[0] as keyof typeof MOOD_META].tagline : "";

  // Slot label
  const chapterLabel = experience.slotNumber
    ? `Chapter ${String(experience.slotNumber).padStart(3, "0")}`
    : null;

  return (
    <motion.div
      variants={posterEnter(index * 0.06)}
      layout
      className="h-full"
    >
      <motion.div
        whileHover={cardHover.liftScale}
        className="h-full"
      >
        <Link
          to={detailPath}
          className={cn(
            "group relative flex h-full flex-col overflow-hidden rounded-2xl",
            "border-2 border-foreground/80 bg-card",
            "transition-all duration-500",
            "hover:shadow-[0_8px_40px_-8px_hsl(var(--primary)/0.25)] hover:border-primary/60",
          )}
        >
          {/* Image zone */}
          <div className="relative h-52 sm:h-60 overflow-hidden">
            {experience.coverImage && (
              <img
                src={experience.coverImage.src}
                alt={experience.coverImage.alt}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
            )}
            
            {/* Color overlay */}
            <div className={cn("absolute inset-0 opacity-15 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-5", meta.color)} />
            
            {/* Bottom gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            
            {/* Halftone texture */}
            <div className="naso-halftone absolute inset-0 opacity-30 mix-blend-overlay" />

            {/* Top badges */}
            <div className="absolute top-3 left-3 right-3 z-10 flex items-start justify-between">
              {/* Chapter number */}
              {chapterLabel && (
                <span className="rounded-md bg-black/50 backdrop-blur-md px-2 py-1 font-groovy text-[9px] font-black tracking-wider text-white/90 border border-white/10">
                  {chapterLabel}
                </span>
              )}
              
              {/* LIVE badge */}
              <div className="flex items-center gap-1.5 rounded-full bg-secondary/90 backdrop-blur-sm px-2.5 py-1 border border-secondary/50">
                <span className="h-1.5 w-1.5 rounded-full bg-foreground animate-pulse" />
                <span className="font-groovy text-[8px] font-black uppercase tracking-widest text-foreground">
                  Live
                </span>
              </div>
            </div>

            {/* Bottom mood tag */}
            <div className="absolute bottom-3 left-3 z-10">
              <div className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1.5 backdrop-blur-md border",
                "border-white/20 bg-white/10",
              )}>
                <span className="text-sm">{moodEmoji}</span>
                <span className="font-groovy text-[9px] font-bold uppercase tracking-widest text-white">
                  {moodLabel}
                </span>
              </div>
            </div>

            {/* Arrow indicator — appears on hover */}
            <motion.div
              className="absolute bottom-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0"
            >
              <ArrowUpRight className="h-4 w-4 text-white" />
            </motion.div>
          </div>

          {/* Body */}
          <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
            <h3 className="font-groovy text-lg sm:text-xl font-bold leading-tight tracking-tight group-hover:text-primary transition-colors duration-300">
              {experience.title}
            </h3>

            {/* Meta row */}
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
              {experience.date && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {experience.date}
                </span>
              )}
              {experience.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {experience.location}
                </span>
              )}
              {experience.capacity > 0 && (
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {experience.capacity} spots
                </span>
              )}
            </div>

            {/* Summary */}
            <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {experience.summary}
            </p>

            {/* Tags */}
            {experience.tags && experience.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {experience.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-foreground/10 bg-muted/50 px-2 py-0.5 font-body text-[9px] uppercase tracking-wider text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Footer */}
            <div className="mt-auto flex items-end justify-between pt-4 border-t border-foreground/5">
              {experience.difficulty !== "easy" && (
                <span className="rounded-full border border-foreground/15 px-2.5 py-0.5 font-display text-[10px] uppercase tracking-wider text-muted-foreground">
                  {experience.difficulty}
                </span>
              )}
              <div className="ml-auto flex items-baseline gap-1">
                <span className="font-groovy text-lg font-black text-foreground">
                  {experience.price}
                </span>
                <span className="text-[10px] text-muted-foreground font-medium uppercase">
                  {experience.currency}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
