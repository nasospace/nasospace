/**
 * Image upload field for admin CMS forms.
 * Supports single cover image upload with crop + gallery multi-upload.
 * Includes drag-and-drop support for both.
 * Uses the cms-images storage bucket.
 */
import { useState, useRef, useCallback, type DragEvent } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { supabase } from "@/integrations/supabase/client";
import { FormField } from "./FormFields";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Upload, X, Loader2, Image as ImageIcon, Crop } from "lucide-react";
import { cn } from "@/lib/utils";

const BUCKET = "cms-images";
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

/* ─── Drag-and-drop hook ─── */

function useDropZone(onDrop: (files: FileList) => void) {
  const [dragOver, setDragOver] = useState(false);

  const handlers = {
    onDragOver: (e: DragEvent) => { e.preventDefault(); setDragOver(true); },
    onDragLeave: (e: DragEvent) => { e.preventDefault(); setDragOver(false); },
    onDrop: (e: DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const files = e.dataTransfer.files;
      if (files.length) onDrop(files);
    },
  };

  return { dragOver, handlers };
}

/* ─── Crop helpers ─── */

interface CropPreset {
  label: string;
  aspect: number;
  width: number;
  height: number;
}

const CROP_PRESETS: CropPreset[] = [
  { label: "Cover (16:9)", aspect: 16 / 9, width: 1280, height: 720 },
  { label: "Square (1:1)", aspect: 1, width: 800, height: 800 },
  { label: "Portrait (3:4)", aspect: 3 / 4, width: 600, height: 800 },
];

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

async function cropImage(
  imageSrc: string,
  crop: Area,
  outputWidth: number,
  outputHeight: number,
): Promise<Blob> {
  const img = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  canvas.width = outputWidth;
  canvas.height = outputHeight;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(
    img,
    crop.x, crop.y, crop.width, crop.height,
    0, 0, outputWidth, outputHeight,
  );
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Canvas export failed"))),
      "image/webp",
      0.85,
    );
  });
}

/* ─── Upload helper ─── */

