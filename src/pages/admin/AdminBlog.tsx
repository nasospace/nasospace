/**
 * Admin Blog Posts — full CRUD for cms_blog_posts.
 */
import { useState } from "react";
import { useAdminList, useAdminCreate, useAdminUpdate, useAdminDelete } from "@/features/admin/hooks/useAdminCms";
import { AdminCmsListPage, PublishedBadge, FeaturedBadge, type ColumnDef } from "@/features/admin/components/cms/AdminCmsListPage";
import { AdminCmsFormDialog } from "@/features/admin/components/cms/AdminCmsFormDialog";
import { TextField, TextAreaField, SelectField, SlugField, SwitchField, TagsField } from "@/features/admin/components/cms/FormFields";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const CATEGORIES = [
  { value: "outing-ideas", label: "Outing Ideas" },
  { value: "cairo-guides", label: "Cairo Guides" },
  { value: "creative-living", label: "Creative Living" },
  { value: "workshop-stories", label: "Workshop Stories" },
  { value: "event-inspiration", label: "Event Inspiration" },
  { value: "naso-journal", label: "NASO Journal" },
];

const EMPTY_FORM = {
  title: "", slug: "", excerpt: "", content: "", category: "naso-journal",
  tags: [] as string[], publish_date: "", reading_time: "5 min read",
  featured: false, published: true, author_name: "NASO Team",
  cover_image_src: "", cover_image_alt: "",
  linked_experience_slug: "", linked_workshop_slug: "", linked_portfolio_slug: "",
};

type FormData = typeof EMPTY_FORM;

const columns: ColumnDef<any>[] = [
  { key: "title", label: "Title", render: (item) => <span className="font-medium">{item.title}</span> },
  { key: "category", label: "Category", render: (item) => <span className="capitalize text-muted-foreground">{item.category?.replace(/-/g, " ")}</span> },
  { key: "author", label: "Author", render: (item) => <span className="text-muted-foreground">{item.author_name || "—"}</span> },
  { key: "status", label: "Status", render: (item) => (
    <div className="flex gap-1.5">
      <PublishedBadge published={item.published} />
      <FeaturedBadge featured={item.featured} />
    </div>
  )},
];

export default function AdminBlogPage() {
  const { data: items = [], isLoading } = useAdminList("cms_blog_posts");
  const createMut = useAdminCreate("cms_blog_posts");
  const updateMut = useAdminUpdate("cms_blog_posts");
  const deleteMut = useAdminDelete("cms_blog_posts");
  const { toast } = useToast();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({ ...EMPTY_FORM });

  const set = <K extends keyof FormData>(key: K, val: FormData[K]) => setForm((f) => ({ ...f, [key]: val }));

  const openCreate = () => { setEditId(null); setForm({ ...EMPTY_FORM }); setDialogOpen(true); };
  const openEdit = (item: any) => {
    setEditId(item.id);
    setForm({
      title: item.title ?? "", slug: item.slug ?? "", excerpt: item.excerpt ?? "",
      content: item.content ?? "", category: item.category ?? "naso-journal",
      tags: Array.isArray(item.tags) ? item.tags : [],
      publish_date: item.publish_date ?? "", reading_time: item.reading_time ?? "5 min read",
      featured: item.featured ?? false, published: item.published ?? true,
      author_name: item.author_name ?? "NASO Team",
      cover_image_src: item.cover_image_src ?? "", cover_image_alt: item.cover_image_alt ?? "",
      linked_experience_slug: item.linked_experience_slug ?? "",
      linked_workshop_slug: item.linked_workshop_slug ?? "",
      linked_portfolio_slug: item.linked_portfolio_slug ?? "",
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.slug.trim()) {
      toast({ title: "Missing required fields", description: "Title and slug are required.", variant: "destructive" });
      return;
    }
    try {
      const payload = {
        ...form,
        tags: JSON.stringify(form.tags),
        linked_experience_slug: form.linked_experience_slug || null,
        linked_workshop_slug: form.linked_workshop_slug || null,
        linked_portfolio_slug: form.linked_portfolio_slug || null,
      };
      if (editId) {
        await updateMut.mutateAsync({ id: editId, updates: payload });
        toast({ title: "Blog post updated" });
      } else {
        await createMut.mutateAsync(payload);
        toast({ title: "Blog post created" });
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
        title="Blog Posts"
        subtitle="Manage articles, guides, and journal entries"
        items={items}
        isLoading={isLoading}
        columns={columns}
        publicPathPrefix="/blog"
        onCreateNew={openCreate}
        onEdit={openEdit}
        onDelete={(id) => deleteMut.mutate(id, { onSuccess: () => toast({ title: "Deleted" }) })}
        isDeleting={deleteMut.isPending}
      />

      <AdminCmsFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={editId ? "Edit Blog Post" : "New Blog Post"}
      >
        <div className="space-y-4 pt-2">
          <TextField label="Title" name="title" value={form.title} onChange={(v) => set("title", v)} required />
          <SlugField value={form.slug} onChange={(v) => set("slug", v)} titleValue={form.title} />
          <TextAreaField label="Excerpt" name="excerpt" value={form.excerpt} onChange={(v) => set("excerpt", v)} rows={2} />
          <TextAreaField label="Content" name="content" value={form.content} onChange={(v) => set("content", v)} rows={10} />

          <div className="grid grid-cols-2 gap-3">
            <SelectField label="Category" name="category" value={form.category} onChange={(v) => set("category", v)} options={CATEGORIES} />
            <TextField label="Author" name="author_name" value={form.author_name} onChange={(v) => set("author_name", v)} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <TextField label="Publish Date" name="publish_date" value={form.publish_date} onChange={(v) => set("publish_date", v)} placeholder="e.g. 2026-03-15" />
            <TextField label="Reading Time" name="reading_time" value={form.reading_time} onChange={(v) => set("reading_time", v)} placeholder="e.g. 5 min read" />
          </div>

          <TagsField label="Tags" name="tags" value={form.tags} onChange={(v) => set("tags", v)} />
          <TextField label="Cover Image URL" name="cover_image_src" value={form.cover_image_src} onChange={(v) => set("cover_image_src", v)} placeholder="https://..." />
          <TextField label="Cover Image Alt" name="cover_image_alt" value={form.cover_image_alt} onChange={(v) => set("cover_image_alt", v)} />

          <div className="grid grid-cols-3 gap-3">
            <TextField label="Linked Experience" name="linked_experience_slug" value={form.linked_experience_slug} onChange={(v) => set("linked_experience_slug", v)} placeholder="slug" />
            <TextField label="Linked Workshop" name="linked_workshop_slug" value={form.linked_workshop_slug} onChange={(v) => set("linked_workshop_slug", v)} placeholder="slug" />
            <TextField label="Linked Portfolio" name="linked_portfolio_slug" value={form.linked_portfolio_slug} onChange={(v) => set("linked_portfolio_slug", v)} placeholder="slug" />
          </div>

          <div className="space-y-2">
            <SwitchField label="Published" name="published" checked={form.published} onChange={(v) => set("published", v)} description="Visible to public" />
            <SwitchField label="Featured" name="featured" checked={form.featured} onChange={(v) => set("featured", v)} description="Show as featured post" />
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
