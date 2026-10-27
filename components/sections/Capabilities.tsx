"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Download, Lock } from "lucide-react";
import { Eyebrow, SectionTitle } from "../ui/Eyebrow";
import { SearchField } from "../ui/SearchField";
import { SourceChip, type SourceKind } from "../ui/SourceChip";

const ease = [0.22, 1, 0.36, 1] as const;
const CYCLE = 6500;

/* ---------- 01 · Search by meaning ---------- */

type Example = {
  query: string;
  result: { title: string; meta: string; kind: SourceKind; source: string; thumb: "chart" | "phone" | "pricing" };
  matches: [said: string, found: string][];
};

const examples: Example[] = [
  {
    query: "that chart Sam sent about week-one drop-off",
    result: { title: "Cohort retention, March signups", meta: "Shared by Sam Okafor · 6 Mar", kind: "slack", source: "Slack", thumb: "chart" },
    matches: [
      ["“that chart”", "An image containing a line chart"],
      ["“Sam sent”", "Shared by Sam Okafor in #growth"],
      ["“week-one drop-off”", "Day 1–7 retention, falling to 38%"],
    ],
  },
  {
    query: "the calm onboarding checklist from that app",
    result: { title: "Orbit — setup checklist, step 2 of 4", meta: "Screenshot from iPhone · 2 Apr", kind: "screenshot", source: "Screenshot", thumb: "phone" },
    matches: [
      ["“calm”", "Your note: “the progress ring feels calm”"],
      ["“onboarding checklist”", "A four-step setup flow, read from the image"],
      ["“that app”", "Orbit, recognised from the screenshot"],
    ],
  },
  {
    query: "pricing page with the quiet annual toggle",
    result: { title: "Kiln pricing table", meta: "kiln.app/pricing · 3 Jan", kind: "web", source: "Web", thumb: "pricing" },
    matches: [
      ["“pricing page”", "kiln.app/pricing"],
      ["“quiet”", "Maya’s note: “shown without shouting”"],
      ["“annual toggle”", "A Monthly / Annual switch on the page"],
    ],
  },
];

function Thumb({ kind }: { kind: Example["result"]["thumb"] }) {
  if (kind === "chart")
    return (
      <svg viewBox="0 0 120 80" className="h-full w-full" fill="none" aria-hidden="true">
        {[20, 40, 60].map((y) => (
          <path key={y} d={`M8 ${y}H112`} stroke="#E9E8E2" />
        ))}
        <path d="M8 12 C 24 14, 30 46, 46 50 S 80 58, 112 60" stroke="#191918" strokeWidth="2" />
        <circle cx="46" cy="50" r="3" fill="#191918" />
      </svg>
    );
  if (kind === "phone")
    return (
      <div className="mx-auto h-full w-[54%] rounded-[9px] border border-line bg-surface p-1.5" aria-hidden="true">
        <div className="mx-auto h-5 w-5 rounded-full border-[2.5px] border-ink border-r-line border-t-line" />
        {[1, 1, 0, 0].map((d, i) => (
          <div key={i} className="mt-1 flex items-center gap-1">
            <span className={clsx("h-1.5 w-1.5 rounded-full", d ? "bg-ink" : "border border-line-strong")} />
            <span className="h-[3px] flex-1 rounded bg-ink/15" />
          </div>
        ))}
      </div>
    );
  return (
    <div className="flex h-full flex-col justify-center gap-1.5 px-2" aria-hidden="true">
      <div className="mx-auto flex rounded-full bg-sand p-[2px] text-[6px]">
        <span className="rounded-full px-1.5 py-[1px] text-muted">Monthly</span>
        <span className="rounded-full bg-surface px-1.5 py-[1px] font-medium">Annual</span>
      </div>
      <div className="grid grid-cols-3 gap-1">
        {[0, 1, 2].map((i) => (
          <div key={i} className={clsx("h-9 rounded-[4px] border bg-surface p-1", i === 1 ? "border-ink/40" : "border-line")}>
            <div className="h-1 w-3/4 rounded bg-ink/40" />
            <div className="mt-1 h-[3px] w-1/2 rounded bg-ink/15" />
          </div>
        ))}
      </div>
    </div>
  );
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView] as const;
}

