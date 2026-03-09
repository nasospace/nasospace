import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp, staggerContainer, fadeUpDelay } from "@/lib/motion";
import { Section, StickerBadge, MagneticButton, InfoRow, SaveButton } from "@/components/shared";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { ROUTES, buildInquiryPath } from "@/config/routes";
import { useExperience, useRelatedExperiences } from "../hooks/useExperiences";
import { CATEGORY_META } from "../types";
import { ExperienceGrid } from "./ExperienceGrid";
import { Skeleton } from "@/components/ui/skeleton";

interface ExperienceDetailViewProps {
  slug: string;
}

export function ExperienceDetailView({ slug }: ExperienceDetailViewProps) {
  const { data: experience, isLoading } = useExperience(slug);
  const { data: related = [] } = useRelatedExperiences(
    slug,
    experience?.category ?? "",
    3
  );

  if (isLoading) {
    return (
      <Section>
        <div className="space-y-6">
          <Skeleton className="h-48 rounded-2xl" />
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-64 rounded-2xl" />
        </div>
      </Section>
    );
  }

  if (!experience) {
    return (
      <Section className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <h1 className="font-groovy text-3xl font-bold">Not Found</h1>
        <p className="mt-2 text-muted-foreground">
          This experience doesn't exist or has been removed.
        </p>
        <Link
          to={ROUTES.EXPERIENCES}
          className="mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold text-primary underline underline-offset-4"
        >
          ← Back to Experiences
        </Link>
      </Section>
    );
  }

  const meta = CATEGORY_META[experience.category];

  return (
    <>
      {/* Hero zone */}
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
              <StickerBadge variant="filled" className={cn("bg-card text-foreground")} rotate={-3}>
                {meta.emoji} {meta.label}
              </StickerBadge>
            </motion.div>

            <div className="flex items-start justify-between gap-4">
              <motion.h1
                variants={fadeUpDelay(0.1)}
                className={cn(
                  "font-groovy text-3xl font-bold leading-tight sm:text-4xl md:text-6xl",
                  meta.textColor
                )}
              >
                {experience.title}
              </motion.h1>
              <motion.div variants={fadeUpDelay(0.15)}>
                <SaveButton itemType="experience" itemSlug={experience.slug} title={experience.title} />
              </motion.div>
            </div>

            <motion.p
              variants={fadeUpDelay(0.2)}
              className={cn("text-sm md:text-base", meta.textColor, "opacity-80")}
            >
              {experience.date} · {experience.location}
            </motion.p>
          </motion.div>
        </div>
      </Section>

      {/* Content */}
      <Section>
        <div className="grid gap-10 md:grid-cols-3 md:gap-12">
          <MotionDiv className="md:col-span-2">
            <p className="text-base leading-relaxed text-foreground/90 md:text-lg">
              {experience.description}
            </p>

            {experience.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {experience.tags.map((tag) => (
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

          <MotionDiv>
            <div className="rounded-2xl border-[2.5px] border-foreground bg-card p-6 shadow-retro">
              <dl className="space-y-4">
                <InfoRow label="Price" value={`${experience.price} ${experience.currency}`} />
                <InfoRow label="Capacity" value={`${experience.capacity} spots`} />
                <InfoRow label="Difficulty" value={experience.difficulty} />
                <InfoRow label="Location" value={experience.location} />
              </dl>

              <div className="mt-6">
                <MagneticButton
                  to={buildInquiryPath({
                    type: "experience",
                    slug: experience.slug,
                    title: experience.title,
                  })}
                  className={cn(
                    "flex w-full items-center justify-center rounded-full border-[2.5px] border-foreground px-6 py-3",
                    "font-groovy text-xs font-bold uppercase tracking-wider shadow-retro",
                    meta.color, meta.textColor,
                    "transition-shadow hover:shadow-retro-lg"
                  )}
                >
                  Book This Experience
                </MagneticButton>
              </div>
            </div>
          </MotionDiv>
        </div>
      </Section>

      {/* Related */}
      {related.length > 0 && (
        <Section className="border-t border-border">
          <MotionDiv>
            <h2 className="mb-8 font-groovy text-2xl font-bold">More like this</h2>
          </MotionDiv>
          <ExperienceGrid experiences={related} />
        </Section>
      )}
    </>
  );
}
