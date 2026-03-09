/**
 * Admin Overview — dashboard with key metrics and recent activity.
 */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MessageSquare, Users, Heart, Clock, ArrowRight } from "lucide-react";
import { getOverviewStats, getInquiries, type AdminOverviewStats, type AdminInquiry } from "@/server/services/admin";

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<AdminOverviewStats | null>(null);
  const [recentInquiries, setRecentInquiries] = useState<AdminInquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getOverviewStats(),
      getInquiries({ limit: 5 }),
    ]).then(([statsData, inquiriesData]) => {
      setStats(statsData);
      setRecentInquiries(inquiriesData.data);
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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={MessageSquare} label="Total Inquiries" value={stats?.totalInquiries ?? 0} />
        <StatCard icon={Clock} label="Pending" value={stats?.pendingInquiries ?? 0} accent />
        <StatCard icon={Users} label="Users" value={stats?.totalProfiles ?? 0} />
        <StatCard icon={Heart} label="Saved Items" value={stats?.totalSavedItems ?? 0} />
      </div>

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
          <div className="mt-4 space-y-3">
            {recentInquiries.map((inq) => (
              <div key={inq.id} className="flex items-start justify-between gap-4 rounded-lg border border-border/50 p-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{inq.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {inq.inquiry_type}{inq.item_title ? ` — ${inq.item_title}` : ""}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <StatusBadge status={inq.status} />
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    {new Date(inq.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, accent }: { icon: React.ElementType; label: string; value: number; accent?: boolean }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span className="text-xs font-medium">{label}</span>
      </div>
      <p className={`mt-2 text-2xl font-bold ${accent && value > 0 ? "text-primary" : "text-foreground"}`}>
        {value}
      </p>
    </div>
  );
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
