/**
 * Mock account data — pulls real items from the NASO ecosystem.
 * When auth/backend is added, replace these with API calls in useAccountData.
 */
import type { AccountUser, SavedItem, RequestHistoryItem } from "./types";
import { MOCK_EXPERIENCES } from "@/features/experiences/data";
import { MOCK_WORKSHOPS } from "@/features/workshops/data";
import { MOCK_PRODUCTS } from "@/features/shop/data";

/* ═══ Mock User ═══ */

export const MOCK_USER: AccountUser = {
  id: "user-001",
  name: "Nour",
  email: "nour@naso.co",
  joinedAt: "2025-09-15",
};

/* ═══ Mock Saved Items — from real NASO data ═══ */

const exp1 = MOCK_EXPERIENCES[0]; // Sunset at the Citadel
const exp2 = MOCK_EXPERIENCES[6]; // Rooftop Film Club
const ws1 = MOCK_WORKSHOPS[0];   // Pottery & Chill
const ws2 = MOCK_WORKSHOPS[3];   // Beat-Making Lab
const prod1 = MOCK_PRODUCTS[0];  // NASO Classic Tee
const prod2 = MOCK_PRODUCTS[5];  // Muizz Street Print

export const MOCK_SAVED_ITEMS: SavedItem[] = [
  {
    id: "saved-1",
    type: "experience",
    slug: exp1.slug,
    title: exp1.title,
    summary: exp1.summary,
    coverImage: exp1.coverImage,
    savedAt: "2026-03-01",
    price: exp1.price,
    currency: exp1.currency,
    meta: exp1.location,
  },
  {
    id: "saved-2",
    type: "workshop",
    slug: ws1.slug,
    title: ws1.title,
    summary: ws1.summary,
    coverImage: ws1.coverImage,
    savedAt: "2026-02-28",
    price: ws1.price,
    currency: ws1.currency,
    meta: ws1.location,
  },
  {
    id: "saved-3",
    type: "product",
    slug: prod1.slug,
    title: prod1.title,
    summary: prod1.summary,
    coverImage: prod1.coverImage,
    savedAt: "2026-02-25",
    price: prod1.price,
    currency: prod1.currency,
  },
  {
    id: "saved-4",
    type: "experience",
    slug: exp2.slug,
    title: exp2.title,
    summary: exp2.summary,
    coverImage: exp2.coverImage,
    savedAt: "2026-02-20",
    price: exp2.price,
    currency: exp2.currency,
    meta: exp2.location,
  },
  {
    id: "saved-5",
    type: "workshop",
    slug: ws2.slug,
    title: ws2.title,
    summary: ws2.summary,
    coverImage: ws2.coverImage,
    savedAt: "2026-02-18",
    price: ws2.price,
    currency: ws2.currency,
    meta: ws2.location,
  },
  {
    id: "saved-6",
    type: "product",
    slug: prod2.slug,
    title: prod2.title,
    summary: prod2.summary,
    coverImage: prod2.coverImage,
    savedAt: "2026-02-15",
    price: prod2.price,
    currency: prod2.currency,
  },
];

/* ═══ Mock Request History ═══ */

export const MOCK_REQUESTS: RequestHistoryItem[] = [
  {
    id: "req-001",
    inquiryType: "experience",
    itemTitle: "Sunset at the Citadel",
    submittedAt: "2026-03-05",
    status: "reviewing",
    lastUpdated: "2026-03-06",
    notes: "We're checking availability for your preferred date.",
  },
  {
    id: "req-002",
    inquiryType: "workshop",
    itemTitle: "Pottery & Chill",
    submittedAt: "2026-02-20",
    status: "contacted",
    lastUpdated: "2026-02-22",
    notes: "Spot confirmed! Check your email for details.",
  },
  {
    id: "req-003",
    inquiryType: "custom-event",
    itemTitle: "Team Offsite — Creative Day",
    submittedAt: "2026-01-15",
    status: "completed",
    lastUpdated: "2026-02-01",
  },
  {
    id: "req-004",
    inquiryType: "general",
    submittedAt: "2026-03-08",
    status: "sent",
    lastUpdated: "2026-03-08",
  },
];
