import clsx from "clsx";
import {
  siFigma,
  siGooglechrome,
  siApple,
  siNotion,
  siSafari,
  siSubstack,
  siX,
  siYoutube,
} from "simple-icons";
import { Briefcase, FileText, Image as ImageIcon, MessageSquare, StickyNote, type LucideIcon } from "lucide-react";

type Brand = { path: string };

export type Source = {
  name: string;
  brand?: Brand;
  /** Neutral glyph for sources without a usable brand mark. */
  icon?: LucideIcon;
};

// Slack and LinkedIn marks aren't distributed by simple-icons at the brands'
// request, so they use a neutral glyph alongside the name.
export const SOURCES = {
  chrome: { name: "Chrome", brand: siGooglechrome },
  safari: { name: "Safari", brand: siSafari },
  ios: { name: "iOS", brand: siApple },
  slack: { name: "Slack", icon: MessageSquare },
  notion: { name: "Notion", brand: siNotion },
  figma: { name: "Figma", brand: siFigma },
  linkedin: { name: "LinkedIn", icon: Briefcase },
  x: { name: "X", brand: siX },
  youtube: { name: "YouTube", brand: siYoutube },
  substack: { name: "Newsletters", brand: siSubstack },
  screenshots: { name: "Screenshots", icon: ImageIcon },
  notes: { name: "Notes", icon: StickyNote },
  pdf: { name: "PDFs", icon: FileText },
} satisfies Record<string, Source>;

export function SourceGlyph({ source, className }: { source: Source; className?: string }) {
  if (source.brand)
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={clsx("h-3.5 w-3.5 shrink-0", className)} fill="currentColor">
        <path d={source.brand.path} />
      </svg>
    );
  const Icon = source.icon!;
  return <Icon aria-hidden="true" strokeWidth={1.9} className={clsx("h-3.5 w-3.5 shrink-0", className)} />;
}

/** White, lightly lifted badge: glyph + name. */
export function SourceBadge({ source, className }: { source: Source; className?: string }) {
  return (
    <span
      className={clsx(
        "tag-lift inline-flex h-8 items-center gap-1.5 rounded-full bg-surface px-3 text-[13px] font-medium tracking-[-0.01em] text-ink/80",
        className,
      )}
    >
      <SourceGlyph source={source} className="text-ink/70" />
      {source.name}
    </span>
  );
}
