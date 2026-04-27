/**
 * Admin · Home page section editors (Worlds + How It Works repeaters).
 * Used by AdminPageContent under the "Home" tab alongside the hero editor.
 */
import { useEffect, useState } from "react";
import { Plus, Trash2, Save, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { TextField, TextAreaField, SelectField, SwitchField } from "@/features/admin/components/cms/FormFields";
import { useAdminCreate, useAdminUpdate } from "@/features/admin/hooks/useAdminCms";
import { PublishedBadge } from "@/features/admin/components/cms/AdminCmsListPage";

interface SectionRow {
  id: string;
  page_key?: string;
  section_key?: string;
  content?: Record<string, unknown> | null;
  published?: boolean;
  sort_order?: number;
  [key: string]: unknown;
}

/* ═══════════════════════════════════════════════════════
 * Worlds editor
 * ═══════════════════════════════════════════════════════ */

interface WorldCard {
  title: string;
  emoji: string;
  desc: string;
  href: string;
  color: string;
  rotate: number;
}

interface WorldsContent {
  heading: string;
  heading_accent: string;
  subtitle: string;
  cards: WorldCard[];
}

const EMPTY_WORLDS: WorldsContent = {
  heading: "The worlds of",
  heading_accent: "NASO",
  subtitle: "Every way in leads somewhere unforgettable.",
  cards: [],
};

const COLOR_OPTIONS = [
  { value: "primary", label: "Primary (blue)" },
  { value: "secondary", label: "Secondary (green)" },
  { value: "accent", label: "Accent" },
  { value: "naso-lilac", label: "Lilac" },
  { value: "naso-pink", label: "Pink" },
];

export function WorldsEditor({ row }: { row: SectionRow | null }) {
  const updateMut = useAdminUpdate("cms_page_content");
  const createMut = useAdminCreate("cms_page_content");
  const { toast } = useToast();

  const [data, setData] = useState<WorldsContent>(EMPTY_WORLDS);
  const [published, setPublished] = useState(true);

  useEffect(() => {
    if (row) {
      const c = (row.content ?? {}) as Partial<WorldsContent>;
      setData({
        heading: c.heading ?? EMPTY_WORLDS.heading,
        heading_accent: c.heading_accent ?? EMPTY_WORLDS.heading_accent,
        subtitle: c.subtitle ?? EMPTY_WORLDS.subtitle,
        cards: Array.isArray(c.cards) ? c.cards : [],
      });
      setPublished(row.published);
    } else {
      setData(EMPTY_WORLDS);
      setPublished(true);
    }
  }, [row?.id]);

  const isSaving = updateMut.isPending || createMut.isPending;

  const updateCard = (idx: number, patch: Partial<WorldCard>) =>
    setData((d) => ({ ...d, cards: d.cards.map((c, i) => (i === idx ? { ...c, ...patch } : c)) }));

  const addCard = () =>
    setData((d) => ({
      ...d,
      cards: [...d.cards, { title: "New world", emoji: "✦", desc: "", href: "/experiences", color: "primary", rotate: 0 }],
    }));

  const removeCard = (idx: number) =>
    setData((d) => ({ ...d, cards: d.cards.filter((_, i) => i !== idx) }));

  const moveCard = (idx: number, dir: -1 | 1) =>
    setData((d) => {
      const next = [...d.cards];
      const swap = idx + dir;
      if (swap < 0 || swap >= next.length) return d;
      [next[idx], next[swap]] = [next[swap], next[idx]];
      return { ...d, cards: next };
    });

  const save = async () => {
    try {
      if (row) {
        await updateMut.mutateAsync({ id: row.id, updates: { content: data, published } });
      } else {
        await createMut.mutateAsync({
          page_key: "home",
          section_key: "worlds",
          content: data,
          published,
          sort_order: 10,
        });
      }
      toast({ title: "Saved", description: "Worlds section updated." });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-groovy text-lg font-bold">Home · The Worlds of NASO</h2>
            <PublishedBadge published={published} />
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">Three (or more) cards on the home page below the featured experiences.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <TextField label="Heading" name="worlds-heading" value={data.heading} onChange={(v) => setData({ ...data, heading: v })} />
        <TextField label="Heading accent" name="worlds-accent" value={data.heading_accent} onChange={(v) => setData({ ...data, heading_accent: v })} />
        <TextField label="Subtitle" name="worlds-sub" value={data.subtitle} onChange={(v) => setData({ ...data, subtitle: v })} />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-groovy text-sm font-bold uppercase tracking-wider">Cards ({data.cards.length})</h3>
          <Button size="sm" variant="outline" onClick={addCard} className="gap-1.5">
            <Plus className="h-3.5 w-3.5" /> Add card
          </Button>
        </div>

        {data.cards.length === 0 && (
          <div className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            No cards yet. Click "Add card".
          </div>
        )}

        {data.cards.map((card, idx) => (
          <div key={idx} className="rounded-lg border border-border bg-muted/20 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                <GripVertical className="h-4 w-4" />
                Card {idx + 1}
              </div>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" onClick={() => moveCard(idx, -1)} disabled={idx === 0}>↑</Button>
                <Button size="sm" variant="ghost" onClick={() => moveCard(idx, 1)} disabled={idx === data.cards.length - 1}>↓</Button>
                <Button size="sm" variant="ghost" onClick={() => removeCard(idx)} className="text-destructive hover:text-destructive">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <TextField label="Title" name={`w-${idx}-title`} value={card.title} onChange={(v) => updateCard(idx, { title: v })} />
              <TextField label="Emoji / symbol" name={`w-${idx}-emoji`} value={card.emoji} onChange={(v) => updateCard(idx, { emoji: v })} />
            </div>
            <TextAreaField label="Description" name={`w-${idx}-desc`} value={card.desc} onChange={(v) => updateCard(idx, { desc: v })} rows={2} />
            <div className="grid gap-3 md:grid-cols-3">
              <TextField label="Link (href)" name={`w-${idx}-href`} value={card.href} onChange={(v) => updateCard(idx, { href: v })} placeholder="/experiences" />
              <SelectField label="Color accent" name={`w-${idx}-color`} value={card.color} onChange={(v) => updateCard(idx, { color: v })} options={COLOR_OPTIONS} />
              <TextField
                label="Rotation (deg)"
                name={`w-${idx}-rotate`}
                value={String(card.rotate)}
                onChange={(v) => updateCard(idx, { rotate: Number(v) || 0 })}
                placeholder="-2, 0, 1…"
              />
            </div>
          </div>
        ))}
      </div>

      <SwitchField
        label="Published"
        name="worlds-pub"
        checked={published}
        onChange={setPublished}
        description="When off, the home page falls back to default cards."
      />

      <div className="flex justify-end border-t border-border pt-4">
        <Button onClick={save} disabled={isSaving} className="gap-1.5">
          <Save className="h-4 w-4" />
          {isSaving ? "Saving…" : "Save Worlds"}
        </Button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
 * How It Works editor
 * ═══════════════════════════════════════════════════════ */

interface Step {
  icon: string;
  title: string;
  description: string;
  color: string;
}

interface HowItWorksContent {
  eyebrow: string;
  heading: string;
  steps: Step[];
}

const EMPTY_HIW: HowItWorksContent = {
  eyebrow: "How it works",
  heading: "Effortless from click to Cairo.",
  steps: [],
};

const ICON_OPTIONS = [
  { value: "search", label: "🔍 Search" },
  { value: "ticket", label: "🎟 Ticket" },
  { value: "users", label: "👥 Users" },
  { value: "sparkles", label: "✨ Sparkles" },
  { value: "heart", label: "♥ Heart" },
  { value: "star", label: "★ Star" },
  { value: "compass", label: "🧭 Compass" },
  { value: "camera", label: "📷 Camera" },
  { value: "music", label: "🎵 Music" },
];

const STEP_COLORS = [
  { value: "primary", label: "Primary (blue)" },
  { value: "secondary", label: "Secondary (green)" },
  { value: "accent", label: "Accent" },
  { value: "lilac", label: "Lilac" },
  { value: "pink", label: "Pink" },
  { value: "lemon", label: "Lemon" },
];

export function HowItWorksEditor({ row }: { row: SectionRow | null }) {
  const updateMut = useAdminUpdate("cms_page_content");
  const createMut = useAdminCreate("cms_page_content");
  const { toast } = useToast();

  const [data, setData] = useState<HowItWorksContent>(EMPTY_HIW);
  const [published, setPublished] = useState(true);

  useEffect(() => {
    if (row) {
      const c = (row.content ?? {}) as Partial<HowItWorksContent>;
      setData({
        eyebrow: c.eyebrow ?? EMPTY_HIW.eyebrow,
        heading: c.heading ?? EMPTY_HIW.heading,
        steps: Array.isArray(c.steps) ? c.steps : [],
      });
      setPublished(row.published);
    } else {
      setData(EMPTY_HIW);
      setPublished(true);
    }
  }, [row?.id]);

  const isSaving = updateMut.isPending || createMut.isPending;

  const updateStep = (idx: number, patch: Partial<Step>) =>
    setData((d) => ({ ...d, steps: d.steps.map((s, i) => (i === idx ? { ...s, ...patch } : s)) }));

  const addStep = () =>
    setData((d) => ({
      ...d,
      steps: [...d.steps, { icon: "sparkles", title: "New step", description: "", color: "primary" }],
    }));

  const removeStep = (idx: number) =>
    setData((d) => ({ ...d, steps: d.steps.filter((_, i) => i !== idx) }));

  const moveStep = (idx: number, dir: -1 | 1) =>
    setData((d) => {
      const next = [...d.steps];
      const swap = idx + dir;
      if (swap < 0 || swap >= next.length) return d;
      [next[idx], next[swap]] = [next[swap], next[idx]];
      return { ...d, steps: next };
    });

  const save = async () => {
    try {
      if (row) {
        await updateMut.mutateAsync({ id: row.id, updates: { content: data, published } });
      } else {
        await createMut.mutateAsync({
          page_key: "home",
          section_key: "how_it_works",
          content: data,
          published,
          sort_order: 20,
        });
      }
      toast({ title: "Saved", description: "How It Works updated." });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-groovy text-lg font-bold">Home · How It Works</h2>
            <PublishedBadge published={published} />
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">The 3-step process explainer on the home page.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <TextField label="Eyebrow (badge)" name="hiw-eyebrow" value={data.eyebrow} onChange={(v) => setData({ ...data, eyebrow: v })} />
        <TextField label="Heading" name="hiw-heading" value={data.heading} onChange={(v) => setData({ ...data, heading: v })} />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-groovy text-sm font-bold uppercase tracking-wider">Steps ({data.steps.length})</h3>
          <Button size="sm" variant="outline" onClick={addStep} className="gap-1.5">
            <Plus className="h-3.5 w-3.5" /> Add step
          </Button>
        </div>

        {data.steps.length === 0 && (
          <div className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            No steps yet. Click "Add step".
          </div>
        )}

        {data.steps.map((step, idx) => (
          <div key={idx} className="rounded-lg border border-border bg-muted/20 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                <GripVertical className="h-4 w-4" />
                Step {idx + 1}
              </div>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" onClick={() => moveStep(idx, -1)} disabled={idx === 0}>↑</Button>
                <Button size="sm" variant="ghost" onClick={() => moveStep(idx, 1)} disabled={idx === data.steps.length - 1}>↓</Button>
                <Button size="sm" variant="ghost" onClick={() => removeStep(idx)} className="text-destructive hover:text-destructive">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <TextField label="Title" name={`s-${idx}-title`} value={step.title} onChange={(v) => updateStep(idx, { title: v })} />
              <SelectField label="Icon" name={`s-${idx}-icon`} value={step.icon} onChange={(v) => updateStep(idx, { icon: v })} options={ICON_OPTIONS} />
              <SelectField label="Color" name={`s-${idx}-color`} value={step.color} onChange={(v) => updateStep(idx, { color: v })} options={STEP_COLORS} />
            </div>
            <TextAreaField label="Description" name={`s-${idx}-desc`} value={step.description} onChange={(v) => updateStep(idx, { description: v })} rows={2} />
          </div>
        ))}
      </div>

      <SwitchField
        label="Published"
        name="hiw-pub"
        checked={published}
        onChange={setPublished}
        description="When off, the home page falls back to the built-in default steps."
      />

      <div className="flex justify-end border-t border-border pt-4">
        <Button onClick={save} disabled={isSaving} className="gap-1.5">
          <Save className="h-4 w-4" />
          {isSaving ? "Saving…" : "Save How It Works"}
        </Button>
      </div>
    </div>
  );
}
