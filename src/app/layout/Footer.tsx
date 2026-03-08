import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site";
import { ROUTES } from "@/config/routes";

/**
 * Footer — Sprint 1 branded footer.
 * Minimal with nav links, social, and copyright.
 */
export function Footer() {
  const year = new Date().getFullYear();

  const footerNav = [
    { label: "Experiences", href: ROUTES.EXPERIENCES },
    { label: "Workshops", href: ROUTES.WORKSHOPS },
    { label: "Blog", href: ROUTES.BLOG },
    { label: "Shop", href: ROUTES.SHOP },
    { label: "Inquiries", href: ROUTES.INQUIRIES },
  ];

  return (
    <footer className="border-t border-border/40 bg-foreground text-background">
      <div className="container py-12 md:py-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div>
            <p className="font-display text-xl font-bold tracking-tight">
              {siteConfig.name}
            </p>
            <p className="mt-1 max-w-xs text-sm text-background/60">
              {siteConfig.description}
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-x-8 gap-y-2">
            {footerNav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="font-display text-sm font-medium text-background/60 transition-colors hover:text-background"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Social */}
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

        <div className="mt-12 border-t border-background/10 pt-6">
          <p className="text-xs text-background/40">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
