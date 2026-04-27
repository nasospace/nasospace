import { motion } from "framer-motion";
import { StickerBadge } from "@/components/shared/RetroElements";
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
  { icon: "search", title: "The Discovery", description: "Explore curated chapters of Cairo designed around your energy.", color: "primary" },
  { icon: "ticket", title: "The Commitment", description: "Commit to the moment. We handle the logistics; you focus on the presence.", color: "lilac" },
  { icon: "users", title: "The Memory", description: "Step into the space. Leave with something real—and someone new.", color: "secondary" },
];

export function HowItWorksSection() {
  const { data: sections } = usePageContent("home");
  const cms = getSection<HowItWorksContent>(sections, "how_it_works");

  const eyebrow = cms?.eyebrow ?? "How it works";
  const heading = cms?.heading ?? "Effortless from click to Cairo.";
  const steps: Step[] = cms?.steps && cms.steps.length > 0 ? cms.steps : DEFAULT_STEPS;

  return (
    <section className="relative overflow-hidden bg-foreground py-section-lg text-background">
      <div className="absolute inset-0 naso-grid-bg opacity-10" />

      <div className="container relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="text-center"
        >
          <motion.div variants={fadeUp} className="mb-16">
            <StickerBadge variant="filled" className="bg-white text-foreground" rotate={2}>
              {eyebrow}
            </StickerBadge>
            <h2 className="mt-6 font-groovy text-[clamp(2rem,5vw,3.5rem)] font-black leading-tight text-white">
              {heading}
            </h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3 relative">
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-[3px] bg-white/20 z-0" />

            {steps.map((step, i) => {
              const Icon = ICONS[step.icon ?? "search"] ?? Search;
              const colorClass = COLORS[step.color ?? "primary"] ?? "bg-primary";
              return (
                <motion.div key={i} variants={fadeUp} className="relative z-10 flex flex-col items-center">
                  <div className={`flex h-24 w-24 items-center justify-center rounded-full border-4 border-foreground shadow-[6px_6px_0px_#000] ${colorClass} mb-6 transition-transform hover:scale-110`}>
                    <Icon className="h-10 w-10 text-foreground" />
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-foreground font-groovy font-black text-sm mb-4">
                    {i + 1}
                  </div>
                  <h3 className="font-groovy text-xl font-bold text-white">{step.title}</h3>
                  <p className="mt-2 max-w-[250px] text-sm text-white/70 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
