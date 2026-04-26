import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FlowerShape, Sparkle } from "./RetroElements";
import { usePageContent, getSection } from "@/hooks/usePageContent";

type Tone =
  | "cream"
  | "lilac"
  | "lemon"
  | "coral"
  | "card"
  | "ink";

const toneClasses: Record<Tone, { bg: string; text: string; sub: string; pillBg: string; accent: string }> = {
  cream: {
    bg: "bg-naso-cream",
    text: "text-foreground",
    sub: "text-foreground/65",
    pillBg: "bg-foreground text-background",
    accent: "text-primary",
  },
  lilac: {
    bg: "bg-naso-lilac",
    text: "text-foreground",
    sub: "text-foreground/70",
    pillBg: "bg-foreground text-background",
    accent: "text-naso-purple",
  },
  lemon: {
    bg: "bg-naso-lemon",
    text: "text-foreground",
    sub: "text-foreground/70",
    pillBg: "bg-foreground text-background",
    accent: "text-primary",
  },
  coral: {
    bg: "bg-naso-coral",
    text: "text-background",
    sub: "text-background/80",
    pillBg: "bg-background text-foreground",
    accent: "text-naso-lemon",
  },
  card: {
    bg: "bg-card",
    text: "text-foreground",
    sub: "text-muted-foreground",
    pillBg: "bg-foreground text-background",
    accent: "text-primary",
  },
  ink: {
    bg: "bg-foreground",
    text: "text-background",
    sub: "text-background/65",
    pillBg: "bg-secondary text-foreground",
    accent: "text-secondary",
  },
};

interface PageHeroProps {
  /** Small uppercase eyebrow above the headline */
  eyebrow?: string;
  /** The big headline. Wrap part of it in <em> via `accent` for the colored italic split. */
  title: string;
  /** Optional italic-accent word/phrase that sits inline at the end of the title */
  accent?: string;
  /** Sub-headline */
  subtitle?: string;
  /** Optional CTA / extras under the subtitle */
  children?: ReactNode;
  /** Color tone */
  tone?: Tone;
  /** Optional right-side index/number ("01 / 100") for editorial feel */
  marker?: string;
  className?: string;
  /** When set, this hero will check cms_page_content for an override row at (pageKey, "hero") */
  cmsPageKey?: string;
}

interface HeroOverride {
  eyebrow?: string;
  title?: string;
  accent?: string;
  subtitle?: string;
  marker?: string;
  tone?: Tone;
}

/**
 * Unified, editorial page hero used across all secondary pages.
 * Two-column on desktop: left = type stack, right = decorative tile.
 * One-column on mobile.
 *
 * If `cmsPageKey` is provided, looks up `cms_page_content` for a "hero" section
 * and overrides any matching props with the admin-edited values.
 */
export function PageHero(props: PageHeroProps) {
  const { data: sections } = usePageContent(props.cmsPageKey ?? "__none__");
  const override = props.cmsPageKey
    ? getSection<HeroOverride>(sections, "hero")
    : null;

  const eyebrow = override?.eyebrow ?? props.eyebrow;
  const title = override?.title ?? props.title;
  const accent = override?.accent ?? props.accent;
  const subtitle = override?.subtitle ?? props.subtitle;
  const marker = override?.marker ?? props.marker;
  const tone: Tone = (override?.tone as Tone) ?? props.tone ?? "cream";
  const t = toneClasses[tone];

  return (
    <section
      className={cn(
        "relative overflow-hidden border-b-[2.5px] border-foreground",
        t.bg,
        t.text,
        props.className,
      )}
      aria-label={title}
    >
      {/* Background texture */}
      <div className="absolute inset-0 naso-dotgrid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 naso-noise opacity-30 pointer-events-none" />

      {/* Floating decorative flower – editorial */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
        animate={{ opacity: 0.18, scale: 1, rotate: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        className="absolute -right-16 -bottom-16 hidden md:block pointer-events-none"
        aria-hidden
      >
        <FlowerShape size={260} className={cn(t.accent, "naso-flower-spin")} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10, rotate: 20 }}
        animate={{ opacity: 0.6, y: 0, rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute top-10 right-10 hidden md:block pointer-events-none"
        aria-hidden
      >
        <Sparkle className={cn("h-6 w-6", t.accent)} />
      </motion.div>

      <div className="container relative z-10 py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-9">
            {eyebrow && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6 inline-flex items-center gap-3"
              >
                <span className={cn("h-px w-8", t.accent.replace("text-", "bg-"))} />
                <span
                  className={cn(
                    "font-body text-[11px] font-bold uppercase tracking-[0.3em]",
                    t.accent,
                  )}
                >
                  {eyebrow}
                </span>
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-groovy font-black leading-[0.92] tracking-[-0.03em] text-[clamp(2.8rem,8vw,6rem)]"
            >
              {title}
              {accent && (
                <>
                  {" "}
                  <span
                    className={cn("italic font-normal", t.accent)}
                    style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                  >
                    {accent}
                  </span>
                </>
              )}
            </motion.h1>

            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className={cn(
                  "mt-6 max-w-xl text-base leading-relaxed md:text-lg",
                  t.sub,
                )}
              >
                {subtitle}
              </motion.p>
            )}

            {props.children && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="mt-8"
              >
                {props.children}
              </motion.div>
            )}
          </div>

          {/* Right column: marker / index */}
          {marker && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="md:col-span-3 md:text-right"
            >
              <div
                className={cn(
                  "inline-flex flex-col items-start gap-1 rounded-2xl border-[2.5px] border-foreground px-4 py-3 shadow-retro-sm",
                  t.pillBg,
                )}
              >
                <span className="font-body text-[10px] uppercase tracking-[0.25em] opacity-70">
                  Chapter
                </span>
                <span className="font-groovy text-2xl font-black tabular-nums leading-none">
                  {marker}
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
