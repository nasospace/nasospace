import { SEOHead } from "@/components/shared/SEOHead";
import { FAQHero, FAQAccordion, FAQCTA } from "@/features/faq";
import { useFaqCategories } from "@/features/faq/hooks/useFaq";
import { buildFAQSchema } from "@/lib/seo";

export default function FAQPage() {
  const { data: faqCategories = [] } = useFaqCategories();

  const allItems = faqCategories.flatMap((cat) =>
    cat.items.map((item) => ({ question: item.question, answer: item.answer }))
  );

  return (
    <>
      <SEOHead
        title="FAQ — Common Questions About NASO"
        description="Find answers to common questions about NASO experiences, workshops, bookings, pricing, private events, and products — all based in Cairo, Egypt."
        canonical="/faq"
        jsonLd={allItems.length > 0 ? buildFAQSchema(allItems) : undefined}
      />
      <FAQHero />
      <FAQAccordion />
      <FAQCTA />
    </>
  );
}
