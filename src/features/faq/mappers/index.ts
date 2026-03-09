/**
 * Maps raw CMS FAQ item rows → FAQCategory domain type (grouped).
 */
import type { CmsFaqItemRow } from "@/lib/cms/types";
import type { FAQCategory } from "../types";

export function mapCmsFaqItemsToCategories(rows: CmsFaqItemRow[]): FAQCategory[] {
  const groups = new Map<string, FAQCategory>();

  for (const row of rows) {
    if (!groups.has(row.group_id)) {
      groups.set(row.group_id, {
        id: row.group_id,
        label: row.group_label,
        emoji: row.group_emoji,
        items: [],
      });
    }
    groups.get(row.group_id)!.items.push({
      question: row.question,
      answer: row.answer,
    });
  }

  return Array.from(groups.values());
}
