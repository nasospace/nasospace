import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { StickerBadge } from "@/components/shared/RetroElements";
import { ROUTES } from "@/config/routes";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { featuredExperiences } from "@/features/home/data";

export function FeaturedExperiencesSection() {
  return (
    <section className="relative overflow-hidden py-section-lg">
      <div className="absolute inset-0 bg-naso-cream naso-dotgrid opacity-50" />
      <div className="container relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
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

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredExperiences.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                whileHover={{ y: -6, rotate: i % 2 === 0 ? 1 : -1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group cursor-pointer overflow-hidden rounded-2xl border-[2.5px] border-foreground bg-card shadow-retro transition-shadow hover:shadow-retro-lg"
              >
                <div className={`relative h-44 ${item.color}`}>
                  <div className="absolute inset-0 naso-halftone" />
                  <div className="absolute right-3 top-3">
                    <StickerBadge rotate={3} className="bg-card text-foreground">
                      {item.tag}
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
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
