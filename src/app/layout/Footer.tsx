import { siteConfig } from "@/config/site";

/**
 * Footer — Sprint 0 minimal branded footer.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-foreground text-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
        <p className="font-display text-sm font-medium tracking-wide">
          © {year} {siteConfig.name}. All rights reserved.
        </p>
        <div className="flex gap-6">
          {Object.entries(siteConfig.social).map(([platform, url]) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-background/60 transition-colors hover:text-background"
            >
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
