/**
 * InfoRow — shared key-value row for detail page info cards.
 */
export function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="font-display text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </dt>
      <dd className="text-right font-display text-sm font-semibold capitalize">{value}</dd>
    </div>
  );
}