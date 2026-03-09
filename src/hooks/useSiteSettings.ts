/**
 * CMS-backed hook for site settings.
 */
import { useQuery } from "@tanstack/react-query";
import { cmsSiteSettings } from "@/lib/cms";

export interface SiteSettings {
  site: { name: string; description: string; url: string; locale: string };
  social: { instagram: string; tiktok: string };
  footer: { tagline: string; copyright: string };
}

const DEFAULTS: SiteSettings = {
  site: { name: "NASO", description: "Premium creative experiences, workshops, events, and products from Cairo.", url: "https://naso.co", locale: "en" },
  social: { instagram: "https://instagram.com/naso", tiktok: "https://tiktok.com/@naso" },
  footer: { tagline: "Cairo's creative playground.", copyright: "© 2026 NASO. All rights reserved." },
};

export function useSiteSettings() {
  return useQuery({
    queryKey: ["cms", "site-settings"],
    queryFn: async (): Promise<SiteSettings> => {
      const all = await cmsSiteSettings.getAll();
      return {
        site: { ...DEFAULTS.site, ...(all.site as Partial<SiteSettings["site"]> ?? {}) },
        social: { ...DEFAULTS.social, ...(all.social as Partial<SiteSettings["social"]> ?? {}) },
        footer: { ...DEFAULTS.footer, ...(all.footer as Partial<SiteSettings["footer"]> ?? {}) },
      };
    },
    staleTime: 10 * 60_000,
  });
}
