/**
 * Admin Products — full CRUD for cms_products.
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
  { value: "apparel", label: "Apparel" },
  { value: "accessories", label: "Accessories" },
  { value: "prints", label: "Prints" },
  { value: "homeware", label: "Homeware" },
  { value: "stationery", label: "Stationery" },
];

const STOCK_STATUSES = [
  { value: "in-stock", label: "In Stock" },
  { value: "low-stock", label: "Low Stock" },
  { value: "out-of-stock", label: "Out of Stock" },
];

const EMPTY_FORM = {
  title: "", slug: "", summary: "", description: "", category: "apparel",
  tags: [] as string[], price: 0, currency: "EGP", stock_status: "in-stock",
  featured: false, published: true, limited_edition: false,
  cover_image_src: "", cover_image_alt: "", gallery: [] as string[],
  linked_experience_slug: "", linked_workshop_slug: "", linked_portfolio_slug: "",
};

type FormData = typeof EMPTY_FORM;

const stockBadge = (status: string) => {
  const map: Record<string, string> = {
    "in-stock": "bg-green-500/10 text-green-700 dark:text-green-400",
    "low-stock": "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
    "out-of-stock": "bg-red-500/10 text-red-700 dark:text-red-400",
  };
  return map[status] ?? "bg-muted text-muted-foreground";
};

const columns: ColumnDef<any>[] = [
  { key: "title", label: "Title", render: (item) => <span className="font-medium">{item.title}</span> },
  { key: "category", label: "Category", render: (item) => <span className="capitalize text-muted-foreground">{item.category}</span> },
  { key: "price", label: "Price", render: (item) => <span className="font-mono text-muted-foreground">{item.price} {item.currency}</span> },
  { key: "stock", label: "Stock", render: (item) => (
    <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${stockBadge(item.stock_status)}`}>
      {item.stock_status.replace("-", " ")}
    </span>
  )},
  { key: "status", label: "Status", render: (item) => (
    <div className="flex gap-1.5">
      <PublishedBadge published={item.published} />
      <FeaturedBadge featured={item.featured} />
      {item.limited_edition && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">Limited</span>}
    </div>
  )},
];

export default function AdminProductsPage() {
  const { data: items = [], isLoading } = useAdminList("cms_products");
  const createMut = useAdminCreate("cms_products");
  const updateMut = useAdminUpdate("cms_products");
  const deleteMut = useAdminDelete("cms_products");
  const bulkPublishMut = useAdminBulkPublish("cms_products");
  const bulkDeleteMut = useAdminBulkDelete("cms_products");
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
      description: item.description ?? "", category: item.category ?? "apparel",
      tags: Array.isArray(item.tags) ? item.tags : [], price: item.price ?? 0,
      currency: item.currency ?? "EGP", stock_status: item.stock_status ?? "in-stock",
      featured: item.featured ?? false, published: item.published ?? true,
      limited_edition: item.limited_edition ?? false,
      cover_image_src: item.cover_image_src ?? "", cover_image_alt: item.cover_image_alt ?? "",
      gallery: Array.isArray(item.gallery) ? item.gallery : [],
      linked_experience_slug: item.linked_experience_slug ?? "",
      linked_workshop_slug: item.linked_workshop_slug ?? "",
      linked_portfolio_slug: item.linked_portfolio_slug ?? "",
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
        linked_experience_slug: form.linked_experience_slug || null,
        linked_workshop_slug: form.linked_workshop_slug || null,
        linked_portfolio_slug: form.linked_portfolio_slug || null,
      };
      if (editId) {
        await updateMut.mutateAsync({ id: editId, updates: payload });
        toast({ title: "Product updated" });
      } else {
        await createMut.mutateAsync(payload);
        toast({ title: "Product created" });
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
        title="Products"
        subtitle="Manage shop products and merchandise"
        items={items}
        isLoading={isLoading}
        columns={columns}
        publicPathPrefix="/shop"
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

      <AdminCmsFormDialog open={dialogOpen} onOpenChange={setDialogOpen} title={editId ? "Edit Product" : "New Product"}>
        <div className="space-y-4 pt-2">
          <TextField label="Title" name="title" value={form.title} onChange={(v) => set("title", v)} required />
          <SlugField value={form.slug} onChange={(v) => set("slug", v)} titleValue={form.title} />
          <TextAreaField label="Summary" name="summary" value={form.summary} onChange={(v) => set("summary", v)} required rows={2} />
          <TextAreaField label="Description" name="description" value={form.description} onChange={(v) => set("description", v)} rows={6} />

          <div className="grid grid-cols-2 gap-3">
            <SelectField label="Category" name="category" value={form.category} onChange={(v) => set("category", v)} options={CATEGORIES} />
            <SelectField label="Stock Status" name="stock_status" value={form.stock_status} onChange={(v) => set("stock_status", v)} options={STOCK_STATUSES} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <NumberField label="Price" name="price" value={form.price} onChange={(v) => set("price", v)} />
            <TextField label="Currency" name="currency" value={form.currency} onChange={(v) => set("currency", v)} />
          </div>

          <TagsField label="Tags" name="tags" value={form.tags} onChange={(v) => set("tags", v)} />
          <ImageUploadField label="Cover Image" name="cover_image_src" value={form.cover_image_src} onChange={(v) => set("cover_image_src", v)} folder="products" altValue={form.cover_image_alt} onAltChange={(v) => set("cover_image_alt", v)} />
          <GalleryUploadField label="Gallery" name="gallery" value={form.gallery} onChange={(v) => set("gallery", v)} folder="products/gallery" />

          <p className="text-xs font-medium text-muted-foreground pt-2">Linked Content (optional)</p>
          <div className="grid grid-cols-1 gap-3">
            <TextField label="Linked Experience Slug" name="linked_experience_slug" value={form.linked_experience_slug} onChange={(v) => set("linked_experience_slug", v)} />
            <TextField label="Linked Workshop Slug" name="linked_workshop_slug" value={form.linked_workshop_slug} onChange={(v) => set("linked_workshop_slug", v)} />
            <TextField label="Linked Portfolio Slug" name="linked_portfolio_slug" value={form.linked_portfolio_slug} onChange={(v) => set("linked_portfolio_slug", v)} />
          </div>

          <div className="space-y-2">
            <SwitchField label="Published" name="published" checked={form.published} onChange={(v) => set("published", v)} description="Visible to public" />
            <SwitchField label="Featured" name="featured" checked={form.featured} onChange={(v) => set("featured", v)} description="Show in featured sections" />
            <SwitchField label="Limited Edition" name="limited_edition" checked={form.limited_edition} onChange={(v) => set("limited_edition", v)} />
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
