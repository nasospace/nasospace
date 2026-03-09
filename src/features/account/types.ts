/**
 * Account domain types — NASO user area.
 */
import type { ImageAsset } from "@/types/common";
import type { InquiryType } from "@/features/inquiries/types";

/* ═══ User Profile ═══ */

export interface AccountUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  joinedAt: string;
}

/* ═══ Saved Items ═══ */

export type SavedItemType = "experience" | "workshop" | "product";

export interface SavedItem {
  id: string;
  type: SavedItemType;
  slug: string;
  title: string;
  summary: string;
  coverImage: ImageAsset;
  savedAt: string;
  price?: number;
  currency?: string;
  /** Extra context — e.g. location, date */
  meta?: string;
}

export const SAVED_ITEM_TYPE_META: Record<SavedItemType, { label: string; emoji: string; color: string; textColor: string }> = {
  experience: { label: "Experience", emoji: "🌿", color: "bg-secondary", textColor: "text-secondary-foreground" },
  workshop:   { label: "Workshop",   emoji: "🎨", color: "bg-naso-lilac", textColor: "text-foreground" },
  product:    { label: "Product",    emoji: "🛍️", color: "bg-naso-coral", textColor: "text-foreground" },
};

/* ═══ Request History ═══ */

export type RequestStatus = "sent" | "reviewing" | "contacted" | "completed";

export interface RequestHistoryItem {
  id: string;
  inquiryType: InquiryType;
  itemTitle?: string;
  submittedAt: string;
  status: RequestStatus;
  lastUpdated: string;
  notes?: string;
}

export const REQUEST_STATUS_META: Record<RequestStatus, { label: string; emoji: string; color: string; textColor: string }> = {
  sent:      { label: "Sent",      emoji: "📨", color: "bg-muted",       textColor: "text-muted-foreground" },
  reviewing: { label: "Reviewing", emoji: "👀", color: "bg-naso-lemon",  textColor: "text-foreground" },
  contacted: { label: "Contacted", emoji: "💬", color: "bg-naso-lilac",  textColor: "text-foreground" },
  completed: { label: "Completed", emoji: "✅", color: "bg-secondary",   textColor: "text-secondary-foreground" },
};

/* ═══ Account Nav ═══ */

export interface AccountNavItem {
  label: string;
  href: string;
  emoji: string;
}
