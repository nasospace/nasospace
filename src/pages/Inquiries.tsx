import { useState } from "react";
import { Section } from "@/components/shared";
import { InquiryHero, InquiryForm, InquirySuccessState } from "@/features/inquiries/components";
import { useInquiryContext } from "@/features/inquiries/hooks/useInquiryContext";

export default function InquiriesPage() {
  const context = useInquiryContext();
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
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
