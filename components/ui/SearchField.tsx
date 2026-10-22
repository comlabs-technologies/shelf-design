import clsx from "clsx";
import { Search } from "lucide-react";

/** Static, non-interactive search field used inside product mockups. */
export function SearchField({
  value,
  placeholder,
  caret = true,
  className,
  trailing,
}: {
  value: string;
  placeholder?: string;
  caret?: boolean;
  className?: string;
  trailing?: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        "flex h-11 items-center gap-2.5 rounded-card border border-line-strong/70 bg-surface px-3.5 shadow-[0_1px_0_rgba(20,20,18,.03)]",
        className,
      )}
    >
      <Search className="h-4 w-4 shrink-0 text-muted" strokeWidth={1.8} aria-hidden="true" />
      <span className="min-w-0 flex-1 truncate text-[14px] tracking-[-0.01em] text-ink">
        {value ? value : <span className="text-muted">{placeholder}</span>}
        {caret && <span className="caret" aria-hidden="true" />}
      </span>
      {trailing}
    </div>
  );
}
