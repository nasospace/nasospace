import { useState, useMemo } from "react";
import { Section } from "@/components/shared";
import { MotionDiv } from "@/components/shared/MotionDiv";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { FAQSearch } from "./FAQSearch";
import { useFaqCategories } from "../hooks/useFaq";

export function FAQAccordion() {
  const [search, setSearch] = useState("");
  const { data: faqCategories = [], isLoading } = useFaqCategories();

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return faqCategories;
    return faqCategories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            item.question.toLowerCase().includes(q) ||
            item.answer.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [search, faqCategories]);

  return (
    <Section>
      <div className="mx-auto max-w-2xl space-y-8">
        <FAQSearch value={search} onChange={setSearch} />

        {isLoading && (
          <div className="space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-xl" />
            ))}
          </div>
        )}

        {!isLoading && filtered.length === 0 && (
          <p className="text-center text-sm text-muted-foreground">
            No questions match your search. Try different keywords or{" "}
            <a href="/contact" className="text-primary underline underline-offset-2 transition-colors hover:text-foreground">contact us</a>.
          </p>
        )}

        <div className="space-y-12">
          {filtered.map((cat) => (
            <MotionDiv key={cat.id}>
              <h2 className="mb-4 font-display text-lg font-bold">
                <span className="mr-2">{cat.emoji}</span>
                {cat.label}
              </h2>
              <Accordion type="single" collapsible className="rounded-xl border border-border bg-card">
                {cat.items.map((item, i) => (
                  <AccordionItem key={i} value={`${cat.id}-${i}`} className="px-5">
                    <AccordionTrigger className="text-left text-sm font-medium">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </MotionDiv>
          ))}
        </div>
      </div>
    </Section>
  );
}
