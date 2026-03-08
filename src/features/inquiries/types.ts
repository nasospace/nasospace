/**
 * Inquiry domain types — NASO booking & contact system.
 */

/* ═══ Inquiry Types ═══ */

export const INQUIRY_TYPES = [
  "experience",
  "workshop",
  "custom-event",
  "product",
  "corporate",
  "general",
] as const;

export type InquiryType = (typeof INQUIRY_TYPES)[number];

export interface InquiryTypeMeta {
  label: string;
  emoji: string;
  description: string;
}

export const INQUIRY_TYPE_META: Record<InquiryType, InquiryTypeMeta> = {
  experience: {
    label: "Experience Booking",
    emoji: "🌿",
    description: "Book a specific NASO experience",
  },
  workshop: {
    label: "Workshop Booking",
    emoji: "🎨",
    description: "Reserve a spot in a NASO workshop",
  },
  "custom-event": {
    label: "Custom Event",
    emoji: "🎉",
    description: "Plan a private or custom NASO event",
  },
  product: {
    label: "Product Inquiry",
    emoji: "🛍️",
    description: "Questions about a NASO shop product",
  },
  corporate: {
    label: "Corporate Inquiry",
    emoji: "🏢",
    description: "Team-building, offsites, or branded events",
  },
  general: {
    label: "General Inquiry",
    emoji: "💬",
    description: "Questions, collaborations, or anything else",
  },
};

/* ═══ Form Data ═══ */

export interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  inquiryType: InquiryType;
  preferredDate: string;
  groupSize: string;
  notes: string;
  /** Populated from URL context when booking a specific item */
  itemType?: "experience" | "workshop" | "portfolio" | "product";
  itemSlug?: string;
  itemTitle?: string;
}

/* ═══ Parsed URL Context ═══ */

export interface InquiryPageContext {
  ref: "experience" | "workshop" | "portfolio" | "product" | null;
  slug: string | null;
  title: string | null;
}

/* ═══ Submission result (future backend shape) ═══ */

export interface InquirySubmissionResult {
  success: boolean;
  message: string;
  inquiryId?: string;
}
