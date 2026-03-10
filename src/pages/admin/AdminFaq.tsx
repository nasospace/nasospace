/**
 * Admin FAQ Items — full CRUD for cms_faq_items.
 * FAQ items don't have slug/title in the standard sense, so we adapt the list page.
 */
import { useState, useMemo } from "react";
import { useAdminList, useAdminCreate, useAdminUpdate, useAdminDelete } from "@/features/admin/hooks/useAdminCms";
import { AdminCmsFormDialog } from "@/features/admin/components/cms/AdminCmsFormDialog";
import { TextField, TextAreaField, NumberField, SelectField, SwitchField } from "@/features/admin/components/cms/FormFields";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { PublishedBadge } from "@/features/admin/components/cms/AdminCmsListPage";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const GROUP_OPTIONS = [
  { value: "general", label: "General" },
  { value: "experiences", label: "Experiences" },
  { value: "workshops", label: "Workshops" },
  { value: "shop", label: "Shop" },
  { value: "bookings", label: "Bookings" },
  { value: "events", label: "Events" },
  { value: "account", label: "Account" },
];

const EMPTY_FORM = {
  question: "", answer: "", group_id: "general", group_label: "General",
  group_emoji: "💬", sort_order: 0, published: true,
};

type FormData = typeof EMPTY_FORM;

export default function AdminFaqPage() {
  const { data: items = [], isLoading } = useAdminList("cms_faq_items");
  const createMut = useAdminCreate("cms_faq_items");
  const updateMut = useAdminUpdate("cms_faq_items");
  const deleteMut = useAdminDelete("cms_faq_items");
  const { toast } = useToast();

  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({ ...EMPTY_FORM });
  const [deleteTarget, setDeleteTarget] = useState<any>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return items;
    const q = search.toLowerCase();
    return items.filter((item: any) =>
      item.question?.toLowerCase().includes(q) || item.group_label?.toLowerCase().includes(q)
    );
  }, [items, search]);

  const set = <K extends keyof FormData>(key: K, val: FormData[K]) => setForm((f) => ({ ...f, [key]: val }));

  const openCreate = () => { setEditId(null); setForm({ ...EMPTY_FORM }); setDialogOpen(true); };
  const openEdit = (item: any) => {
    setEditId(item.id);
    setForm({
      question: item.question ?? "", answer: item.answer ?? "",
      group_id: item.group_id ?? "general", group_label: item.group_label ?? "General",
      group_emoji: item.group_emoji ?? "💬", sort_order: item.sort_order ?? 0,
      published: item.published ?? true,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.question.trim() || !form.answer.trim()) {
      toast({ title: "Missing required fields", description: "Question and answer are required.", variant: "destructive" });
      return;
    }
    try {
      if (editId) {
        await updateMut.mutateAsync({ id: editId, updates: form });
        toast({ title: "FAQ item updated" });
      } else {
        await createMut.mutateAsync(form);
        toast({ title: "FAQ item created" });
      }
      setDialogOpen(false);
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const isSaving = createMut.isPending || updateMut.isPending;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-groovy text-2xl font-bold">FAQ Items</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage frequently asked questions</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{items.length} total · {filtered.length} shown</p>
        </div>
        <Button onClick={openCreate} size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" /> New
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-sm text-muted-foreground">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">
            {search ? "No results found." : "No FAQ items yet."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Question</th>
                  <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Group</th>
                  <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Order</th>
                  <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((item: any) => (
                  <tr key={item.id} className="transition-colors hover:bg-muted/20">
                    <td className="px-4 py-3 font-medium max-w-xs truncate">{item.question}</td>
                    <td className="px-4 py-3 text-muted-foreground">{item.group_emoji} {item.group_label}</td>
                    <td className="px-4 py-3 font-mono text-muted-foreground">{item.sort_order}</td>
                    <td className="px-4 py-3"><PublishedBadge published={item.published} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        <button onClick={() => openEdit(item)} className="rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" title="Edit">
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => setDeleteTarget(item)} className="rounded p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive" title="Delete">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this FAQ item?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleteMut.isPending}
              onClick={() => { if (deleteTarget) { deleteMut.mutate(deleteTarget.id, { onSuccess: () => toast({ title: "Deleted" }) }); setDeleteTarget(null); } }}
            >
              {deleteMut.isPending ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AdminCmsFormDialog open={dialogOpen} onOpenChange={setDialogOpen} title={editId ? "Edit FAQ Item" : "New FAQ Item"}>
        <div className="space-y-4 pt-2">
          <TextAreaField label="Question" name="question" value={form.question} onChange={(v) => set("question", v)} required rows={2} />
          <TextAreaField label="Answer" name="answer" value={form.answer} onChange={(v) => set("answer", v)} required rows={5} />

          <div className="grid grid-cols-2 gap-3">
            <SelectField label="Group" name="group_id" value={form.group_id} onChange={(v) => {
              const opt = GROUP_OPTIONS.find((o) => o.value === v);
              set("group_id", v);
              if (opt) set("group_label", opt.label);
            }} options={GROUP_OPTIONS} />
            <TextField label="Group Emoji" name="group_emoji" value={form.group_emoji} onChange={(v) => set("group_emoji", v)} placeholder="💬" />
          </div>

          <NumberField label="Sort Order" name="sort_order" value={form.sort_order} onChange={(v) => set("sort_order", v)} />
          <SwitchField label="Published" name="published" checked={form.published} onChange={(v) => set("published", v)} description="Visible to public" />

          <div className="flex justify-end gap-2 pt-4 border-t border-border">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving…" : editId ? "Update" : "Create"}
            </Button>
          </div>
        </div>
      </AdminCmsFormDialog>
    </div>
  );
}
