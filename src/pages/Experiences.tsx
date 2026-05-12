/**
 * Experiences Page — "100 Experiences. One Unforgettable Life."
 * 
 * Redesigned as an immersive creative archive. Not a booking page —
 * a memory vault, a collectible journey, a secret creative universe
 * being unlocked chapter by chapter across Cairo.
 * 
 * Flow:
 * 1. Cinematic Archive Hero (counter, typewriter, atmospheric)
 * 2. Archive Marquee (visual rhythm)
 * 3. Journey Map (100-slot archive grid — the centerpiece)
 * 4. Subtle Marquee (transition)
 * 5. Mood Filter + Live Grid (browse by emotional vibe)
 * 6. Sealed Teaser (anticipation / CTA)
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/shared";
import { SEOHead } from "@/components/shared/SEOHead";
import {
  ExperienceArchiveHero,
  JourneyMapV2,
  MoodFilter,
  ExperienceArchiveGrid,
  ArchiveMarquee,
  ArchiveMarqueeAlt,
  SealedTeaser,
} from "@/features/experiences/components";
import { useExperiences } from "@/features/experiences/hooks/useExperiences";
import type { ExperienceCategory } from "@/features/experiences/types";
import { Skeleton } from "@/components/ui/skeleton";

const TOTAL_SLOTS = 100;

export default function ExperiencesPage() {
  const [activeMood, setActiveMood] = useState<ExperienceCategory | "all">("all");
  const { data: experiences = [], isLoading } = useExperiences();

  // Live (unlocked) experiences for the browse grid
  const liveExperiences = experiences.filter((e) => !e.isLocked);
  const unlockedCount = experiences.filter((e) => e.slotNumber && !e.isLocked).length;

  const filtered =
    activeMood === "all"
      ? liveExperiences
      : liveExperiences.filter((e) => e.category === activeMood);

  return (
    <>
      <SEOHead
        title="100 Experiences — One Unforgettable Life | NASO"
        description="NASO is unlocking 100 once-in-a-lifetime creative experiences across Cairo. Workshops, outings, adventures, creative sessions — each one a sealed chapter waiting to be discovered. Enter the archive."
        canonical="/experiences"
        ogImage="/assets/workshops_bg_1776810244802.png"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "NASO 100 Experiences — The Creative Archive",
            "description": "100 curated creative experiences across Cairo by NASO Space. Each experience is a sealed chapter in an unforgettable creative journey.",
          },
        ]}
      />

      {/* ═══ 1. Cinematic Archive Hero ═══ */}
      <ExperienceArchiveHero
        unlockedCount={unlockedCount}
        totalSlots={TOTAL_SLOTS}
      />

      {/* ═══ 2. Archive Marquee — visual rhythm ═══ */}
      <ArchiveMarquee />

      {/* ═══ 3. The 100 Experiences Journey Map ═══ */}
      <Section spacing="lg">
        {isLoading ? (
          <div className="space-y-6">
            <Skeleton className="h-12 w-64 rounded-xl" />
            <Skeleton className="h-[500px] rounded-2xl" />
          </div>
        ) : (
          <JourneyMapV2 experiences={experiences} />
        )}
      </Section>

      {/* ═══ 4. Subtle Marquee — transition to browse ═══ */}
      <ArchiveMarqueeAlt />

      {/* ═══ 5. Browse Live Experiences by Mood ═══ */}
      <Section spacing="lg">
        {/* Section intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4"
        >
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-background px-4 py-1.5 font-groovy text-[10px] font-bold uppercase tracking-widest shadow-retro-sm mb-6">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary" />
            Live Drops
          </div>
          <h2 className="font-groovy text-3xl sm:text-4xl md:text-5xl font-black leading-[0.92] tracking-tight">
            Book your next chapter.
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-xl leading-relaxed">
            The unlocked experiences are live and waiting. Filter by mood,
            find the one that speaks to you, and make it yours.
          </p>
        </motion.div>

        {/* Mood filter */}
        <MoodFilter active={activeMood} onChange={setActiveMood} />

        {/* Experience grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-80 rounded-2xl" />
            ))}
          </div>
        ) : (
          <ExperienceArchiveGrid key={activeMood} experiences={filtered} />
        )}
      </Section>

      {/* ═══ 6. Sealed Teaser — anticipation / CTA ═══ */}
      <SealedTeaser />
    </>
  );
}
