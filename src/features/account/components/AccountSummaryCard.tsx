import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface AccountSummaryCardProps {
  emoji: string;
  label: string;
  count: number;
  href: string;
  className?: string;
}

export function AccountSummaryCard({ emoji, label, count, href, className }: AccountSummaryCardProps) {
  return (
    <Link
      to={href}
      className={cn(
        "group flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:shadow-card hover:-translate-y-0.5",
        className
      )}
    >
      <span className="text-2xl">{emoji}</span>
      <div>
        <p className="font-display text-2xl font-bold">{count}</p>
        <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
          {label}
        </p>
      </div>
    </Link>
  );
}
