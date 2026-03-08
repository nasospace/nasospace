import { SEOHead } from "@/components/shared/SEOHead";
import { FAQHero, FAQAccordion, FAQCTA } from "@/features/faq";
import { faqCategories } from "@/features/faq/data";
import { useEffect } from "react";

function useFaqJsonLd() {
  useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqCategories.flatMap((cat) =>
        cat.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        }))
      ),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);
}

export default function FAQPage() {
  useFaqJsonLd();

  return (
    <>
      <SEOHead
        title="FAQ"
        description="Find answers to common questions about NASO experiences, workshops, bookings, pricing, private events, and products — all based in Cairo, Egypt."
        canonical="https://naso.co/faq"
      />
      <FAQHero />
      <FAQAccordion />
      <FAQCTA />
    </>
  );
}
