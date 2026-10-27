import clsx from "clsx";
import {
  siApple,
  siFigma,
  siGooglechrome,
  siInstagram,
  siMedium,
  siNotion,
  siSafari,
  siSpotify,
  siSubstack,
  siX,
  siYoutube,
} from "simple-icons";
// Slack and LinkedIn marks: Font Awesome Free brands, CC BY 4.0 — https://fontawesome.com/license/free
import { faLinkedin, faSlack, type IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { FileText, Image as ImageIcon, Mic, StickyNote, type LucideIcon } from "lucide-react";

type Mark = { path: string; viewBox: string; hex: string };

export type Source = {
  name: string;
  mark?: Mark;
  /** Neutral glyph for sources that aren't a brand (screenshots, notes…). */
  icon?: LucideIcon;
};

const si = (icon: { path: string; hex: string }): Mark => ({ path: icon.path, viewBox: "0 0 24 24", hex: `#${icon.hex}` });
const fa = (icon: IconDefinition, hex: string): Mark => {
  const [w, h, , , d] = icon.icon;
  return { path: Array.isArray(d) ? d.join(" ") : d, viewBox: `0 0 ${w} ${h}`, hex };
};

export const SOURCES = {
  chrome: { name: "Chrome", mark: si(siGooglechrome) },
  safari: { name: "Safari", mark: si(siSafari) },
  ios: { name: "iOS", mark: si(siApple) },
  slack: { name: "Slack", mark: fa(faSlack, "#4A154B") },
  notion: { name: "Notion", mark: si(siNotion) },
  figma: { name: "Figma", mark: si(siFigma) },
  linkedin: { name: "LinkedIn", mark: fa(faLinkedin, "#0A66C2") },
  x: { name: "X", mark: si(siX) },
  youtube: { name: "YouTube", mark: si(siYoutube) },
  instagram: { name: "Instagram", mark: si(siInstagram) },
  spotify: { name: "Spotify", mark: si(siSpotify) },
  medium: { name: "Medium", mark: si(siMedium) },
  substack: { name: "Newsletters", mark: si(siSubstack) },
  screenshots: { name: "Screenshots", icon: ImageIcon },
  notes: { name: "Notes", icon: StickyNote },
  pdf: { name: "PDFs", icon: FileText },
  voice: { name: "Voice notes", icon: Mic },
} satisfies Record<string, Source>;

/** Brand mark (monochrome by default, or in its brand colour) or a neutral glyph. */
export function SourceGlyph({
  source,
  className,
  colored = false,
}: {
  source: Source;
  className?: string;
  colored?: boolean;
}) {
  if (source.mark)
    return (
      <svg
        viewBox={source.mark.viewBox}
        aria-hidden="true"
        className={clsx("h-3.5 w-3.5 shrink-0", className)}
        fill={colored ? source.mark.hex : "currentColor"}
      >
        <path d={source.mark.path} />
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
