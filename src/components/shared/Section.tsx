import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Use "lg" for major hero-level spacing */
  spacing?: "default" | "lg" | "none";
  /** Full-bleed removes the container constraint */
  fullBleed?: boolean;
}

/**
 * Section — consistent vertical rhythm wrapper.
 * Every page section should use this for spacing consistency.
 */
const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing = "default", fullBleed = false, children, ...props }, ref) => {
    const spacingClass = {
      default: "py-section",
      lg: "py-section-lg",
      none: "",
    }[spacing];

    return (
      <section ref={ref} className={cn(spacingClass, className)} {...props}>
        {fullBleed ? children : <div className="container">{children}</div>}
      </section>
    );
  }
);
Section.displayName = "Section";

export { Section };
