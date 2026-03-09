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
 * Elevated typography with groovy font for titles.
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
        <p className="mb-3 font-groovy text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </p>
      )}
      <h2 className="font-groovy text-[clamp(1.6rem,4vw,2.5rem)] font-bold leading-tight">{title}</h2>
      {description && (
        <p className="mt-4 max-w-2xl text-base text-muted-foreground leading-relaxed lg:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
