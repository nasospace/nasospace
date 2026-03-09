/**
 * Reusable admin CMS list page shell.
 * Provides table, search, create/edit/delete UI for any CMS domain.
 */
import { useState, useMemo } from "react";
import { Plus, Pencil, Trash2, Search, ExternalLink, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export interface ColumnDef<T> {
  key: string;
  label: string;
  render: (item: T) => React.ReactNode;
  className?: string;
}

interface Props<T extends { id: string; title: string; slug: string; published?: boolean }> {
  title: string;
  subtitle?: string;
  items: T[];
  isLoading: boolean;
  columns: ColumnDef<T>[];
  searchFields?: (keyof T)[];
  publicPathPrefix?: string;
  onCreateNew: () => void;
  onEdit: (item: T) => void;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

export function AdminCmsListPage<T extends { id: string; title: string; slug: string; published?: boolean }>({
  title,
  subtitle,
  items,
  isLoading,
  columns,
  searchFields = ["title" as keyof T, "slug" as keyof T],
  publicPathPrefix,
  onCreateNew,
  onEdit,
  onDelete,
  isDeleting,
}: Props<T>) {
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<T | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return items;
    const q = search.toLowerCase();
    return items.filter((item) =>
      searchFields.some((field) => {
        const val = item[field];
        return typeof val === "string" && val.toLowerCase().includes(q);
      })
    );
  }, [items, search, searchFields]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-groovy text-2xl font-bold">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
          <p className="mt-0.5 text-xs text-muted-foreground">{items.length} total · {filtered.length} shown</p>
        </div>
        <Button onClick={onCreateNew} size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" /> New
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-sm text-muted-foreground">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">
            {search ? "No results found." : "No items yet. Create your first one!"}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className={`px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground ${col.className ?? ""}`}
                    >
                      {col.label}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((item) => (
                  <tr key={item.id} className="transition-colors hover:bg-muted/20">
                    {columns.map((col) => (
                      <td key={col.key} className={`px-4 py-3 ${col.className ?? ""}`}>
                        {col.render(item)}
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        {publicPathPrefix && (
                          <a
                            href={`${publicPathPrefix}/${item.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                            title="View public page"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                        <button
                          onClick={() => onEdit(item)}
                          className="rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                          title="Edit"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(item)}
                          className="rounded p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                          title="Delete"
                        >
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

      {/* Delete confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete "{deleteTarget?.title}"?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Consider unpublishing instead if you want to keep the data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isDeleting}
              onClick={() => {
                if (deleteTarget) {
                  onDelete(deleteTarget.id);
                  setDeleteTarget(null);
                }
              }}
            >
              {isDeleting ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

/* ═══ Shared column renderers ═══ */

export function PublishedBadge({ published }: { published: boolean }) {
  return published ? (
    <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] font-semibold text-green-700 dark:text-green-400">
      <Eye className="h-3 w-3" /> Live
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
      <EyeOff className="h-3 w-3" /> Draft
    </span>
  );
}

export function FeaturedBadge({ featured }: { featured: boolean }) {
  if (!featured) return null;
  return (
    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
      ★ Featured
    </span>
  );
}
