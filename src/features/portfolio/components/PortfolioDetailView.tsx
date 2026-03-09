import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp, staggerContainer, fadeUpDelay } from "@/lib/motion";
import { Section, StickerBadge, MagneticButton, InfoRow } from "@/components/shared";
import { SEOHead } from "@/components/shared/SEOHead";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { ROUTES, buildInquiryPath, routeHelpers } from "@/config/routes";
import { usePortfolioItem, usePortfolioItems } from "../hooks/usePortfolio";
import { PORTFOLIO_CATEGORY_META } from "../types";
import { PortfolioGrid } from "./PortfolioGrid";
import { Skeleton } from "@/components/ui/skeleton";

interface PortfolioDetailViewProps {
  slug: string;
}

export function PortfolioDetailView({ slug }: PortfolioDetailViewProps) {
  const { data: item, isLoading } = usePortfolioItem(slug);
  const { data: allItems = [] } = usePortfolioItems();

  if (isLoading) {
    return (
      <Section spacing="lg">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <Skeleton className="aspect-[4/5] w-full rounded-2xl" />
          <div className="flex flex-col gap-4">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-2/3" />
          </div>
        </div>
      </Section>
    );
  }

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
  const related = [
    ...allItems.filter((p) => p.category === item.category && p.id !== item.id),
    ...allItems.filter((p) => p.category !== item.category && p.id !== item.id),
  ].slice(0, 3);

  const hasLinkedExperience = !!item.linkedExperienceSlug;
  const hasLinkedWorkshop = !!item.linkedWorkshopSlug;
  const hasLinks = hasLinkedExperience || hasLinkedWorkshop;

  const inquiryPath = buildInquiryPath({
    type: "portfolio",
    slug: item.slug,
    title: item.title,
  });

  return (
    <>
      {/* Hero */}
      <Section spacing="lg">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <MotionDiv className="overflow-hidden rounded-2xl border-2 border-foreground shadow-retro">
            <img
              src={item.coverImage.src}
              alt={item.coverImage.alt}
              className="aspect-[4/5] h-full w-full object-cover"
            />
          </MotionDiv>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-4"
          >
            <motion.div variants={fadeUp}>
              <span
                className={cn(
                  "inline-flex rounded-full px-3 py-1 border-2 border-foreground",
                  "font-groovy text-[10px] font-bold uppercase tracking-wider",
                  meta?.color, meta?.textColor
                )}
              >
                {meta?.emoji} {meta?.label}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUpDelay(0.05)}
              className="font-groovy text-3xl font-bold leading-tight sm:text-4xl md:text-5xl"
            >
              {item.title}
            </motion.h1>

            <motion.p
              variants={fadeUpDelay(0.1)}
              className="text-base text-muted-foreground md:text-lg"
            >
              {item.summary}
            </motion.p>

            <motion.div variants={fadeUpDelay(0.15)} className="flex flex-col gap-2">
              {item.location && <InfoRow label="Location" value={item.location} />}
              {item.date && <InfoRow label="Date" value={item.date} />}
              {item.audienceType && <InfoRow label="Audience" value={item.audienceType} />}
              {item.vibe && <InfoRow label="Vibe" value={item.vibe} />}
            </motion.div>

            <motion.div variants={fadeUpDelay(0.2)} className="flex flex-wrap gap-3 pt-2">
              <MagneticButton
                to={inquiryPath}
                className={cn(
                  "inline-flex items-center justify-center rounded-full border-2 border-foreground px-8 py-3",
                  "font-groovy text-xs font-bold uppercase tracking-wider shadow-retro",
                  "bg-primary text-primary-foreground transition-shadow hover:shadow-retro-lg"
                )}
              >
                Want something like this?
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* Story */}
      <Section className="border-t border-border">
        <MotionDiv className="max-w-2xl">
          <h2 className="mb-4 font-groovy text-xl font-bold">The story</h2>
          <p className="whitespace-pre-line text-base leading-relaxed text-foreground/90">
            {item.story}
          </p>
          {item.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-foreground/15 px-3 py-1 font-display text-[11px] uppercase tracking-wider text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </MotionDiv>
      </Section>

      {/* Gallery */}
      {item.gallery.length > 0 && (
        <Section>
          <MotionDiv>
            <h2 className="mb-6 font-groovy text-xl font-bold">Gallery</h2>
          </MotionDiv>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-3 md:grid-cols-3"
          >
            {item.gallery.map((img, i) => (
              <motion.div key={i} variants={fadeUp} className="overflow-hidden rounded-xl border-2 border-foreground/10">
                <img src={img.src} alt={img.alt} className="aspect-[4/3] h-full w-full object-cover" loading="lazy" />
              </motion.div>
            ))}
          </motion.div>
        </Section>
      )}

      {/* Testimonial */}
      {item.testimonialQuote && (
        <Section className="border-t border-border">
          <MotionDiv className="mx-auto max-w-2xl text-center">
            <blockquote className="font-display text-xl italic leading-relaxed text-foreground md:text-2xl">
              "{item.testimonialQuote}"
            </blockquote>
            {item.testimonialName && (
              <p className="mt-4 font-groovy text-sm font-bold text-muted-foreground">
                — {item.testimonialName}
              </p>
            )}
          </MotionDiv>
        </Section>
      )}

      {/* Linked Content */}
      {hasLinks && (
        <Section className="border-t border-border">
          <MotionDiv className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-groovy text-lg font-bold">Part of the NASO world</h3>
              <p className="mt-1 text-sm text-muted-foreground">This story connects to other things we do.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {hasLinkedExperience && (
                <Link
                  to={routeHelpers.experienceDetail(item.linkedExperienceSlug!)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border-2 border-foreground px-5 py-2",
                    "font-groovy text-[10px] font-bold uppercase tracking-wider",
                    "bg-card text-foreground transition-shadow hover:shadow-retro"
                  )}
                >
                  View Experience →
                </Link>
              )}
              {hasLinkedWorkshop && (
                <Link
                  to={routeHelpers.workshopDetail(item.linkedWorkshopSlug!)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border-2 border-foreground px-5 py-2",
                    "font-groovy text-[10px] font-bold uppercase tracking-wider",
                    "bg-card text-foreground transition-shadow hover:shadow-retro"
                  )}
                >
                  View Workshop →
                </Link>
              )}
            </div>
          </MotionDiv>
        </Section>
      )}

      {/* Bottom CTA */}
      <Section fullBleed className="bg-naso-cream naso-dotgrid">
        <div className="container">
          <MotionDiv className="flex flex-col items-center gap-6 py-8 text-center">
            <h2 className="font-groovy text-2xl font-bold md:text-3xl">
              Want us to create something for you?
            </h2>
            <p className="max-w-md text-sm text-muted-foreground">
              Every NASO project starts with a conversation. Tell us what you're dreaming of.
            </p>
            <MagneticButton
              to={ROUTES.INQUIRIES}
              className={cn(
                "inline-flex items-center justify-center rounded-full border-2 border-foreground px-8 py-3",
                "font-groovy text-xs font-bold uppercase tracking-wider shadow-retro",
                "bg-primary text-primary-foreground transition-shadow hover:shadow-retro-lg"
              )}
            >
              Start a Conversation
            </MagneticButton>
          </MotionDiv>
        </div>
      </Section>

      {/* Related */}
      {related.length > 0 && (
        <Section>
          <MotionDiv>
            <h2 className="mb-6 font-groovy text-xl font-bold">More stories</h2>
          </MotionDiv>
          <PortfolioGrid items={related} />
        </Section>
      )}
    </>
  );
}
