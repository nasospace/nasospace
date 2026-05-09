import { motion } from "framer-motion";
import { Section } from "@/components/shared";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { StickerBadge, Sparkle } from "@/components/shared/RetroElements";
import { staggerContainer, fadeUp, popIn } from "@/lib/motion";
import { values as defaultValues } from "../data";

interface ValuesSectionProps {
  items?: Array<{ title: string; body: string }>;
}

export function ValuesSection({ items }: ValuesSectionProps) {
  const data = items ?? defaultValues;
  return (
    <Section className="relative overflow-hidden bg-card">
      <div className="absolute inset-0 naso-checkerboard opacity-30" />
      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <MotionDiv variants={popIn} className="flex justify-center">
            <StickerBadge variant="outline" rotate={3}>
              The Code
            </StickerBadge>
          </MotionDiv>
          <MotionDiv>
            <h2 className="mt-6 font-groovy text-[clamp(1.5rem,4vw,2.5rem)] font-bold">
              How we operate
            </h2>
          </MotionDiv>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-2"
        >
          {data.map((v, idx) => (
            <motion.div
              key={v.title}
              variants={fadeUp}
              className="group flex flex-col gap-4 rounded-3xl border-4 border-foreground bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:bg-naso-lilac hover:shadow-[12px_12px_0_hsl(var(--foreground))] shadow-[6px_6px_0_hsl(var(--foreground))]"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-foreground bg-muted group-hover:bg-primary shadow-[4px_4px_0_hsl(var(--foreground))] transition-colors duration-300"
                >
                  <span className="font-groovy text-xl font-bold">0{idx + 1}</span>
                </motion.div>
                <h4 className="font-groovy text-xl md:text-2xl font-black uppercase leading-tight tracking-tight text-foreground">{v.title}</h4>
              </div>
              <p className="mt-2 text-sm md:text-base font-medium leading-relaxed text-foreground/80 pl-4 border-l-4 border-border group-hover:border-primary transition-colors duration-300">
                {v.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
