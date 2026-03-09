import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { StickerBadge } from "@/components/shared/RetroElements";
import { ROUTES, routeHelpers } from "@/config/routes";
import { staggerContainer, fadeUp, cardHover } from "@/lib/motion";
import { useFeaturedExperiences } from "@/features/experiences/hooks/useExperiences";
import { CATEGORY_META } from "@/features/experiences/types";
import { Skeleton } from "@/components/ui/skeleton";

export function FeaturedExperiencesSection() {
  const { data: featuredExperiences = [], isLoading } = useFeaturedExperiences();
  const displayed = featuredExperiences.slice(0, 3);

  return (
    <section className="relative overflow-hidden py-section-lg">
      <div className="absolute inset-0 bg-naso-cream naso-dotgrid opacity-40" />
      <div className="absolute inset-0 naso-noise" />
      <div className="container relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          <motion.div
            variants={fadeUp}
            className="mb-10 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <StickerBadge variant="filled" className="bg-naso-lilac" rotate={-3}>
                Featured
              </StickerBadge>
              <h2 className="mt-5 font-groovy text-[clamp(1.6rem,4.5vw,3rem)] font-black leading-[1.05] text-foreground">
                Upcoming moments
              </h2>
            </div>
            <Link
              to={ROUTES.EXPERIENCES}
              className="font-groovy text-xs font-bold uppercase tracking-[0.12em] text-primary transition-colors hover:text-foreground"
            >
              View all →
            </Link>
          </motion.div>

          {isLoading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-72 rounded-2xl naso-shimmer" />
              ))}
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {displayed.map((item, i) => {
                const meta = CATEGORY_META[item.category];
                return (
                  <motion.div
                    key={item.id}
                    variants={fadeUp}
                    whileHover={i % 2 === 0 ? cardHover.tilt : cardHover.tiltAlt}
                  >
                    <Link
                      to={routeHelpers.experienceDetail(item.slug)}
                      className="group block cursor-pointer overflow-hidden rounded-2xl border-[2.5px] border-foreground bg-card shadow-retro transition-shadow hover:shadow-retro-lg"
                    >
                      <div className={`relative h-44 ${meta.color}`}>
                        <div className="absolute inset-0 naso-halftone" />
                        <div className="absolute right-3 top-3">
                          <StickerBadge rotate={3} className="bg-card text-foreground">
                            {meta.label}
                          </StickerBadge>
                        </div>
                      </div>
                      <div className="p-5">
                        <p className="font-groovy text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                          {item.date}
                        </p>
                        <h3 className="mt-1.5 font-groovy text-lg font-bold text-foreground">
                          {item.title}
                        </h3>
                        <span className="mt-3 inline-flex items-center gap-1 font-groovy text-[10px] font-bold uppercase tracking-[0.12em] text-primary transition-transform duration-200 group-hover:translate-x-1">
                          Details <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
