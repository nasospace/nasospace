import { motion } from "framer-motion";
import { Section } from "@/components/shared";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { offerings as defaultOfferings } from "../data";

const cardHover = {
  rest: { y: 0, boxShadow: "var(--shadow-soft)" },
  hover: { y: -6, boxShadow: "var(--shadow-elevated)" },
};

interface OfferingsSectionProps {
  items?: Array<{ emoji: string; title: string; description: string }>;
}

export function OfferingsSection({ items }: OfferingsSectionProps) {
  const data = items ?? defaultOfferings;
  return (
    <Section className="bg-card">
      <div className="mx-auto max-w-3xl text-center">
        <MotionDiv>
          <h2 className="font-groovy text-[clamp(1.5rem,4vw,2.5rem)] font-bold">
            What we create
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">
            The four pillars of the NASO experience. Choose your reality.
          </p>
        </MotionDiv>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {data.map((item) => (
          <motion.div
            key={item.title}
            variants={fadeUp}
            className="group relative overflow-hidden rounded-3xl border-4 border-foreground bg-white p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:bg-naso-lemon hover:shadow-[12px_12px_0_hsl(var(--foreground))] shadow-[6px_6px_0_hsl(var(--foreground))]"
          >
            <div className="relative z-10">
              <motion.span
                className="inline-block text-5xl md:text-6xl drop-shadow-md"
                whileHover={{ scale: 1.25, rotate: 12 }}
                transition={{ type: "spring", stiffness: 400, damping: 12 }}
              >
                {item.emoji}
              </motion.span>
              <h3 className="mt-6 font-groovy text-xl md:text-2xl font-black uppercase tracking-tight text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm md:text-base font-medium leading-relaxed text-foreground/80">
                {item.description}
              </p>
            </div>
            {/* Background decorative texture on hover */}
            <div className="absolute inset-0 bg-naso-noise opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none" />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
