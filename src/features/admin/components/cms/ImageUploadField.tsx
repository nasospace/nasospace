/**
 * Image upload field for admin CMS forms.
 * Supports single cover image upload + gallery multi-upload.
 * Uses the cms-images storage bucket.
 */
import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FormField } from "./FormFields";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";

const BUCKET = "cms-images";

async function uploadFile(file: File, folder: string): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

/* ─── Single Image Upload ─── */

interface ImageUploadFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  altValue?: string;
  onAltChange?: (alt: string) => void;
}

export function ImageUploadField({
  label, name, value, onChange, folder = "covers",
  altValue, onAltChange,
}: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setError("");
    setUploading(true);
    try {
      const url = await uploadFile(file, folder);
      onChange(url);
    } catch (err: any) {
      setError(err.message ?? "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <FormField label={label} name={name} error={error}>
      <div className="space-y-2">
        {value ? (
          <div className="relative group rounded-lg overflow-hidden border border-border bg-muted">
            <img src={value} alt={altValue || "Preview"} className="w-full h-32 object-cover" />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute top-1.5 right-1.5 rounded-full bg-background/80 p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-muted/50 py-6 text-sm text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors"
          >
            {uploading ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Uploading…</>
            ) : (
              <><Upload className="h-4 w-4" /> Click to upload image</>
            )}
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />
        {/* Manual URL fallback */}
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="or paste image URL"
          className="text-xs h-8"
        />
        {onAltChange !== undefined && (
          <Input
            value={altValue ?? ""}
            onChange={(e) => onAltChange(e.target.value)}
            placeholder="Alt text for accessibility"
            className="text-xs h-8"
          />
        )}
      </div>
    </FormField>
  );
}

/* ─── Gallery (multi) Upload ─── */

interface GalleryUploadFieldProps {
  label: string;
  name: string;
  value: string[];
  onChange: (urls: string[]) => void;
  folder?: string;
}

export function GalleryUploadField({
  label, name, value, onChange, folder = "gallery",
}: GalleryUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList) => {
    setUploading(true);
    try {
      const urls = await Promise.all(
        Array.from(files).map((f) => uploadFile(f, folder))
      );
      onChange([...value, ...urls]);
    } catch {
      // individual errors swallowed, partial uploads kept
    } finally {
      setUploading(false);
    }
  };

  const remove = (idx: number) => onChange(value.filter((_, i) => i !== idx));

  return (
    <FormField label={label} name={name}>
      <div className="space-y-2">
        {value.length > 0 && (
          <div className="grid grid-cols-4 gap-2">
            {value.map((url, i) => (
              <div key={i} className="relative group rounded-md overflow-hidden border border-border">
                <img src={url} alt="" className="w-full h-16 object-cover" />
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="absolute top-0.5 right-0.5 rounded-full bg-background/80 p-0.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/50 py-3 text-xs text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors"
        >
          {uploading ? (
            <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Uploading…</>
          ) : (
            <><ImageIcon className="h-3.5 w-3.5" /> Add gallery images</>
          )}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>
    </FormField>
  );
}
