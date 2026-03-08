import { Section } from "@/components/shared";
import { MotionDiv } from "@/components/shared/MotionDiv";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { faqCategories } from "../data";

export function FAQAccordion() {
  return (
    <Section>
      <div className="mx-auto max-w-2xl space-y-12">
        {faqCategories.map((cat) => (
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
    </Section>
  );
}
