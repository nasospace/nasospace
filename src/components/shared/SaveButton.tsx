import { Heart, Loader2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth";
import { useSavedItemState } from "@/hooks/useSavedItemState";
import { ROUTES } from "@/config/routes";
import type { SavedItemType } from "@/features/account/types";

interface SaveButtonProps {
  itemType: SavedItemType;
  itemSlug: string;
  title: string;
  className?: string;
  variant?: "icon" | "pill";
}

const TYPE_LABEL: Record<SavedItemType, string> = {
  experience: "Experience",
  workshop: "Workshop",
  product: "Product",
};

export function SaveButton({ itemType, itemSlug, title, className, variant = "icon" }: SaveButtonProps) {
  const { isAuthenticated } = useAuth();
  const { isSaved, isLoading, isPending, toggle } = useSavedItemState(itemType, itemSlug);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const handleToggle = () => {
    if (!isAuthenticated) {
      toast({
        title: "Sign in to save",
        description: "Create an account to save items and track them later.",
      });
      // Pass current path so sign-in can redirect back here
      navigate(ROUTES.SIGN_IN, { state: { from: location.pathname + location.search } });
      return;
    }
    toggle();
    toast({
      title: isSaved ? "Removed" : "Saved ♥",
      description: isSaved
        ? `${title} removed from saved items.`
        : `${title} added to your saved items.`,
    });
  };

  const busy = isLoading || isPending;

  if (variant === "pill") {
    return (
      <button
        onClick={handleToggle}
        disabled={busy}
        className={cn(
          "inline-flex items-center gap-2 rounded-full border-2 border-foreground px-5 py-2",
          "font-groovy text-[10px] font-bold uppercase tracking-wider",
          "transition-all duration-200",
          isSaved
            ? "bg-primary text-primary-foreground shadow-retro"
            : "bg-card text-foreground hover:shadow-retro",
          busy && "opacity-60 cursor-not-allowed",
          className
        )}
      >
        {busy ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <Heart className={cn("h-3.5 w-3.5", isSaved && "fill-current")} />
        )}
        {isSaved ? "Saved" : `Save ${TYPE_LABEL[itemType]}`}
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      disabled={busy}
      aria-label={isSaved ? `Remove ${title} from saved` : `Save ${title}`}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full border-2 border-foreground",
        "transition-all duration-200",
        isSaved
          ? "bg-primary text-primary-foreground shadow-retro"
          : "bg-card text-foreground hover:shadow-retro",
        busy && "opacity-60 cursor-not-allowed",
        className
      )}
    >
      {busy ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Heart className={cn("h-4 w-4", isSaved && "fill-current")} />
      )}
    </button>
  );
}