function SearchByMeaning() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [ref, inView] = useInView<HTMLDivElement>();
  const reduce = useReducedMotion();
  const playing = auto && inView && !reduce;
  const ex = examples[active];

  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % examples.length), CYCLE);
    return () => window.clearTimeout(t);
  }, [playing, active]);

  return (
    <article
      ref={ref}
      data-reveal
      className="grid grid-cols-1 gap-10 rounded-[20px] border border-line bg-surface p-5 sm:p-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14 lg:p-10"
    >
      <div className="flex flex-col">
        <p className="font-mono text-[11.5px] text-muted">01</p>
        <h3 className="mt-3 text-[28px] font-semibold leading-[1.05] tracking-[-0.04em] sm:text-[34px]">Search by meaning</h3>
        <p className="mt-3 max-w-[360px] text-[16px] leading-[1.55] text-muted">
          Describe it the way you remember it. Recall matches what you meant, then shows you why.
        </p>

        <p className="mt-8 text-[11px] font-medium uppercase tracking-[0.12em] text-muted">Try asking</p>
        <ul className="mt-3 space-y-1.5" role="tablist" aria-label="Example searches">
          {examples.map((e, i) => (
            <li key={e.query}>
              <button
                type="button"
                role="tab"
                aria-selected={active === i}
                onClick={() => {
                  setActive(i);
                  setAuto(false);
                }}
                className={clsx(
                  "relative w-full overflow-hidden rounded-card border px-3.5 py-3 text-left text-[14.5px] leading-snug tracking-[-0.01em] transition-colors duration-200",
                  active === i ? "border-line bg-paper text-ink" : "border-transparent text-muted hover:text-ink",
                )}
              >
                {e.query}
                {active === i && playing && (
                  <motion.span
                    key={`bar-${i}`}
                    className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-lime"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: CYCLE / 1000, ease: "linear" }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-line bg-paper p-3 sm:p-5" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25, ease }}
          >
            <SearchField value={ex.query} caret={false} className="h-12" />

            <div className="ui-focus mt-3 flex gap-4 rounded-card border border-line bg-surface p-3 sm:p-4">
              <div className="h-[76px] w-[104px] shrink-0 overflow-hidden rounded-[9px] border border-line bg-paper p-1.5">
                <Thumb kind={ex.result.thumb} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-ink px-2 py-[2px] text-[10.5px] font-medium text-paper">Best match</span>
                  <SourceChip kind={ex.result.kind} label={ex.result.source} />
                </div>
                <p className="mt-2 text-[15px] font-medium leading-snug tracking-[-0.02em]">{ex.result.title}</p>
                <p className="mt-0.5 text-[12px] text-muted">{ex.result.meta}</p>
              </div>
            </div>

            <p className="mb-2 mt-5 px-1 text-[11px] font-medium uppercase tracking-[0.12em] text-muted">Why it matched</p>
            <ul className="divide-y divide-line overflow-hidden rounded-card border border-line bg-surface">
              {ex.matches.map(([said, found], i) => (
                <motion.li
                  key={said}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, ease, delay: 0.12 + i * 0.09 }}
                  className="grid grid-cols-1 gap-1 px-3.5 py-3 text-[13px] sm:grid-cols-[minmax(0,0.8fr)_20px_minmax(0,1.2fr)] sm:items-center sm:gap-3"
                >
                  <span className="font-medium tracking-[-0.01em] text-ink">{said}</span>
                  <ArrowRight className="hidden h-3.5 w-3.5 text-muted sm:block" strokeWidth={1.8} aria-hidden="true" />
                  <span className="text-muted-strong">{found}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </article>
  );
}

/* ---------- 02 · Remember the why ---------- */

function RememberTheWhy() {
  return (
    <article data-reveal className="flex flex-col rounded-[20px] bg-sand p-5 sm:p-8 lg:p-10">
      <p className="font-mono text-[11.5px] text-muted">02</p>
      <h3 className="mt-3 text-[28px] font-semibold leading-[1.05] tracking-[-0.04em]">Remember the why</h3>
      <p className="mt-3 max-w-[420px] text-[16px] leading-[1.55] text-muted">
        Every save keeps the reason you kept it. Months later, the reason is how you find it.
      </p>

      <div className="relative mt-8 pl-7" aria-hidden="true">
        <span className="absolute bottom-6 left-[7px] top-3 border-l border-dashed border-line-strong" />

        <div className="relative">
          <span className="absolute -left-7 top-1 grid h-[15px] w-[15px] place-items-center rounded-full border border-line-strong bg-sand">
            <span className="h-[5px] w-[5px] rounded-full bg-ink" />
          </span>
          <p className="font-mono text-[11px] text-muted">14 Feb · you save it</p>
          <div className="mt-2.5 rounded-card border border-line bg-surface p-4">
            <p className="text-[12.5px] leading-[1.6] text-muted-strong">
              Most teams price on seats because it&rsquo;s easy to explain.{" "}
              <span className="text-ink underline decoration-ink/50 decoration-[1.5px] underline-offset-[3px]">
                The best ones price on the moment value shows up.
              </span>
            </p>
            <div className="mt-3 flex gap-2 rounded-[9px] bg-paper px-3 py-2">
              <span className="mt-[3px] h-3 w-[2px] shrink-0 rounded-full bg-lime" />
              <p className="text-[12.5px] leading-[1.5] text-ink">Anchor for the pricing slide — usage first, seats second.</p>
            </div>
          </div>
        </div>

        <p className="my-5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">· · · 203 days later</p>

        <div className="relative">
          <span className="absolute -left-7 top-1 grid h-[15px] w-[15px] place-items-center rounded-full border border-line-strong bg-sand">
            <span className="h-[5px] w-[5px] rounded-full bg-ink" />
          </span>
          <p className="font-mono text-[11px] text-muted">3 Sep · you ask</p>
          <div className="mt-2.5 rounded-card border border-line bg-surface p-3">
            <SearchField value="that usage-first pricing argument" caret={false} className="h-10 border-line" />
            <div className="mt-2 flex items-center justify-between gap-3 px-1 py-1.5">
              <p className="truncate text-[13px] font-medium tracking-[-0.01em]">Price on the moment value shows up</p>
              <span className="flex shrink-0 items-center gap-1 text-[11px] text-muted-strong">
                <Check className="h-3 w-3" strokeWidth={2.4} /> found by your note
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ---------- 03 · Keep it private ---------- */

function Switch({ on, locked }: { on: boolean; locked?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      {locked && <Lock className="h-3 w-3 text-muted" strokeWidth={2} />}
      <span className={clsx("relative h-[18px] w-8 rounded-full transition-colors", on ? "bg-ink" : "bg-line-strong")}>
        <span
          className={clsx(
            "absolute top-[2px] h-[14px] w-[14px] rounded-full bg-surface shadow-[0_1px_2px_rgba(20,20,18,.2)]",
            on ? "left-[16px]" : "left-[2px]",
          )}
        />
      </span>
    </span>
  );
}

function KeepItPrivate() {
  const settings = [
    { k: "Public links", d: "Off until you share an item on purpose", on: false },
    { k: "Advertising & profiling", d: "Never — this one can’t be switched on", on: false, locked: true },
    { k: "Encrypted at rest", d: "Every item, note and file", on: true },
  ];
  return (
    <article data-reveal className="flex flex-col rounded-[20px] border border-line bg-surface p-5 sm:p-8 lg:p-10">
      <p className="font-mono text-[11.5px] text-muted">03</p>
      <h3 className="mt-3 text-[28px] font-semibold leading-[1.05] tracking-[-0.04em]">Keep it private</h3>
      <p className="mt-3 max-w-[380px] text-[16px] leading-[1.55] text-muted">
        Your library is working material. Nothing leaves it unless you decide.
      </p>

      <div className="mt-8 overflow-hidden rounded-card border border-line" aria-hidden="true">
        <div className="border-b border-line bg-paper px-4 py-3">
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted">Who can see Northwind</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-[11px] font-semibold text-paper">M</span>
              <span className="text-[13px] font-medium">Maya Lindqvist</span>
            </span>
            <span className="text-[11.5px] text-muted">Owner</span>
          </div>
          <div className="mt-2.5 flex items-center gap-2.5">
            <span className="h-7 w-7 rounded-full border border-dashed border-line-strong" />
            <span className="text-[12.5px] text-muted">No one else, unless you invite them</span>
          </div>
        </div>
        <ul className="divide-y divide-line">
          {settings.map((s) => (
            <li key={s.k} className="flex items-center justify-between gap-4 px-4 py-3">
              <span>
                <span className="block text-[13px] font-medium tracking-[-0.01em]">{s.k}</span>
                <span className="block text-[11.5px] text-muted">{s.d}</span>
              </span>
              <Switch on={s.on} locked={s.locked} />
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between border-t border-line bg-paper px-4 py-3">
          <span className="text-[12px] text-muted">.zip · Markdown · JSON</span>
          <span className="tag-lift inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-[12px] font-medium">
            <Download className="h-3 w-3" strokeWidth={2.2} /> Export library
          </span>
        </div>
      </div>
    </article>
  );
}

export function Capabilities() {
  return (
    <section aria-labelledby="capabilities-title" className="pb-24 pt-28 sm:pb-36 sm:pt-40">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 xl:px-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <Eyebrow data-reveal>What Recall does</Eyebrow>
            <SectionTitle id="capabilities-title" data-reveal className="mt-4 max-w-[520px]">
              Three quiet ideas, built carefully.
            </SectionTitle>
          </div>
          <p data-reveal className="max-w-[420px] text-[17px] leading-[1.6] text-muted lg:justify-self-end">
            No folders to maintain, no tags to remember. Just a library that understands what you saved and why.
          </p>
        </div>

        <div className="mt-14 space-y-5">
          <SearchByMeaning />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.12fr_0.88fr]">
            <RememberTheWhy />
            <KeepItPrivate />
          </div>
        </div>
      </div>
    </section>
  );
}
