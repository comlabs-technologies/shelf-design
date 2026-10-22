"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import {
  ArrowUpRight,
  Globe,
  CornerDownRight,
  Inbox,
  Layers,
  Lock,
  PenLine,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { SearchField } from "../ui/SearchField";
import { SourceChip, type SourceKind } from "../ui/SourceChip";
import { useTypewriter } from "@/hooks/useTypewriter";
import { NO_MOTION, setupGsap } from "@/lib/gsap";

const QUERY = "onboarding that teaches without a tour";

const collections = [
  { name: "Fundraising", count: 24 },
  { name: "Product ideas", count: 58, active: true },
  { name: "Research", count: 112 },
  { name: "Design references", count: 41 },
  { name: "Reading later", count: 17 },
];

const sources = [
  { name: "Browser", icon: Globe, count: 196 },
  { name: "Share sheet", icon: Smartphone, count: 63 },
  { name: "Quick notes", icon: PenLine, count: 38 },
];

type Result = {
  kind: SourceKind;
  source: string;
  title: string;
  meta: string;
  why: string;
};

const results: Result[] = [
  {
    kind: "web",
    source: "Web",
    title: "First-run patterns that teach by doing",
    meta: "craftlog.io · 12 Mar",
    why: "Saved for the onboarding pattern — the empty state doubles as the tutorial.",
  },
  {
    kind: "screenshot",
    source: "Screenshot",
    title: "Orbit — setup checklist, step 2 of 4",
    meta: "iPhone · 2 Apr",
    why: "The progress ring feels calm. Compare against our current setup flow.",
  },
  {
    kind: "note",
    source: "Note",
    title: "Kill the product tour?",
    meta: "Quick note · 28 Feb",
    why: "From the Tuesday user call — three of five people skipped the tour.",
  },
  {
    kind: "slack",
    source: "Slack",
    title: "#design-crit — Jonah on contextual hints",
    meta: "Northwind · 9 Mar",
    why: "Strong argument for inline hints over modal walkthroughs.",
  },
];

function Thumb({ kind }: { kind: SourceKind }) {
  const base = "h-11 w-11 shrink-0 overflow-hidden rounded-[9px] border border-line";
  if (kind === "screenshot")
    return (
      <div className={clsx(base, "bg-sand p-1.5")} aria-hidden="true">
        <div className="mx-auto h-full w-6 rounded-[4px] border border-line bg-surface p-[3px]">
          <div className="mx-auto mb-[3px] h-2.5 w-2.5 rounded-full border-[1.5px] border-ink/70 border-r-line" />
          <div className="mb-[2px] h-[2px] rounded bg-ink/20" />
          <div className="h-[2px] w-3/4 rounded bg-ink/15" />
        </div>
      </div>
    );
  if (kind === "note")
    return (
      <div className={clsx(base, "space-y-[3px] bg-[#FBFAF4] p-2")} aria-hidden="true">
        <div className="h-[2px] w-full rounded bg-ink/30" />
        <div className="h-[2px] w-4/5 rounded bg-ink/15" />
        <div className="h-[2px] w-full rounded bg-ink/15" />
        <div className="h-[2px] w-3/5 rounded bg-ink/15" />
      </div>
    );
  if (kind === "slack")
    return (
      <div className={clsx(base, "grid place-items-center bg-paper")} aria-hidden="true">
        <span className="text-[15px] font-semibold tracking-[-0.04em] text-ink/70">#</span>
      </div>
    );
  return (
    <div className={clsx(base, "bg-paper")} aria-hidden="true">
      <div className="flex h-2 items-center gap-[2px] border-b border-line bg-surface px-1">
        <span className="h-[3px] w-[3px] rounded-full bg-ink/20" />
        <span className="h-[3px] w-[3px] rounded-full bg-ink/20" />
      </div>
      <div className="space-y-[3px] p-1.5">
        <div className="h-[3px] w-4/5 rounded bg-ink/40" />
        <div className="h-[2px] w-full rounded bg-ink/15" />
        <div className="h-3 rounded-[2px] bg-sand" />
      </div>
    </div>
  );
}

/**
 * The hero product mockup. When `play` flips true it "wakes up": collection
 * counts fade in, the query types itself, then results arrive one by one.
 */
