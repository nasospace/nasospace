/**
 * Admin Inquiries — view, filter, and update inquiry statuses.
 */
import { useEffect, useState } from "react";
import { getInquiries, updateInquiryStatus, type AdminInquiry } from "@/server/services/admin";
import { StatusBadge } from "./AdminOverview";
import { toast } from "sonner";

const STATUSES = ["all", "sent", "reviewing", "contacted", "completed"] as const;

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<AdminInquiry[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<AdminInquiry | null>(null);
  const [updating, setUpdating] = useState(false);

  const fetchData = async (status?: string) => {
    setLoading(true);
    const res = await getInquiries({ status: status === "all" ? undefined : status, limit: 100 });
    setInquiries(res.data);
    setCount(res.count);
    setLoading(false);
  };

  useEffect(() => { fetchData(filter); }, [filter]);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    setUpdating(true);
    const ok = await updateInquiryStatus(id, newStatus);
    if (ok) {
      toast.success(`Status updated to "${newStatus}"`);
      setInquiries((prev) => prev.map((i) => i.id === id ? { ...i, status: newStatus } : i));
      if (selected?.id === id) setSelected((s) => s ? { ...s, status: newStatus } : null);
    } else {
      toast.error("Failed to update status");
    }
    setUpdating(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-groovy text-2xl font-bold">Inquiries</h1>
        <p className="mt-1 text-sm text-muted-foreground">{count} total inquiries</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => { setFilter(s); setSelected(null); }}
            className={`rounded-full border border-border px-3 py-1 text-xs font-medium capitalize transition-colors ${
              filter === s ? "bg-foreground text-background" : "bg-card text-muted-foreground hover:bg-muted"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        {/* List */}
        <div className="rounded-xl border border-border bg-card">
          {loading ? (
            <div className="p-8 text-center text-sm text-muted-foreground">Loading…</div>
          ) : inquiries.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">No inquiries found.</div>
          ) : (
            <div className="divide-y divide-border">
              {inquiries.map((inq) => (
                <button
                  key={inq.id}
                  onClick={() => setSelected(inq)}
                  className={`flex w-full items-start gap-4 p-4 text-left transition-colors hover:bg-muted/50 ${
                    selected?.id === inq.id ? "bg-muted/30" : ""
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{inq.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{inq.email}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {inq.inquiry_type}{inq.item_title ? ` · ${inq.item_title}` : ""}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <StatusBadge status={inq.status} />
                    <p className="mt-1 text-[10px] text-muted-foreground">
                      {new Date(inq.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detail panel */}
        <div className="rounded-xl border border-border bg-card p-5">
          {selected ? (
            <div className="space-y-4">
              <h3 className="font-display text-sm font-semibold">Inquiry Detail</h3>
              <DetailRow label="Name" value={selected.name} />
              <DetailRow label="Email" value={selected.email} />
              {selected.phone && <DetailRow label="Phone" value={selected.phone} />}
              <DetailRow label="Type" value={selected.inquiry_type} />
              {selected.item_title && <DetailRow label="Item" value={`${selected.item_type}: ${selected.item_title}`} />}
              {selected.preferred_date && <DetailRow label="Preferred Date" value={selected.preferred_date} />}
              {selected.group_size && <DetailRow label="Group Size" value={selected.group_size} />}
              {selected.notes && (
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Notes</p>
                  <p className="mt-1 whitespace-pre-wrap text-sm">{selected.notes}</p>
                </div>
              )}
              <DetailRow label="Submitted" value={new Date(selected.created_at).toLocaleString()} />
              <DetailRow label="Status" value={selected.status} />

              {/* Status update */}
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Update Status</p>
                <div className="flex flex-wrap gap-1.5">
                  {(["sent", "reviewing", "contacted", "completed"] as const).map((s) => (
                    <button
                      key={s}
                      disabled={updating || selected.status === s}
                      onClick={() => handleStatusUpdate(selected.id, s)}
                      className={`rounded-full border border-border px-2.5 py-1 text-[10px] font-medium capitalize transition-colors ${
                        selected.status === s
                          ? "bg-foreground text-background"
                          : "bg-card text-muted-foreground hover:bg-muted disabled:opacity-50"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-sm text-muted-foreground">Select an inquiry to view details</p>
          )}
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-sm">{value}</p>
    </div>
  );
}
