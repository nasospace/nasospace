import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ROUTES } from "@/config/routes";
import { ArrowRight } from "lucide-react";
import { StickerBadge } from "@/components/shared/RetroElements";
import { trackNaso } from "@/lib/analytics";

export function ExperienceCounter() {
  const [count, setCount] = useState(0);
  const [animatedCount, setAnimatedCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    const fetchCount = async () => {
      const { count: fetchedCount, error } = await supabase
        .from("cms_experiences")
        .select("*", { count: "exact", head: true })
        .eq("published", true);

      if (!error && fetchedCount !== null) {
        setCount(fetchedCount);
      } else {
        // Fallback for visual demonstration
        setCount(12);
      }
    };

    fetchCount();
  }, []);

  useEffect(() => {
    if (inView) {
      const duration = 2000;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        setAnimatedCount(Math.floor(easeOutExpo * count));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [inView, count]);

  const targetCount = 100;
  const progressPercent = Math.min((count / targetCount) * 100, 100);

  return (
    <section className="py-section-lg bg-card relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 naso-dotgrid opacity-20" />
      <div className="container relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Left: Narrative */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex-1 text-center lg:text-left"
        >
          <StickerBadge variant="filled" className="bg-secondary text-foreground mb-6" rotate={3}>
            The 100 Chapters
          </StickerBadge>
          <h2 className="font-groovy text-[clamp(2.5rem,7vw,4.5rem)] font-black leading-[0.9] tracking-tighter text-foreground">
            Chapter {count} of <span className="text-primary">100.</span>
          </h2>
          <p className="mt-8 text-lg font-medium text-muted-foreground leading-relaxed">
            We aren't just hosting events. We're building a narrative of 100 unique creative shifts in Cairo. Each one is a statement. Each one is a memory.
          </p>
          <div className="mt-8 flex justify-center lg:justify-start">
            <Link
              to={ROUTES.CONTACT}
              className="group flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-full border-4 border-foreground bg-white px-8 font-groovy text-sm font-black uppercase tracking-widest text-foreground shadow-retro transition-transform hover:-translate-y-1 hover:shadow-retro-lg active:translate-y-0 active:shadow-none"
              onClick={() => trackNaso("counter_cta_click")}
            >
              Shape the movement
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

        {/* Right: Counter & Progress */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
          animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
          className="flex-1 w-full max-w-md lg:max-w-none"
        >
          <div className={cn(
            "flex flex-col items-center justify-center rounded-3xl border-4 border-foreground px-8 py-12 text-center",
            "bg-white shadow-retro-lg relative overflow-hidden"
          )}>
            <div className="absolute top-0 left-0 w-full h-3 bg-muted">
              <motion.div 
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={inView ? { width: `${progressPercent}%` } : {}}
                transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
              />
            </div>
            
            <div className="flex items-baseline gap-2">
              <span className="font-display text-[clamp(5rem,12vw,10rem)] font-black leading-none tracking-tighter text-foreground">
                {animatedCount}
              </span>
              <span className="font-display text-4xl font-bold text-muted-foreground/50">/100</span>
            </div>
            
            <span className="mt-4 font-groovy text-xl font-bold uppercase tracking-widest text-secondary">
              Moments Unlocked
            </span>
            
            <div className="mt-8 w-full max-w-xs p-4 rounded-2xl bg-muted border-2 border-border border-dashed">
              <p className="font-groovy text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Status</p>
              <p className="font-body text-sm font-semibold text-foreground">We are just getting started. The best is yet to come.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