export function DashboardMockup({ play }: { play: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const [typing, setTyping] = useState(false);
  const [typed, setTyped] = useState(false);
  const { value } = useTypewriter({ text: QUERY, play: typing, speed: 30, onDone: () => setTyped(true) });

  // Counts fade in, then the caret blinks briefly before typing begins.
  useEffect(() => {
    if (!play) return;
    const { gsap } = setupGsap();
    const mm = gsap.matchMedia();
    let started = false;
    mm.add(NO_MOTION, () => {
      started = true;
      gsap.to(root.current!.querySelectorAll("[data-count]"), {
        opacity: 1,
        duration: 0.32,
        stagger: 0.04,
        ease: "recall",
      });
      gsap.delayedCall(0.35, () => setTyping(true));
    });
    if (!started) setTyping(true);
    return () => mm.revert();
  }, [play]);

  // Results arrive with a soft stagger once the query has finished typing.
  useEffect(() => {
    if (!typed) return;
    const { gsap } = setupGsap();
    const mm = gsap.matchMedia();
    mm.add(NO_MOTION, () => {
      const q = gsap.utils.selector(root);
      const tl = gsap.timeline({ defaults: { ease: "recall" } });
      tl.to(q("[data-meta]"), { opacity: 1, duration: 0.25 })
        .fromTo(
          q("[data-result]"),
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.38, stagger: 0.1 },
          "-=0.1",
        )
        .fromTo(q("[data-detail]"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, "-=0.15");
    });
    return () => mm.revert();
  }, [typed]);

  return (
    <div
      ref={root}
      className="overflow-hidden rounded-2xl border border-line bg-surface text-left shadow-mock"
      role="img"
      aria-label="Recall workspace: a natural-language search for onboarding that teaches without a tour returns four saved items — a web article, a screenshot, a note and a Slack message — each with the reason it was saved."
    >
      {/* Window chrome */}
      <div className="flex h-10 items-center justify-between border-b border-line bg-[#FCFCFA] px-4">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#E4E3DC]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#E4E3DC]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#E4E3DC]" />
        </div>
        <p className="text-[12px] tracking-[-0.005em] text-muted">Northwind · Product ideas</p>
        <div className="flex -space-x-1.5" aria-hidden="true">
          <span className="grid h-5 w-5 place-items-center rounded-full border-2 border-surface bg-ink text-[9px] font-semibold text-paper">
            M
          </span>
          <span className="grid h-5 w-5 place-items-center rounded-full border-2 border-surface bg-sand text-[9px] font-semibold text-ink">
            J
          </span>
        </div>
      </div>

      <div className="grid min-h-[520px] grid-cols-1 md:grid-cols-[208px_1fr] lg:grid-cols-[208px_1fr_292px]">
        {/* Sidebar */}
        <aside className="hidden border-r border-line bg-[#FBFBF8] px-3 py-4 md:block">
          <div className="mb-4 flex items-center gap-2 px-2">
            <span className="grid h-6 w-6 place-items-center rounded-[7px] bg-ink text-[11px] font-semibold text-paper">
              N
            </span>
            <span className="text-[13px] font-medium tracking-[-0.01em]">Northwind</span>
          </div>
          <ul className="space-y-0.5 text-[13px] text-muted-strong">
            <li className="flex h-8 items-center gap-2 rounded-lg px-2">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={1.8} /> Ask Recall
            </li>
            <li className="flex h-8 items-center gap-2 rounded-lg px-2">
              <Inbox className="h-3.5 w-3.5" strokeWidth={1.8} /> Inbox
              <span data-init data-count className="ml-auto text-[11px] text-muted">
                6
              </span>
            </li>
            <li className="flex h-8 items-center gap-2 rounded-lg px-2">
              <Layers className="h-3.5 w-3.5" strokeWidth={1.8} /> All saves
              <span data-init data-count className="ml-auto text-[11px] text-muted">
                297
              </span>
            </li>
          </ul>

          <p className="mb-1.5 mt-5 px-2 text-[10.5px] font-medium uppercase tracking-[0.12em] text-muted">
            Collections
          </p>
          <ul className="space-y-0.5 text-[13px]">
            {collections.map((c) => (
              <li
                key={c.name}
                className={clsx(
                  "flex h-8 items-center gap-2 rounded-lg px-2",
                  c.active ? "bg-lime font-medium text-ink" : "text-muted-strong",
                )}
              >
                <span
                  className={clsx("h-1.5 w-1.5 rounded-full", c.active ? "bg-ink" : "bg-line-strong")}
                  aria-hidden="true"
                />
                {c.name}
                <span
                  data-init
                  data-count
                  className={clsx("ml-auto text-[11px]", c.active ? "text-ink/70" : "text-muted")}
                >
                  {c.count}
                </span>
              </li>
            ))}
          </ul>

          <p className="mb-1.5 mt-5 px-2 text-[10.5px] font-medium uppercase tracking-[0.12em] text-muted">
            Saved from
          </p>
          <ul className="space-y-0.5 text-[13px] text-muted-strong">
            {sources.map((s) => (
              <li key={s.name} className="flex h-8 items-center gap-2 rounded-lg px-2">
                <s.icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                {s.name}
                <span data-init data-count className="ml-auto text-[11px] text-muted">
                  {s.count}
                </span>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main column */}
        <div className="min-w-0 px-4 py-5 sm:px-6">
          <div className="mb-3 flex items-baseline justify-between">
            <h3 className="text-[15px] font-semibold tracking-[-0.02em]">Ask your library</h3>
            <span className="text-[11.5px] text-muted">⌘K</span>
          </div>
          <SearchField value={value} placeholder="Describe what you remember…" />

          <div data-init data-meta className="mb-2 mt-4 flex items-center justify-between">
            <p className="text-[12px] text-muted">4 results · ranked by meaning</p>
            <div className="hidden gap-1 sm:flex" aria-hidden="true">
              {["All", "Links", "Notes", "Images"].map((f, i) => (
                <span
                  key={f}
                  className={clsx(
                    "rounded-full border px-2 py-0.5 text-[11px]",
                    i === 0 ? "border-ink/80 text-ink" : "border-line text-muted",
                  )}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          <ul className="space-y-1.5">
            {results.map((r, i) => (
              <li
                key={r.title}
                data-init
                data-result
                className={clsx(
                  "flex gap-3 rounded-card border p-3",
                  i === 0 ? "border-line bg-paper" : "border-transparent",
                  i > 2 && "hidden sm:flex",
                )}
              >
                <Thumb kind={r.kind} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <p className="truncate text-[13.5px] font-medium tracking-[-0.015em]">{r.title}</p>
                    <SourceChip kind={r.kind} label={r.source} className="hidden shrink-0 sm:inline-flex" />
                  </div>
                  <p className="mt-0.5 text-[11.5px] text-muted">{r.meta}</p>
                  <p className="mt-1.5 flex gap-1.5 text-[12px] leading-[1.45] text-muted-strong">
                    <CornerDownRight className="mt-[2px] h-3 w-3 shrink-0 text-muted" strokeWidth={1.8} />
                    <span className="line-clamp-2">{r.why}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Detail panel — layered card over a quiet rail */}
        <div className="hidden border-l border-line bg-[#FBFBF8] p-4 lg:block">
          <div data-init data-detail className="rounded-card border border-line bg-surface p-4 shadow-[0_8px_22px_rgba(20,20,18,.05)]">
            <div className="mb-3 overflow-hidden rounded-[9px] border border-line bg-paper" aria-hidden="true">
              <div className="flex h-4 items-center gap-1 border-b border-line bg-surface px-2">
                <span className="h-1 w-1 rounded-full bg-ink/20" />
                <span className="h-1 w-1 rounded-full bg-ink/20" />
                <span className="ml-2 h-1.5 w-16 rounded-full bg-sand" />
              </div>
              <div className="grid grid-cols-[1fr_56px] gap-2 p-2.5">
                <div className="space-y-1.5">
                  <div className="h-1.5 w-11/12 rounded bg-ink/50" />
                  <div className="h-1.5 w-3/5 rounded bg-ink/50" />
                  <div className="h-1 w-full rounded bg-ink/10" />
                  <div className="h-1 w-5/6 rounded bg-ink/10" />
                </div>
                <div className="rounded-[5px] border border-dashed border-line-strong bg-surface" />
              </div>
            </div>
            <p className="text-[13px] font-medium leading-snug tracking-[-0.015em]">
              First-run patterns that teach by doing
            </p>
            <p className="mt-0.5 flex items-center gap-1 text-[11px] text-muted">
              craftlog.io <ArrowUpRight className="h-3 w-3" strokeWidth={1.8} />
            </p>

            <div className="mt-3 border-t border-line pt-3">
              <p className="text-[10.5px] font-medium uppercase tracking-[0.12em] text-muted">Why you saved it</p>
              <p className="mt-1 text-[12px] leading-[1.5] text-ink/85">
                &ldquo;The empty state doubles as the tutorial. Try this for the new project screen.&rdquo;
              </p>
            </div>
            <div className="mt-3 border-t border-line pt-3">
              <p className="text-[10.5px] font-medium uppercase tracking-[0.12em] text-muted">Recall noticed</p>
              <p className="mt-1 text-[12px] leading-[1.5] text-muted-strong">
                Related to 2 other saves in <span className="text-ink">Research</span> about activation.
              </p>
            </div>
            <div className="mt-3 flex flex-wrap gap-1">
              {["onboarding", "empty states", "activation"].map((t) => (
                <span key={t} className="rounded-full bg-paper px-2 py-0.5 text-[10.5px] text-muted-strong">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <p className="mt-3 flex items-center gap-1.5 px-1 text-[11px] text-muted">
            <Lock className="h-3 w-3" strokeWidth={1.8} /> Private to your workspace
          </p>
        </div>
      </div>
    </div>
  );
}
