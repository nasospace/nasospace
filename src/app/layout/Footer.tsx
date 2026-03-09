import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site";
import { ROUTES } from "@/config/routes";
import nasoLogo from "@/assets/naso-logo.png";
import { Sparkle, FlowerShape } from "@/components/shared/RetroElements";

export function Footer() {
  const year = new Date().getFullYear();

  const footerNav = [
    { label: "About", href: ROUTES.ABOUT },
    { label: "Experiences", href: ROUTES.EXPERIENCES },
    { label: "Workshops", href: ROUTES.WORKSHOPS },
    { label: "Portfolio", href: ROUTES.PORTFOLIO },
    { label: "Blog", href: ROUTES.BLOG },
    { label: "Shop", href: ROUTES.SHOP },
    { label: "Community Love", href: ROUTES.COMMUNITY_LOVE },
    { label: "FAQ", href: ROUTES.FAQ },
    { label: "Contact", href: ROUTES.CONTACT },
  ];

  return (
    <footer className="relative border-t-[2.5px] border-foreground bg-foreground text-background overflow-hidden">
      <div className="absolute inset-0 naso-dotgrid opacity-[0.06]" />
      <div className="absolute inset-0 naso-noise opacity-30" />
      
      <div className="container relative z-10 py-14 md:py-20">
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
            {/* Accent divider */}
            <div className="mt-5 flex items-center gap-2">
              <span className="h-0.5 w-8 rounded-full bg-primary" />
              <Sparkle className="h-2.5 w-2.5 text-secondary" />
              <span className="h-0.5 w-4 rounded-full bg-secondary" />
            </div>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-3">
            <p className="font-groovy text-[9px] font-bold tracking-[0.2em] uppercase text-background/30">
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
            <p className="font-groovy text-[9px] font-bold tracking-[0.2em] uppercase text-background/30">
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
          <p className="flex items-center gap-1.5 text-xs text-background/20">
            Made with <Sparkle className="h-2 w-2 text-secondary/40" /> in Cairo
          </p>
        </div>
      </div>

      {/* Decorative corner flower */}
      <div className="absolute -bottom-6 -right-6 opacity-[0.04]">
        <FlowerShape size={120} className="text-background" />
      </div>
    </footer>
  );
}
