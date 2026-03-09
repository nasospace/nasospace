import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, ChevronDown, User } from "lucide-react";
import { siteConfig } from "@/config/site";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const moreIsActive = siteConfig.moreNav.some((item) => isActive(item.href));

  const allMobileNav = [...siteConfig.nav, ...siteConfig.moreNav];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-soft border-b border-border/50"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between md:h-[72px]">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={nasoLogo}
            alt={siteConfig.name}
            className="h-8 w-auto transition-all duration-300 md:h-9"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "font-groovy text-[11px] font-bold uppercase tracking-[0.12em] transition-colors duration-200",
                isActive(item.href)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}

          {/* More dropdown */}
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger
              className={cn(
                "inline-flex items-center gap-1 font-groovy text-[11px] font-bold uppercase tracking-[0.12em] transition-colors duration-200 outline-none",
                moreIsActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              More
              <ChevronDown className="h-3 w-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[180px]">
              {siteConfig.moreNav.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link
                    to={item.href}
                    className={cn(
                      "w-full font-display text-sm",
                      isActive(item.href) && "font-semibold"
                    )}
                  >
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Account icon */}
          <Link
            to="/account"
            className={cn(
              "ml-2 flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-200",
              isActive("/account")
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
            )}
            aria-label="Your account"
          >
            <User className="h-4 w-4" />
          </Link>
        </nav>

        {/* Mobile: account icon + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            to="/account"
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-200",
              isActive("/account")
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
            )}
            aria-label="Your account"
          >
            <User className="h-4 w-4" />
          </Link>
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
          <SheetContent side="right" className="w-72 bg-background p-0">
            <SheetHeader className="p-6 pb-0">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <img src={nasoLogo} alt={siteConfig.name} className="h-8 w-auto" />
            </SheetHeader>
            <nav className="mt-8 flex flex-col gap-1 px-4">
              {allMobileNav.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-lg px-4 py-3 font-display text-sm font-medium tracking-wide transition-colors",
                    isActive(item.href)
                      ? "bg-foreground/5 text-foreground"
                      : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}

              {/* Account link in mobile menu */}
              <div className="mx-4 my-2 border-t border-border" />
              <Link
                to="/account"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-4 py-3 font-display text-sm font-medium tracking-wide transition-colors",
                  isActive("/account")
                    ? "bg-foreground/5 text-foreground"
                    : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                )}
              >
                <User className="h-4 w-4" />
                Account
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        </div>
      </div>
    </header>
  );
}
