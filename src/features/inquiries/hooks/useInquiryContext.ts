import { useSearchParams } from "react-router-dom";
import type { InquiryPageContext, InquiryType } from "../types";

/**
 * Parse inquiry context from URL search params.
 * Example: /inquiries?ref=workshop&slug=pottery-and-chill&title=Pottery+%26+Chill
 */
export function useInquiryContext(): InquiryPageContext {
  const [searchParams] = useSearchParams();

  const ref = searchParams.get("ref");
  const slug = searchParams.get("slug");
  const title = searchParams.get("title");

  return {
    ref: ref === "experience" || ref === "workshop" || ref === "portfolio" || ref === "product" ? ref : null,
    slug: slug || null,
    title: title ? decodeURIComponent(title) : null,
  };
}

/** Map URL ref to inquiry type */
export function contextToInquiryType(ref: string | null): InquiryType {
  if (ref === "experience") return "experience";
  if (ref === "workshop") return "workshop";
  if (ref === "portfolio") return "custom-event";
  return "general";
}
