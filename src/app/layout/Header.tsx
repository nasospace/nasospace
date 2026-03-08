import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site";
import nasoLogo from "@/assets/naso-logo.png";

/**
 * Header — Sprint 0 branded placeholder.
 * Clean, minimal, shows logo + nav links using brand tokens.
 * Will be replaced with a full navigation system in a later sprint.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={nasoLogo} alt="NASO" className="h-10 w-auto" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="font-display text-sm font-medium tracking-wide text-foreground/70 transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
