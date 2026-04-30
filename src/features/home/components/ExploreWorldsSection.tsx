import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { WavyDivider, StickerBadge } from "@/components/shared/RetroElements";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { worldCards as defaultCards } from "@/features/home/data";
import { usePageContent, getSection } from "@/hooks/usePageContent";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface WorldCard {
  title: string;
  emoji: string;
  desc: string;
  href: string;
  color?: "primary" | "secondary" | "accent" | "naso-lilac" | "naso-pink";
  bg?: string; // legacy support
  rotate?: number;
}

interface WorldsContent {
  heading?: string;
  heading_accent?: string;
  subtitle?: string;
  cards?: WorldCard[];
}

const colorToBg: Record<string, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
  "naso-lilac": "bg-naso-lilac",
  "naso-pink": "bg-naso-pink",
};

const DEFAULTS = {
  heading: "The NASO",
  heading_accent: "Ecosystem",
  subtitle: "Three ways to experience the movement. Pick your portal.",
};

/** Normalize a single card from CMS, falling back per-field. */
function normalizeCard(raw: Partial<WorldCard> | null | undefined, fallback: WorldCard): WorldCard {
  if (!raw || typeof raw !== "object") return fallback;
  return {
    title: (raw.title?.trim?.() || fallback.title) as string,
    emoji: (raw.emoji?.trim?.() || fallback.emoji) as string,
    desc: (raw.desc?.trim?.() || fallback.desc) as string,
    href: (raw.href?.trim?.() || fallback.href) as string,
    color: raw.color ?? fallback.color,
    bg: raw.bg ?? fallback.bg,
    rotate: typeof raw.rotate === "number" ? raw.rotate : fallback.rotate,
  };
}

export function ExploreWorldsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const { data: sections } = usePageContent("home");
  const cms = getSection<WorldsContent>(sections, "worlds");

  const fallbackCards = defaultCards as unknown as WorldCard[];

  // Trim/empty-safe text fallbacks
  const heading = cms?.heading?.trim() || DEFAULTS.heading;
  const headingAccent = cms?.heading_accent?.trim() || DEFAULTS.heading_accent;
  const subtitle = cms?.subtitle?.trim() || DEFAULTS.subtitle;

  // Cards logic
  const rawCards = Array.isArray(cms?.cards) ? cms!.cards! : [];
  const cards: WorldCard[] =
    rawCards.length === 0
      ? fallbackCards
      : rawCards.map((c, i) => normalizeCard(c, fallbackCards[i] ?? fallbackCards[0]));

  return (
    <>
      <WavyDivider className="text-naso-cream -mb-1" />
      <section ref={containerRef} className="relative bg-naso-cream py-24 md:py-32 text-foreground overflow-hidden">
        {/* Playful background elements */}
        <div className="absolute inset-0 naso-dotgrid opacity-20 pointer-events-none" />
        <div className="absolute inset-0 naso-noise opacity-30 mix-blend-overlay pointer-events-none" />
        
        {/* Parallax decorative shapes */}
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
          className="absolute top-20 -left-10 w-32 h-32 bg-secondary rounded-full blur-[80px] opacity-60 pointer-events-none"
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [100, -100]) }}
          className="absolute bottom-20 -right-10 w-40 h-40 bg-accent rounded-full blur-[90px] opacity-60 pointer-events-none"
        />

        <div className="container relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="mb-16 md:mb-20 text-center max-w-3xl mx-auto flex flex-col items-center">
              <StickerBadge variant="filled" className="bg-foreground text-white mb-6" rotate={-2}>
                How It Works
              </StickerBadge>
              <h2 className="font-groovy text-[clamp(2.5rem,7vw,4.5rem)] font-black leading-[0.95] tracking-tighter text-foreground">
                {heading} <span className="text-primary">{headingAccent}</span>
              </h2>
              <p className="mt-6 text-lg md:text-xl font-body text-foreground/70 font-medium">
                {subtitle}
              </p>
            </motion.div>

            <div className="grid gap-6 md:gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
              {cards.map((item, idx) => {
                const bg = item.bg ?? colorToBg[item.color ?? "primary"] ?? "bg-primary";
                
                // Determine a bright accent color based on index
                const accentColor = idx === 0 ? "bg-primary" : idx === 1 ? "bg-secondary" : "bg-accent";
                
                // Slight stagger for the cards' natural rotation
                const baseRotation = idx === 0 ? -2 : idx === 1 ? 1 : -1;
                const rotate = item.rotate ?? baseRotation;

                return (
                  <motion.div key={`${item.title}-${idx}`} variants={fadeUp} className="h-full">
                    <Link
                      to={item.href}
                      className="group relative flex flex-col h-full overflow-hidden rounded-[2rem] border-4 border-foreground bg-white transition-all duration-500 hover:-translate-y-4 hover:shadow-[12px_12px_0_hsl(var(--foreground))] active:translate-y-0 active:shadow-[2px_2px_0_hsl(var(--foreground))]"
                      style={{ transform: `rotate(${rotate}deg)` }}
                    >
                      {/* Top Accent Bar */}
                      <div className={cn("h-4 w-full border-b-4 border-foreground transition-all duration-300 group-hover:h-8", accentColor)} />
                      
                      <div className="flex-1 p-8 md:p-10 flex flex-col relative bg-white">
                        {/* Huge background emoji */}
                        <div className="absolute -right-4 -top-8 text-[120px] opacity-[0.03] transform group-hover:scale-125 transition-transform duration-700 font-sans pointer-events-none select-none">
                          {item.emoji}
                        </div>
                        
                        <div className={cn("w-16 h-16 rounded-full border-4 border-foreground flex items-center justify-center text-3xl mb-8 shadow-[4px_4px_0_hsl(var(--foreground))] group-hover:-rotate-12 transition-transform duration-300", accentColor)}>
                          {item.emoji}
                        </div>
                        
                        <h3 className="font-groovy text-3xl md:text-4xl font-black text-foreground mb-4 leading-none">
                          {item.title}
                        </h3>
                        
                        <p className="text-base md:text-lg text-foreground/70 font-medium leading-relaxed mb-10 flex-1">
                          {item.desc}
                        </p>
                        
                        <div className="mt-auto">
                          <div className="inline-flex items-center gap-2 font-groovy text-sm font-black uppercase tracking-[0.15em] text-foreground transition-all group-hover:gap-4">
                            Explore Portal 
                            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center border-2 border-foreground group-hover:scale-110 transition-transform", accentColor)}>
                              <ArrowUpRight className="h-4 w-4 text-foreground" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
