import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { ROUTES } from "@/config/routes";
import { HeroSection } from "@/features/home/components";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* ═══════════════ WHAT WE DO ═══════════════ */}
      <Section>
        <SectionHeader
          title="What we do"
          description="Curated creative moments that bring people together."
          align="center"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
          }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {[
            {
              title: "Experiences",
              desc: "Curated outings and cultural adventures across Cairo.",
              href: ROUTES.EXPERIENCES,
              accent: "bg-secondary",
            },
            {
              title: "Workshops",
              desc: "Hands-on creative learning sessions led by local artists.",
              href: ROUTES.WORKSHOPS,
              accent: "bg-accent",
            },
            {
              title: "Shop",
              desc: "Original products and creative goods you won't find elsewhere.",
              href: ROUTES.SHOP,
              accent: "bg-primary",
            },
          ].map((item) => (
            <MotionDiv key={item.title}>
              <Link
                to={item.href}
                className="group relative block overflow-hidden rounded-2xl border bg-card p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
              >
                <div className={`mb-5 h-3 w-3 rounded-full ${item.accent}`} />
                <h3 className="text-xl">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-foreground transition-transform duration-200 group-hover:translate-x-1">
                  Discover <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </MotionDiv>
          ))}
        </motion.div>
      </Section>
    </>
  );
}
