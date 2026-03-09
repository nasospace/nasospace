/**
 * Admin Experiences — full CRUD for cms_experiences.
 */
import { useState } from "react";
import { useAdminList, useAdminCreate, useAdminUpdate, useAdminDelete } from "@/features/admin/hooks/useAdminCms";
import { AdminCmsListPage, PublishedBadge, FeaturedBadge, type ColumnDef } from "@/features/admin/components/cms/AdminCmsListPage";
import { AdminCmsFormDialog } from "@/features/admin/components/cms/AdminCmsFormDialog";
import { TextField, TextAreaField, NumberField, SelectField, SlugField, SwitchField, TagsField } from "@/features/admin/components/cms/FormFields";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const CATEGORIES = [
  { value: "outing", label: "Outing" },
  { value: "adventure", label: "Adventure" },
  { value: "cultural", label: "Cultural" },
  { value: "wellness", label: "Wellness" },
  { value: "social", label: "Social" },
];

const DIFFICULTIES = [
  { value: "easy", label: "Easy" },
  { value: "moderate", label: "Moderate" },
  { value: "challenging", label: "Challenging" },
];

const EMPTY_FORM = {
  title: "", slug: "", summary: "", description: "", category: "outing",
  tags: [] as string[], date: "", location: "", price: 0, capacity: 20,
  difficulty: "easy", currency: "EGP", featured: false, published: true,
  cover_image_src: "", cover_image_alt: "", gallery: [] as string[],
};

type FormData = typeof EMPTY_FORM;

const columns: ColumnDef<any>[] = [
  { key: "title", label: "Title", render: (item) => <span className="font-medium">{item.title}</span> },
  { key: "category", label: "Category", render: (item) => <span className="capitalize text-muted-foreground">{item.category}</span> },
  { key: "price", label: "Price", render: (item) => <span className="font-mono text-muted-foreground">{item.price} {item.currency}</span> },
  { key: "status", label: "Status", render: (item) => (
    <div className="flex gap-1.5">
      <PublishedBadge published={item.published} />
      <FeaturedBadge featured={item.featured} />
    </div>
  )},
];

export default function AdminExperiencesPage() {
  const { data: items = [], isLoading } = useAdminList("cms_experiences");
  const createMut = useAdminCreate("cms_experiences");
  const updateMut = useAdminUpdate("cms_experiences");
  const deleteMut = useAdminDelete("cms_experiences");
  const { toast } = useToast();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({ ...EMPTY_FORM });

  const set = <K extends keyof FormData>(key: K, val: FormData[K]) => setForm((f) => ({ ...f, [key]: val }));

  const openCreate = () => { setEditId(null); setForm({ ...EMPTY_FORM }); setDialogOpen(true); };
  const openEdit = (item: any) => {
    setEditId(item.id);
    setForm({
      title: item.title ?? "", slug: item.slug ?? "", summary: item.summary ?? "",
      description: item.description ?? "", category: item.category ?? "outing",
      tags: Array.isArray(item.tags) ? item.tags : [], date: item.date ?? "",
      location: item.location ?? "", price: item.price ?? 0, capacity: item.capacity ?? 20,
      difficulty: item.difficulty ?? "easy", currency: item.currency ?? "EGP",
      featured: item.featured ?? false, published: item.published ?? true,
      cover_image_src: item.cover_image_src ?? "", cover_image_alt: item.cover_image_alt ?? "",
      gallery: Array.isArray(item.gallery) ? item.gallery : [],
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.slug.trim() || !form.summary.trim()) {
      toast({ title: "Missing required fields", description: "Title, slug, and summary are required.", variant: "destructive" });
      return;
    }
    try {
      const payload = { ...form, tags: JSON.stringify(form.tags), gallery: JSON.stringify(form.gallery) };
      if (editId) {
        await updateMut.mutateAsync({ id: editId, updates: payload });
        toast({ title: "Experience updated" });
      } else {
        await createMut.mutateAsync(payload);
        toast({ title: "Experience created" });
      }
      setDialogOpen(false);
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const isSaving = createMut.isPending || updateMut.isPending;

  return (
    <>
      <AdminCmsListPage
        title="Experiences"
        subtitle="Manage outings, adventures, and events"
        items={items}
        isLoading={isLoading}
        columns={columns}
        publicPathPrefix="/experiences"
        onCreateNew={openCreate}
        onEdit={openEdit}
        onDelete={(id) => deleteMut.mutate(id, { onSuccess: () => toast({ title: "Deleted" }) })}
        isDeleting={deleteMut.isPending}
      />

      <AdminCmsFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={editId ? "Edit Experience" : "New Experience"}
      >
        <div className="space-y-4 pt-2">
          <TextField label="Title" name="title" value={form.title} onChange={(v) => set("title", v)} required />
          <SlugField value={form.slug} onChange={(v) => set("slug", v)} titleValue={form.title} />
          <TextAreaField label="Summary" name="summary" value={form.summary} onChange={(v) => set("summary", v)} required rows={2} />
          <TextAreaField label="Description" name="description" value={form.description} onChange={(v) => set("description", v)} rows={6} />

          <div className="grid grid-cols-2 gap-3">
            <SelectField label="Category" name="category" value={form.category} onChange={(v) => set("category", v)} options={CATEGORIES} />
            <SelectField label="Difficulty" name="difficulty" value={form.difficulty} onChange={(v) => set("difficulty", v)} options={DIFFICULTIES} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <NumberField label="Price" name="price" value={form.price} onChange={(v) => set("price", v)} />
            <NumberField label="Capacity" name="capacity" value={form.capacity} onChange={(v) => set("capacity", v)} min={1} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <TextField label="Date" name="date" value={form.date} onChange={(v) => set("date", v)} placeholder="e.g. March 15, 2026" />
            <TextField label="Location" name="location" value={form.location} onChange={(v) => set("location", v)} placeholder="e.g. Old Cairo" />
          </div>

          <TagsField label="Tags" name="tags" value={form.tags} onChange={(v) => set("tags", v)} />
          <TextField label="Cover Image URL" name="cover_image_src" value={form.cover_image_src} onChange={(v) => set("cover_image_src", v)} placeholder="https://..." />
          <TextField label="Cover Image Alt" name="cover_image_alt" value={form.cover_image_alt} onChange={(v) => set("cover_image_alt", v)} />

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
    </>
  );
}
