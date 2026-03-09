import { useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import type { SavedItemType } from "@/features/account/types";

interface SaveButtonProps {
  itemType: SavedItemType;
  title: string;
  className?: string;
  /** Render as a compact icon-only circle (default) or a labeled pill */
  variant?: "icon" | "pill";
}

const TYPE_LABEL: Record<SavedItemType, string> = {
  experience: "Experience",
  workshop: "Workshop",
  product: "Product",
};

export function SaveButton({ itemType, title, className, variant = "icon" }: SaveButtonProps) {
  const [saved, setSaved] = useState(false);
  const { toast } = useToast();

  const toggle = () => {
    const next = !saved;
    setSaved(next);
    toast({
      title: next ? "Saved ♥" : "Removed",
      description: next
        ? `${title} added to your saved items.`
        : `${title} removed from saved items.`,
    });
  };

  if (variant === "pill") {
    return (
      <button
        onClick={toggle}
        className={cn(
          "inline-flex items-center gap-2 rounded-full border-2 border-foreground px-5 py-2",
          "font-groovy text-[10px] font-bold uppercase tracking-wider",
          "transition-all duration-200",
          saved
            ? "bg-primary text-primary-foreground shadow-retro"
            : "bg-card text-foreground hover:shadow-retro",
          className
        )}
      >
        <Heart className={cn("h-3.5 w-3.5", saved && "fill-current")} />
        {saved ? "Saved" : `Save ${TYPE_LABEL[itemType]}`}
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label={saved ? `Remove ${title} from saved` : `Save ${title}`}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full border-2 border-foreground",
        "transition-all duration-200",
        saved
          ? "bg-primary text-primary-foreground shadow-retro"
          : "bg-card text-foreground hover:shadow-retro",
        className
      )}
    >
      <Heart className={cn("h-4 w-4", saved && "fill-current")} />
    </button>
  );
}
