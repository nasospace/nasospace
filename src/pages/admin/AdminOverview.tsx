/**
 * Admin Overview — dashboard with stats, recent activity, content ops shortcuts.
 */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MessageSquare, Users, Heart, Clock, ArrowRight, ExternalLink,
  Palette, Calendar, ShoppingBag, Image, Newspaper,
} from "lucide-react";
import {
  getOverviewStats, getInquiries, getTopSavedItems,
  type AdminOverviewStats, type AdminInquiry, type TopSavedItem,
} from "@/server/services/admin";

const CONTENT_LINKS = [
  { label: "Experiences", path: "/experiences", icon: Calendar },
  { label: "Shop", path: "/shop", icon: ShoppingBag },
  { label: "Portfolio", path: "/portfolio", icon: Image },
  { label: "Blog", path: "/blog", icon: Newspaper },
  { label: "Community Love", path: "/community-love", icon: Heart },
];

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<AdminOverviewStats | null>(null);
  const [recentInquiries, setRecentInquiries] = useState<AdminInquiry[]>([]);
  const [topSaved, setTopSaved] = useState<TopSavedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getOverviewStats(),
      getInquiries({ limit: 5 }),
      getTopSavedItems(5),
    ]).then(([statsData, inquiriesData, topSavedData]) => {
      setStats(statsData);
      setRecentInquiries(inquiriesData.data);
      setTopSaved(topSavedData);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-groovy text-2xl font-bold">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">NASO operations overview</p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={MessageSquare} label="Total Inquiries" value={stats?.totalInquiries ?? 0} link="/admin/inquiries" />
        <StatCard icon={Clock} label="Pending" value={stats?.pendingInquiries ?? 0} accent link="/admin/inquiries" />
        <StatCard icon={Users} label="Users" value={stats?.totalProfiles ?? 0} link="/admin/users" />
        <StatCard icon={Heart} label="Saved Items" value={stats?.totalSavedItems ?? 0} link="/admin/saved" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent inquiries */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-sm font-semibold">Recent Inquiries</h2>
            <Link to="/admin/inquiries" className="flex items-center gap-1 text-xs text-primary hover:underline">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          {recentInquiries.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">No inquiries yet.</p>
          ) : (
            <div className="mt-3 space-y-2">
              {recentInquiries.map((inq) => (
                <Link
                  key={inq.id}
                  to="/admin/inquiries"
                  className="flex items-start justify-between gap-3 rounded-lg border border-border/50 p-3 transition-colors hover:bg-muted/30"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{inq.name}</p>
                    <p className="text-xs text-muted-foreground">
                      <span className="capitalize">{inq.inquiry_type}</span>
                      {inq.item_title ? ` — ${inq.item_title}` : ""}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <StatusBadge status={inq.status} />
                    <p className="mt-1 text-[10px] text-muted-foreground">
                      {new Date(inq.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Top saved items — demand signals */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-sm font-semibold">Top Saved Items</h2>
            <Link to="/admin/saved" className="flex items-center gap-1 text-xs text-primary hover:underline">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          {topSaved.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">No saved items yet.</p>
          ) : (
            <div className="mt-3 space-y-2">
              {topSaved.map((item) => (
                <div key={`${item.item_type}:${item.item_slug}`} className="flex items-center justify-between rounded-lg border border-border/50 p-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium capitalize">{item.item_slug.replace(/-/g, " ")}</p>
                    <p className="text-xs capitalize text-muted-foreground">{item.item_type}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                    {item.count} {item.count === 1 ? "save" : "saves"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content ops quick links */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="font-display text-sm font-semibold">Content Quick Links</h2>
        <p className="mt-1 text-xs text-muted-foreground">Jump to public content sections to verify and review.</p>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {CONTENT_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              target="_blank"
              className="flex items-center gap-2 rounded-lg border border-border/50 px-3 py-2.5 text-sm transition-colors hover:bg-muted/40"
            >
              <link.icon className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs font-medium">{link.label}</span>
              <ExternalLink className="ml-auto h-3 w-3 text-muted-foreground/50" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, accent, link }: { icon: React.ElementType; label: string; value: number; accent?: boolean; link?: string }) {
  const content = (
    <div className={`rounded-xl border border-border bg-card p-4 transition-colors ${link ? "hover:bg-muted/30" : ""}`}>
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span className="text-xs font-medium">{label}</span>
      </div>
      <p className={`mt-2 text-2xl font-bold ${accent && value > 0 ? "text-primary" : "text-foreground"}`}>
        {value}
      </p>
    </div>
  );
  return link ? <Link to={link}>{content}</Link> : content;
}

export function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    sent: "bg-primary/10 text-primary",
    reviewing: "bg-accent/20 text-accent-foreground",
    contacted: "bg-secondary/30 text-secondary-foreground",
    completed: "bg-muted text-muted-foreground",
  };
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${styles[status] ?? "bg-muted text-muted-foreground"}`}>
      {status}
    </span>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-8">
      <div>
        <div className="h-8 w-40 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-4 w-60 animate-pulse rounded bg-muted" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-xl border border-border bg-card" />
        ))}
      </div>
    </div>
  );
}
