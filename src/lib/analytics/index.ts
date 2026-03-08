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
  },
  page(name) {
    if (import.meta.env.DEV) {
      console.debug("[Analytics] page:", name);
    }
  },
};
