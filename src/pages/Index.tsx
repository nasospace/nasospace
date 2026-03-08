import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import nasoLogo from "@/assets/naso-logo.png";

/* ─── motion presets ─── */
const smooth = { duration: 1, ease: [0.16, 1, 0.3, 1] };
const smoothSlow = { duration: 1.4, ease: [0.16, 1, 0.3, 1] };
const bouncy = { type: "spring", stiffness: 120, damping: 14 };

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const blobX = useTransform(springX, [0, 1], [-12, 12]);
  const blobY = useTransform(springY, [0, 1], [-12, 12]);
  const blobX2 = useTransform(springX, [0, 1], [10, -10]);
  const blobY2 = useTransform(springY, [0, 1], [8, -8]);

  function handleMouseMove(e: React.MouseEvent) {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  return (
    <>
      {/* ═══════════════════════════ HERO ═══════════════════════════ */}
      <section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative min-h-[100svh] overflow-hidden bg-foreground text-background"
      >
        {/* ── BG texture ── */}
        <div className="pointer-events-none absolute inset-0 naso-grid-bg opacity-[0.04]" />

        {/* ── Layered color shapes (parallax on mouse) ── */}
        <div className="pointer-events-none absolute inset-0">
          {/* Giant green blob — top right */}
          <motion.div
            style={{ x: blobX, y: blobY }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...smoothSlow, delay: 0.3 }}
            className="naso-blob absolute -right-16 -top-20 h-[420px] w-[420px] bg-secondary/40 md:h-[560px] md:w-[560px]"
          />
          {/* Purple circle — bottom left */}
          <motion.div
            style={{ x: blobX2, y: blobY2 }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...smoothSlow, delay: 0.5 }}
            className="absolute -bottom-24 -left-20 h-[340px] w-[340px] rounded-full bg-accent/30 md:h-[480px] md:w-[480px]"
          />
          {/* Blue shard — mid right */}
          <motion.div
            style={{ x: blobX, y: blobY2 }}
            initial={{ opacity: 0, rotate: -20 }}
            animate={{ opacity: 0.25, rotate: 12 }}
            transition={{ ...smoothSlow, delay: 0.7 }}
            className="absolute right-[10%] top-[55%] h-32 w-64 rounded-[2rem] bg-primary/40 md:h-44 md:w-80"
          />
          {/* Lilac dot — top left */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.35, scale: 1 }}
            transition={{ ...bouncy, delay: 0.9 }}
            className="absolute left-[12%] top-[15%] h-16 w-16 rounded-full bg-naso-lilac/50 md:h-24 md:w-24"
          />
        </div>

        {/* ── Main content ── */}
        <div className="container relative flex min-h-[100svh] flex-col justify-between pb-12 pt-32 md:pt-40">
          {/* Top row — stickers / badges */}
          <div className="flex items-start justify-between">
            <motion.div
              initial={{ opacity: 0, rotate: -8, scale: 0.8 }}
              animate={{ opacity: 1, rotate: -4, scale: 1 }}
              transition={{ ...bouncy, delay: 0.4 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border-2 border-background/20 bg-background/10 px-5 py-2 font-display text-xs font-semibold uppercase tracking-[0.15em] backdrop-blur-sm"
                style={{ transform: "rotate(-4deg)" }}
              >
                <span className="h-2 w-2 rounded-full bg-secondary" />
                Cairo, Egypt
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, rotate: 10, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 3, scale: 1 }}
              transition={{ ...bouncy, delay: 0.6 }}
              className="hidden sm:block"
            >
              <span className="inline-flex items-center gap-2 rounded-full border-2 border-background/20 bg-accent/20 px-5 py-2 font-display text-xs font-semibold uppercase tracking-[0.15em] backdrop-blur-sm"
                style={{ transform: "rotate(3deg)" }}
              >
                Est. 2024 ✦
              </span>
            </motion.div>
          </div>

          {/* Center — big type + logo */}
          <div className="flex flex-1 flex-col items-center justify-center gap-6 md:gap-8">
            {/* Logo mark — large, centered, glowing */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ ...smoothSlow, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 scale-[2] rounded-full bg-primary/10 blur-3xl" />
              <img
                src={nasoLogo}
                alt="NASO"
                className="relative h-16 w-auto brightness-0 invert md:h-24 lg:h-28"
              />
            </motion.div>

            {/* Headline — massive, expressive */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...smooth, delay: 0.35 }}
              className="max-w-5xl text-center text-[clamp(2.5rem,8vw,7rem)] font-bold leading-[0.95] tracking-[-0.03em]"
            >
              Creative{" "}
              <span className="relative inline-block">
                experiences
                {/* Animated underline */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -bottom-1 left-0 right-0 h-[0.08em] origin-left rounded-full bg-secondary md:-bottom-2"
                />
              </span>
              <br className="hidden md:block" />
              worth{" "}
              <motion.span
                initial={{ opacity: 0, rotate: -3, scale: 0.9 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                transition={{ ...bouncy, delay: 0.7 }}
                className="relative inline-block"
              >
                <span className="relative z-10">remembering</span>
                {/* Color highlight behind word */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -inset-x-3 -inset-y-1 -z-10 origin-left -skew-x-2 rounded-lg bg-accent/20"
                />
              </motion.span>
              <span className="text-primary">.</span>
            </motion.h1>

            {/* Sub-line */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...smooth, delay: 0.6 }}
              className="max-w-lg text-center font-display text-base font-medium tracking-wide text-background/50 md:text-lg"
            >
              Outings · Workshops · Events · Products
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...smooth, delay: 0.75 }}
              className="flex flex-wrap justify-center gap-4 pt-2"
            >
              <Button asChild size="lg" className="group rounded-full bg-secondary text-secondary-foreground shadow-[0_8px_32px_-8px_hsl(95_75%_72%/0.4)] hover:bg-secondary/90 hover:shadow-[0_12px_40px_-8px_hsl(95_75%_72%/0.5)] active:scale-[0.97]">
                <Link to={ROUTES.EXPERIENCES}>
                  Explore experiences
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" className="rounded-full border-2 border-background/25 bg-transparent text-background hover:border-background/50 hover:bg-background/10 active:scale-[0.97]">
                <Link to={ROUTES.SHOP}>Visit shop</Link>
              </Button>
            </motion.div>
          </div>

          {/* Bottom — scrolling marquee strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="relative overflow-hidden"
          >
            <div className="naso-marquee flex whitespace-nowrap font-display text-xs font-semibold uppercase tracking-[0.3em] text-background/15">
              {Array.from({ length: 3 }).map((_, i) => (
                <span key={i} className="naso-marquee-inner flex items-center gap-8 pr-8">
                  <span>Outings</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary/40" />
                  <span>Workshops</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/40" />
                  <span>Private Events</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/40" />
                  <span>Corporate</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-naso-lilac/40" />
                  <span>Creative Products</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary/40" />
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════ WHAT WE DO ═══════════════════════════ */}
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
