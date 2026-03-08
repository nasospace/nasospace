import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * SectionHeader — consistent section title + optional description.
 */
export function SectionHeader({ title, description, align = "left", className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-8 md:mb-12", align === "center" && "text-center", className)}>
      <h2>{title}</h2>
      {description && (
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
