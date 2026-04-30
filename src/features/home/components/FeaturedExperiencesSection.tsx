import { useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Lock, Sparkles, HelpCircle } from "lucide-react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { StickerBadge, MagneticButton } from "@/components/shared/RetroElements";
import { cn } from "@/lib/utils";
import { ROUTES, routeHelpers } from "@/config/routes";
import { useExperiences } from "@/features/experiences/hooks/useExperiences";
import { CATEGORY_META } from "@/features/experiences/types";
import { Skeleton } from "@/components/ui/skeleton";

const TOTAL = 100;

// Visual grid: show a mix of slots
const GRID_PREVIEW_COUNT = 20;

export function FeaturedExperiencesSection() {
  const { data: experiences = [], isLoading } = useExperiences();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  // Build slot map: 1-100, mark which are unlocked with real data
  const slotMap = useMemo(() => {
    const map = new Map<number, { slug: string; title: string; category: string; coverImage?: string }>();
    experiences.forEach((exp) => {
      if (exp.slotNumber && !exp.isLocked) {
        map.set(exp.slotNumber, {
          slug: exp.slug,
          title: exp.title,
          category: exp.category,
          coverImage: exp.coverImage?.src,
        });
      }
    });
    return map;
  }, [experiences]);

  const unlockedCount = slotMap.size;

  // Pick which slots to show in the preview grid (first GRID_PREVIEW_COUNT)
  const previewSlots = useMemo(() => {
    const slots: number[] = [];
    for (let i = 1; i <= Math.min(TOTAL, GRID_PREVIEW_COUNT); i++) {
      slots.push(i);
    }
    return slots;
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.2 },
    },
  };

  const cellVariants: Variants = {
    hidden: { scale: 0.5, opacity: 0, rotate: 15 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-foreground py-24 md:py-32">
      {/* Playful Textures */}
      <div className="absolute inset-0 naso-wavy-bg opacity-20 pointer-events-none" />
      <div className="absolute inset-0 naso-noise opacity-30 mix-blend-overlay pointer-events-none" />

      {/* Fun glowing blobs */}
      <motion.div
        style={{ y: bgY }}
        className="absolute top-1/4 -right-20 w-[60vw] h-[60vw] bg-naso-pink/20 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-40, 80]) }}
        className="absolute bottom-1/4 -left-20 w-[50vw] h-[50vw] bg-naso-blue/20 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-16 md:mb-20"
        >
          <StickerBadge variant="filled" className="bg-primary text-white text-xs md:text-sm shadow-[4px_4px_0_hsl(var(--background))] px-6 py-2 mb-8" rotate={3}>
            Don't Miss Out
          </StickerBadge>

          <h2 className="font-groovy text-[clamp(3rem,8vw,6rem)] font-black leading-[0.9] tracking-tighter text-background mb-4">
            100 <span className="text-secondary">Chapters.</span><br/>
            100 Memories.
          </h2>

          <p className="text-lg md:text-xl font-body text-background/80 leading-relaxed max-w-2xl mx-auto font-medium">
            We are dropping 100 completely unique, unrepeatable creative experiences in Cairo. We unlock them one by one. If you miss a chapter, you miss it forever.
          </p>

          {/* Live Counter (Playful) */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
            whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="mt-10 inline-flex items-center gap-4 bg-background border-4 border-background rounded-full px-8 py-4 shadow-[8px_8px_0_hsl(var(--background))] relative overflow-hidden group hover:-translate-y-1 hover:shadow-[10px_10px_0_hsl(var(--background))] transition-all"
          >
            <div className="flex items-baseline gap-1 relative z-10">
              <span className="font-groovy text-5xl md:text-6xl font-black text-primary drop-shadow-[2px_2px_0_hsl(var(--foreground))]">
                {unlockedCount}
              </span>
              <span className="font-groovy text-xl md:text-2xl text-foreground/40 font-bold">/100</span>
            </div>
            <div className="h-10 w-[3px] bg-foreground/10 relative z-10 rounded-full" />
            <div className="flex flex-col text-left relative z-10">
              <span className="font-groovy text-sm md:text-base font-black uppercase tracking-widest text-foreground leading-tight">
                Chapters
              </span>
              <span className="font-body text-[10px] md:text-xs font-bold text-secondary uppercase tracking-widest">
                Currently Live
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* The Grid (The Journey) */}
        {isLoading ? (
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-10 gap-3 max-w-5xl mx-auto">
            {Array.from({ length: GRID_PREVIEW_COUNT }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-2xl border-2 border-background/20" />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-10 gap-3 md:gap-4 max-w-6xl mx-auto"
          >
            {previewSlots.map((slot) => {
              const unlocked = slotMap.get(slot);
              const isUnlocked = !!unlocked;
              const slotString = String(slot).padStart(2, "0");

              return (
                <motion.div key={slot} variants={cellVariants}>
                  {isUnlocked ? (
                    <Link
                      to={routeHelpers.experienceDetail(unlocked!.slug)}
                      className="group relative block aspect-square rounded-2xl border-4 border-background overflow-hidden shadow-[4px_4px_0_hsl(var(--background))] transition-all duration-300 hover:-translate-y-2 hover:-rotate-2 hover:shadow-[8px_8px_0_hsl(var(--background))] active:scale-95 bg-white"
                    >
                      {/* Background image or category color */}
                      {unlocked!.coverImage ? (
                        <img
                          src={unlocked!.coverImage}
                          alt={unlocked!.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                      ) : (
                        <div className={cn(
                          "absolute inset-0",
                          CATEGORY_META[unlocked!.category as keyof typeof CATEGORY_META]?.color || "bg-primary"
                        )} />
                      )}

                      {/* Fun gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent opacity-80" />

                      {/* Slot number */}
                      <div className="absolute top-2 left-2 z-10 bg-background text-foreground rounded-full h-6 w-6 flex items-center justify-center border-2 border-background shadow-[2px_2px_0_hsl(var(--background))]">
                        <span className="font-groovy text-[10px] font-black">{slotString}</span>
                      </div>
                      
                      {/* Category Label on hover */}
                      <div className="absolute bottom-2 left-2 right-2 z-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                         <StickerBadge className="bg-primary text-white text-[8px] w-full text-center border-2 shadow-none py-1">
                           {unlocked!.title}
                         </StickerBadge>
                      </div>

                      {/* Pulse ring for newest unlock */}
                      {slot === unlockedCount && (
                        <div className="absolute inset-0 rounded-xl border-[4px] border-secondary animate-pulse pointer-events-none z-20" />
                      )}
                    </Link>
                  ) : (
                    // Mystery/Locked slot - playful sealed envelope vibe
                    <div className="group relative aspect-square rounded-2xl border-4 border-background/20 bg-background/5 flex flex-col items-center justify-center transition-all duration-300 hover:border-background hover:bg-background/10 hover:-rotate-3 hover:shadow-[6px_6px_0_hsl(var(--background))] overflow-hidden cursor-help">
                      {/* Retro diagonal stripes inside the locked box on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity" style={{ backgroundImage: 'repeating-linear-gradient(45deg, hsl(var(--background)) 0, hsl(var(--background)) 2px, transparent 2px, transparent 8px)' }} />
                      
                      <HelpCircle className="h-5 w-5 md:h-6 md:w-6 text-background/30 mb-1 group-hover:text-primary transition-colors group-hover:scale-110 group-hover:rotate-12 duration-300" />
                      <span className="font-groovy text-xl md:text-2xl font-black text-background/20 group-hover:text-background transition-colors relative z-10">
                        {slotString}
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Playful Footer & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-20 flex flex-col items-center gap-8 text-center relative z-10"
        >
          <div className="inline-flex items-center gap-2 bg-background px-6 py-3 rounded-full border-2 border-background/20 shadow-[4px_4px_0_hsl(var(--background))] transform rotate-1">
            <Lock className="h-4 w-4 text-secondary" />
            <span className="font-groovy text-sm md:text-base font-bold text-foreground">
              <span className="text-secondary">{TOTAL - unlockedCount}</span> mysteries waiting to drop.
            </span>
          </div>

          <MagneticButton
            to={ROUTES.EXPERIENCES}
            className="group inline-flex h-16 items-center justify-center gap-3 rounded-full border-4 border-background bg-primary px-10 font-groovy text-sm md:text-base font-black uppercase tracking-[0.15em] text-white shadow-[6px_6px_0_hsl(var(--background))] transition-all hover:scale-105 hover:bg-secondary hover:shadow-[10px_10px_0_hsl(var(--background))] active:scale-95 active:shadow-[2px_2px_0_hsl(var(--background))]"
          >
            Browse Unlocked Chapters
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
