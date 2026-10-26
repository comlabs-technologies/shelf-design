"use client";

import { useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { CornerDownRight } from "lucide-react";
import { Eyebrow, SectionTitle } from "../ui/Eyebrow";
import { SearchField } from "../ui/SearchField";
import { SourceChip, type SourceKind } from "../ui/SourceChip";

const ease = [0.22, 1, 0.36, 1] as const;

type Persona = {
  role: string;
  saves: string;
  ask: string;
  results: { kind: SourceKind; source: string; title: string; why: string }[];
};

const personas: Persona[] = [
  {
    role: "Founders",
    saves: "Pricing pages, competitor launches, investor updates, advice buried in threads.",
    ask: "the pricing page with the usage tier I liked",
    results: [
      { kind: "web", source: "Web", title: "Three-tier pricing that makes the model obvious", why: "The story for slide 9 of the investor deck." },
      { kind: "slack", source: "Slack", title: "#founders — Ana on bridge-round terms", why: "Compare against our term sheet before Thursday." },
    ],
  },
  {
    role: "Product designers",
    saves: "Onboarding flows, empty states, type specimens, half-finished Figma explorations.",
    ask: "empty states that teach without a tour",
    results: [
      { kind: "screenshot", source: "Screenshot", title: "Orbit — setup checklist, step 2 of 4", why: "The progress ring feels calm. Compare with ours." },
      { kind: "doc", source: "Figma", title: "Onboarding v3 — explorations", why: "Option C is the one the team kept coming back to." },
    ],
  },
  {
    role: "Researchers",
    saves: "Papers, interview notes, verbatim quotes, the dataset someone mentioned once.",
    ask: "the interview where someone exported everything to spreadsheets",
    results: [
      { kind: "note", source: "Note", title: "Interview 07 — ops lead, logistics", why: "Mentions CSV exports twice; strong workaround signal." },
      { kind: "doc", source: "PDF", title: "Diary study synthesis, wave 2", why: "Page 14 backs the export finding with numbers." },
    ],
  },
  {
    role: "Agency strategists",
    saves: "Campaign references, client decks, LinkedIn posts, trend reports you'll quote later.",
    ask: "LinkedIn posts that made B2B feel human",
    results: [
      { kind: "web", source: "LinkedIn", title: "“We fired our best client” — a CEO’s post", why: "Tone reference for the Halden rebrand pitch." },
      { kind: "doc", source: "PDF", title: "B2B attention report 2026", why: "Stat on founder-led posts for slide 4." },
    ],
  },
];

export function Audience() {
  const [active, setActive] = useState(0);
  const p = personas[active];

  return (
    <section aria-labelledby="audience-title" className="pb-24 sm:pb-32">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Eyebrow data-reveal>Who it&rsquo;s for</Eyebrow>
        <SectionTitle id="audience-title" data-reveal className="mt-4 max-w-[640px]">
          For people whose work is made of references.
        </SectionTitle>

        <div data-reveal className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div role="tablist" aria-label="Who Recall is for" className="flex gap-2 overflow-x-auto pb-1 scrollbar-none lg:flex-col lg:gap-0 lg:overflow-visible lg:border-t lg:border-line">
            {personas.map((x, i) => (
              <button
                key={x.role}
                id={`aud-tab-${i}`}
                type="button"
                role="tab"
                aria-selected={active === i}
                aria-controls="aud-panel"
                onClick={() => setActive(i)}
                className={clsx(
                  "group shrink-0 text-left transition-colors duration-200",
                  // mobile: pills · desktop: large editorial rows
                  "rounded-full px-4 py-2 text-[14px] font-medium lg:rounded-none lg:border-b lg:border-line lg:px-0 lg:py-5 lg:text-[30px] lg:font-semibold lg:tracking-[-0.04em]",
                  active === i
                    ? "tag-lift bg-surface text-ink lg:!border-x-0 lg:!border-t-0 lg:!border-b-line lg:bg-transparent lg:!shadow-none"
                    : "text-muted hover:text-ink",
                )}
              >
                <span className="flex items-center justify-between gap-4">
                  {x.role}
                  <span
                    aria-hidden="true"
                    className={clsx(
                      "hidden h-2 w-2 rounded-full transition-colors lg:block",
                      active === i ? "bg-lime ring-4 ring-lime/25" : "bg-transparent",
                    )}
                  />
                </span>
              </button>
            ))}
          </div>

          <div
            id="aud-panel"
            role="tabpanel"
            aria-labelledby={`aud-tab-${active}`}
            className="rounded-[20px] border border-line bg-sand p-4 sm:p-6"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.24, ease }}
              >
                <p className="px-1 text-[11px] font-medium uppercase tracking-[0.12em] text-muted">You save</p>
                <p className="mt-1.5 px-1 text-[17px] leading-[1.5] tracking-[-0.015em] text-ink">{p.saves}</p>

                <p className="mt-6 px-1 text-[11px] font-medium uppercase tracking-[0.12em] text-muted">Then you ask</p>
                <SearchField value={p.ask} caret={false} className="mt-2 h-12" />

                <ul className="mt-3 space-y-2">
                  {p.results.map((r, i) => (
                    <li
                      key={r.title}
                      className={clsx("rounded-card border bg-surface p-4", i === 0 ? "ui-focus border-line" : "border-line")}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-[14.5px] font-medium leading-snug tracking-[-0.015em]">{r.title}</p>
                        <SourceChip kind={r.kind} label={r.source} className="shrink-0" />
                      </div>
                      <p className="mt-2 flex gap-1.5 text-[13px] leading-[1.45] text-muted-strong">
                        <CornerDownRight className="mt-[2px] h-3.5 w-3.5 shrink-0 text-muted" strokeWidth={1.8} aria-hidden="true" />
                        {r.why}
                      </p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
