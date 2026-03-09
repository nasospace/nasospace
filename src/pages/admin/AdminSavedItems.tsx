/**
 * Admin Saved Items — signals and aggregates view.
 */
import { useEffect, useState } from "react";
import { getSavedItemsSignals, getSavedItemsAggregates, type SavedItemSignal, type SavedItemAggregate } from "@/server/services/admin";

export default function AdminSavedItemsPage() {
  const [signals, setSignals] = useState<SavedItemSignal[]>([]);
  const [aggregates, setAggregates] = useState<SavedItemAggregate[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getSavedItemsSignals({ limit: 30 }),
      getSavedItemsAggregates(),
    ]).then(([signalsRes, aggRes]) => {
      setSignals(signalsRes.data);
      setTotalCount(signalsRes.count);
      setAggregates(aggRes);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-groovy text-2xl font-bold">Saved Items</h1>
        <p className="mt-1 text-sm text-muted-foreground">{totalCount} total saves across all users</p>
      </div>

      {loading ? (
        <div className="p-8 text-center text-sm text-muted-foreground">Loading…</div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          {/* Recent saves */}
          <div className="rounded-xl border border-border bg-card">
            <div className="border-b border-border px-4 py-3">
              <h2 className="font-display text-sm font-semibold">Recent Saves</h2>
            </div>
            {signals.length === 0 ? (
              <div className="p-8 text-center text-sm text-muted-foreground">No saved items yet.</div>
            ) : (
              <div className="divide-y divide-border">
                {signals.map((s, i) => (
                  <div key={i} className="flex items-center justify-between px-4 py-3">
                    <div>
                      <p className="text-sm font-medium capitalize">{s.item_type}</p>
                      <p className="text-xs text-muted-foreground">{s.item_slug}</p>
                    </div>
                    <p className="text-[10px] text-muted-foreground">
                      {new Date(s.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Aggregates */}
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-4">
              <h2 className="font-display text-sm font-semibold">By Type</h2>
              {aggregates.length === 0 ? (
                <p className="mt-3 text-sm text-muted-foreground">No data yet.</p>
              ) : (
                <div className="mt-3 space-y-2">
                  {aggregates.map((a) => (
                    <div key={a.type} className="flex items-center justify-between">
                      <span className="text-sm capitalize">{a.type}</span>
                      <span className="font-mono text-sm font-bold">{a.count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
