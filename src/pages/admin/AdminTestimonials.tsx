/**
 * Admin Testimonials — full CRUD for cms_testimonials.
 */
import { useState, useMemo } from "react";
import { useAdminList, useAdminCreate, useAdminUpdate, useAdminDelete } from "@/features/admin/hooks/useAdminCms";
import { AdminCmsFormDialog } from "@/features/admin/components/cms/AdminCmsFormDialog";
import { TextField, TextAreaField, NumberField, SelectField, SwitchField } from "@/features/admin/components/cms/FormFields";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { PublishedBadge, FeaturedBadge } from "@/features/admin/components/cms/AdminCmsListPage";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const SOURCE_TYPES = [
  { value: "general", label: "General" },
  { value: "experience", label: "Experience" },
  { value: "workshop", label: "Workshop" },
  { value: "event", label: "Event" },
  { value: "product", label: "Product" },
];

const EMPTY_FORM = {
  name: "", quote: "", source_type: "general", context_tag: "",
  image_url: "", sort_order: 0, featured: false, published: true,
};

type FormData = typeof EMPTY_FORM;

export default function AdminTestimonialsPage() {
  const { data: items = [], isLoading } = useAdminList("cms_testimonials");
  const createMut = useAdminCreate("cms_testimonials");
  const updateMut = useAdminUpdate("cms_testimonials");
  const deleteMut = useAdminDelete("cms_testimonials");
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
      item.name?.toLowerCase().includes(q) || item.quote?.toLowerCase().includes(q)
    );
  }, [items, search]);

  const set = <K extends keyof FormData>(key: K, val: FormData[K]) => setForm((f) => ({ ...f, [key]: val }));

  const openCreate = () => { setEditId(null); setForm({ ...EMPTY_FORM }); setDialogOpen(true); };
  const openEdit = (item: any) => {
    setEditId(item.id);
    setForm({
      name: item.name ?? "", quote: item.quote ?? "",
      source_type: item.source_type ?? "general",
      context_tag: item.context_tag ?? "", image_url: item.image_url ?? "",
      sort_order: item.sort_order ?? 0, featured: item.featured ?? false,
      published: item.published ?? true,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.quote.trim()) {
      toast({ title: "Missing required fields", description: "Name and quote are required.", variant: "destructive" });
      return;
    }
    try {
      const payload = {
        ...form,
        context_tag: form.context_tag || null,
        image_url: form.image_url || null,
      };
      if (editId) {
        await updateMut.mutateAsync({ id: editId, updates: payload });
        toast({ title: "Testimonial updated" });
      } else {
        await createMut.mutateAsync(payload);
        toast({ title: "Testimonial created" });
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
          <h1 className="font-groovy text-2xl font-bold">Testimonials</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage community love and quotes</p>
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
            {search ? "No results found." : "No testimonials yet."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Name</th>
                  <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Quote</th>
                  <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Source</th>
                  <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((item: any) => (
                  <tr key={item.id} className="transition-colors hover:bg-muted/20">
                    <td className="px-4 py-3 font-medium">{item.name}</td>
                    <td className="px-4 py-3 text-muted-foreground max-w-xs truncate">{item.quote}</td>
                    <td className="px-4 py-3 capitalize text-muted-foreground">{item.source_type}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5">
                        <PublishedBadge published={item.published} />
                        <FeaturedBadge featured={item.featured} />
                      </div>
                    </td>
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
            <AlertDialogTitle>Delete "{deleteTarget?.name}"?</AlertDialogTitle>
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

      <AdminCmsFormDialog open={dialogOpen} onOpenChange={setDialogOpen} title={editId ? "Edit Testimonial" : "New Testimonial"}>
        <div className="space-y-4 pt-2">
          <TextField label="Name" name="name" value={form.name} onChange={(v) => set("name", v)} required />
          <TextAreaField label="Quote" name="quote" value={form.quote} onChange={(v) => set("quote", v)} required rows={4} />

          <div className="grid grid-cols-2 gap-3">
            <SelectField label="Source Type" name="source_type" value={form.source_type} onChange={(v) => set("source_type", v)} options={SOURCE_TYPES} />
            <TextField label="Context Tag" name="context_tag" value={form.context_tag} onChange={(v) => set("context_tag", v)} placeholder="e.g. Desert Outing" />
          </div>

          <TextField label="Image URL" name="image_url" value={form.image_url} onChange={(v) => set("image_url", v)} placeholder="https://..." />
          <NumberField label="Sort Order" name="sort_order" value={form.sort_order} onChange={(v) => set("sort_order", v)} />

          <div className="space-y-2">
            <SwitchField label="Published" name="published" checked={form.published} onChange={(v) => set("published", v)} description="Visible to public" />
            <SwitchField label="Featured" name="featured" checked={form.featured} onChange={(v) => set("featured", v)} description="Show in featured sections" />
          </div>

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
