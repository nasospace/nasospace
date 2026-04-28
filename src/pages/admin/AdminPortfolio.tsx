/**
 * Admin Portfolio — full CRUD for cms_portfolio_items.
 */
import { useState } from "react";
import { useAdminList, useAdminCreate, useAdminUpdate, useAdminDelete, useAdminBulkPublish, useAdminBulkDelete } from "@/features/admin/hooks/useAdminCms";
import { AdminCmsListPage, PublishedBadge, FeaturedBadge, type ColumnDef } from "@/features/admin/components/cms/AdminCmsListPage";
import { AdminCmsFormDialog } from "@/features/admin/components/cms/AdminCmsFormDialog";
import { TextField, TextAreaField, SelectField, SlugField, SwitchField, TagsField } from "@/features/admin/components/cms/FormFields";
import { ImageUploadField, GalleryUploadField } from "@/features/admin/components/cms/ImageUploadField";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const CATEGORIES = [
  { value: "custom-events", label: "Custom Events" },
  { value: "corporate", label: "Corporate" },
  { value: "private", label: "Private" },
  { value: "community", label: "Community" },
  { value: "collaboration", label: "Collaboration" },
];

const EMPTY_FORM = {
  title: "", slug: "", summary: "", story: "", category: "custom-events",
  tags: [] as string[], location: "", date: "", audience_type: "", vibe: "",
  featured: false, published: true,
  cover_image_src: "", cover_image_alt: "", gallery: [] as string[],
  linked_experience_slug: "", linked_workshop_slug: "",
  testimonial_quote: "", testimonial_name: "",
};

type FormData = typeof EMPTY_FORM;

const columns: ColumnDef<any>[] = [
  { key: "title", label: "Title", render: (item) => <span className="font-medium">{item.title}</span> },
  { key: "category", label: "Category", render: (item) => <span className="capitalize text-muted-foreground">{item.category?.replace("-", " ")}</span> },
  { key: "location", label: "Location", render: (item) => <span className="text-muted-foreground">{item.location || "—"}</span> },
  { key: "status", label: "Status", render: (item) => (
    <div className="flex gap-1.5">
      <PublishedBadge published={item.published} />
      <FeaturedBadge featured={item.featured} />
    </div>
  )},
];

