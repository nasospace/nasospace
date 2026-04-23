import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp, staggerContainer, fadeUpDelay } from "@/lib/motion";
import { Share2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Section, StickerBadge, MagneticButton, InfoRow, SaveButton } from "@/components/shared";
import { SEOHead } from "@/components/shared/SEOHead";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { ROUTES, buildInquiryPath } from "@/config/routes";
import { buildEventSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { useWorkshop, useRelatedWorkshops } from "../hooks/useWorkshops";
import { WORKSHOP_CATEGORY_META } from "../types";
import { WorkshopGrid } from "./WorkshopGrid";
import { Skeleton } from "@/components/ui/skeleton";

interface WorkshopDetailViewProps {
  slug: string;
}

export function WorkshopDetailView({ slug }: WorkshopDetailViewProps) {
  const { data: workshop, isLoading } = useWorkshop(slug);
  const { data: related = [] } = useRelatedWorkshops(
    slug,
    workshop?.category ?? "",
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

  if (!workshop) {
    return (
      <Section className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <h1 className="font-groovy text-3xl font-bold">Not Found</h1>
        <p className="mt-2 text-muted-foreground">
          This workshop doesn't exist or has been removed.
        </p>
        <Link
          to={ROUTES.WORKSHOPS}
          className="mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold text-primary underline underline-offset-4"
        >
          ← Back to Workshops
        </Link>
      </Section>
    );
  }

  const meta = WORKSHOP_CATEGORY_META[workshop.category];

  return (
    <>
      <SEOHead
        title={`${workshop.title} — NASO Workshops`}
        description={workshop.summary || workshop.description.slice(0, 155)}
        canonical={`/workshops/${workshop.slug}`}
        ogImage={workshop.coverImage?.src}
        jsonLd={buildEventSchema({
          name: workshop.title,
          description: workshop.summary || workshop.description.slice(0, 155),
          url: `${siteConfig.url}/workshops/${workshop.slug}`,
          image: workshop.coverImage?.src,
          startDate: workshop.date || undefined,
          location: workshop.location || undefined,
          price: workshop.price,
          currency: workshop.currency,
        })}
      />
      {/* Hero zone */}
      <Section spacing="lg" fullBleed className={cn("relative", meta.color)}>
        <div className="naso-grid-bg absolute inset-0 opacity-30" />
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
                {workshop.title}
              </motion.h1>
              <motion.div variants={fadeUpDelay(0.15)}>
                <SaveButton itemType="workshop" itemSlug={workshop.slug} title={workshop.title} />
              </motion.div>
            </div>

            <motion.p
              variants={fadeUpDelay(0.2)}
              className={cn("text-sm md:text-base", meta.textColor, "opacity-80")}
            >
              {workshop.date} · {workshop.location}
            </motion.p>
          </motion.div>
        </div>
      </Section>

      {/* Content */}
      <Section>
        <div className="grid gap-10 md:grid-cols-3 md:gap-12">
          <MotionDiv className="md:col-span-2">
            <p className="text-base leading-relaxed text-foreground/90 md:text-lg">
              {workshop.description}
            </p>

            {workshop.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {workshop.tags.map((tag) => (
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
                <InfoRow label="Price" value={`${workshop.price} ${workshop.currency}`} />
                <InfoRow label="Duration" value={workshop.duration} />
                <InfoRow label="Capacity" value={`${workshop.capacity} spots`} />
                <InfoRow label="Skill Level" value={workshop.skillLevel.replace("-", " ")} />
                <InfoRow
                  label="Materials"
                  value={workshop.materialsIncluded ? "Included ✓" : "Bring your own"}
                />
              </dl>

              <div className="mt-6">
                <MagneticButton
                  to={buildInquiryPath({
                    type: "workshop",
                    slug: workshop.slug,
                    title: workshop.title,
                  })}
                  className={cn(
                    "flex w-full items-center justify-center rounded-full border-[2.5px] border-foreground px-6 py-3",
                    "font-groovy text-xs font-bold uppercase tracking-wider shadow-retro",
                    meta.color, meta.textColor,
                    "transition-shadow hover:shadow-retro-lg"
                  )}
                >
                  I'm in. Save my spot.
                </MagneticButton>

                <div className="mt-4 flex flex-col gap-3">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`Thinking about doing this. You in? 🔗 https://naso.space/workshops/${workshop.slug}`);
                      toast.success("Copied link! Send it to the group chat 💅", { duration: 4000 });
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-foreground bg-white px-6 py-2.5 font-groovy text-[10px] font-bold uppercase tracking-wider text-foreground shadow-retro-sm transition-all hover:-translate-y-0.5 hover:bg-secondary active:translate-y-0"
                  >
                    <Share2 className="h-4 w-4" />
                    Send to Group Chat
                  </button>

                  <div className="mt-2 rounded-xl bg-muted/50 p-3 text-center">
                    <p className="font-groovy text-xs font-bold text-foreground">
                      ✦ No experience needed
                    </p>
                    <p className="mt-1 text-[10px] text-muted-foreground">
                      Perfect for beginners. Come solo or bring friends—our hosts make sure no one feels left out.
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-center gap-1.5 text-[10px] font-semibold text-muted-foreground">
                    <CheckCircle2 className="h-3 w-3 text-secondary" />
                    Free cancellation up to 48 hours before.
                  </div>
                </div>
              </div>
            </div>
          </MotionDiv>
        </div>
      </Section>

      {/* Related */}
      {related.length > 0 && (
        <Section className="border-t border-border">
          <MotionDiv>
            <h2 className="mb-8 font-groovy text-2xl font-bold">More to make</h2>
          </MotionDiv>
          <WorkshopGrid workshops={related} />
        </Section>
      )}
    </>
  );
}
