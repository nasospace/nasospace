import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Section } from "@/components/shared/Section";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { ROUTES } from "@/config/routes";
import { HeroSection } from "@/features/home/components";
import {
  FlowerShape,
  StickerBadge,
  Sparkle,
  WavyDivider,
  MagneticButton,
  MarqueeTicker,
} from "@/components/shared/RetroElements";
import {
  staggerContainer,
  staggerSlow,
  fadeUp,
  popIn,
  rotateIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

/* ═══════════════════════════════════════════════
   NASO HOMEPAGE — Retro-Groovy Poster World
   ═══════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      {/* ═══ 1. HERO ═══ */}
      <HeroSection />

      {/* ═══ 2. WHAT NASO IS ═══ */}
      <section className="relative overflow-hidden bg-card py-section-lg">
        <div className="absolute inset-0 naso-checkerboard opacity-40" />
        <div className="container relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerSlow}
            className="mx-auto max-w-3xl text-center"
          >
            <MotionDiv variants={popIn}>
              <StickerBadge variant="filled" className="bg-secondary" rotate={-2}>
                Who we are
              </StickerBadge>
            </MotionDiv>

            <motion.h2
              variants={fadeUp}
              className="mt-8 font-groovy text-[clamp(1.8rem,5vw,3.5rem)] font-black leading-[1.05] tracking-[-0.02em] text-foreground"
            >
              Not just an outing.
              <br />
              <span className="text-primary">A whole vibe.</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-base leading-relaxed text-muted-foreground lg:text-lg"
            >
              NASO is a Cairo-based creative world — curating experiences,
              workshops, events, and original products for people who want their
              free time to mean something.
            </motion.p>

            {/* Decorative flower + dots row */}
            <motion.div
              variants={fadeUp}
              className="mt-8 flex items-center justify-center gap-4"
            >
              <span className="h-3 w-3 rounded-full bg-primary" />
              <FlowerShape size={28} className="text-naso-purple" />
              <span className="h-3 w-3 rounded-full bg-secondary" />
              <FlowerShape size={28} className="text-naso-pink" />
              <span className="h-3 w-3 rounded-full bg-naso-lilac" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ 3. EXPLORE THE WORLDS ═══ */}
      <WavyDivider className="text-foreground -mb-1" />
      <section className="relative bg-foreground py-section-lg text-background">
        <div className="absolute inset-0 naso-dotgrid opacity-10" />
        <div className="container relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="mb-12 text-center">
              <h2 className="font-groovy text-[clamp(1.8rem,5vw,3.5rem)] font-black leading-[1.05] text-background">
                The worlds of{" "}
                <span className="text-secondary">NASO</span>
              </h2>
              <p className="mt-4 text-sm text-background/50 lg:text-base">
                Three ways to make your time unforgettable.
              </p>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Experiences",
                  emoji: "✦",
                  desc: "Curated outings and cultural adventures across Cairo. Group hangouts, date nights, solo explorations.",
                  href: ROUTES.EXPERIENCES,
                  bg: "bg-primary",
                  rotate: -2,
                },
                {
                  title: "Workshops",
                  emoji: "✿",
                  desc: "Hands-on creative sessions led by local artists. Pottery, painting, music, cooking, and more.",
                  href: ROUTES.WORKSHOPS,
                  bg: "bg-secondary",
                  rotate: 1,
                },
                {
                  title: "Shop",
                  emoji: "★",
                  desc: "Original products, creative goods, and limited drops you won't find anywhere else.",
                  href: ROUTES.SHOP,
                  bg: "bg-accent",
                  rotate: -1,
                },
              ].map((item) => (
                <motion.div key={item.title} variants={rotateIn}>
                  <Link
                    to={item.href}
                    className="group relative block overflow-hidden rounded-2xl border-[2.5px] border-background/20 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-background/40"
                    style={{ transform: `rotate(${item.rotate}deg)` }}
                  >
                    {/* Color strip top */}
                    <div className={`absolute left-0 top-0 h-2 w-full ${item.bg}`} />

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
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      <WavyDivider className="text-foreground -mt-1" flip />

      {/* ═══ 4. FEATURED EXPERIENCES ═══ */}
      <section className="relative overflow-hidden py-section-lg">
        <div className="absolute inset-0 bg-naso-cream naso-dotgrid opacity-50" />
        <div className="container relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="mb-10 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <StickerBadge variant="filled" className="bg-naso-lilac" rotate={-3}>
                  Featured
                </StickerBadge>
                <h2 className="mt-5 font-groovy text-[clamp(1.6rem,4.5vw,3rem)] font-black leading-[1.05] text-foreground">
                  Upcoming moments
                </h2>
              </div>
              <Link
                to={ROUTES.EXPERIENCES}
                className="font-groovy text-xs font-bold uppercase tracking-[0.12em] text-primary transition-colors hover:text-foreground"
              >
                View all →
              </Link>
            </motion.div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Sunset at the Citadel",
                  tag: "Outing",
                  color: "bg-secondary",
                  date: "Mar 22",
                },
                {
                  title: "Pottery & Chill",
                  tag: "Workshop",
                  color: "bg-naso-purple",
                  date: "Mar 28",
                },
                {
                  title: "Cairo Jazz Night",
                  tag: "Experience",
                  color: "bg-primary",
                  date: "Apr 5",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  whileHover={{ y: -6, rotate: i % 2 === 0 ? 1 : -1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group cursor-pointer overflow-hidden rounded-2xl border-[2.5px] border-foreground bg-card shadow-retro transition-shadow hover:shadow-retro-lg"
                >
                  {/* Image placeholder */}
                  <div className={`relative h-44 ${item.color}`}>
                    <div className="absolute inset-0 naso-halftone" />
                    {/* Tag sticker */}
                    <div className="absolute right-3 top-3">
                      <StickerBadge rotate={3} className="bg-card text-foreground">
                        {item.tag}
                      </StickerBadge>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="font-groovy text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      {item.date}
                    </p>
                    <h3 className="mt-1.5 font-groovy text-lg font-bold text-foreground">
                      {item.title}
                    </h3>
                    <span className="mt-3 inline-flex items-center gap-1 font-groovy text-[10px] font-bold uppercase tracking-[0.12em] text-primary transition-transform duration-200 group-hover:translate-x-1">
                      Details <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ 5. WORKSHOPS + PRODUCTS PREVIEW ═══ */}
      <section className="relative overflow-hidden border-y-[2.5px] border-foreground bg-secondary/15 py-section-lg">
        <div className="absolute inset-0 naso-checkerboard opacity-30" />

        {/* Decorative flowers */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 0.15, scale: 1 }}
          viewport={{ once: true }}
          className="absolute -left-12 top-20"
        >
          <FlowerShape size={120} className="text-naso-purple naso-flower-spin" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 0.1, scale: 1 }}
          viewport={{ once: true }}
          className="absolute -right-8 bottom-16"
        >
          <FlowerShape size={80} className="text-primary naso-flower-spin" />
        </motion.div>

        <div className="container relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="mb-10 text-center">
              <h2 className="font-groovy text-[clamp(1.6rem,4.5vw,3rem)] font-black leading-[1.05] text-foreground">
                More to explore
              </h2>
              <p className="mt-3 text-sm text-muted-foreground lg:text-base">
                Creative sessions and original products, all designed by NASO.
              </p>
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Workshops card */}
              <motion.div variants={slideInLeft}>
                <Link
                  to={ROUTES.WORKSHOPS}
                  className="group relative block overflow-hidden rounded-2xl border-[2.5px] border-foreground bg-card p-8 shadow-retro transition-all hover:shadow-retro-lg lg:p-10"
                >
                  <StickerBadge variant="filled" className="bg-naso-lilac" rotate={-4}>
                    Workshops
                  </StickerBadge>
                  <h3 className="mt-5 font-groovy text-2xl font-bold text-foreground lg:text-3xl">
                    Learn something
                    <br />
                    <span className="text-accent">you'll love.</span>
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                    Pottery, painting, cooking, music — hands-on creative sessions
                    led by Cairo's best artists and makers.
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 font-groovy text-[10px] font-bold uppercase tracking-[0.12em] text-primary transition-transform duration-200 group-hover:translate-x-1">
                    Browse workshops <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                  {/* Mini flower decoration */}
                  <div className="absolute -bottom-4 -right-4 opacity-10">
                    <FlowerShape size={80} className="text-accent" />
                  </div>
                </Link>
              </motion.div>

              {/* Shop card */}
              <motion.div variants={slideInRight}>
                <Link
                  to={ROUTES.SHOP}
                  className="group relative block overflow-hidden rounded-2xl border-[2.5px] border-foreground bg-foreground p-8 text-background shadow-retro transition-all hover:shadow-retro-lg lg:p-10"
                >
                  <StickerBadge variant="filled" className="border-background/30 bg-primary text-primary-foreground" rotate={3}>
                    Shop
                  </StickerBadge>
                  <h3 className="mt-5 font-groovy text-2xl font-bold text-background lg:text-3xl">
                    Wear the
                    <br />
                    <span className="text-secondary">moment.</span>
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-background/60">
                    Original apparel, creative tools, limited editions, and
                    exclusive drops — all designed in Cairo.
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 font-groovy text-[10px] font-bold uppercase tracking-[0.12em] text-secondary transition-transform duration-200 group-hover:translate-x-1">
                    Visit shop <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                  <div className="absolute -bottom-3 -right-3 opacity-15">
                    <Sparkle className="h-16 w-16 text-secondary" />
                  </div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ 6. BIG CTA ═══ */}
      <section className="relative overflow-hidden bg-primary py-section-lg text-primary-foreground">
        <div className="absolute inset-0 naso-dotgrid opacity-10" />

        {/* Decorative sparkles */}
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          whileInView={{ opacity: 0.25, scale: 1, rotate: 15 }}
          viewport={{ once: true }}
          className="absolute right-[10%] top-[15%]"
        >
          <Sparkle className="h-12 w-12 text-primary-foreground" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 0.15, scale: 1 }}
          viewport={{ once: true }}
          className="absolute left-[8%] bottom-[20%]"
        >
          <FlowerShape size={60} className="text-primary-foreground naso-flower-spin" />
        </motion.div>

        <div className="container relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mx-auto max-w-2xl text-center"
          >
            <motion.h2
              variants={fadeUp}
              className="font-groovy text-[clamp(2rem,6vw,4rem)] font-black leading-[1] text-primary-foreground"
            >
              Ready to go out
              <br />
              differently?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-5 text-base text-primary-foreground/70 lg:text-lg"
            >
              Join the NASO universe. Explore experiences, book workshops, and
              find your next favorite thing.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
            >
              <MagneticButton
                to={ROUTES.EXPERIENCES}
                className="group inline-flex h-[54px] items-center gap-2.5 rounded-full border-[2.5px] border-primary-foreground bg-primary-foreground px-8 font-groovy text-xs font-bold uppercase tracking-[0.1em] text-primary shadow-retro transition-all hover:shadow-retro-lg active:scale-[0.96]"
              >
                Explore now
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </MagneticButton>
              <MagneticButton
                to={ROUTES.SHOP}
                className="inline-flex h-[54px] items-center rounded-full border-[2.5px] border-primary-foreground/40 px-8 font-groovy text-xs font-bold uppercase tracking-[0.1em] text-primary-foreground transition-all hover:border-primary-foreground hover:bg-primary-foreground/10 active:scale-[0.96]"
              >
                Shop NASO
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Bottom brand ticker ── */}
      <div className="border-t-[2.5px] border-foreground bg-background py-3.5">
        <MarqueeTicker speed={35}>
          {["NASO", "Cairo", "Creative", "Moments", "Outings", "Workshops", "Art", "Culture", "Friends", "Memories"].map(
            (word) => (
              <span key={word} className="mx-8 font-groovy text-sm font-bold uppercase tracking-[0.15em] text-foreground/20">
                {word}
                <span className="mx-8 text-foreground/10">✦</span>
              </span>
            )
          )}
        </MarqueeTicker>
      </div>
    </>
  );
}
