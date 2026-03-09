import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/config/routes";
import type { AccountNavItem } from "../types";

const NAV_ITEMS: AccountNavItem[] = [
  { label: "Overview", href: ROUTES.ACCOUNT, emoji: "🏠" },
  { label: "Saved", href: ROUTES.ACCOUNT_SAVED, emoji: "♥" },
  { label: "Requests", href: ROUTES.ACCOUNT_REQUESTS, emoji: "📋" },
  { label: "Settings", href: ROUTES.ACCOUNT_SETTINGS, emoji: "⚙️" },
];

export function AccountNav() {
  const { pathname } = useLocation();

  const isActive = (href: string) =>
    href === ROUTES.ACCOUNT ? pathname === ROUTES.ACCOUNT : pathname.startsWith(href);

  return (
    <nav className="naso-scrollbar-hide flex gap-2 overflow-x-auto pb-1">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 font-display text-sm font-medium transition-all duration-200",
            isActive(item.href)
              ? "bg-foreground text-background shadow-sm"
              : "bg-muted text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
          )}
        >
          <span className="text-xs">{item.emoji}</span>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
