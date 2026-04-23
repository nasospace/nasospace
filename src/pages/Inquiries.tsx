import { useState } from "react";
import { Section } from "@/components/shared";
import { SEOHead } from "@/components/shared/SEOHead";
import { InquiryHero, InquiryForm, InquirySuccessState } from "@/features/inquiries/components";
import { useInquiryContext } from "@/features/inquiries/hooks/useInquiryContext";

export default function InquiriesPage() {
  const context = useInquiryContext();
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <SEOHead
        title="Custom Requests — NASO"
        description="Plan a custom project, corporate event, or special request with NASO. We'll help you bring your vision to life."
        canonical="/inquiries"
      />
      <InquiryHero context={context} />
      <Section>
        <div className="mx-auto max-w-xl">
          {submitted ? (
            <InquirySuccessState />
          ) : (
            <InquiryForm context={context} onSuccess={() => setSubmitted(true)} />
          )}
        </div>
      </Section>
    </>
  );
}
