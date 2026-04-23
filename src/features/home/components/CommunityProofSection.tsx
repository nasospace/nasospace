import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { StickerBadge, FlowerShape } from "@/components/shared/RetroElements";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

const REVIEWS = [
  { text: "I was worried about going solo, but the team made it so easy to meet people. The pottery setup was beautiful.", author: "Salma T.", handle: "@salmatweets", rotate: -2, bg: "bg-white", img: "/assets/pottery_chill_1776810187258.png" },
  { text: "Actually worth the money. Everything was organized and the energy was perfect.", author: "Ahmed S.", handle: "@ahmed_s_x", rotate: 3, bg: "bg-card", img: "/assets/street_art_1776810227236.png" },
  { text: "Finally, something to do on a Friday that isn't just sitting at a cafe.", author: "Farah T.", handle: "@farahvibe", rotate: -4, bg: "bg-naso-cream", img: "/assets/cairo_jazz_1776810208777.png" },
  { text: "Best creative workshop in Cairo. Met some amazing people.", author: "Omar K.", handle: "@omar.k", rotate: 2, bg: "bg-white", img: "/assets/hero_image_1776810151671.png" },
];

export function CommunityProofSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, []);

  return (
    <section className="relative overflow-hidden bg-naso-lilac py-section-lg" aria-label="Voices of the movement">
      <div className="absolute inset-0 naso-checkerboard opacity-20" />
      <div className="absolute inset-0 naso-noise opacity-30" />

      <div className="container relative z-10 mb-10 text-center lg:text-left">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="flex flex-col items-center lg:items-start"
        >
          <div className="mb-16 sm:mb-24 text-center">
            <StickerBadge variant="filled" className="bg-white text-foreground" rotate={2}>
              The Circle
            </StickerBadge>
            <h2 className="mt-6 font-groovy text-[clamp(2.5rem,7vw,4.5rem)] font-black leading-[0.9] tracking-tighter text-foreground">
              Voices of the <span className="text-primary">movement.</span>
            </h2>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 w-full overflow-hidden" ref={carouselRef} data-cursor="DRAG">
        <motion.div 
          drag="x" 
          dragConstraints={{ right: 0, left: -width - 40 }} 
          className="flex gap-6 sm:gap-8 px-4 sm:px-10 lg:px-20 pb-20 pt-10 cursor-grab active:cursor-grabbing"
        >
          {REVIEWS.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: i * 0.1 }}
              className={cn(
                "min-w-[280px] sm:min-w-[340px] max-w-[380px] shrink-0",
                "rounded-2xl border-[3px] border-foreground p-4 shadow-retro-lg transition-transform hover:scale-105",
                review.bg
              )}
              style={{ rotate: review.rotate }}
            >
              <div className="aspect-square w-full overflow-hidden rounded-xl border-2 border-foreground mb-4">
                <img src={review.img} alt={`Photo from ${review.author}`} className="w-full h-full object-cover grayscale-[10%]" draggable={false} loading="lazy" />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary border-2 border-foreground flex items-center justify-center font-groovy font-bold text-white uppercase">
                    {review.author[0]}
                  </div>
                  <div>
                    <p className="font-groovy font-bold text-sm text-foreground leading-none">{review.author}</p>
                    <p className="font-body font-medium text-xs text-muted-foreground mt-1">{review.handle}</p>
                  </div>
                </div>
                <p className="font-body font-bold text-foreground text-sm sm:text-base leading-relaxed mt-2">
                  "{review.text}"
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <div className="absolute bottom-10 right-10 opacity-50 hidden lg:block">
        <FlowerShape size={100} className="text-white naso-flower-spin" />
      </div>
    </section>
  );
}
