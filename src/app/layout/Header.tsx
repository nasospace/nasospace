import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, ChevronDown, User, ShoppingBag, LogOut } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ROUTES } from "@/config/routes";
import { useCart } from "@/features/cart";
import { useAuth } from "@/lib/auth";
import nasoLogo from "@/assets/naso-logo.png";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger } from
"@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger } from
"@/components/ui/dropdown-menu";

export function Header() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { getItemCount } = useCart();
  const { isAuthenticated, user, signOut } = useAuth();
  const cartCount = getItemCount();

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
        scrolled ?
        "bg-background/95 backdrop-blur-md shadow-soft border-b border-border/50" :
        "bg-transparent"
      )}>
      
      <div className="container flex h-16 items-center justify-between md:h-[72px]">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={nasoLogo} alt={siteConfig.name} className="h-8 w-auto transition-all duration-300 md:h-9" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) =>
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "font-groovy text-[11px] font-bold uppercase tracking-[0.12em] transition-colors duration-200",
              isActive(item.href) ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            )}>
            
              {item.label}
            </Link>
          )}

          {/* More dropdown */}
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger
              className={cn(
                "inline-flex items-center gap-1 font-groovy text-[11px] font-bold uppercase tracking-[0.12em] transition-colors duration-200 outline-none",
                moreIsActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}>
              
              More <ChevronDown className="h-3 w-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[180px]">
              {siteConfig.moreNav.map((item) =>
              <DropdownMenuItem key={item.href} asChild>
                  <Link to={item.href} className={cn("w-full font-display text-sm", isActive(item.href) && "font-semibold")}>
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Cart */}
          <Link
            to={ROUTES.CART}
            className={cn(
              "relative ml-2 flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-200",
              isActive(ROUTES.CART) ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
            )}
            aria-label="Your cart">
            
            <ShoppingBag className="h-4 w-4" />
            {cartCount > 0 &&
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            }
          </Link>

          {/* Account / Auth */}
          {isAuthenticated ?
          <DropdownMenu modal={false}>
              <DropdownMenuTrigger
              className={cn(
                "ml-1 flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-200 outline-none",
                isActive(ROUTES.ACCOUNT) ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              )}
              aria-label="Your account">
              
                <User className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[180px]">
                <div className="px-3 py-2">
                  <p className="truncate font-display text-sm font-medium">{user?.user_metadata?.display_name || "Explorer"}</p>
                  <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={ROUTES.ACCOUNT} className="w-full font-display text-sm">Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={ROUTES.ACCOUNT_SAVED} className="w-full font-display text-sm">Saved Items</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()} className="font-display text-sm text-destructive">
                  <LogOut className="mr-2 h-3.5 w-3.5" /> Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> :

          <Link
            to={ROUTES.SIGN_IN}
            className="ml-1 inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 font-groovy text-[10px] font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:border-foreground hover:text-foreground">
            
              Sign In
            </Link>
          }
        </nav>

        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            to={ROUTES.CART}
            className={cn(
              "relative flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-200",
              isActive(ROUTES.CART) ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
            )}
            aria-label="Your cart">
            
            <ShoppingBag className="h-4 w-4" />
            {cartCount > 0 &&
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            }
          </Link>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-background p-0">
              <SheetHeader className="p-6 pb-0">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <img alt={siteConfig.name} className="h-8 w-auto object-contain bg-secondary" src={nasoLogo} />
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-1 px-4">
                {allMobileNav.map((item) =>
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-lg px-4 py-3 font-display text-sm font-medium tracking-wide transition-colors",
                    isActive(item.href) ? "bg-foreground/5 text-foreground" : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                  )}>
                  
                    {item.label}
                  </Link>
                )}

                <div className="mx-4 my-2 border-t border-border" />

                {isAuthenticated ?
                <>
                    <Link
                    to={ROUTES.ACCOUNT}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-4 py-3 font-display text-sm font-medium tracking-wide transition-colors",
                      isActive(ROUTES.ACCOUNT) ? "bg-foreground/5 text-foreground" : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                    )}>
                    
                      <User className="h-4 w-4" /> Account
                    </Link>
                    <button
                    onClick={() => {signOut();setMobileOpen(false);}}
                    className="flex items-center gap-2 rounded-lg px-4 py-3 font-display text-sm font-medium tracking-wide text-destructive transition-colors hover:bg-destructive/5">
                    
                      <LogOut className="h-4 w-4" /> Sign Out
                    </button>
                  </> :

                <Link
                  to={ROUTES.SIGN_IN}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-4 py-3 font-display text-sm font-medium tracking-wide text-primary transition-colors hover:bg-primary/5">
                  
                    <User className="h-4 w-4" /> Sign In
                  </Link>
                }
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>);

}