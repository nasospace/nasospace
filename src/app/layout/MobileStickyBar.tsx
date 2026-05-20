import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, ShoppingBag, Sparkles } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function MobileStickyBar() {
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const [nearBottom, setNearBottom] = useState(false);

  useEffect(() => {
    // Reset show state on route change, then fade in
    setShow(false);
    const timer = setTimeout(() => setShow(true), 800);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      // Hide if user is near the bottom (e.g. 150px from bottom) to not obscure footer
      const isNearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 150;
      setNearBottom(isNearBottom);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // Initial check
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Determine context
  const isFormOrAuth = [
    ROUTES.SIGN_IN,
    ROUTES.SIGN_UP,
    ROUTES.FORGOT_PASSWORD,
    ROUTES.RESET_PASSWORD,
    ROUTES.CONTACT,
    ROUTES.INQUIRIES,
    ROUTES.CART,
  ].includes(pathname as any) || pathname.startsWith(ROUTES.ADMIN);

  if (isFormOrAuth) return null;

  let title = "The 100 Chapters";
  let subtitle = "Mysteries await";
  let buttonText = "Explore";
  let linkTo = ROUTES.EXPERIENCES;
  let Icon = ArrowRight;
  let theme = "bg-primary text-white";

  if (pathname.startsWith("/experiences/") && pathname !== ROUTES.EXPERIENCES) {
    title = "Ready to Join?";
    subtitle = "Spots are limited";
    buttonText = "View Cart"; 
    linkTo = ROUTES.CART;
    Icon = ShoppingBag;
    theme = "bg-secondary text-naso-black";
  } else if (pathname === ROUTES.EXPERIENCES) {
    title = "The Archive";
    subtitle = "Discover what's next";
    buttonText = "Join Drop List";
    linkTo = ROUTES.HOME; // The drop list form is on the home page
    Icon = Sparkles;
    theme = "bg-naso-purple text-white";
  } else if (pathname.startsWith("/shop")) {
    title = "NASO Artifacts";
    subtitle = "Take the vibe home";
    buttonText = "Shop Now";
    linkTo = ROUTES.SHOP;
    Icon = ShoppingBag;
    theme = "bg-naso-blue text-white";
  }

  const isVisible = show && !nearBottom;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 z-40 md:hidden"
        >
          <div className="flex items-center justify-between rounded-full border-4 border-foreground bg-white/95 backdrop-blur-md p-2 shadow-[4px_4px_0_hsl(var(--foreground))]">
            <div className="ml-4 flex flex-col">
              <span className="font-groovy text-xs font-black text-foreground leading-tight tracking-tight">{title}</span>
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-foreground/50">{subtitle}</span>
            </div>
            <Link
              to={linkTo}
              className={cn(
                "flex h-11 items-center justify-center gap-2 rounded-full border-2 border-foreground px-5 font-groovy text-[11px] font-black uppercase tracking-wider shadow-[2px_2px_0_hsl(var(--foreground))] transition-all duration-200 active:translate-y-0.5 active:shadow-none whitespace-nowrap",
                theme
              )}
            >
              {buttonText}
              <Icon className="h-3.5 w-3.5 shrink-0" />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
