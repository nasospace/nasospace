import { motion } from "framer-motion";
import { StickerBadge, FlowerShape } from "@/components/shared/RetroElements";
import { fadeUp, staggerContainer } from "@/lib/motion";
import {
  Search,
  Ticket,
  Users,
  Sparkles,
  Heart,
  Star,
  Compass,
  Camera,
  Music,
  type LucideIcon,
} from "lucide-react";
import { usePageContent, getSection } from "@/hooks/usePageContent";
import { cn } from "@/lib/utils";

interface Step {
  icon?: string;
  title: string;
  description: string;
  color?: string;
}

interface HowItWorksContent {
  eyebrow?: string;
  heading?: string;
  steps?: Step[];
}

const ICONS: Record<string, LucideIcon> = {
  search: Search,
  ticket: Ticket,
  users: Users,
  sparkles: Sparkles,
  heart: Heart,
  star: Star,
  compass: Compass,
  camera: Camera,
  music: Music,
};

const COLORS: Record<string, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
  lilac: "bg-naso-lilac",
  pink: "bg-naso-pink",
  lemon: "bg-naso-lemon",
};

const DEFAULT_STEPS: Step[] = [
  { icon: "compass", title: "Discover", description: "Browse the 100 Chapters. Each one is a sealed mystery until we unlock it.", color: "primary" },
  { icon: "ticket", title: "Commit", description: "Grab your spot before it vanishes. Most chapters sell out in minutes.", color: "lilac" },
  { icon: "users", title: "Experience", description: "Show up. Get messy. Make friends. Leave with a memory that sticks.", color: "secondary" },
];

const DEFAULTS = {
  eyebrow: "How it works",
  heading: "Three steps. Zero boring weekends.",
};

/** Normalize one step against an indexed default; never returns broken fields. */
function normalizeStep(raw: Partial<Step> | null | undefined, fallback: Step): Step {
  if (!raw || typeof raw !== "object") return fallback;
  return {
    icon: (raw.icon && ICONS[raw.icon] ? raw.icon : fallback.icon) as string,
    title: raw.title?.trim() || fallback.title,
    description: raw.description?.trim() || fallback.description,
    color: (raw.color && COLORS[raw.color] ? raw.color : fallback.color) as string,
  };
}

export function HowItWorksSection() {
  const { data: sections } = usePageContent("home");
  const cms = getSection<HowItWorksContent>(sections, "how_it_works");

  const eyebrow = cms?.eyebrow?.trim() || DEFAULTS.eyebrow;
  const heading = cms?.heading?.trim() || DEFAULTS.heading;

  const rawSteps = Array.isArray(cms?.steps) ? cms!.steps! : [];
  const steps: Step[] =
    rawSteps.length === 0
      ? DEFAULT_STEPS
      : rawSteps.map((s, i) => normalizeStep(s, DEFAULT_STEPS[i] ?? DEFAULT_STEPS[0]));

  return (
    <section className="relative overflow-hidden bg-naso-cream py-32">
      {/* Background textures */}
      <div className="absolute inset-0 naso-dotgrid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 naso-noise opacity-30 mix-blend-overlay pointer-events-none" />

      <div className="container relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="mb-20 text-center flex flex-col items-center">
            <StickerBadge variant="filled" className="bg-foreground text-white mb-8" rotate={-3}>
              {eyebrow}
            </StickerBadge>
            <h2 className="font-groovy text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-[0.9] tracking-tighter text-foreground">
              {heading}
            </h2>
          </motion.div>

          {/* Steps Grid */}
          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto relative">
            
            {/* Connecting Line (desktop) */}
            <div className="hidden md:block absolute top-[72px] left-[15%] right-[15%] h-1 bg-foreground/10 z-0 rounded-full" />

            {steps.map((step, i) => {
              const Icon = ICONS[step.icon ?? "search"] ?? Search;
              const colorClass = COLORS[step.color ?? "primary"] ?? "bg-primary";
              const rotation = i === 0 ? -2 : i === 1 ? 1 : -1;

              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="relative z-10 flex flex-col items-center group"
                >
                  {/* Giant Step Number */}
                  <div className="relative mb-8">
                    <div className="font-groovy text-[120px] md:text-[160px] font-black leading-none text-foreground/[0.04] select-none pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2">
                      {i + 1}
                    </div>
                    <div
                      className={cn(
                        "relative flex h-28 w-28 md:h-36 md:w-36 items-center justify-center rounded-[2rem] border-4 border-foreground shadow-[8px_8px_0_hsl(var(--foreground))] transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-[12px_12px_0_hsl(var(--foreground))] group-hover:rotate-6",
                        colorClass
                      )}
                      style={{ transform: `rotate(${rotation}deg)` }}
                    >
                      <Icon className="h-12 w-12 md:h-16 md:w-16 text-foreground transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    
                    {/* Step Number Badge */}
                    <div className="absolute -top-3 -right-3 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border-4 border-foreground shadow-[3px_3px_0_hsl(var(--foreground))] flex items-center justify-center font-groovy font-black text-lg md:text-xl text-foreground z-20">
                      {i + 1}
                    </div>
                  </div>
                  
                  {/* Text Content */}
                  <h3 className="font-groovy text-2xl md:text-3xl font-black text-foreground mb-3 text-center">
                    {step.title}
                  </h3>
                  <p className="max-w-[280px] text-base md:text-lg text-foreground/70 font-medium leading-relaxed text-center">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <FlowerShape size={100} className="absolute -bottom-8 -left-8 text-primary/20 naso-flower-spin pointer-events-none" />
    </section>
  );
}
