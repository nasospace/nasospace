/**
 * Admin Saved Items — demand signals with top items, aggregates, and recent activity.
 */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getSavedItemsSignals, getSavedItemsAggregates, getTopSavedItems,
  type SavedItemSignal, type SavedItemAggregate, type TopSavedItem,
} from "@/server/services/admin";
import { ExternalLink, TrendingUp } from "lucide-react";
import { routeHelpers } from "@/config/routes";

export default function AdminSavedItemsPage() {
  const [signals, setSignals] = useState<SavedItemSignal[]>([]);
  const [aggregates, setAggregates] = useState<SavedItemAggregate[]>([]);
  const [topItems, setTopItems] = useState<TopSavedItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getSavedItemsSignals({ limit: 30 }),
      getSavedItemsAggregates(),
      getTopSavedItems(10),
    ]).then(([signalsRes, aggRes, topRes]) => {
      setSignals(signalsRes.data);
      setTotalCount(signalsRes.count);
      setAggregates(aggRes);
      setTopItems(topRes);
      setLoading(false);
    });
  }, []);

  const getPublicLink = (type: string, slug: string): string | null => {
    const helpers: Record<string, (s: string) => string> = {
      experience: routeHelpers.experienceDetail,
      workshop: routeHelpers.workshopDetail,
      portfolio: routeHelpers.portfolioDetail,
      product: routeHelpers.shopDetail,
    };
    return helpers[type]?.(slug) ?? null;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-groovy text-2xl font-bold">Saved Items</h1>
        <p className="mt-1 text-sm text-muted-foreground">{totalCount} total saves — demand signals across all users</p>
      </div>

      {loading ? (
        <div className="p-8 text-center text-sm text-muted-foreground">Loading…</div>
      ) : (
        <>
          {/* Top items + aggregates row */}
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Top saved items */}
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <h2 className="font-display text-sm font-semibold">Most Saved</h2>
              </div>
              {topItems.length === 0 ? (
                <p className="mt-3 text-sm text-muted-foreground">No data yet.</p>
              ) : (
                <div className="mt-3 space-y-2">
                  {topItems.map((item, i) => {
                    const link = getPublicLink(item.item_type, item.item_slug);
                    return (
                      <div key={`${item.item_type}:${item.item_slug}`} className="flex items-center gap-3">
                        <span className="w-5 text-right text-xs font-bold text-muted-foreground">{i + 1}</span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium capitalize">{item.item_slug.replace(/-/g, " ")}</p>
                          <p className="text-[10px] capitalize text-muted-foreground">{item.item_type}</p>
                        </div>
                        <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                          {item.count}
                        </span>
                        {link && (
                          <Link to={link} target="_blank" className="text-muted-foreground hover:text-foreground">
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* By type aggregates */}
            <div className="rounded-xl border border-border bg-card p-4">
              <h2 className="font-display text-sm font-semibold">By Content Type</h2>
              {aggregates.length === 0 ? (
                <p className="mt-3 text-sm text-muted-foreground">No data yet.</p>
              ) : (
                <div className="mt-3 space-y-3">
                  {aggregates.map((a) => {
                    const pct = totalCount > 0 ? Math.round((a.count / totalCount) * 100) : 0;
                    return (
                      <div key={a.type}>
                        <div className="flex items-center justify-between text-sm">
                          <span className="capitalize">{a.type}</span>
                          <span className="font-mono text-xs font-bold">{a.count} <span className="font-normal text-muted-foreground">({pct}%)</span></span>
                        </div>
                        <div className="mt-1 h-1.5 w-full rounded-full bg-muted">
                          <div className="h-full rounded-full bg-primary/60" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Recent saves */}
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="border-b border-border px-4 py-3">
              <h2 className="font-display text-sm font-semibold">Recent Activity</h2>
            </div>
            {signals.length === 0 ? (
              <div className="p-8 text-center text-sm text-muted-foreground">No saved items yet.</div>
            ) : (
              <div className="divide-y divide-border max-h-[50vh] overflow-y-auto">
                {signals.map((s, i) => {
                  const link = getPublicLink(s.item_type, s.item_slug);
                  return (
                    <div key={i} className="flex items-center justify-between px-4 py-3">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium capitalize">{s.item_slug.replace(/-/g, " ")}</p>
                        <p className="text-xs capitalize text-muted-foreground">{s.item_type}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="text-[10px] text-muted-foreground">
                          {new Date(s.created_at).toLocaleDateString()}
                        </p>
                        {link && (
                          <Link to={link} target="_blank" className="text-muted-foreground hover:text-foreground">
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