export default function AdminPortfolioPage() {
  const { data: items = [], isLoading } = useAdminList("cms_portfolio_items");
  const createMut = useAdminCreate("cms_portfolio_items");
  const updateMut = useAdminUpdate("cms_portfolio_items");
  const deleteMut = useAdminDelete("cms_portfolio_items");
  const bulkPublishMut = useAdminBulkPublish("cms_portfolio_items");
  const bulkDeleteMut = useAdminBulkDelete("cms_portfolio_items");
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
      story: item.story ?? "", category: item.category ?? "custom-events",
      tags: Array.isArray(item.tags) ? item.tags : [], location: item.location ?? "",
      date: item.date ?? "", audience_type: item.audience_type ?? "", vibe: item.vibe ?? "",
      featured: item.featured ?? false, published: item.published ?? true,
      cover_image_src: item.cover_image_src ?? "", cover_image_alt: item.cover_image_alt ?? "",
      gallery: Array.isArray(item.gallery) ? item.gallery : [],
      linked_experience_slug: item.linked_experience_slug ?? "",
      linked_workshop_slug: item.linked_workshop_slug ?? "",
      testimonial_quote: item.testimonial_quote ?? "",
      testimonial_name: item.testimonial_name ?? "",
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.slug.trim() || !form.summary.trim()) {
      toast({ title: "Missing required fields", description: "Title, slug, and summary are required.", variant: "destructive" });
      return;
    }
    try {
      const payload = {
        ...form,
        tags: form.tags,
        gallery: form.gallery,
        audience_type: form.audience_type || null,
        vibe: form.vibe || null,
        location: form.location || null,
        date: form.date || null,
        linked_experience_slug: form.linked_experience_slug || null,
        linked_workshop_slug: form.linked_workshop_slug || null,
        testimonial_quote: form.testimonial_quote || null,
        testimonial_name: form.testimonial_name || null,
      };
      if (editId) {
        await updateMut.mutateAsync({ id: editId, updates: payload });
        toast({ title: "Portfolio item updated" });
      } else {
        await createMut.mutateAsync(payload);
        toast({ title: "Portfolio item created" });
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
        title="Portfolio"
        subtitle="Manage past events and project showcases"
        items={items}
        isLoading={isLoading}
        columns={columns}
        publicPathPrefix="/portfolio"
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

      <AdminCmsFormDialog open={dialogOpen} onOpenChange={setDialogOpen} title={editId ? "Edit Portfolio Item" : "New Portfolio Item"}>
        <div className="space-y-4 pt-2">
          <TextField label="Title" name="title" value={form.title} onChange={(v) => set("title", v)} required />
          <SlugField value={form.slug} onChange={(v) => set("slug", v)} titleValue={form.title} />
          <TextAreaField label="Summary" name="summary" value={form.summary} onChange={(v) => set("summary", v)} required rows={2} />
          <TextAreaField label="Story" name="story" value={form.story} onChange={(v) => set("story", v)} rows={6} />

          <SelectField label="Category" name="category" value={form.category} onChange={(v) => set("category", v)} options={CATEGORIES} />

          <div className="grid grid-cols-2 gap-3">
            <TextField label="Location" name="location" value={form.location} onChange={(v) => set("location", v)} placeholder="e.g. The Greek Campus" />
            <TextField label="Date" name="date" value={form.date} onChange={(v) => set("date", v)} placeholder="e.g. February 2026" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <TextField label="Audience Type" name="audience_type" value={form.audience_type} onChange={(v) => set("audience_type", v)} placeholder="e.g. Corporate, Youth" />
            <TextField label="Vibe" name="vibe" value={form.vibe} onChange={(v) => set("vibe", v)} placeholder="e.g. Energetic, Chill" />
          </div>

          <TagsField label="Tags" name="tags" value={form.tags} onChange={(v) => set("tags", v)} />
          <ImageUploadField label="Cover Image" name="cover_image_src" value={form.cover_image_src} onChange={(v) => set("cover_image_src", v)} folder="portfolio" altValue={form.cover_image_alt} onAltChange={(v) => set("cover_image_alt", v)} />
          <GalleryUploadField label="Gallery" name="gallery" value={form.gallery} onChange={(v) => set("gallery", v)} folder="portfolio/gallery" />

          <p className="text-xs font-medium text-muted-foreground pt-2">Testimonial (optional)</p>
          <div className="grid grid-cols-1 gap-3">
            <TextField label="Quote" name="testimonial_quote" value={form.testimonial_quote} onChange={(v) => set("testimonial_quote", v)} />
            <TextField label="Name" name="testimonial_name" value={form.testimonial_name} onChange={(v) => set("testimonial_name", v)} />
          </div>

          <p className="text-xs font-medium text-muted-foreground pt-2">Linked Content (optional)</p>
          <div className="grid grid-cols-1 gap-3">
            <TextField label="Linked Experience Slug" name="linked_experience_slug" value={form.linked_experience_slug} onChange={(v) => set("linked_experience_slug", v)} />
            <TextField label="Linked Workshop Slug" name="linked_workshop_slug" value={form.linked_workshop_slug} onChange={(v) => set("linked_workshop_slug", v)} />
          </div>

          <div className="space-y-2">
            <SwitchField label="Published" name="published" checked={form.published} onChange={(v) => set("published", v)} description="Visible to public" />
            <SwitchField label="Featured" name="featured" checked={form.featured} onChange={(v) => set("featured", v)} description="Show in featured sections" />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-border">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={isSaving}>{isSaving ? "Saving…" : editId ? "Update" : "Create"}</Button>
          </div>
        </div>
      </AdminCmsFormDialog>
    </>
  );
}
