/**
 * Shared form field components for admin CMS forms.
 */
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateSlug } from "@/server/services/admin/cms";

interface FieldProps {
  label: string;
  name: string;
  required?: boolean;
  children: React.ReactNode;
  error?: string;
}

export function FormField({ label, name, required, children, error }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={name} className="text-sm font-medium">
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

interface TextFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  error?: string;
}

export function TextField({ label, name, value, onChange, required, placeholder, error }: TextFieldProps) {
  return (
    <FormField label={label} name={name} required={required} error={error}>
      <Input
        id={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
      />
    </FormField>
  );
}

interface TextAreaFieldProps extends TextFieldProps {
  rows?: number;
}

export function TextAreaField({ label, name, value, onChange, required, placeholder, error, rows = 4 }: TextAreaFieldProps) {
  return (
    <FormField label={label} name={name} required={required} error={error}>
      <Textarea
        id={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        required={required}
      />
    </FormField>
  );
}

interface NumberFieldProps {
  label: string;
  name: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  required?: boolean;
  error?: string;
}

export function NumberField({ label, name, value, onChange, min = 0, required, error }: NumberFieldProps) {
  return (
    <FormField label={label} name={name} required={required} error={error}>
      <Input
        id={name}
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        required={required}
      />
    </FormField>
  );
}

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  error?: string;
}

export function SelectField({ label, name, value, onChange, options, required, error }: SelectFieldProps) {
  return (
    <FormField label={label} name={name} required={required} error={error}>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={name}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormField>
  );
}

interface SwitchFieldProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
}

export function SwitchField({ label, name, checked, onChange, description }: SwitchFieldProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border p-3">
      <div>
        <Label htmlFor={name} className="text-sm font-medium">{label}</Label>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>
      <Switch id={name} checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

interface SlugFieldProps {
  value: string;
  onChange: (value: string) => void;
  titleValue: string;
  error?: string;
}

export function SlugField({ value, onChange, titleValue, error }: SlugFieldProps) {
  return (
    <FormField label="Slug" name="slug" required error={error}>
      <div className="flex gap-2">
        <Input
          id="slug"
          value={value}
          onChange={(e) => onChange(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))}
          placeholder="auto-generated-from-title"
          required
          className="font-mono text-sm"
        />
        <button
          type="button"
          onClick={() => onChange(generateSlug(titleValue))}
          className="shrink-0 rounded-md border border-border px-3 py-1 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          Generate
        </button>
      </div>
    </FormField>
  );
}

interface TagsFieldProps {
  label: string;
  name: string;
  value: string[];
  onChange: (value: string[]) => void;
}

export function TagsField({ label, name, value, onChange }: TagsFieldProps) {
  const [input, setInput] = useState("");
  return (
    <FormField label={label} name={name}>
      <div className="space-y-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a tag and press Enter"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const tag = input.trim();
              if (tag && !value.includes(tag)) {
                onChange([...value, tag]);
              }
              setInput("");
            }
          }}
        />
        {value.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {value.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => onChange(value.filter((t) => t !== tag))}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </FormField>
  );
}
