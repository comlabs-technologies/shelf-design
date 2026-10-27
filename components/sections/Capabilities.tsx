"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Eyebrow, SectionTitle } from "../ui/Eyebrow";
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

/** Splits the query so the phrases Recall matched can be marked and numbered. */
function markedQuery(ex: Example) {
  const phrases = ex.matches.map(([said]) => said.replace(/[“”]/g, ""));
  const parts: { text: string; n?: number }[] = [];
  let rest = ex.query;
  while (rest) {
    let hit: { at: number; i: number } | null = null;
    phrases.forEach((p, i) => {
      const at = rest.indexOf(p);
      if (at >= 0 && (!hit || at < hit.at)) hit = { at, i };
    });
    if (!hit) {
      parts.push({ text: rest });
      break;
    }
    const { at, i } = hit as { at: number; i: number };
    if (at > 0) parts.push({ text: rest.slice(0, at) });
    parts.push({ text: phrases[i], n: i + 1 });
    rest = rest.slice(at + phrases[i].length);
  }
  return parts;
}

const tabs = ["Chart", "Checklist", "Pricing"];

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
      className="flex flex-col rounded-[20px] border border-[rgba(25,25,24,.06)] bg-[#FCFCFA] p-6 shadow-[0_1px_0_rgba(25,25,24,.03),0_24px_50px_-30px_rgba(25,25,24,.25)] sm:p-10"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">Search by meaning</p>
        <div className="flex rounded-full bg-sand p-1" role="tablist" aria-label="Example searches">
          {tabs.map((t, i) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={active === i}
              onClick={() => {
                setActive(i);
                setAuto(false);
              }}
              className={clsx(
                "relative overflow-hidden rounded-full px-3.5 py-1.5 text-[12.5px] font-medium tracking-[-0.01em] transition-colors duration-200",
                active === i ? "bg-surface text-ink shadow-[0_1px_2px_rgba(25,25,24,.08)]" : "text-muted hover:text-ink",
              )}
            >
              {t}
              {active === i && playing && (
                <motion.span
                  key={`bar-${i}`}
                  className="absolute inset-x-3 bottom-[3px] h-px origin-left bg-ink/40"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: CYCLE / 1000, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <h3 className="mt-6 text-[34px] font-medium leading-[0.96] tracking-[-0.04em] sm:text-[44px]">
        Ask the way
        <br />
        you remember.
      </h3>

      <div className="mt-auto pt-12" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25, ease }}
          >
            <p className="text-[22px] font-medium leading-[1.35] tracking-[-0.03em] text-ink/40 sm:text-[28px]">
              &ldquo;
              {markedQuery(ex).map((part, i) =>
                part.n ? (
                  <span key={i} className="text-ink underline decoration-ink/20 decoration-[1.5px] underline-offset-[6px]">
                    {part.text}
                    <sup className="ml-0.5 text-[0.45em] font-medium tracking-normal text-muted">{part.n}</sup>
                  </span>
                ) : (
                  <span key={i}>{part.text}</span>
                ),
              )}
              &rdquo;
            </p>

            <div className="ui-focus mt-8 flex items-center gap-4 rounded-[16px] border border-line bg-surface p-3 pr-5">
              <div className="h-[64px] w-[88px] shrink-0 overflow-hidden rounded-[10px] border border-line bg-paper p-1.5">
                <Thumb kind={ex.result.thumb} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-medium tracking-[-0.02em]">{ex.result.title}</p>
                <p className="mt-0.5 text-[12.5px] text-muted">{ex.result.meta}</p>
              </div>
              <SourceChip kind={ex.result.kind} label={ex.result.source} className="hidden shrink-0 sm:inline-flex" />
            </div>

            <ol className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-3">
              {ex.matches.map(([, found], i) => (
                <motion.li
                  key={found}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, ease, delay: 0.12 + i * 0.09 }}
                  className="border-t border-line pt-3 text-[13.5px] font-medium leading-[1.4] tracking-[-0.015em] text-muted-strong"
                >
                  <span className="mb-1 block text-[11px] tabular-nums text-muted">{i + 1}</span>
                  {found}
                </motion.li>
              ))}
            </ol>
          </motion.div>
        </AnimatePresence>
      </div>
    </article>
  );
}

/* ---------- 02 · Remember the why ---------- */

function RememberTheWhy() {
  return (
    <article
      data-reveal
      className="flex min-h-[560px] flex-col rounded-[20px] bg-ink p-6 text-paper shadow-[0_1px_0_rgba(25,25,24,.2),0_24px_50px_-24px_rgba(25,25,24,.45)] sm:p-10"
    >
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-paper/45">Remember the why</p>
      <h3 className="mt-6 text-[34px] font-medium leading-[0.96] tracking-[-0.04em] sm:text-[44px]">
        Keep the reason,
        <br />
        not just the link.
      </h3>

      <blockquote className="mt-auto pt-12 text-[24px] font-medium leading-[1.25] tracking-[-0.03em] text-paper/90 sm:text-[28px]">
        &ldquo;Anchor for the pricing slide — usage first, seats second.&rdquo;
      </blockquote>

      <ol className="mt-10 space-y-0 text-[14px] font-medium tracking-[-0.02em]" aria-label="Timeline">
        <li className="flex items-center gap-4 border-t border-white/10 py-3.5">
          <span className="h-2 w-2 rounded-full bg-paper/40" aria-hidden="true" />
          <span className="text-paper/55">14 Feb</span>
          <span className="ml-auto text-paper/80">Saved with one line of why</span>
        </li>
        <li className="flex items-center gap-4 border-t border-white/10 py-3.5">
          <span className="h-2 w-2 rounded-full bg-lime" aria-hidden="true" />
          <span className="text-paper/55">3 Sep</span>
          <span className="ml-auto text-paper">Found by that line, 203 days later</span>
        </li>
      </ol>
    </article>
  );
}

export function Capabilities() {
  return (
    <section aria-labelledby="capabilities-title" className="py-32 sm:py-44">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 xl:px-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <Eyebrow data-reveal>What Recall does</Eyebrow>
            <SectionTitle id="capabilities-title" data-reveal className="mt-5 max-w-[640px]">
              Built around how memory actually works.
            </SectionTitle>
          </div>
          <p data-reveal className="max-w-[400px] text-[17px] font-medium leading-[1.5] tracking-[-0.02em] text-muted lg:justify-self-end">
            You rarely remember titles. You remember what something was for. Recall is organised around that.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-5 lg:grid-cols-[1.45fr_1fr]">
          <SearchByMeaning />
          <RememberTheWhy />
        </div>
      </div>
    </section>
  );
}
