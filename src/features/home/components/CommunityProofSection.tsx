import { motion } from "framer-motion";
import { StickerBadge, FlowerShape } from "@/components/shared/RetroElements";
import { cn } from "@/lib/utils";
import { REVIEWS_ROW_1, REVIEWS_ROW_2 } from "@/config/homeData";

function PolaroidCard({ review }: { review: any }) {
  return (
    <div
      className={cn(
        "min-w-[300px] w-[300px] sm:min-w-[350px] sm:w-[350px] shrink-0 bg-white p-4 sm:p-5 rounded-sm border-4 border-foreground shadow-[8px_8px_0_hsl(var(--primary))] transition-transform hover:scale-105 hover:z-50 mx-4",
      )}
      style={{ rotate: review.rotate }}
    >
      <div className="aspect-[4/5] w-full overflow-hidden border-2 border-foreground mb-6 bg-muted">
        <img 
          src={review.img} 
          alt={`Portrait of ${review.author} enjoying a NASO experience`} 
          className="w-full h-full object-cover filter contrast-[1.1] saturate-[1.2] transition-transform duration-500 group-hover:scale-105" 
          draggable={false} 
          loading="lazy" 
        />
      </div>
      <div className="flex flex-col gap-4">
        <p className="font-groovy font-black text-foreground text-base sm:text-lg leading-tight min-h-[60px]">
          "{review.text}"
        </p>
        <div className="flex items-center gap-3 pt-4 border-t-2 border-foreground/10">
          <div className="w-10 h-10 rounded-full bg-secondary border-2 border-foreground flex items-center justify-center font-groovy font-black text-foreground uppercase">
            {review.author[0]}
          </div>
          <div className="flex flex-col">
            <span className="font-groovy font-bold text-sm text-foreground leading-none">{review.author}</span>
            <span className="font-mono text-[10px] uppercase font-bold text-foreground/50 mt-1">{review.handle}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CommunityProofSection() {
  return (
    <section className="relative overflow-hidden bg-foreground py-32" aria-label="Community Testimonials">
      {/* Soft textured background for dark mode */}
      <div className="absolute inset-0 naso-checkerboard opacity-[0.03] mix-blend-screen" />
      <div className="absolute inset-0 naso-noise opacity-20 mix-blend-overlay" />

      <div className="container relative z-20 mb-20 text-center">
        <div className="flex flex-col items-center">
          <StickerBadge variant="filled" className="bg-primary text-foreground mb-8 px-6 py-2 shadow-[4px_4px_0_hsl(var(--background))]" rotate={-3}>
            The Cult
          </StickerBadge>
          <h2 className="font-groovy text-[clamp(3rem,8vw,6rem)] font-black leading-[0.85] tracking-tighter text-background uppercase">
            Don't Take <br />
            Our <span className="text-primary drop-shadow-[0_0_15px_hsl(var(--primary)/0.5)]">Word</span> For It.
          </h2>
        </div>
      </div>

      <div className="relative z-10 w-full overflow-hidden flex flex-col gap-16 py-10 group">
        
        {/* Row 1: Scrolling Left Continuously */}
        <div className="relative w-full flex overflow-hidden -mx-4">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 40, repeat: Infinity }}
            className="flex whitespace-nowrap"
          >
            <div className="flex gap-4 px-4 items-center">
              {[...REVIEWS_ROW_1, ...REVIEWS_ROW_1, ...REVIEWS_ROW_1].map((review, i) => (
                <PolaroidCard key={`r1-${i}`} review={review} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Row 2: Scrolling Right Continuously */}
        <div className="relative w-full flex overflow-hidden -mx-4">
          <motion.div 
            animate={{ x: ["-50%", "0%"] }}
            transition={{ ease: "linear", duration: 45, repeat: Infinity }}
            className="flex whitespace-nowrap"
          >
            <div className="flex gap-4 px-4 items-center">
              {[...REVIEWS_ROW_2, ...REVIEWS_ROW_2, ...REVIEWS_ROW_2].map((review, i) => (
                <PolaroidCard key={`r2-${i}`} review={review} />
              ))}
            </div>
          </motion.div>
        </div>

      </div>
      
      <div className="absolute top-20 right-10 opacity-20 hidden lg:block z-20 pointer-events-none">
        <FlowerShape size={120} className="text-primary naso-flower-spin" />
      </div>
    </section>
  );
}
