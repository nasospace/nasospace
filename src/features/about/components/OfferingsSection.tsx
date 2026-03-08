import { motion } from "framer-motion";
import { Section } from "@/components/shared";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { offerings } from "../data";

export function OfferingsSection() {
  return (
    <Section>
      <div className="mx-auto max-w-3xl text-center">
        <MotionDiv>
          <h2 className="font-groovy text-[clamp(1.5rem,4vw,2.5rem)] font-bold">
            What we create
          </h2>
          <p className="mt-3 text-muted-foreground">
            Four ways NASO turns your time into something you'll remember.
          </p>
        </MotionDiv>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {offerings.map((item) => (
          <motion.div
            key={item.title}
            variants={fadeUp}
            className="rounded-2xl border border-border bg-card p-6 text-center transition-shadow hover:shadow-card"
          >
            <span className="text-4xl">{item.emoji}</span>
            <h3 className="mt-4 font-display text-lg font-bold">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
