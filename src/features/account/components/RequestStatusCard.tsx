import { cn } from "@/lib/utils";
import { INQUIRY_TYPE_META } from "@/features/inquiries/types";
import type { RequestHistoryItem } from "../types";
import { REQUEST_STATUS_META } from "../types";

interface RequestStatusCardProps {
  request: RequestHistoryItem;
  className?: string;
}

export function RequestStatusCard({ request, className }: RequestStatusCardProps) {
  const typeMeta = INQUIRY_TYPE_META[request.inquiryType];
  const statusMeta = REQUEST_STATUS_META[request.status];

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-4 transition-all duration-200 md:p-5",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Left: type + title */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-base">{typeMeta.emoji}</span>
            <span className="text-xs font-medium text-muted-foreground">
              {typeMeta.label}
            </span>
          </div>
          {request.itemTitle && (
            <h3 className="mt-1 truncate font-display text-sm font-semibold">
              {request.itemTitle}
            </h3>
          )}
        </div>

        {/* Right: status badge */}
        <span
          className={cn(
            "inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold",
            statusMeta.color,
            statusMeta.textColor
          )}
        >
          {statusMeta.emoji} {statusMeta.label}
        </span>
      </div>

      {/* Notes */}
      {request.notes && (
        <p className="mt-3 rounded-lg bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
          {request.notes}
        </p>
      )}

      {/* Dates */}
      <div className="mt-3 flex gap-4 text-[11px] text-muted-foreground">
        <span>Submitted {formatDate(request.submittedAt)}</span>
        {request.lastUpdated !== request.submittedAt && (
          <span>Updated {formatDate(request.lastUpdated)}</span>
        )}
      </div>
    </div>
  );
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
