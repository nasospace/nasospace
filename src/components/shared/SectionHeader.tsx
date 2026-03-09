import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  description?: string;
  eyebrow?: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * SectionHeader — consistent section title + optional eyebrow & description.
 */
export function SectionHeader({
  title,
  description,
  eyebrow,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-8 md:mb-12",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="mb-3 font-display text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </p>
      )}
      <h2 className="font-groovy text-3xl md:text-4xl font-bold">{title}</h2>
      {description && (
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
