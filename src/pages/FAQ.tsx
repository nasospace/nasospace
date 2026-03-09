import { useEffect } from "react";
import { SEOHead } from "@/components/shared/SEOHead";
import { FAQHero, FAQAccordion, FAQCTA } from "@/features/faq";
import { useFaqCategories } from "@/features/faq/hooks/useFaq";

/**
 * Injects FAQ JSON-LD structured data from CMS-backed FAQ categories.
 */
function useFaqJsonLd(categories: { items: { question: string; answer: string }[] }[]) {
  useEffect(() => {
    if (categories.length === 0) return;

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: categories.flatMap((cat) =>
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
  }, [categories]);
}

export default function FAQPage() {
  const { data: faqCategories = [] } = useFaqCategories();
  useFaqJsonLd(faqCategories);

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
