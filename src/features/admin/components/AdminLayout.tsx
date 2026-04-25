/**
 * Admin layout shell with sidebar navigation.
 * Mobile-responsive with collapsible sidebar.
 */
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Heart,
  ExternalLink,
  LogOut,
  PanelLeftClose,
  PanelLeft,
  ShoppingBag,
  Compass,
  Image,
  FileText,
  HelpCircle,
  Quote,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";
import { SEOHead } from "@/components/shared/SEOHead";

const NAV_SECTIONS = [
  {
    label: "Operations",
    items: [
      { label: "Overview", path: "/admin", icon: LayoutDashboard },
      { label: "Inquiries", path: "/admin/inquiries", icon: MessageSquare },
      { label: "Users", path: "/admin/users", icon: Users },
      { label: "Saved Items", path: "/admin/saved", icon: Heart },
    ],
  },
  {
    label: "Content",
    items: [
      { label: "Experiences", path: "/admin/experiences", icon: Compass },
      { label: "Products", path: "/admin/products", icon: ShoppingBag },
      { label: "Portfolio", path: "/admin/portfolio", icon: Image },
      { label: "Blog", path: "/admin/blog", icon: FileText },
      { label: "FAQ", path: "/admin/faq", icon: HelpCircle },
      { label: "Testimonials", path: "/admin/testimonials", icon: Quote },
    ],
  },
];

const QUICK_LINKS = [
  { label: "Homepage", path: "/" },
  { label: "Experiences", path: "/experiences" },
  { label: "Shop", path: "/shop" },
  { label: "Blog", path: "/blog" },
  { label: "Portfolio", path: "/portfolio" },
];

export function AdminLayout() {
  const { pathname } = useLocation();
  const { signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <SEOHead title="Admin — NASO" description="NASO internal dashboard." noindex />
      <div className="flex min-h-screen bg-muted/30">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 flex h-screen w-56 flex-col border-r border-border bg-card transition-transform duration-200 md:sticky md:top-0 md:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex h-14 items-center justify-between border-b border-border px-4">
            <Link to="/admin" className="font-groovy text-sm font-bold tracking-wider">
              NASO Admin
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="rounded-lg p-1 text-muted-foreground hover:text-foreground md:hidden"
              aria-label="Close sidebar"
            >
              <PanelLeftClose className="h-4 w-4" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-3">
            {NAV_SECTIONS.map((section) => (
              <div key={section.label} className="mb-4">
                <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {section.label}
                </p>
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const isActive = pathname === item.path || (item.path !== "/admin" && pathname.startsWith(item.path));
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
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
                </div>
              </div>
            ))}
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
          {/* Mobile header */}
          <div className="sticky top-0 z-30 flex h-12 items-center border-b border-border bg-card px-4 md:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground"
              aria-label="Open sidebar"
            >
              <PanelLeft className="h-5 w-5" />
            </button>
            <span className="ml-3 font-groovy text-xs font-bold tracking-wider">NASO Admin</span>
          </div>
          <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}
