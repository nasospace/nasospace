import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  emoji: string;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

export function EmptyState({ emoji, title, description, ctaLabel, ctaHref, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16 px-6 text-center", className)}>
      <span className="text-4xl">{emoji}</span>
      <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">{description}</p>
      {ctaLabel && ctaHref && (
        <Button asChild variant="outline" className="mt-6 rounded-full">
          <Link to={ctaHref}>{ctaLabel}</Link>
        </Button>
      )}
    </div>
  );
}
