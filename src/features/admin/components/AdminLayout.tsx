/**
 * Admin layout shell with sidebar navigation.
 */
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Heart,
  ExternalLink,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";

const NAV_ITEMS = [
  { label: "Overview", path: "/admin", icon: LayoutDashboard },
  { label: "Inquiries", path: "/admin/inquiries", icon: MessageSquare },
  { label: "Users", path: "/admin/users", icon: Users },
  { label: "Saved Items", path: "/admin/saved", icon: Heart },
];

const QUICK_LINKS = [
  { label: "Homepage", path: "/" },
  { label: "Experiences", path: "/experiences" },
  { label: "Workshops", path: "/workshops" },
  { label: "Shop", path: "/shop" },
  { label: "Blog", path: "/blog" },
  { label: "Portfolio", path: "/portfolio" },
];

export function AdminLayout() {
  const { pathname } = useLocation();
  const { signOut } = useAuth();

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="sticky top-0 flex h-screen w-56 shrink-0 flex-col border-r border-border bg-card">
        <div className="flex h-14 items-center border-b border-border px-4">
          <Link to="/admin" className="font-groovy text-sm font-bold tracking-wider">
            NASO Admin
          </Link>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path || (item.path !== "/admin" && pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Quick links */}
        <div className="border-t border-border p-3">
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Quick Links
          </p>
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              target="_blank"
              className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <ExternalLink className="h-3 w-3" />
              {link.label}
            </Link>
          ))}
        </div>

        {/* Sign out */}
        <div className="border-t border-border p-3">
          <button
            onClick={() => signOut()}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-5xl p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
