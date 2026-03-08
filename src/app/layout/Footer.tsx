import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site";
import { ROUTES } from "@/config/routes";
import nasoLogo from "@/assets/naso-logo.png";

export function Footer() {
  const year = new Date().getFullYear();

  const footerNav = [
    { label: "Experiences", href: ROUTES.EXPERIENCES },
    { label: "Workshops", href: ROUTES.WORKSHOPS },
    { label: "Portfolio", href: ROUTES.PORTFOLIO },
    { label: "Blog", href: ROUTES.BLOG },
    { label: "Shop", href: ROUTES.SHOP },
    { label: "Inquiries", href: ROUTES.INQUIRIES },
  ];

  return (
    <footer className="border-t border-border/40 bg-foreground text-background">
      <div className="container py-14 md:py-20">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <img
              src={nasoLogo}
              alt="NASO"
              className="h-10 w-auto brightness-0 invert"
            />
            <p className="mt-4 text-sm leading-relaxed text-background/50">
              {siteConfig.description}
            </p>
            {/* Accent line */}
            <div className="mt-5 h-0.5 w-12 rounded-full bg-primary" />
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-3">
            <p className="font-display text-xs font-semibold tracking-[0.15em] uppercase text-background/30">
              Navigate
            </p>
            {footerNav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="font-display text-sm font-medium text-background/50 transition-colors hover:text-background"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Social */}
          <div className="flex flex-col gap-3">
            <p className="font-display text-xs font-semibold tracking-[0.15em] uppercase text-background/30">
              Follow
            </p>
            {Object.entries(siteConfig.social).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-sm font-medium text-background/50 transition-colors hover:text-background"
              >
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-background/10 pt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-background/30">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-background/20">
            Made with ✦ in Cairo
          </p>
        </div>
      </div>
    </footer>
  );
}
