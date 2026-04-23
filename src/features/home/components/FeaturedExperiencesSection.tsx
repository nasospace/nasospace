import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Share2 } from "lucide-react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import { StickerBadge } from "@/components/shared/RetroElements";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { trackNaso } from "@/lib/analytics";
import { ROUTES, routeHelpers } from "@/config/routes";
import { fadeUp, cardHover } from "@/lib/motion";
import { useFeaturedExperiences } from "@/features/experiences/hooks/useExperiences";
import { CATEGORY_META } from "@/features/experiences/types";
import { Skeleton } from "@/components/ui/skeleton";

export function FeaturedExperiencesSection() {
  const { data: featuredExperiences = [], isLoading } = useFeaturedExperiences();
  // We grab more items for the horizontal scroll
  const displayed = featuredExperiences.slice(0, 6);
  
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, [displayed]);

  return (
    <section className="relative overflow-hidden py-section-lg bg-naso-cream">
      <div className="absolute inset-0 naso-wavy-bg opacity-20" />
      <div className="absolute inset-0 naso-noise" />
      <div className="container relative z-10 mb-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-end justify-between gap-6 mb-12 sm:mb-20"
        >
          <div className="max-w-2xl text-left">
            <StickerBadge variant="filled" className="bg-naso-lilac text-foreground mb-6" rotate={-2}>
              Curated
            </StickerBadge>
            <h2 className="font-groovy text-[clamp(2.5rem,7vw,4.5rem)] font-black leading-[0.9] tracking-tighter text-foreground">
              The Weekly <span className="text-primary">Drop.</span>
            </h2>
          </div>
          <Link
            to={ROUTES.EXPERIENCES}
            className="font-groovy text-sm font-bold uppercase tracking-[0.15em] text-primary transition-colors hover:text-foreground underline decoration-2 underline-offset-8"
          >
            Discover the full drop →
          </Link>
        </motion.div>
      </div>

      {isLoading ? (
        <div className="container flex gap-5 overflow-hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-80 min-w-[300px] rounded-2xl naso-shimmer" />
          ))}
        </div>
      ) : (
        <div ref={carouselRef} className="cursor-grab active:cursor-grabbing overflow-hidden" data-cursor="DRAG">
          <motion.div 
            drag="x" 
            dragConstraints={{ right: 0, left: -width - 100 }} 
            className="flex gap-8 px-4 sm:px-10 lg:px-20 pb-20 pt-10"
          >
            {displayed.map((item, i) => {
              const meta = CATEGORY_META[item.category];
              // Asymmetrical rotation and offset for the "street poster" look
              const rotation = i % 2 === 0 ? "rotate-2" : "-rotate-3";
              const offsetY = i % 2 === 0 ? "translate-y-6" : "-translate-y-4";
              
              return (
                <motion.div
                  key={item.id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className={cn("min-w-[280px] sm:min-w-[340px] max-w-[380px] shrink-0", rotation, offsetY)}
                >
                  <Link
                    to={routeHelpers.experienceDetail(item.slug)}
                    className="group block overflow-hidden rounded-2xl border-[3px] border-foreground bg-card shadow-retro transition-all duration-300 naso-ease hover:shadow-retro-lg hover:-translate-y-3 hover:rotate-0"
                  >
                    <div className="relative h-52 sm:h-56 bg-muted overflow-hidden border-b-[3px] border-foreground">
                      {item.coverImage && (
                        <img
                          src={item.coverImage.src}
                          alt={item.coverImage.alt}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 naso-ease group-hover:scale-105 grayscale-[10%]"
                          draggable="false"
                          loading="lazy"
                        />
                      )}
                      <div className={cn("absolute inset-0 opacity-50 mix-blend-multiply", meta.color)} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute inset-0 naso-halftone opacity-40 mix-blend-overlay" />
                      <div className="absolute left-3 top-3 flex gap-2">
                        <StickerBadge rotate={i % 2 === 0 ? 4 : -4} className="bg-white text-foreground border-2 border-foreground shadow-retro-sm">
                          {meta.label}
                        </StickerBadge>
                        {i === 0 && (
                          <StickerBadge rotate={-2} className="bg-primary text-white border-2 border-foreground shadow-retro-sm">
                            The Current Shift
                          </StickerBadge>
                        )}
                        {i === 1 && (
                          <StickerBadge rotate={2} className="bg-foreground text-white border-2 border-foreground shadow-retro-sm">
                            Upcoming Ritual
                          </StickerBadge>
                        )}
                      </div>
                    </div>
                    <div className="p-6 relative bg-card flex flex-col justify-between">
                      <div>
                        <div className="absolute top-0 right-6 -translate-y-1/2 bg-white rounded-full border-4 border-foreground shadow-retro-sm px-4 py-2 font-groovy font-black text-sm rotate-[6deg]">
                          {item.price}
                        </div>
                        <p className="font-groovy text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                          {item.date}
                        </p>
                        <h3 className="mt-2 font-groovy text-xl font-bold text-foreground leading-tight">
                          {item.title}
                        </h3>
                      </div>
                      <div className="mt-6 flex items-center justify-between">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            navigator.clipboard.writeText(`Found the next shift. Let's actually make a memory: https://naso.space/experiences/${item.slug}`);
                            toast.success("Copied to clipboard! Send it to the group chat 💅", { duration: 4000 });
                            trackNaso("share_group_chat", { slug: item.slug, source: "featured_carousel" });
                          }}
                          className="group/share flex items-center gap-1.5 rounded-full border-2 border-foreground bg-white px-3 py-1.5 font-groovy text-[10px] font-bold uppercase tracking-widest text-foreground shadow-retro-sm transition-all hover:-translate-y-0.5 hover:bg-secondary active:translate-y-0"
                        >
                          <Share2 className="h-3 w-3" />
                          <span>Group Chat</span>
                        </button>
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover:scale-110 group-hover:bg-foreground group-hover:text-white border-2 border-transparent group-hover:border-white">
                          <ArrowRight className="h-5 w-5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      )}
    </section>
  );
}
