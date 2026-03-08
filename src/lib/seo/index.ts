/**
 * SEO utility helpers.
 * Provides consistent metadata generation across pages.
 */

import type { SEOMeta } from "@/types/common";
import { siteConfig } from "@/config/site";

export function buildPageTitle(pageTitle?: string): string {
  if (!pageTitle) return siteConfig.name;
  return `${pageTitle} — ${siteConfig.name}`;
}

export function buildSEOMeta(overrides: Partial<SEOMeta> = {}): SEOMeta {
  return {
    title: buildPageTitle(overrides.title),
    description: overrides.description ?? siteConfig.description,
    ogImage: overrides.ogImage,
    canonical: overrides.canonical,
  };
}
