import clsx from "clsx";
import { SOURCES, SourceBadge } from "./ui/SourceBadge";

const keys = ["chrome", "safari", "ios", "slack", "notion", "figma", "linkedin", "x"] as const;

/** "Built for people who save professionally" + the places Recall saves from. */
export function CredibilityStrip({ className }: { className?: string }) {
  return (
    <div className={clsx("flex flex-col items-center gap-3 lg:flex-row lg:justify-center lg:gap-5", className)}>
      <p className="shrink-0 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
        Built for people who save professionally
      </p>
      <ul
        className="-mx-5 flex max-w-[calc(100%+40px)] gap-1.5 overflow-x-auto px-5 py-2 scrollbar-none [mask-image:linear-gradient(90deg,transparent,#000_20px,#000_calc(100%-20px),transparent)] lg:mx-0 lg:max-w-none lg:flex-wrap lg:justify-center lg:overflow-visible lg:p-0 lg:[mask-image:none]"
        aria-label="Saves from"
      >
        {keys.map((k) => (
          <li key={k} className="shrink-0">
            <SourceBadge source={SOURCES[k]} className="h-8 px-3 text-[13px]" />
          </li>
        ))}
      </ul>
    </div>
  );
}
