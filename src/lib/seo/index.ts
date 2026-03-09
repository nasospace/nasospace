/**
 * SEO utility helpers.
 * Provides consistent metadata generation and structured data builders.
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

/* ═══ JSON-LD Structured Data Builders ═══ */

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/og-default.png`,
    description: siteConfig.description,
    sameAs: [siteConfig.social.instagram, siteConfig.social.tiktok],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cairo",
      addressCountry: "EG",
    },
  };
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
  };
}

export function buildFAQSchema(
  items: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  image: string;
  publishedTime: string;
  authorName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: article.url,
    image: article.image,
    datePublished: article.publishedTime,
    author: {
      "@type": article.authorName ? "Person" : "Organization",
      name: article.authorName || siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/og-default.png` },
    },
  };
}

export function buildProductSchema(product: {
  name: string;
  description: string;
  url: string;
  image: string;
  price: number;
  currency: string;
  availability: "InStock" | "OutOfStock" | "LimitedAvailability";
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    url: product.url,
    image: product.image,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency,
      availability: `https://schema.org/${product.availability}`,
    },
  };
}

export function buildEventSchema(event: {
  name: string;
  description: string;
  url: string;
  image?: string;
  startDate?: string;
  location?: string;
  price?: number;
  currency?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    description: event.description,
    url: event.url,
    ...(event.image && { image: event.image }),
    ...(event.startDate && { startDate: event.startDate }),
    ...(event.location && {
      location: {
        "@type": "Place",
        name: event.location,
        address: { "@type": "PostalAddress", addressLocality: event.location },
      },
    }),
    ...(event.price != null && {
      offers: {
        "@type": "Offer",
        price: event.price,
        priceCurrency: event.currency || "EGP",
        availability: "https://schema.org/InStock",
      },
    }),
    organizer: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}
