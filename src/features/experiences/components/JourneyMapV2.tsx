/**
 * JourneyMap v2 — The 100 Experiences Archive Grid
 * 
 * An immersive, atmospheric grid of 100 slots. Unlocked slots glow with life;
 * sealed slots feel mysterious and anticipatory. This is the emotional centerpiece
 * of the Experiences page — a collectible memory vault being revealed chapter by chapter.
 */
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Lock, Eye, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORY_META, type ExperienceDetail } from "../types";
import { MOOD_META } from "./MoodFilter";
import { routeHelpers } from "@/config/routes";

interface JourneyMapProps {
  experiences: ExperienceDetail[];
}

const TOTAL_SLOTS = 100;

export function JourneyMapV2({ experiences }: JourneyMapProps) {
  const bySlot = new Map<number, ExperienceDetail>();
  experiences.forEach((e) => {
    if (e.slotNumber && e.slotNumber >= 1 && e.slotNumber <= TOTAL_SLOTS) {
      bySlot.set(e.slotNumber, e);
    }
  });

  const unlockedCount = experiences.filter(
    (e) => e.slotNumber && !e.isLocked,
  ).length;

  const [hoveredSlot, setHoveredSlot] = useState<number | null>(null);
  const [sealedModalSlot, setSealedModalSlot] = useState<number | null>(null);

  return (
    <section className="relative">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 md:mb-16 max-w-3xl"
      >
        <div className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-background px-4 py-1.5 font-groovy text-[10px] font-bold uppercase tracking-widest shadow-retro-sm mb-6">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          The Archive · Chapter Map
        </div>
        <h2 className="font-groovy text-4xl font-black leading-[0.92] sm:text-5xl md:text-6xl tracking-tight">
          The journey so far.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg max-w-2xl">
          Every slot is a chapter in NASO's story. The glowing ones are live — 
          click to discover. The sealed ones?{" "}
          <span className="text-foreground font-semibold">They're coming.</span>{" "}
          And they'll be worth the wait.
        </p>
        
        {/* Progress */}
        <div className="mt-6 flex items-center gap-4">
          <div className="flex items-baseline gap-1.5">
            <span className="font-groovy text-3xl font-black text-foreground tabular-nums">
              {String(unlockedCount).padStart(2, "0")}
            </span>
            <span className="text-sm text-muted-foreground font-medium">/ {TOTAL_SLOTS}</span>
          </div>
          <div className="h-2 flex-1 max-w-[240px] overflow-hidden rounded-full bg-muted border border-foreground/10">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${(unlockedCount / TOTAL_SLOTS) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="h-full bg-gradient-to-r from-primary via-naso-purple to-secondary rounded-full"
            />
          </div>
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground font-bold hidden sm:block">
            unlocked
          </span>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4 text-[11px] font-body uppercase tracking-wider text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-gradient-to-br from-primary to-naso-purple border border-foreground/20" />
            <span>Live — book now</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm border-2 border-dashed border-foreground/25 bg-muted/40" />
            <span>Sealed — coming soon</span>
          </div>
        </div>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-5 gap-1.5 sm:grid-cols-8 sm:gap-2 md:grid-cols-10 lg:gap-2.5">
        {Array.from({ length: TOTAL_SLOTS }, (_, i) => {
          const slot = i + 1;
          const exp = bySlot.get(slot);
          return (
            <ArchiveSlot
              key={slot}
              slot={slot}
              experience={exp}
              isHovered={hoveredSlot === slot}
              onHover={() => setHoveredSlot(slot)}
              onLeave={() => setHoveredSlot(null)}
              onSealedClick={() => setSealedModalSlot(slot)}
            />
          );
        })}
      </div>

      {/* Sealed experience modal */}
      <AnimatePresence>
        {sealedModalSlot !== null && (
          <SealedModal
            slot={sealedModalSlot}
            onClose={() => setSealedModalSlot(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ═══════════════════════════════════════════
   ARCHIVE SLOT — Individual tile
   ═══════════════════════════════════════════ */

interface ArchiveSlotProps {
  slot: number;
  experience?: ExperienceDetail;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onSealedClick: () => void;
}

function ArchiveSlot({ slot, experience, isHovered, onHover, onLeave, onSealedClick }: ArchiveSlotProps) {
  const slotLabel = `#${String(slot).padStart(3, "0")}`;
  const isUnlocked = !!experience && !experience.isLocked;

  if (isUnlocked && experience) {
    const meta = CATEGORY_META[experience.category] ?? CATEGORY_META.art;
    // Find mood for this category
    const moodEntry = Object.entries(MOOD_META).find(([, m]) => m.maps === experience.category);
    const moodEmoji = moodEntry ? MOOD_META[moodEntry[0] as keyof typeof MOOD_META].emoji : meta.emoji;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ delay: (slot % 10) * 0.03, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        <Link
          to={routeHelpers.experienceDetail(experience.slug)}
          className={cn(
            "group relative flex aspect-square w-full flex-col justify-between overflow-hidden rounded-lg sm:rounded-xl",
            "border-2 border-foreground/80 bg-card",
            "transition-all duration-300",
            "hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] hover:border-primary hover:z-10 hover:scale-[1.08]",
          )}
          aria-label={`Experience ${slotLabel}: ${experience.title}`}
        >
          {/* Cover image */}
          {experience.coverImage?.src && (
            <img
              src={experience.coverImage.src}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          )}
          
          {/* Color overlay */}
          <div className={cn("absolute inset-0 opacity-20 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-10", meta.color)} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Glow effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none" />

          {/* Top: slot number + emoji */}
          <div className="relative z-10 flex items-start justify-between p-1.5 sm:p-2">
            <span className="rounded bg-black/60 backdrop-blur-sm px-1 py-0.5 font-groovy text-[7px] sm:text-[8px] font-black tracking-wider text-white/90 border border-white/10">
              {slotLabel}
            </span>
            <span className="text-xs sm:text-sm opacity-80 group-hover:opacity-100 transition-opacity drop-shadow-sm">{moodEmoji}</span>
          </div>

          {/* Bottom: title */}
          <div className="relative z-10 p-1.5 sm:p-2">
            <p className="line-clamp-2 font-groovy text-[8px] sm:text-[10px] font-bold leading-tight text-white drop-shadow-sm">
              {experience.title}
            </p>
          </div>

          {/* LIVE indicator */}
          <div className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-1 rounded-full bg-secondary/90 px-1.5 py-0.5 backdrop-blur-sm">
              <span className="h-1 w-1 rounded-full bg-foreground animate-pulse" />
              <span className="font-groovy text-[6px] font-black uppercase tracking-wider text-foreground">Live</span>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Sealed / locked slot
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: (slot % 10) * 0.02, duration: 0.3 }}
    >
      <button
        onClick={onSealedClick}
        className={cn(
          "group relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden rounded-lg sm:rounded-xl",
          "border border-dashed border-foreground/15 bg-muted/20",
          "transition-all duration-300 cursor-pointer",
          "hover:border-foreground/30 hover:bg-muted/40 hover:scale-[1.03]",
        )}
        aria-label={`Experience ${slotLabel}: sealed, coming soon`}
      >
        {/* Subtle diagonal pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 1px, transparent 6px)",
          }}
        />
        
        <Lock className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-foreground/20 group-hover:text-foreground/40 transition-colors" strokeWidth={2} />
        <span className="mt-0.5 font-groovy text-[7px] sm:text-[8px] font-black tracking-wider text-foreground/25 group-hover:text-foreground/40 transition-colors">
          {slotLabel}
        </span>
      </button>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   SEALED MODAL — "This chapter hasn't been written yet"
   ═══════════════════════════════════════════ */

function SealedModal({ slot, onClose }: { slot: number; onClose: () => void }) {
  const slotLabel = `#${String(slot).padStart(3, "0")}`;

  // Random teaser messages for variety
  const teasers = [
    "This chapter hasn't been written yet.",
    "Something beautiful is being crafted.",
    "The best stories take time.",
    "This memory is still being designed.",
    "A new world is loading.",
    "Patience. The magic is brewing.",
    "This one's going to be special.",
    "Coming soon to Cairo.",
  ];
  const teaser = teasers[(slot - 1) % teasers.length];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 20, rotate: -2 }}
        animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 10 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm rounded-2xl border-[2.5px] border-foreground bg-card p-8 shadow-retro-lg text-center overflow-hidden"
      >
        {/* Decorative texture */}
        <div className="absolute inset-0 naso-dotgrid opacity-20 pointer-events-none" />
        <div className="absolute inset-0 naso-noise opacity-20 pointer-events-none" />

        {/* Seal icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.15 }}
          className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-muted border-2 border-foreground/10"
        >
          <Lock className="h-7 w-7 text-foreground/40" />
        </motion.div>

        <span className="inline-block rounded-full bg-foreground text-background px-3 py-1 font-groovy text-[10px] font-bold uppercase tracking-widest mb-4">
          {slotLabel} · Sealed
        </span>

        <h3 className="font-groovy text-xl font-black leading-tight mb-3">
          {teaser}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          Every sealed slot is an experience being carefully curated.
          Follow NASO to be the first to know when new chapters unlock.
        </p>

        <div className="flex flex-col gap-3">
          <a
            href="https://www.instagram.com/nasospace"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full border-[2.5px] border-foreground bg-foreground text-background px-6 py-3 font-groovy text-xs font-bold uppercase tracking-wider shadow-retro transition-all hover:shadow-retro-lg hover:-translate-y-0.5"
          >
            <Sparkles className="h-4 w-4" />
            Follow @nasospace
          </a>
          <button
            onClick={onClose}
            className="text-xs text-muted-foreground font-medium hover:text-foreground transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
