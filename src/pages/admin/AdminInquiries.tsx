/**
 * Admin Inquiries — upgraded with search, type/status filters, admin notes editing.
 */
import { useEffect, useState, useCallback } from "react";
import {
  getInquiries,
  getInquiryTypes,
  updateInquiryStatus,
  updateInquiryAdminNotes,
  type AdminInquiry,
} from "@/server/services/admin";
import { StatusBadge } from "./AdminOverview";
import { toast } from "sonner";
import { Search, X, StickyNote, ExternalLink } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { routeHelpers } from "@/config/routes";

const STATUSES = ["all", "sent", "reviewing", "contacted", "completed"] as const;

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<AdminInquiry[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [inquiryTypes, setInquiryTypes] = useState<string[]>([]);
  const [selected, setSelected] = useState<AdminInquiry | null>(null);
  const [updating, setUpdating] = useState(false);
  const [editingNotes, setEditingNotes] = useState(false);
  const [notesValue, setNotesValue] = useState("");

  // Load inquiry types once
  useEffect(() => {
    getInquiryTypes().then(setInquiryTypes);
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await getInquiries({
      status: filter === "all" ? undefined : filter,
      inquiryType: typeFilter === "all" ? undefined : typeFilter,
      search: searchTerm || undefined,
      limit: 200,
    });
    setInquiries(res.data);
    setCount(res.count);
    setLoading(false);
  }, [filter, typeFilter, searchTerm]);

  useEffect(() => {
    const timer = setTimeout(fetchData, searchTerm ? 300 : 0);
    return () => clearTimeout(timer);
  }, [fetchData]);

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

  const handleSaveNotes = async () => {
    if (!selected) return;
    setUpdating(true);
    const ok = await updateInquiryAdminNotes(selected.id, notesValue);
    if (ok) {
      toast.success("Notes saved");
      setInquiries((prev) => prev.map((i) => i.id === selected.id ? { ...i, admin_notes: notesValue } : i));
      setSelected((s) => s ? { ...s, admin_notes: notesValue } : null);
      setEditingNotes(false);
    } else {
      toast.error("Failed to save notes");
    }
    setUpdating(false);
  };

  const openNotes = () => {
    setNotesValue(selected?.admin_notes ?? "");
    setEditingNotes(true);
  };

  const getItemLink = (inq: AdminInquiry): string | null => {
    if (!inq.item_type || !inq.item_slug) return null;
    const helpers: Record<string, (s: string) => string> = {
      experience: routeHelpers.experienceDetail,
      workshop: routeHelpers.workshopDetail,
      portfolio: routeHelpers.portfolioDetail,
      product: routeHelpers.shopDetail,
    };
    return helpers[inq.item_type]?.(inq.item_slug) ?? null;
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-groovy text-2xl font-bold">Inquiries</h1>
        <p className="mt-1 text-sm text-muted-foreground">{count} total</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, email, or item…"
          className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-9 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        {searchTerm && (
          <button onClick={() => setSearchTerm("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-1.5">
          <span className="self-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mr-1">Status</span>
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => { setFilter(s); setSelected(null); }}
              className={`rounded-full border border-border px-2.5 py-1 text-[11px] font-medium capitalize transition-colors ${
                filter === s ? "bg-foreground text-background" : "bg-card text-muted-foreground hover:bg-muted"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {inquiryTypes.length > 1 && (
          <div className="flex flex-wrap gap-1.5">
            <span className="self-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mr-1">Type</span>
            <button
              onClick={() => { setTypeFilter("all"); setSelected(null); }}
              className={`rounded-full border border-border px-2.5 py-1 text-[11px] font-medium capitalize transition-colors ${
                typeFilter === "all" ? "bg-foreground text-background" : "bg-card text-muted-foreground hover:bg-muted"
              }`}
            >
              all
            </button>
            {inquiryTypes.map((t) => (
              <button
                key={t}
                onClick={() => { setTypeFilter(t); setSelected(null); }}
                className={`rounded-full border border-border px-2.5 py-1 text-[11px] font-medium capitalize transition-colors ${
                  typeFilter === t ? "bg-foreground text-background" : "bg-card text-muted-foreground hover:bg-muted"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_380px]">
        {/* List */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-sm text-muted-foreground">Loading…</div>
          ) : inquiries.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">No inquiries match your filters.</div>
          ) : (
            <div className="divide-y divide-border max-h-[70vh] overflow-y-auto">
              {inquiries.map((inq) => (
                <button
                  key={inq.id}
                  onClick={() => { setSelected(inq); setEditingNotes(false); }}
                  className={`flex w-full items-start gap-3 p-3.5 text-left transition-colors hover:bg-muted/50 ${
                    selected?.id === inq.id ? "bg-muted/40" : ""
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-medium">{inq.name}</p>
                      {inq.admin_notes && <StickyNote className="h-3 w-3 shrink-0 text-primary/60" />}
                    </div>
                    <p className="truncate text-xs text-muted-foreground">{inq.email}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      <span className="capitalize">{inq.inquiry_type}</span>
                      {inq.item_title ? ` · ${inq.item_title}` : ""}
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
        <div className="rounded-xl border border-border bg-card p-5 lg:sticky lg:top-4 lg:self-start">
          {selected ? (
            <div className="space-y-4">
              <h3 className="font-display text-sm font-semibold">Inquiry Detail</h3>
              <DetailRow label="Name" value={selected.name} />
              <DetailRow label="Email" value={selected.email} />
              {selected.phone && <DetailRow label="Phone" value={selected.phone} />}
              <DetailRow label="Type" value={selected.inquiry_type} />
              {selected.item_title && (
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Related Item</p>
                  <div className="mt-0.5 flex items-center gap-1.5">
                    <p className="text-sm">{selected.item_type}: {selected.item_title}</p>
                    {(() => {
                      const link = getItemLink(selected);
                      return link ? (
                        <a href={link} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : null;
                    })()}
                  </div>
                </div>
              )}
              {selected.preferred_date && <DetailRow label="Preferred Date" value={selected.preferred_date} />}
              {selected.group_size && <DetailRow label="Group Size" value={selected.group_size} />}
              {selected.notes && (
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Customer Notes</p>
                  <p className="mt-1 whitespace-pre-wrap rounded-lg bg-muted/30 p-2.5 text-sm">{selected.notes}</p>
                </div>
              )}
              <DetailRow label="Submitted" value={new Date(selected.created_at).toLocaleString()} />
              <DetailRow label="Last Updated" value={new Date(selected.last_updated).toLocaleString()} />

              {/* Status update */}
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Status</p>
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

              {/* Admin notes */}
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Admin Notes</p>
                  {!editingNotes && (
                    <button onClick={openNotes} className="text-[10px] text-primary hover:underline">
                      {selected.admin_notes ? "Edit" : "Add"}
                    </button>
                  )}
                </div>
                {editingNotes ? (
                  <div className="mt-2 space-y-2">
                    <Textarea
                      value={notesValue}
                      onChange={(e) => setNotesValue(e.target.value)}
                      placeholder="Internal notes about this inquiry…"
                      rows={3}
                      className="text-sm"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveNotes}
                        disabled={updating}
                        className="rounded-lg bg-primary px-3 py-1.5 text-[11px] font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingNotes(false)}
                        className="rounded-lg border border-border px-3 py-1.5 text-[11px] font-medium text-muted-foreground hover:bg-muted"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : selected.admin_notes ? (
                  <p className="mt-1 whitespace-pre-wrap rounded-lg bg-primary/5 p-2.5 text-sm">{selected.admin_notes}</p>
                ) : (
                  <p className="mt-1 text-xs italic text-muted-foreground">No notes yet.</p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex min-h-[200px] items-center justify-center">
              <p className="text-center text-sm text-muted-foreground">Select an inquiry to view details</p>
            </div>
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
