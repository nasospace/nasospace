import { FAQHero, FAQAccordion, FAQCTA } from "@/features/faq";
import { faqCategories } from "@/features/faq/data";
import { Helmet } from "react-helmet-async";

export default function FAQPage() {
  const faqJsonLd = {
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

  return (
    <>
      <Helmet>
        <title>FAQ — NASO | Frequently Asked Questions</title>
        <meta
          name="description"
          content="Find answers to common questions about NASO experiences, workshops, bookings, pricing, and more. Cairo's creative brand for unforgettable moments."
        />
        <script type="application/ld+json">
          {JSON.stringify(faqJsonLd)}
        </script>
      </Helmet>
      <FAQHero />
      <FAQAccordion />
      <FAQCTA />
    </>
  );
}
