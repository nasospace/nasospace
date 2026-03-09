import { Helmet } from "react-helmet-async";
import { siteConfig } from "@/config/site";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  noindex?: boolean;
  /** JSON-LD structured data object — will be serialized as a script tag */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** For article pages */
  article?: {
    publishedTime?: string;
    author?: string;
    tags?: string[];
  };
}

/**
 * Sets document head meta tags for SEO using react-helmet-async.
 * Handles title, description, Open Graph, Twitter Cards, canonical, noindex, and JSON-LD.
 */
export function SEOHead({
  title,
  description,
  canonical,
  ogImage = "/og-default.png",
  ogType = "website",
  noindex = false,
  jsonLd,
  article,
}: SEOHeadProps) {
  // Build absolute URLs
  const baseUrl = siteConfig.url;
  const absoluteOgImage = ogImage.startsWith("http")
    ? ogImage
    : `${baseUrl}${ogImage}`;
  const absoluteCanonical = canonical
    ? canonical.startsWith("http")
      ? canonical
      : `${baseUrl}${canonical}`
    : undefined;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={absoluteOgImage} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:locale" content={siteConfig.locale} />
      {absoluteCanonical && <meta property="og:url" content={absoluteCanonical} />}

      {/* Article metadata */}
      {ogType === "article" && article?.publishedTime && (
        <meta property="article:published_time" content={article.publishedTime} />
      )}
      {ogType === "article" && article?.author && (
        <meta property="article:author" content={article.author} />
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteOgImage} />

      {/* Canonical */}
      {absoluteCanonical && <link rel="canonical" href={absoluteCanonical} />}

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
