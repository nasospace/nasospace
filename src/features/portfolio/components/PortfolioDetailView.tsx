import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp, staggerContainer, fadeUpDelay } from "@/lib/motion";
import { Section, StickerBadge, MagneticButton, InfoRow } from "@/components/shared";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { ROUTES, buildInquiryPath, routeHelpers } from "@/config/routes";
import { getPortfolioBySlug, getRelatedPortfolio } from "../data";
import { PORTFOLIO_CATEGORY_META } from "../types";
import { PortfolioGrid } from "./PortfolioGrid";

interface PortfolioDetailViewProps {
  slug: string;
}

export function PortfolioDetailView({ slug }: PortfolioDetailViewProps) {
  const item = getPortfolioBySlug(slug);

  if (!item) {
    return (
      <Section className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <h1 className="font-groovy text-3xl font-bold">Not Found</h1>
        <p className="mt-2 text-muted-foreground">
          This story doesn't exist or has been removed.
        </p>
        <Link
          to={ROUTES.PORTFOLIO}
          className="mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold text-primary underline underline-offset-4"
        >
          ← Back to Portfolio
        </Link>
      </Section>
    );
  }

  const meta = PORTFOLIO_CATEGORY_META[item.category];
  const related = getRelatedPortfolio(item, 3);

  const hasLinkedExperience = !!item.linkedExperienceSlug;
  const hasLinkedWorkshop = !!item.linkedWorkshopSlug;

  return (
    <>
      {/* ── Hero ── */}
      <Section spacing="lg" fullBleed className={cn("relative", meta.color)}>
        <div className="naso-halftone absolute inset-0" />
        <div className="container relative">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-4 py-4"
          >
            <motion.div variants={fadeUp}>
              <StickerBadge variant="filled" className="bg-card text-foreground" rotate={-3}>
                {meta.emoji} {meta.label}
              </StickerBadge>
            </motion.div>

            <motion.h1
              variants={fadeUpDelay(0.1)}
              className={cn(
                "font-groovy text-3xl font-bold leading-tight sm:text-4xl md:text-6xl",
                meta.textColor
              )}
            >
              {item.title}
            </motion.h1>

            <motion.div
              variants={fadeUpDelay(0.2)}
              className={cn("flex flex-wrap items-center gap-3 text-sm", meta.textColor, "opacity-80")}
            >
              <span>{item.date} · {item.location}</span>
              <span className="italic">✦ {item.vibe}</span>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* ── Story + Sidebar ── */}
      <Section>
        <div className="grid gap-10 md:grid-cols-3 md:gap-12">
          {/* Left — story + tags */}
          <MotionDiv className="md:col-span-2">
            <p className="whitespace-pre-line text-base leading-relaxed text-foreground/90 md:text-lg">
              {item.story}
            </p>

            {item.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-foreground/15 px-3 py-1 font-display text-[11px] uppercase tracking-wider text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </MotionDiv>

          {/* Right — info card + testimonial */}
          <MotionDiv className="flex flex-col gap-6">
            <div className="rounded-2xl border-2 border-foreground bg-card p-6 shadow-retro">
              <dl className="space-y-4">
                <InfoRow label="Audience" value={item.audienceType} />
                <InfoRow label="Vibe" value={item.vibe} />
                <InfoRow label="Location" value={item.location} />
                <InfoRow label="Date" value={item.date} />
              </dl>
            </div>

            {item.testimonialQuote && (
              <div className="rounded-2xl border-2 border-foreground/10 bg-muted p-6">
                <blockquote className="font-body text-sm italic leading-relaxed text-foreground/80">
                  "{item.testimonialQuote}"
                </blockquote>
                {item.testimonialName && (
                  <cite className="mt-3 block font-display text-xs font-semibold not-italic text-foreground">
                    — {item.testimonialName}
                  </cite>
                )}
              </div>
            )}
          </MotionDiv>
        </div>
      </Section>

      {/* ── Gallery ── */}
      {item.gallery.length > 0 && (
        <Section>
          <MotionDiv>
            <h2 className="mb-6 font-groovy text-2xl font-bold">Moments</h2>
          </MotionDiv>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-3 grid-cols-2 md:grid-cols-3"
          >
            {item.gallery.map((img, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className={cn(
                  "overflow-hidden rounded-xl border-2 border-foreground/10",
                  i === 0 && "col-span-2 md:col-span-1"
                )}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="aspect-[4/3] h-full w-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </motion.div>
        </Section>
      )}

      {/* ── Linked Experience / Workshop ── */}
      {(hasLinkedExperience || hasLinkedWorkshop) && (
        <Section className="border-t border-border">
          <MotionDiv className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-groovy text-lg font-bold">
                {hasLinkedExperience ? "Explore the experience" : "Try the workshop"}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                This story is connected to one of our{" "}
                {hasLinkedExperience ? "experiences" : "workshops"}.
              </p>
            </div>
            <Link
              to={
                hasLinkedExperience
                  ? routeHelpers.experienceDetail(item.linkedExperienceSlug!)
                  : routeHelpers.workshopDetail(item.linkedWorkshopSlug!)
              }
              className={cn(
                "inline-flex items-center gap-2 rounded-full border-[2.5px] border-foreground px-6 py-2.5",
                "font-groovy text-[10px] font-bold uppercase tracking-wider shadow-retro",
                "bg-card text-foreground transition-shadow hover:shadow-retro-lg"
              )}
            >
              {hasLinkedExperience ? "View Experience →" : "View Workshop →"}
            </Link>
          </MotionDiv>
        </Section>
      )}

      {/* ── CTA ── */}
      <Section fullBleed className="bg-naso-cream naso-dotgrid">
        <div className="container">
          <MotionDiv className="flex flex-col items-center gap-6 py-8 text-center">
            <h2 className="font-groovy text-2xl font-bold md:text-3xl">
              Want a moment like this?
            </h2>
            <p className="max-w-md text-sm text-muted-foreground">
              Tell us what you're imagining. We'll help bring it to life — no templates, no formulas, just your story.
            </p>
            <MagneticButton
              to={buildInquiryPath({
                type: "portfolio",
                slug: item.slug,
                title: item.title,
              })}
              className={cn(
                "inline-flex items-center justify-center rounded-full border-[2.5px] border-foreground px-8 py-3",
                "font-groovy text-xs font-bold uppercase tracking-wider shadow-retro",
                "bg-primary text-primary-foreground transition-shadow hover:shadow-retro-lg"
              )}
            >
              Start a Conversation
            </MagneticButton>
          </MotionDiv>
        </div>
      </Section>

      {/* ── Related Stories ── */}
      {related.length > 0 && (
        <Section className="border-t border-border">
          <MotionDiv>
            <h2 className="mb-8 font-groovy text-2xl font-bold">More stories</h2>
          </MotionDiv>
          <PortfolioGrid items={related} />
        </Section>
      )}
    </>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="font-display text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </dt>
      <dd className="text-right font-display text-sm font-semibold">{value}</dd>
    </div>
  );
}
