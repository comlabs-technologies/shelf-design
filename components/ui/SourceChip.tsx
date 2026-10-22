import clsx from "clsx";
import { FileText, Globe, Image as ImageIcon, MessageSquare, StickyNote } from "lucide-react";

export type SourceKind = "web" | "note" | "screenshot" | "slack" | "doc";

const icons = {
  web: Globe,
  note: StickyNote,
  screenshot: ImageIcon,
  slack: MessageSquare,
  doc: FileText,
};

export function SourceChip({
  kind,
  label,
  className,
  ...rest
}: { kind: SourceKind; label: string; className?: string } & React.HTMLAttributes<HTMLSpanElement>) {
  const Icon = icons[kind];
  return (
    <span
      className={clsx(
        "inline-flex h-[22px] items-center gap-1 rounded-full border border-line bg-paper px-2 text-[11px] font-medium text-muted-strong",
        className,
      )}
      {...rest}
    >
      <Icon className="h-3 w-3" strokeWidth={1.8} aria-hidden="true" />
      {label}
    </span>
  );
}
