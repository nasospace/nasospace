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
              Our vibe
            </StickerBadge>
          </MotionDiv>
          <MotionDiv>
            <h2 className="mt-6 font-groovy text-[clamp(1.5rem,4vw,2.5rem)] font-bold">
              Why NASO feels different
            </h2>
          </MotionDiv>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="mx-auto mt-12 grid max-w-3xl gap-8 md:grid-cols-2"
        >
          {data.map((v) => (
            <motion.div
              key={v.title}
              variants={fadeUp}
              whileHover={{ x: 6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex gap-4 rounded-xl p-3 transition-colors hover:bg-muted/50"
            >
              <motion.div
                whileHover={{ rotate: 90, scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <Sparkle className="mt-1 h-5 w-5 shrink-0 text-primary" />
              </motion.div>
              <div>
                <h4 className="font-display text-base font-bold">{v.title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {v.body}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
