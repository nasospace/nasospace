interface AccountSectionHeaderProps {
  title: string;
  description?: string;
  emoji?: string;
  action?: React.ReactNode;
}

export function AccountSectionHeader({ title, description, emoji, action }: AccountSectionHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="flex items-center gap-2 font-display text-xl font-semibold md:text-2xl">
          {emoji && <span>{emoji}</span>}
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
