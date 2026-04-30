import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, ChevronDown, User, ShoppingBag, LogOut } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ROUTES } from "@/config/routes";
import { useCart } from "@/features/cart";
import { useAuth } from "@/lib/auth";
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex justify-center",
        scrolled ? "pt-4 md:pt-6" : "pt-0"
      )}>
      
      <div className={cn(
        "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-between",
        scrolled 
          ? "h-14 md:h-[64px] w-[95%] md:w-[85%] max-w-6xl rounded-full bg-naso-black/80 backdrop-blur-xl border border-white/10 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)] px-6 md:px-10" 
          : "h-16 md:h-[72px] w-full container px-4 md:px-8 bg-transparent"
      )}>
        {/* Logo — image with hover glow transition */}
        <Link
          to="/"
          className="group flex items-center gap-2 leading-none relative"
          aria-label={`${siteConfig.name} home`}
        >
          <div className="relative flex items-center">
            <img 
              src="/assets/naso-logo.png" 
              alt="NASO" 
              className="h-10 md:h-12 w-auto object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_12px_hsl(var(--primary)/0.8)]"
              onError={(e) => {
                // Fallback to text if image isn't found yet
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            {/* Fallback text just in case the image hasn't been moved yet */}
            <span className="hidden font-groovy text-2xl font-black tracking-tight text-foreground transition-colors group-hover:text-primary md:text-[26px]">
              naso
            </span>
          </div>
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-primary transition-transform duration-300 group-hover:scale-150"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) =>
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "font-groovy text-[11px] font-bold uppercase tracking-[0.12em] transition-colors duration-200 relative group/link py-1",
              scrolled 
                ? (isActive(item.href) ? "text-white" : "text-white/70 hover:text-white")
                : (isActive(item.href) ? "text-foreground" : "text-muted-foreground hover:text-foreground")
            )}>
              {item.label}
              <span className={cn(
                "absolute -bottom-1 left-0 h-[2px] bg-primary transition-all duration-300",
                isActive(item.href) ? "w-full" : "w-0 group-hover/link:w-full"
              )} />
            </Link>
          )}

          {/* More dropdown */}
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger
              className={cn(
                "inline-flex items-center gap-1 font-groovy text-[11px] font-bold uppercase tracking-[0.12em] transition-colors duration-200 outline-none group/link py-1 relative",
                scrolled
                  ? (moreIsActive ? "text-white" : "text-white/70 hover:text-white")
                  : (moreIsActive ? "text-foreground" : "text-muted-foreground hover:text-foreground")
              )}>
              
              More <ChevronDown className="h-3 w-3 transition-transform group-data-[state=open]/link:rotate-180" />
              <span className={cn(
                "absolute -bottom-1 left-0 h-[2px] bg-primary transition-all duration-300",
                moreIsActive ? "w-full" : "w-0 group-hover/link:w-full"
              )} />
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
              "relative ml-2 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300",
              scrolled
                ? (isActive(ROUTES.CART) ? "bg-primary text-naso-black" : "text-white/70 hover:text-white hover:bg-white/10")
                : (isActive(ROUTES.CART) ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground hover:bg-foreground/5")
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
                "ml-1 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 outline-none",
                scrolled
                  ? (isActive(ROUTES.ACCOUNT) ? "bg-primary text-naso-black" : "text-white/70 hover:text-white hover:bg-white/10")
                  : (isActive(ROUTES.ACCOUNT) ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground hover:bg-foreground/5")
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
            className={cn(
              "ml-1 inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-groovy text-[10px] font-bold uppercase tracking-wider transition-all duration-300",
              scrolled
                ? "bg-primary text-naso-black hover:bg-primary/90 hover:scale-105 shadow-[0_0_15px_hsl(var(--primary)/0.4)]"
                : "border border-border text-muted-foreground hover:border-foreground hover:text-foreground"
            )}>
            
              Sign In
            </Link>
          }
        </nav>

        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            to={ROUTES.CART}
            className={cn(
              "relative flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300",
              scrolled
                ? (isActive(ROUTES.CART) ? "bg-primary text-naso-black" : "text-white/80 hover:text-white hover:bg-white/10")
                : (isActive(ROUTES.CART) ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground hover:bg-foreground/5")
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
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "md:hidden h-9 w-9 rounded-full transition-colors",
                  scrolled ? "text-white hover:bg-white/10" : ""
                )} 
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-background p-0">
              <SheetHeader className="p-6 pb-0">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <div className="flex items-center gap-2">
                  <img 
                    src="/assets/naso-logo.png" 
                    alt="NASO" 
                    className="h-10 w-auto object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <span className="hidden font-groovy text-2xl font-black tracking-tight text-foreground">
                    naso
                  </span>
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary" />
                </div>
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