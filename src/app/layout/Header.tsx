import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ROUTES } from "@/config/routes";
import nasoLogo from "@/assets/naso-logo.png";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

/**
 * Header — Sprint 1 branded navigation.
 * Clean desktop nav + Sheet-based mobile drawer.
 */
export function Header() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  /** All navigable routes for mobile */
  const mobileNav = [
    { label: "Home", href: ROUTES.HOME },
    { label: "Experiences", href: ROUTES.EXPERIENCES },
    { label: "Workshops", href: ROUTES.WORKSHOPS },
    { label: "Blog", href: ROUTES.BLOG },
    { label: "Shop", href: ROUTES.SHOP },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={nasoLogo} alt="NASO" className="h-9 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "font-display text-sm font-medium tracking-wide transition-colors hover:text-foreground",
                pathname === item.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <img src={nasoLogo} alt="NASO" className="h-8 w-auto" />
            </SheetHeader>
            <nav className="mt-8 flex flex-col gap-1">
              {mobileNav.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-2.5 font-display text-base font-medium tracking-wide transition-colors",
                    pathname === item.href
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
