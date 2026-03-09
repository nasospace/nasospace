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
        title="Inquiries — Book or Request from NASO"
        description="Send us a detailed inquiry about experiences, workshops, products, or custom projects. We'll get back to you within 24–48 hours."
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
