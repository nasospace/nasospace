import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { WavyDivider } from "@/components/shared/RetroElements";
import { staggerContainer, fadeUp, rotateIn } from "@/lib/motion";
import { worldCards as defaultCards } from "@/features/home/data";
import { usePageContent, getSection } from "@/hooks/usePageContent";

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

export function ExploreWorldsSection() {
  const { data: sections } = usePageContent("home");
  const cms = getSection<WorldsContent>(sections, "worlds");

  const heading = cms?.heading ?? "The worlds of";
  const headingAccent = cms?.heading_accent ?? "NASO";
  const subtitle = cms?.subtitle ?? "Every way in leads somewhere unforgettable.";
  const cards: WorldCard[] =
    cms?.cards && cms.cards.length > 0 ? cms.cards : (defaultCards as unknown as WorldCard[]);

  return (
    <>
      <WavyDivider className="text-foreground -mb-1" />
      <section className="relative bg-foreground py-section-lg text-background">
        <div className="absolute inset-0 naso-dotgrid opacity-10" />
        <div className="absolute inset-0 naso-noise opacity-50" />
        <div className="container relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="mb-12 text-center">
              <h2 className="font-groovy text-[clamp(1.8rem,5vw,3.5rem)] font-black leading-[1.05] text-background">
                {heading} <span className="text-secondary">{headingAccent}</span>
              </h2>
              <p className="mt-4 text-sm text-background/50 lg:text-base">{subtitle}</p>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((item, idx) => {
                const bg = item.bg ?? colorToBg[item.color ?? "primary"] ?? "bg-primary";
                const rotate = item.rotate ?? 0;
                return (
                  <motion.div key={`${item.title}-${idx}`} variants={rotateIn}>
                    <Link
                      to={item.href}
                      className="group relative block overflow-hidden rounded-2xl border-[2.5px] border-background/20 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-background/40 hover:bg-background/[0.04]"
                      style={{ transform: `rotate(${rotate}deg)` }}
                    >
                      <div className={`absolute left-0 top-0 h-2 w-full ${bg}`} />
                      <span className="text-3xl">{item.emoji}</span>
                      <h3 className="mt-4 font-groovy text-xl font-bold text-background">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-background/50">
                        {item.desc}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1.5 font-groovy text-[10px] font-bold uppercase tracking-[0.15em] text-secondary transition-transform duration-200 group-hover:translate-x-1">
                        Discover <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>
      <WavyDivider className="text-foreground -mt-1" flip />
    </>
  );
}
