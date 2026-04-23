/**
 * Analytics abstraction layer.
 * Wire up GA, Mixpanel, PostHog, etc. behind this interface.
 */

export interface AnalyticsClient {
  track(event: string, properties?: Record<string, unknown>): void;
  page(name: string): void;
}

export const analyticsClient: AnalyticsClient = {
  track(event, properties) {
    if (import.meta.env.DEV) {
      console.debug("[Analytics] track:", event, properties);
    }
    // Production: forward to your provider here
    // e.g. posthog.capture(event, properties);
  },
  page(name) {
    if (import.meta.env.DEV) {
      console.debug("[Analytics] page:", name);
    }
  },
};

/* ═══ Typed NASO Event Catalog ═══ */

export type NasoEvent =
  | "hero_cta_click"
  | "experience_cta_click"
  | "workshop_cta_click"
  | "product_add_to_cart"
  | "share_group_chat"
  | "vibe_quiz_started"
  | "vibe_quiz_completed"
  | "vibe_quiz_shared"
  | "vibe_quiz_retake"
  | "drop_list_signup"
  | "checkout_intent"
  | "checkout_submitted"
  | "diy_kit_cta_click"
  | "counter_cta_click"
  | "easter_egg_found";

/**
 * Type-safe analytics helper for NASO-specific events.
 * Usage: trackNaso("vibe_quiz_completed", { result: "The Creative Introvert" });
 */
export function trackNaso(event: NasoEvent, properties?: Record<string, unknown>) {
  analyticsClient.track(event, properties);
}
