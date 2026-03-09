import { SEOHead } from "@/components/shared/SEOHead";
import { Section, MagneticButton } from "@/components/shared";
import { FlowerShape, StickerBadge } from "@/components/shared/RetroElements";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { popIn, fadeUp } from "@/lib/motion";

const NotFound = () => {
  return (
    <>
      <SEOHead
        title="Page Not Found — NASO"
        description="This page doesn't exist — but there's plenty more to explore."
        noindex
      />
      <Section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <MotionDiv variants={popIn} className="mb-6">
          <FlowerShape size={64} className="text-primary naso-flower-spin" />
        </MotionDiv>

        <MotionDiv variants={fadeUp}>
          <StickerBadge variant="filled" className="bg-secondary" rotate={-3}>
            Lost?
          </StickerBadge>
        </MotionDiv>

        <MotionDiv variants={fadeUp}>
          <h1 className="mt-6 font-groovy text-[clamp(3rem,10vw,6rem)] font-black leading-none text-foreground">
            404
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            This page doesn't exist — but there's plenty more to explore.
          </p>
        </MotionDiv>

        <MotionDiv variants={fadeUp} className="mt-8">
          <MagneticButton
            to="/"
            className="inline-flex items-center rounded-full border-[2.5px] border-foreground bg-primary px-8 py-3 font-groovy text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-retro transition-shadow hover:shadow-retro-lg"
          >
            Back to Home
          </MagneticButton>
        </MotionDiv>
      </Section>
    </>
  );
};

export default NotFound;
