import { useState, useEffect } from "react";
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

export function Header() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const mobileNav = [
    { label: "Home", href: ROUTES.HOME },
    { label: "Experiences", href: ROUTES.EXPERIENCES },
    { label: "Workshops", href: ROUTES.WORKSHOPS },
    { label: "Blog", href: ROUTES.BLOG },
    { label: "Shop", href: ROUTES.SHOP },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/40 bg-background/90 backdrop-blur-lg shadow-soft"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-18 items-center justify-between md:h-20">
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-3">
          <img
            src={nasoLogo}
            alt="NASO"
            className="h-10 w-auto transition-transform duration-300 group-hover:scale-105 md:h-12"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "relative rounded-full px-4 py-2 font-display text-sm font-medium tracking-wide transition-all duration-200",
                pathname === item.href
                  ? "bg-foreground text-background"
                  : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 border-l-0 bg-foreground p-0">
            <SheetHeader className="p-6 pb-0">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <img src={nasoLogo} alt="NASO" className="h-10 w-auto brightness-0 invert" />
            </SheetHeader>
            <nav className="mt-8 flex flex-col gap-0.5 px-4">
              {mobileNav.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-lg px-4 py-3.5 font-display text-base font-medium tracking-wide transition-colors",
                    pathname === item.href
                      ? "bg-background/10 text-background"
                      : "text-background/60 hover:bg-background/5 hover:text-background"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            {/* Brand accent in drawer */}
            <div className="absolute bottom-8 left-4 right-4">
              <div className="h-1 w-16 rounded-full bg-primary" />
              <p className="mt-3 font-display text-xs tracking-widest text-background/30 uppercase">
                Cairo, Egypt
              </p>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
