/**
 * Admin Experiences — full CRUD for cms_experiences.
 */
import { useState } from "react";
import { useAdminList, useAdminCreate, useAdminUpdate, useAdminDelete, useAdminBulkPublish, useAdminBulkDelete } from "@/features/admin/hooks/useAdminCms";
import { AdminCmsListPage, PublishedBadge, FeaturedBadge, type ColumnDef } from "@/features/admin/components/cms/AdminCmsListPage";
import { AdminCmsFormDialog } from "@/features/admin/components/cms/AdminCmsFormDialog";
import { TextField, TextAreaField, NumberField, SelectField, SlugField, SwitchField, TagsField } from "@/features/admin/components/cms/FormFields";
import { ImageUploadField, GalleryUploadField } from "@/features/admin/components/cms/ImageUploadField";
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
  slot_number: null as number | null, is_locked: false,
};

type FormData = typeof EMPTY_FORM;

const columns: ColumnDef<any>[] = [
  { key: "slot", label: "Slot", render: (item) => (
    item.slot_number ? (
      <span className="font-mono text-xs font-bold text-primary">#{String(item.slot_number).padStart(3, "0")}</span>
    ) : (
      <span className="text-xs text-muted-foreground/50">—</span>
    )
  )},
  { key: "title", label: "Title", render: (item) => <span className="font-medium">{item.title}</span> },
  { key: "category", label: "Category", render: (item) => <span className="capitalize text-muted-foreground">{item.category}</span> },
  { key: "price", label: "Price", render: (item) => <span className="font-mono text-muted-foreground">{item.price} {item.currency}</span> },
  { key: "status", label: "Status", render: (item) => (
    <div className="flex flex-wrap gap-1.5">
      <PublishedBadge published={item.published} />
      <FeaturedBadge featured={item.featured} />
      {item.is_locked && (
        <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
          🔒 Locked
        </span>
      )}
    </div>
  )},
];

export default function AdminExperiencesPage() {
  const { data: items = [], isLoading } = useAdminList("cms_experiences");
  const createMut = useAdminCreate("cms_experiences");
  const updateMut = useAdminUpdate("cms_experiences");
  const deleteMut = useAdminDelete("cms_experiences");
  const bulkPublishMut = useAdminBulkPublish("cms_experiences");
  const bulkDeleteMut = useAdminBulkDelete("cms_experiences");
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
      slot_number: item.slot_number ?? null, is_locked: item.is_locked ?? false,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.slug.trim() || !form.summary.trim()) {
      toast({ title: "Missing required fields", description: "Title, slug, and summary are required.", variant: "destructive" });
      return;
    }
    if (form.slot_number !== null && (form.slot_number < 1 || form.slot_number > 100)) {
      toast({ title: "Slot must be 1–100", description: "Or leave it empty to skip the journey map.", variant: "destructive" });
      return;
    }
    try {
      const payload = {
        ...form,
        tags: form.tags,
        gallery: form.gallery,
        // Send slot_number as null when empty, not 0
        slot_number: form.slot_number === null || (form.slot_number as any) === "" ? null : Number(form.slot_number),
      };
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
        onBulkPublish={async (ids, published) => {
          await bulkPublishMut.mutateAsync({ ids, published });
          toast({ title: published ? `${ids.length} published` : `${ids.length} unpublished` });
        }}
        onBulkDelete={async (ids) => {
          await bulkDeleteMut.mutateAsync(ids);
          toast({ title: `${ids.length} deleted` });
        }}
        isBulking={bulkPublishMut.isPending || bulkDeleteMut.isPending}
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
          <ImageUploadField label="Cover Image" name="cover_image_src" value={form.cover_image_src} onChange={(v) => set("cover_image_src", v)} folder="experiences" altValue={form.cover_image_alt} onAltChange={(v) => set("cover_image_alt", v)} />
          <GalleryUploadField label="Gallery" name="gallery" value={form.gallery} onChange={(v) => set("gallery", v)} folder="experiences/gallery" />

          {/* 100 Experiences journey controls */}
          <div className="rounded-lg border border-dashed border-primary/30 bg-primary/5 p-4 space-y-3">
            <div>
              <p className="font-display text-sm font-semibold">100 Experiences journey</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Assign a slot (1–100) to place this experience in the public journey map.
                Leave blank if it shouldn't appear in the map.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="slot_number" className="mb-1 block font-display text-xs font-medium">
                  Slot number (1–100)
                </label>
                <input
                  id="slot_number"
                  type="number"
                  min={1}
                  max={100}
                  value={form.slot_number ?? ""}
                  onChange={(e) => {
                    const v = e.target.value;
                    set("slot_number", v === "" ? null : Number(v));
                  }}
                  placeholder="e.g. 1"
                  className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                />
              </div>
              <div className="flex items-end">
                <SwitchField
                  label="Locked / Mystery"
                  name="is_locked"
                  checked={form.is_locked}
                  onChange={(v) => set("is_locked", v)}
                  description="Show 🔒 chain in the journey map"
                />
              </div>
            </div>
          </div>

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