async function uploadBlob(blob: Blob, folder: string, ext = "webp"): Promise<string> {
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, blob, {
    cacheControl: "3600",
    contentType: blob.type,
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

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

/* ─── Crop Dialog ─── */

interface CropDialogProps {
  open: boolean;
  imageSrc: string;
  onClose: () => void;
  onComplete: (blob: Blob) => void;
}

function CropDialog({ open, imageSrc, onClose, onComplete }: CropDialogProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  const [presetIdx, setPresetIdx] = useState(0);
  const preset = CROP_PRESETS[presetIdx];

  const onCropComplete = useCallback((_: Area, area: Area) => {
    setCroppedArea(area);
  }, []);

  const handleConfirm = async () => {
    if (!croppedArea) return;
    const blob = await cropImage(imageSrc, croppedArea, preset.width, preset.height);
    onComplete(blob);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-4 pb-2">
          <DialogTitle className="flex items-center gap-2 text-base">
            <Crop className="h-4 w-4" /> Crop Image
          </DialogTitle>
        </DialogHeader>

        {/* Preset selector */}
        <div className="flex gap-1.5 px-4 pb-2">
          {CROP_PRESETS.map((p, i) => (
            <button
              key={p.label}
              type="button"
              onClick={() => { setPresetIdx(i); setZoom(1); setCrop({ x: 0, y: 0 }); }}
              className={cn(
                "rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors",
                i === presetIdx
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Cropper area */}
        <div className="relative w-full bg-black" style={{ height: 320 }}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={preset.aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        {/* Zoom slider */}
        <div className="flex items-center gap-3 px-4 py-3">
          <span className="text-xs text-muted-foreground shrink-0">Zoom</span>
          <Slider
            value={[zoom]}
            min={1}
            max={3}
            step={0.05}
            onValueChange={([v]) => setZoom(v)}
            className="flex-1"
          />
          <span className="text-xs text-muted-foreground w-8 text-right">{zoom.toFixed(1)}×</span>
        </div>

        <DialogFooter className="px-4 pb-4">
          <p className="flex-1 text-[11px] text-muted-foreground">
            Output: {preset.width}×{preset.height}px · WebP
          </p>
          <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
          <Button size="sm" onClick={handleConfirm}>Apply Crop</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ─── Drop zone styling ─── */

const dropZoneBase =
  "flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed bg-muted/50 text-sm text-muted-foreground transition-colors";
const dropZoneIdle = "border-border hover:border-primary/40 hover:text-foreground";
const dropZoneActive = "border-primary bg-primary/5 text-foreground";

/* ─── Single Image Upload ─── */

interface ImageUploadFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  altValue?: string;
  onAltChange?: (alt: string) => void;
  /** Disable crop dialog (e.g. for testimonial avatars) */
  skipCrop?: boolean;
}

export function ImageUploadField({
  label, name, value, onChange, folder = "covers",
  altValue, onAltChange, skipCrop = false,
}: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Only JPEG, PNG, WebP, and GIF files are accepted");
      return;
    }
    if (skipCrop) {
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
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setCropSrc(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((files: FileList) => {
    const file = files[0];
    if (file) handleFile(file);
  }, [skipCrop, folder]);

  const { dragOver, handlers } = useDropZone(handleDrop);

  const handleCropComplete = async (blob: Blob) => {
    setCropSrc(null);
    setError("");
    setUploading(true);
    try {
      const url = await uploadBlob(blob, folder);
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
            className={cn(dropZoneBase, "py-6", dragOver ? dropZoneActive : dropZoneIdle)}
            {...handlers}
          >
            {uploading ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Uploading…</>
            ) : dragOver ? (
              <><Upload className="h-4 w-4" /> Drop image here</>
            ) : (
              <><Upload className="h-4 w-4" /> Drag & drop or click to upload</>
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

      {cropSrc && (
        <CropDialog
          open
          imageSrc={cropSrc}
          onClose={() => setCropSrc(null)}
          onComplete={handleCropComplete}
        />
      )}
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
  const [cropQueue, setCropQueue] = useState<string[]>([]);
  const [croppedBlobs, setCroppedBlobs] = useState<Blob[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFiles = useCallback((files: FileList) => {
    const imageFiles = Array.from(files).filter(f => ACCEPTED_TYPES.includes(f.type));
    if (!imageFiles.length) return;
    const readers = imageFiles.map(
      (file) =>
        new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        })
    );
    Promise.all(readers).then((srcs) => {
      setCropQueue(srcs);
      setCroppedBlobs([]);
    });
  }, []);

  const { dragOver, handlers } = useDropZone(processFiles);

  const handleCropOne = async (blob: Blob) => {
    const newBlobs = [...croppedBlobs, blob];
    const remaining = cropQueue.slice(1);
    
    if (remaining.length === 0) {
      setCropQueue([]);
      setCroppedBlobs([]);
      setUploading(true);
      try {
        const urls = await Promise.all(
          newBlobs.map((b) => uploadBlob(b, folder))
        );
        onChange([...value, ...urls]);
      } catch {
        // partial uploads kept
      } finally {
        setUploading(false);
      }
    } else {
      setCroppedBlobs(newBlobs);
      setCropQueue(remaining);
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
          className={cn(dropZoneBase, "py-3 text-xs", dragOver ? dropZoneActive : dropZoneIdle)}
          {...handlers}
        >
          {uploading ? (
            <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Uploading…</>
          ) : dragOver ? (
            <><Upload className="h-3.5 w-3.5" /> Drop images here</>
          ) : (
            <><ImageIcon className="h-3.5 w-3.5" /> Drag & drop or click to add gallery images</>
          )}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) processFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {cropQueue.length > 0 && (
        <CropDialog
          open
          imageSrc={cropQueue[0]}
          onClose={() => { setCropQueue([]); setCroppedBlobs([]); }}
          onComplete={handleCropOne}
        />
      )}
    </FormField>
  );
}
