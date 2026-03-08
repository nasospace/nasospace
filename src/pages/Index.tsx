import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { staggerContainer, fadeUp, easeOut } from "@/lib/motion";
import { ROUTES } from "@/config/routes";
import nasoLogo from "@/assets/naso-logo.png";

/**
 * Home page shell — Sprint 1.
 * Showcases the refined design system with reusable components.
 * Placeholder content only — no marketing copy yet.
 */
export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Section spacing="lg" className="overflow-hidden">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col items-center gap-6 text-center"
        >
          <motion.div variants={fadeUp}>
            <Badge variant="secondary" className="mb-2">Cairo, Egypt</Badge>
          </motion.div>

          <motion.img
            src={nasoLogo}
            alt="NASO"
            className="h-20 w-auto md:h-28"
            variants={fadeUp}
          />

          <motion.h1 variants={fadeUp} className="max-w-3xl">
            Creative experiences
            <br />
            <span className="text-primary">worth remembering.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="max-w-md text-lg text-muted-foreground"
          >
            Outings · Workshops · Events · Products
          </motion.p>

          <motion.div variants={fadeUp} className="flex gap-3 pt-2">
            <Button asChild size="lg" variant="brand">
              <Link to={ROUTES.EXPERIENCES}>
                Explore
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to={ROUTES.SHOP}>Shop</Link>
            </Button>
          </motion.div>
        </motion.div>
      </Section>

      {/* Design system showcase — placeholder cards */}
      <Section className="bg-muted/50">
        <SectionHeader
          title="What we do"
          description="A preview of the NASO design system components in action."
          align="center"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {[
            { title: "Experiences", desc: "Curated outings and cultural adventures.", href: ROUTES.EXPERIENCES },
            { title: "Workshops", desc: "Hands-on creative learning sessions.", href: ROUTES.WORKSHOPS },
            { title: "Shop", desc: "Original products and creative goods.", href: ROUTES.SHOP },
          ].map((item) => (
            <MotionDiv key={item.title}>
              <Link
                to={item.href}
                className="group block rounded-lg border bg-card p-6 shadow-soft transition-shadow hover:shadow-card"
              >
                <h3 className="text-xl">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 font-display text-sm font-medium text-primary transition-transform group-hover:translate-x-1">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </MotionDiv>
          ))}
        </motion.div>
      </Section>

      {/* Brand palette strip */}
      <Section spacing="default">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="font-display text-sm font-medium tracking-widest uppercase text-muted-foreground">
            Brand Palette
          </p>
          <div className="flex gap-3">
            {[
              { color: "bg-foreground", label: "Black" },
              { color: "bg-primary", label: "Blue" },
              { color: "bg-secondary", label: "Green" },
              { color: "bg-accent", label: "Purple" },
              { color: "bg-naso-lilac", label: "Lilac" },
            ].map((swatch) => (
              <div key={swatch.label} className="flex flex-col items-center gap-2">
                <div className={`h-10 w-10 rounded-full ${swatch.color} shadow-soft`} />
                <span className="text-xs text-muted-foreground">{swatch.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
