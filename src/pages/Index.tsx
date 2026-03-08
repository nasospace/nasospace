import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { Button } from "@/components/ui/button";
import { staggerContainer, fadeUp, scaleIn, easeOut } from "@/lib/motion";
import { ROUTES } from "@/config/routes";
import nasoLogo from "@/assets/naso-logo.png";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Section spacing="lg" className="relative overflow-hidden naso-grid-bg">
        {/* Decorative shapes — composed, restrained */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.35, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="naso-blob absolute -right-10 -top-10 h-52 w-52 bg-secondary md:h-72 md:w-72"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.25, scale: 1 }}
            transition={{ duration: 1.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="naso-blob absolute -bottom-16 -left-12 h-56 w-56 bg-accent md:h-80 md:w-80"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.18 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="absolute right-[18%] top-[28%] h-28 w-28 rounded-full bg-naso-lilac md:h-40 md:w-40"
          />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative flex flex-col items-center gap-6 text-center md:gap-7"
        >
          {/* Sticker badge */}
          <motion.div variants={fadeUp}>
            <span className="naso-sticker border-foreground/15 bg-background/80 text-foreground backdrop-blur-sm">
              Cairo, Egypt ✦
            </span>
          </motion.div>

          {/* Logo — integrated with subtle glow */}
          <motion.div variants={scaleIn} className="relative">
            <div className="absolute inset-0 scale-150 rounded-full bg-secondary/10 blur-2xl" />
            <img
              src={nasoLogo}
              alt="NASO"
              className="relative h-14 w-auto md:h-20 lg:h-24"
            />
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={fadeUp} className="max-w-3xl leading-[1.08] mt-1">
            Creative experiences
            <br />
            <span className="relative inline-block">
              <span className="relative z-10">worth remembering</span>
              <span className="absolute bottom-1 left-0 right-0 z-0 h-[0.18em] -skew-x-2 rounded-full bg-secondary/50" />
            </span>
            <span className="text-primary">.</span>
          </motion.h1>

          {/* Subline */}
          <motion.p
            variants={fadeUp}
            className="max-w-md font-display text-base font-medium tracking-wide text-muted-foreground md:text-lg"
          >
            Outings · Workshops · Events · Products
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4 pt-3">
            <Button asChild size="lg" variant="brand">
              <Link to={ROUTES.EXPERIENCES}>
                Explore experiences
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to={ROUTES.SHOP}>Visit shop</Link>
            </Button>
          </motion.div>
        </motion.div>
      </Section>

      {/* What we do — showcase cards */}
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
          variants={staggerContainer}
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
                {/* Color accent dot */}
                <div
                  className={cn(
                    "mb-5 h-3 w-3 rounded-full",
                    item.accent
                  )}
                />
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

      {/* Brand palette strip */}
      <Section spacing="default">
        <MotionDiv className="flex flex-col items-center gap-6 text-center">
          <p className="font-display text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
            Brand Palette
          </p>
          <div className="flex gap-4">
            {[
              { color: "bg-foreground", label: "Black" },
              { color: "bg-primary", label: "Blue" },
              { color: "bg-secondary", label: "Green" },
              { color: "bg-accent", label: "Purple" },
              { color: "bg-naso-lilac", label: "Lilac" },
            ].map((swatch) => (
              <div key={swatch.label} className="flex flex-col items-center gap-2.5">
                <div
                  className={`h-12 w-12 rounded-full ${swatch.color} shadow-card ring-2 ring-background ring-offset-2 ring-offset-background transition-transform duration-200 hover:scale-110`}
                />
                <span className="font-display text-[10px] font-medium tracking-wider uppercase text-muted-foreground">
                  {swatch.label}
                </span>
              </div>
            ))}
          </div>
        </MotionDiv>
      </Section>
    </>
  );
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}
