import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import {
  INQUIRY_TYPES,
  INQUIRY_TYPE_META,
  type InquiryType,
  type InquiryPageContext,
  type InquiryFormData,
} from "../types";
import { contextToInquiryType } from "../hooks/useInquiryContext";
import { InquiryContextCard } from "./InquiryContextCard";

/* ═══ Validation ═══ */

const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be under 100 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email")
    .max(255, "Email must be under 255 characters"),
  phone: z
    .string()
    .trim()
    .max(30, "Phone number too long")
    .optional()
    .or(z.literal("")),
  inquiryType: z.enum(INQUIRY_TYPES),
  preferredDate: z.string().optional().or(z.literal("")),
  groupSize: z
    .string()
    .max(10, "Group size too long")
    .optional()
    .or(z.literal("")),
  notes: z
    .string()
    .trim()
    .max(2000, "Notes must be under 2000 characters")
    .optional()
    .or(z.literal("")),
});

/* ═══ Props ═══ */

interface InquiryFormProps {
  context: InquiryPageContext;
  onSuccess: () => void;
}

/* ═══ Component ═══ */

export function InquiryForm({ context, onSuccess }: InquiryFormProps) {
  const { toast } = useToast();
  const defaultType = contextToInquiryType(context.ref);

  const [form, setForm] = useState<InquiryFormData>({
    name: "",
    email: "",
    phone: "",
    inquiryType: defaultType,
    preferredDate: "",
    groupSize: "",
    notes: "",
    itemType: context.ref ?? undefined,
    itemSlug: context.slug ?? undefined,
    itemTitle: context.title ?? undefined,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function update<K extends keyof InquiryFormData>(field: K, value: InquiryFormData[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as string]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as string];
        return next;
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);

    const result = inquirySchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as string;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    try {
      // Mock submit — replace with real server action later
      await new Promise((resolve) => setTimeout(resolve, 1200));
      onSuccess();
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const showBookingFields =
    form.inquiryType === "experience" ||
    form.inquiryType === "workshop" ||
    form.inquiryType === "custom-event";

  return (
    <motion.form
      onSubmit={handleSubmit}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
      noValidate
    >
      {/* Booking context card */}
      {context.ref && context.title && (
        <motion.div variants={fadeUp}>
          <InquiryContextCard context={context} />
        </motion.div>
      )}

      {/* Inquiry type selector */}
      <motion.div variants={fadeUp}>
        <Label>What's this about?</Label>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {INQUIRY_TYPES.map((type) => {
            const meta = INQUIRY_TYPE_META[type];
            const isActive = form.inquiryType === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => update("inquiryType", type)}
                className={cn(
                  "rounded-xl border-2 border-foreground px-3 py-2.5 text-left transition-all",
                  "font-display text-xs",
                  isActive
                    ? "bg-foreground text-background shadow-retro"
                    : "bg-card text-foreground hover:bg-muted"
                )}
              >
                <span className="text-base">{meta.emoji}</span>
                <span className="ml-1.5 font-semibold">{meta.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Name + Email row */}
      <motion.div variants={fadeUp} className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Full Name"
          required
          error={errors.name}
          value={form.name}
          onChange={(v) => update("name", v)}
          placeholder="Your name"
          autoComplete="name"
        />
        <Field
          label="Email"
          required
          error={errors.email}
          value={form.email}
          onChange={(v) => update("email", v)}
          placeholder="you@email.com"
          type="email"
          autoComplete="email"
        />
      </motion.div>

      {/* Phone */}
      <motion.div variants={fadeUp}>
        <Field
          label="Phone (optional)"
          error={errors.phone}
          value={form.phone}
          onChange={(v) => update("phone", v)}
          placeholder="+20 1XX XXX XXXX"
          type="tel"
          autoComplete="tel"
        />
      </motion.div>

      {/* Booking-specific fields */}
      {showBookingFields && (
        <motion.div
          variants={fadeUp}
          className="grid gap-4 sm:grid-cols-2"
        >
          <Field
            label="Preferred Date"
            value={form.preferredDate}
            onChange={(v) => update("preferredDate", v)}
            placeholder="e.g. April 20, 2026"
          />
          <Field
            label="Group Size"
            value={form.groupSize}
            onChange={(v) => update("groupSize", v)}
            placeholder="e.g. 4 people"
          />
        </motion.div>
      )}

      {/* Notes */}
      <motion.div variants={fadeUp}>
        <Label>Notes (optional)</Label>
        <textarea
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
          maxLength={2000}
          rows={4}
          placeholder="Anything we should know? Special requests, questions, ideas…"
          className={cn(
            "mt-2 w-full rounded-xl border-2 border-foreground bg-card px-4 py-3",
            "font-body text-sm text-foreground placeholder:text-muted-foreground/60",
            "resize-none outline-none transition-shadow focus:shadow-retro",
            errors.notes && "border-destructive"
          )}
        />
        {errors.notes && <ErrorMsg>{errors.notes}</ErrorMsg>}
      </motion.div>

      {/* Submit error */}
      {submitError && (
        <motion.div variants={fadeUp}>
          <p className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-2.5 font-display text-xs text-destructive">
            {submitError}
          </p>
        </motion.div>
      )}

      {/* Submit */}
      <motion.div variants={fadeUp}>
        <motion.button
          type="submit"
          disabled={submitting}
          whileHover={submitting ? {} : { scale: 1.02, y: -2 }}
          whileTap={submitting ? {} : { scale: 0.98 }}
          className={cn(
            "flex w-full items-center justify-center rounded-full border-[2.5px] border-foreground px-8 py-3.5",
            "font-groovy text-xs font-bold uppercase tracking-wider shadow-retro",
            "bg-primary text-primary-foreground",
            "transition-shadow hover:shadow-retro-lg",
            "disabled:cursor-not-allowed disabled:opacity-60"
          )}
        >
          {submitting ? "Sending…" : "Send Request"}
        </motion.button>

        <p className="mt-3 text-center font-display text-[11px] text-muted-foreground">
          We typically respond within 24 hours. No spam, ever.
        </p>
      </motion.div>
    </motion.form>
  );
}

/* ═══ Helpers ═══ */

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="font-display text-xs font-semibold uppercase tracking-wider text-foreground">
      {children}
    </label>
  );
}

function ErrorMsg({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-1 font-display text-[11px] text-destructive">{children}</p>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
}

function Field({
  label,
  value,
  onChange,
  error,
  required,
  placeholder,
  type = "text",
  autoComplete,
}: FieldProps) {
  return (
    <div>
      <Label>
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </Label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        maxLength={type === "email" ? 255 : 100}
        className={cn(
          "mt-2 w-full rounded-xl border-2 border-foreground bg-card px-4 py-2.5",
          "font-body text-sm text-foreground placeholder:text-muted-foreground/60",
          "outline-none transition-shadow focus:shadow-retro",
          error && "border-destructive"
        )}
      />
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </div>
  );
}
