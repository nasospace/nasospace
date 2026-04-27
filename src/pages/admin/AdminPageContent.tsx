/**
 * Admin · Page Content editor.
 * Lets the NASO team override hero copy (and other CMS-backed page sections) per page.
 *
 * Round A scope: hero section editor for all 9 public pages.
 * Round B will add: home page card/step/world editors + draft/publish workflow.
 */
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Save } from "lucide-react";
import { useAdminList, useAdminUpdate, useAdminCreate } from "@/features/admin/hooks/useAdminCms";
import { TextField, TextAreaField, SelectField, SwitchField } from "@/features/admin/components/cms/FormFields";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PublishedBadge } from "@/features/admin/components/cms/AdminCmsListPage";
import { WorldsEditor, HowItWorksEditor } from "@/features/admin/components/cms/HomeSectionEditors";

const TONE_OPTIONS = [
  { value: "cream", label: "Cream (warm off-white)" },
  { value: "lilac", label: "Lilac (soft purple)" },
  { value: "lemon", label: "Lemon (yellow)" },
  { value: "coral", label: "Coral (pink/red, dark text)" },
  { value: "card", label: "Card (neutral)" },
  { value: "ink", label: "Ink (black)" },
];

interface PageDef {
  key: string;
  label: string;
  publicPath: string;
  description: string;
}

const PAGES: PageDef[] = [
  { key: "home", label: "Home", publicPath: "/", description: "Landing page hero" },
  { key: "experiences", label: "Experiences", publicPath: "/experiences", description: "100 Experiences journey hero" },
  { key: "shop", label: "Shop", publicPath: "/shop", description: "Drops & merch hero" },
  { key: "about", label: "About", publicPath: "/about", description: "Manifesto hero" },
  { key: "contact", label: "Contact", publicPath: "/contact", description: "Contact / collabs hero" },
  { key: "faq", label: "FAQ", publicPath: "/faq", description: "FAQ hero" },
  { key: "blog", label: "Blog", publicPath: "/blog", description: "Journal hero" },
  { key: "portfolio", label: "Portfolio", publicPath: "/portfolio", description: "Past work hero" },
  { key: "community", label: "Community Love", publicPath: "/community-love", description: "Testimonials hero" },
];

interface HeroForm {
  eyebrow: string;
  title: string;
  accent: string;
  subtitle: string;
  marker: string;
  tone: string;
  published: boolean;
}

const EMPTY_HERO: HeroForm = {
  eyebrow: "",
  title: "",
  accent: "",
  subtitle: "",
  marker: "",
  tone: "cream",
  published: true,
};

export default function AdminPageContent() {
  const { data: rows = [], isLoading } = useAdminList("cms_page_content");
  const updateMut = useAdminUpdate("cms_page_content");
  const createMut = useAdminCreate("cms_page_content");
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-groovy text-2xl font-bold">Page Content</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Edit hero copy for every public page. Changes go live immediately.
        </p>
      </header>

      {isLoading ? (
        <div className="rounded-xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
          Loading…
        </div>
      ) : (
        <Tabs defaultValue="home" className="w-full">
          <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 bg-muted/40 p-1">
            {PAGES.map((p) => (
              <TabsTrigger key={p.key} value={p.key} className="text-xs">
                {p.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {PAGES.map((page) => (
            <TabsContent key={page.key} value={page.key} className="mt-6">
              <PageHeroEditor
                page={page}
                row={rows.find((r) => r.page_key === page.key && r.section_key === "hero") ?? null}
                onSave={async (form) => {
                  const existing = rows.find(
                    (r) => r.page_key === page.key && r.section_key === "hero",
                  );
                  const content = {
                    eyebrow: form.eyebrow || undefined,
                    title: form.title,
                    accent: form.accent || undefined,
                    subtitle: form.subtitle || undefined,
                    marker: form.marker || undefined,
                    tone: form.tone,
                  };
                  try {
                    if (existing) {
                      await updateMut.mutateAsync({
                        id: existing.id,
                        updates: { content, published: form.published },
                      });
                    } else {
                      await createMut.mutateAsync({
                        page_key: page.key,
                        section_key: "hero",
                        content,
                        published: form.published,
                        sort_order: 0,
                      });
                    }
                    toast({ title: "Saved", description: `${page.label} hero updated.` });
                  } catch (err: any) {
                    toast({ title: "Error", description: err.message, variant: "destructive" });
                  }
                }}
                isSaving={updateMut.isPending || createMut.isPending}
              />
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}

interface PageHeroEditorProps {
  page: PageDef;
  row: Record<string, any> | null;
  onSave: (form: HeroForm) => Promise<void>;
  isSaving: boolean;
}

function PageHeroEditor({ page, row, onSave, isSaving }: PageHeroEditorProps) {
  const initial = useMemo<HeroForm>(() => {
    if (!row) return { ...EMPTY_HERO };
    const c = (row.content ?? {}) as Partial<HeroForm>;
    return {
      eyebrow: c.eyebrow ?? "",
      title: c.title ?? "",
      accent: c.accent ?? "",
      subtitle: c.subtitle ?? "",
      marker: c.marker ?? "",
      tone: c.tone ?? "cream",
      published: row.published ?? true,
    };
  }, [row]);

  const [form, setForm] = useState<HeroForm>(initial);
  const set = <K extends keyof HeroForm>(k: K, v: HeroForm[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  // Reset when switching tabs (row changes)
  const rowId = row?.id ?? null;
  useMemo(() => setForm(initial), [rowId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="rounded-xl border border-border bg-card p-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-groovy text-lg font-bold">{page.label} · Hero</h2>
            <PublishedBadge published={form.published} />
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">{page.description}</p>
        </div>
        <Link
          to={page.publicPath}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <ExternalLink className="h-3 w-3" />
          Open public page
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <TextField
          label="Eyebrow (small uppercase tag)"
          name={`${page.key}-eyebrow`}
          value={form.eyebrow}
          onChange={(v) => set("eyebrow", v)}
          placeholder="e.g. The 100 Drop · Vol. 001"
        />
        <TextField
          label="Marker (right-side chapter chip)"
          name={`${page.key}-marker`}
          value={form.marker}
          onChange={(v) => set("marker", v)}
          placeholder="e.g. 01 / 100"
        />
      </div>

      <TextField
        label="Title (main headline)"
        name={`${page.key}-title`}
        value={form.title}
        onChange={(v) => set("title", v)}
        placeholder="The big bold line"
        required
      />
      <TextField
        label="Accent (italic colored phrase after title)"
        name={`${page.key}-accent`}
        value={form.accent}
        onChange={(v) => set("accent", v)}
        placeholder="e.g. One unforgettable life."
      />
      <TextAreaField
        label="Subtitle"
        name={`${page.key}-subtitle`}
        value={form.subtitle}
        onChange={(v) => set("subtitle", v)}
        rows={3}
      />

      <SelectField
        label="Tone (background color)"
        name={`${page.key}-tone`}
        value={form.tone}
        onChange={(v) => set("tone", v)}
        options={TONE_OPTIONS}
      />

      <SwitchField
        label="Published"
        name={`${page.key}-published`}
        checked={form.published}
        onChange={(v) => set("published", v)}
        description="When off, the page falls back to the built-in default copy"
      />

      <div className="flex justify-end gap-2 border-t border-border pt-4">
        <Button
          variant="outline"
          onClick={() => setForm(initial)}
          disabled={isSaving}
        >
          Reset
        </Button>
        <Button onClick={() => onSave(form)} disabled={isSaving} className="gap-1.5">
          <Save className="h-4 w-4" />
          {isSaving ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </div>
  );
}
