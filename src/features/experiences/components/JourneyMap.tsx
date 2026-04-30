/**
 * The 100 Experiences journey map — a numbered grid of 100 slots.
 * Unlocked slots that have a real experience assigned link to its detail page.
 * Locked slots show a sealed/mystery card with a chain icon.
 */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORY_META, type ExperienceDetail } from "../types";
import { routeHelpers } from "@/config/routes";

interface JourneyMapProps {
  experiences: ExperienceDetail[];
}

const TOTAL_SLOTS = 100;

export function JourneyMap({ experiences }: JourneyMapProps) {
  // Build a slot -> experience lookup. Only experiences with a slot_number show in the map.
  const bySlot = new Map<number, ExperienceDetail>();
  experiences.forEach((e) => {
    if (e.slotNumber && e.slotNumber >= 1 && e.slotNumber <= TOTAL_SLOTS) {
      bySlot.set(e.slotNumber, e);
    }
  });

  const unlockedCount = experiences.filter(
    (e) => e.slotNumber && !e.isLocked,
  ).length;

  return (
    <section className="relative">
      {/* Header */}
      <div className="mb-10 max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-background px-3 py-1 font-groovy text-[10px] font-bold uppercase tracking-widest shadow-retro-sm">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          NASO Origin Story · Vol. 001
        </span>
        <h2 className="mt-4 font-groovy text-4xl font-black leading-[0.95] sm:text-5xl md:text-6xl">
          100 Experiences.
          <br />
          <span className="italic text-muted-foreground">One by one.</span>
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          We're crafting <strong className="text-foreground">100 unforgettable experiences</strong> across Cairo —
          a new place, a new craft, a new memory every time. Most are still sealed. The unlocked ones?
          They&apos;re live and waiting.
        </p>
        <div className="mt-5 flex items-center gap-3 text-sm">
          <span className="font-groovy text-2xl font-black text-foreground tabular-nums">
            {String(unlockedCount).padStart(3, "0")}
          </span>
          <span className="text-muted-foreground">/ 100 unlocked</span>
          <div className="ml-2 h-1.5 flex-1 max-w-[200px] overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-primary transition-all duration-700"
              style={{ width: `${(unlockedCount / TOTAL_SLOTS) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 sm:gap-3 md:grid-cols-8 lg:grid-cols-10">
        {Array.from({ length: TOTAL_SLOTS }, (_, i) => {
          const slot = i + 1;
          const exp = bySlot.get(slot);
          return <SlotTile key={slot} slot={slot} experience={exp} />;
        })}
      </div>
    </section>
  );
}

interface SlotTileProps {
  slot: number;
  experience?: ExperienceDetail;
}

function SlotTile({ slot, experience }: SlotTileProps) {
  const slotLabel = `#${String(slot).padStart(3, "0")}`;
  const isUnlocked = !!experience && !experience.isLocked;

  if (isUnlocked && experience) {
    const meta = CATEGORY_META[experience.category] ?? CATEGORY_META.art;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: (slot % 10) * 0.02, duration: 0.3 }}
        whileHover={{ y: -3, rotate: slot % 2 === 0 ? 1.5 : -1.5 }}
      >
        <Link
          to={routeHelpers.experienceDetail(experience.slug)}
          className={cn(
            "group relative flex aspect-square w-full flex-col justify-between overflow-hidden rounded-xl",
            "border-[2.5px] border-foreground bg-card shadow-retro-sm",
            "transition-shadow duration-300 hover:shadow-retro-lg",
          )}
          aria-label={`Experience ${slotLabel}: ${experience.title}`}
        >
          {experience.coverImage?.src && (
            <img
              src={experience.coverImage.src}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          )}
          <div className={cn("absolute inset-0 opacity-30 mix-blend-multiply", meta.color)} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="relative z-10 flex items-start justify-between p-2">
            <span className="rounded-md bg-background/90 px-1.5 py-0.5 font-groovy text-[9px] font-black tracking-wider text-foreground">
              {slotLabel}
            </span>
            <span className="text-sm">{meta.emoji}</span>
          </div>

          <div className="relative z-10 p-2">
            <p className="line-clamp-2 font-groovy text-[10px] font-bold leading-tight text-white sm:text-xs">
              {experience.title}
            </p>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Locked / sealed slot
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: (slot % 10) * 0.015, duration: 0.25 }}
      className={cn(
        "group relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden rounded-xl",
        "border-2 border-dashed border-foreground/30 bg-muted/40",
        "transition-colors duration-200 hover:border-foreground/50 hover:bg-muted/60",
      )}
      aria-label={`Experience ${slotLabel}: locked, coming soon`}
    >
      {/* Subtle diagonal stripes */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 1px, transparent 8px)",
        }}
      />
      <Lock className="h-3 w-3 text-foreground/30 sm:h-4 sm:w-4" strokeWidth={2.5} />
      <span className="mt-1 font-groovy text-[9px] font-black tracking-wider text-foreground/40 sm:text-[10px]">
        {slotLabel}
      </span>
    </motion.div>
  );
}
