import { Fragment } from "react";
import clsx from "clsx";
import { SOURCES, type Source } from "./ui/SourceBadge";

const keys = ["chrome", "safari", "ios", "slack", "notion", "figma", "linkedin", "x"] as const;

/** Brand mark knocked out in white on a circle of the brand colour. */
function MarkDot({ source }: { source: Source }) {
  const m = source.mark!;
  return (
    <span
      aria-hidden="true"
      className="grid h-[1.15em] w-[1.15em] shrink-0 place-items-center rounded-full"
      style={{ backgroundColor: m.hex }}
    >
      <svg viewBox={m.viewBox} className="h-[0.6em] w-[0.6em]" fill="#fff">
        <path d={m.path} />
      </svg>
    </span>
  );
}

/** Inline chip that sits in a line of text: brand dot + name. */
function InlineChip({ source }: { source: Source }) {
  return (
    <span className="ml-[0.06em] inline-flex translate-y-[-0.04em] items-center gap-[0.28em] whitespace-nowrap rounded-full bg-[#EAE9E3] py-[0.12em] pl-[0.16em] pr-[0.5em] align-middle leading-none text-ink">
      <MarkDot source={source} />
      {source.name}
    </span>
  );
}

/** "Built for people who save professionally — from Chrome, Safari, …" */
export function CredibilityStrip({ className }: { className?: string }) {
  return (
    <div className={clsx("mx-auto max-w-[1100px] text-center", className)}>
      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
        Built for people who save professionally
      </p>
      <p className="mt-5 text-balance text-[24px] font-medium leading-[1.75] tracking-[-0.03em] text-muted sm:text-[30px] lg:text-[36px]">
        Saving from{" "}
        {keys.map((k, i) => (
          <Fragment key={k}>
            {i === keys.length - 1 && "and "}
            {/* keep each chip and its comma together so commas never start a line */}
            <span className="whitespace-nowrap">
              <InlineChip source={SOURCES[k]} />
              {i < keys.length - 2 ? "," : ""}
            </span>{" "}
          </Fragment>
        ))}
        — then finding it again in a sentence.
      </p>
    </div>
  );
}
