"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import {
  ArrowUpRight,
  Bookmark,
  Check,
  FileText,
  Globe2,
  Hash,
  Image as ImageIcon,
  Inbox,
  Layers3,
  LockKeyhole,
  MessageSquare,
  PenLine,
  Search,
  Smartphone,
  Sparkles,
  Tags,
  type LucideIcon,
} from "lucide-react";
import { SearchField } from "../ui/SearchField";
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

const sources: { name: string; icon: LucideIcon; count: number }[] = [
  { name: "Browser", icon: Globe2, count: 196 },
  { name: "Share sheet", icon: Smartphone, count: 63 },
  { name: "Quick notes", icon: PenLine, count: 38 },
];

/* ---------- Source previews (drawn, not images) ---------- */

function WebPreview({ large = false }: { large?: boolean }) {
  return (
    <div className="flex h-full flex-col bg-[#FCFBF8] p-[7%]">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-[3px] bg-ink" />
          <span className="h-1 w-8 rounded-full bg-ink/25" />
        </span>
        <span className="flex gap-1.5">
          <span className="h-1 w-5 rounded-full bg-ink/15" />
          <span className="h-1 w-5 rounded-full bg-ink/15" />
          <span className="h-2.5 w-7 rounded-full bg-ink" />
        </span>
      </div>
      <p className={clsx("mt-[7%] font-semibold leading-[1.02] tracking-[-0.04em] text-ink", large ? "text-[22px]" : "text-[17px]")}>
        Teach by doing.
        <br />
        <span className="text-ink/40">Not by touring.</span>
      </p>
      <div className="mt-auto grid grid-cols-[1.25fr_1fr] gap-2">
        <div className="rounded-md border border-line bg-surface p-2 shadow-[0_1px_2px_rgba(25,25,24,.05)]">
          <div className="h-1 w-1/2 rounded-full bg-ink/40" />
          {[1, 1, 0].map((d, i) => (
            <div key={i} className="mt-1.5 flex items-center gap-1">
              <span className={clsx("grid h-2 w-2 place-items-center rounded-full", d ? "bg-ink" : "border border-line-strong")} />
              <span className="h-[3px] flex-1 rounded-full bg-ink/10" />
            </div>
          ))}
        </div>
        <div className="rounded-md bg-sand p-2">
          <div className="h-full rounded-[4px] border border-dashed border-line-strong" />
        </div>
      </div>
    </div>
  );
}

function PhonePreview() {
  return (
    <div className="flex h-full items-end justify-center bg-sand pt-[7%]">
      <div className="h-full w-[46%] rounded-t-[16px] border border-b-0 border-line-strong/70 bg-surface p-[6%] pb-0">
        <div className="mx-auto mb-2 h-1 w-6 rounded-full bg-ink/80" />
        <svg viewBox="0 0 36 36" className="mx-auto h-[26%] w-auto" aria-hidden="true">
          <circle cx="18" cy="18" r="14" fill="none" stroke="#E9E8E2" strokeWidth="4" />
          <circle cx="18" cy="18" r="14" fill="none" stroke="#191918" strokeWidth="4" strokeDasharray="44 88" strokeLinecap="round" transform="rotate(-90 18 18)" />
        </svg>
        <p className="mt-1.5 text-center text-[8px] font-semibold tracking-[-0.02em]">Set up Orbit</p>
        {[1, 1, 0, 0].map((d, i) => (
          <div key={i} className="mt-1.5 flex items-center gap-1.5 rounded-[4px] bg-paper px-1.5 py-1">
            <span className={clsx("grid h-2 w-2 place-items-center rounded-full", d ? "bg-ink" : "border border-line-strong")}>
              {d ? <Check className="h-1.5 w-1.5 text-paper" strokeWidth={4} /> : null}
            </span>
            <span className={clsx("h-[3px] flex-1 rounded-full", d ? "bg-ink/20" : "bg-ink/10")} />
          </div>
        ))}
      </div>
    </div>
  );
}

function NotePreview() {
  return (
    <div className="relative flex h-full flex-col justify-center overflow-hidden bg-[#F6F1E3] px-[9%]">
      <span aria-hidden="true" className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_21px,rgba(25,25,24,.05)_21px,rgba(25,25,24,.05)_22px)]" />
      <p className="relative text-[20px] font-medium leading-[1.12] tracking-[-0.035em] text-ink">
        &ldquo;Kill the tour. Let the empty state teach.&rdquo;
      </p>
      <p className="relative mt-2 font-mono text-[9px] uppercase tracking-[0.12em] text-ink/40">Tue call · 3 of 5 skipped</p>
    </div>
  );
}

function SlackPreview() {
  const msgs = [
    { i: "J", name: "Jonah", w: ["w-full", "w-4/5"] },
    { i: "M", name: "Maya", w: ["w-3/4"] },
  ];
  return (
    <div className="flex h-full flex-col bg-surface">
      <div className="flex items-center gap-1.5 border-b border-line px-[7%] py-2">
        <span className="grid h-4 w-4 place-items-center rounded-[5px] bg-ink text-paper">
          <Hash className="h-2.5 w-2.5" strokeWidth={2.6} />
        </span>
        <span className="text-[10px] font-semibold tracking-[-0.01em]">design-crit</span>
        <span className="ml-auto text-[8px] text-muted">14 replies</span>
      </div>
      <div className="flex-1 space-y-2.5 px-[7%] py-2.5">
        {msgs.map((m) => (
          <div key={m.name} className="flex gap-2">
            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-[6px] bg-sand text-[8px] font-semibold">{m.i}</span>
            <div className="min-w-0 flex-1">
              <p className="text-[9px] font-semibold">{m.name}</p>
              {m.w.map((w, j) => (
                <div key={j} className={clsx("mt-1 h-[3px] rounded-full bg-ink/15", w)} />
              ))}
            </div>
          </div>
        ))}
        <span className="inline-flex items-center gap-1 rounded-full border border-line px-1.5 py-[1px] text-[8px] text-muted-strong">
          👍 6
        </span>
      </div>
    </div>
  );
}

type Card = {
  kind: string;
  icon: LucideIcon;
  date: string;
  title: string;
  why: string;
  preview: React.ReactNode;
};

const cards: Card[] = [
  {
    kind: "Web page",
    icon: Globe2,
    date: "12 Mar",
    title: "First-run patterns that teach by doing",
    why: "The empty state doubles as the tutorial.",
    preview: <WebPreview />,
  },
  {
    kind: "Screenshot",
    icon: ImageIcon,
    date: "2 Apr",
    title: "Orbit — setup checklist, step 2 of 4",
    why: "The progress ring feels calm. Compare with ours.",
    preview: <PhonePreview />,
  },
  {
    kind: "Note",
    icon: FileText,
    date: "28 Feb",
    title: "Kill the product tour?",
    why: "Three of five people skipped it on Tuesday.",
    preview: <NotePreview />,
  },
  {
    kind: "Slack",
    icon: MessageSquare,
    date: "9 Mar",
    title: "Jonah on contextual hints",
    why: "Strong case for inline hints over modals.",
    preview: <SlackPreview />,
  },
];

function ResultCard({ card, active }: { card: Card; active: boolean }) {
  return (
    <article
      className={clsx(
        "group overflow-hidden rounded-2xl border bg-[#FCFCFA] transition-[transform,box-shadow,border-color] duration-200 ease-recall hover:-translate-y-[3px]",
        active
          ? "border-line-strong/80 shadow-focus"
          : "border-line shadow-[0_1px_2px_rgba(25,25,24,.04)] hover:shadow-[0_8px_20px_rgba(25,25,24,.07)]",
      )}
    >
      <div className="aspect-[4/3] overflow-hidden border-b border-line">
        <div className="h-full opacity-[.92] saturate-[.9] transition-[opacity,filter,transform] duration-300 ease-recall group-hover:scale-[1.015] group-hover:opacity-100 group-hover:saturate-100">
          {card.preview}
        </div>
      </div>
      <div className="p-3.5">
        <p className="flex items-center gap-1.5 text-[11px] text-muted">
          <card.icon className="h-3 w-3" strokeWidth={2} />
          {card.kind}
          <span className="text-line-strong">·</span>
          {card.date}
        </p>
        <h4 className="mt-1.5 line-clamp-2 text-[13.5px] font-medium leading-snug tracking-[-0.015em] text-ink">{card.title}</h4>
        <p className="mt-1 line-clamp-2 text-[12px] leading-[1.45] text-muted-strong">{card.why}</p>
      </div>
    </article>
  );
}

/* ---------- Inspector ---------- */

function InspectorBlock({ icon: Icon, label, children }: { icon: LucideIcon; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 border-t border-line py-3">
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-line bg-surface">
        <Icon className="h-3.5 w-3.5 text-ink" strokeWidth={1.9} />
      </span>
      <div className="min-w-0">
        <p className="text-[10.5px] font-medium uppercase tracking-[0.1em] text-muted">{label}</p>
        <div className="mt-0.5 line-clamp-2 text-[12.5px] leading-[1.45] text-ink/85">{children}</div>
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
        .fromTo(q("[data-result]"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 }, "-=0.1")
        .fromTo(q("[data-detail]"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, "-=0.2");
    });
    return () => mm.revert();
  }, [typed]);

  return (
    <div
      ref={root}
      className="overflow-hidden rounded-2xl border border-line bg-surface text-left shadow-mock"
      role="img"
      aria-label="Recall workspace: a natural-language search for onboarding that teaches without a tour returns four visual result cards — a web page, a phone screenshot, a note and a Slack thread — each with the reason it was saved, beside an inspector for the selected item."
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
          <span className="grid h-5 w-5 place-items-center rounded-full border-2 border-surface bg-ink text-[9px] font-semibold text-paper">M</span>
          <span className="grid h-5 w-5 place-items-center rounded-full border-2 border-surface bg-sand text-[9px] font-semibold text-ink">J</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[212px_1fr] lg:grid-cols-[212px_1fr_300px]">
        {/* Sidebar */}
        <aside className="hidden border-r border-line bg-[#FBFBF8] px-3 py-4 md:block">
          <div className="mb-4 flex items-center gap-2 px-2">
            <span className="grid h-6 w-6 place-items-center rounded-[7px] bg-ink text-[11px] font-semibold text-paper">N</span>
            <span className="text-[13px] font-medium tracking-[-0.01em]">Northwind</span>
          </div>
          <ul className="space-y-0.5 text-[13px] text-ink/80">
            {[
              { name: "Search", icon: Search },
              { name: "Ask Recall", icon: Sparkles },
              { name: "Inbox", icon: Inbox, count: 6 },
              { name: "All saves", icon: Layers3, count: 297 },
            ].map((n) => (
              <li key={n.name} className="flex h-8 items-center gap-2.5 rounded-lg px-2">
                <n.icon className="h-[15px] w-[15px] text-ink" strokeWidth={1.9} />
                {n.name}
                {n.count !== undefined && (
                  <span data-init data-count className="ml-auto text-[11px] font-normal tabular-nums text-muted/70">
                    {n.count}
                  </span>
                )}
              </li>
            ))}
          </ul>

          <p className="mb-1.5 mt-5 px-2 text-[10.5px] font-medium uppercase tracking-[0.12em] text-muted">Collections</p>
          <ul className="space-y-0.5 text-[13px]">
            {collections.map((c) => (
              <li
                key={c.name}
                className={clsx(
                  "flex h-8 items-center gap-2.5 rounded-lg px-2",
                  c.active ? "ui-focus bg-lime font-medium text-ink" : "text-ink/80",
                )}
              >
                <Bookmark
                  className={clsx("h-[14px] w-[14px]", c.active ? "fill-ink text-ink" : "text-ink/55")}
                  strokeWidth={1.9}
                />
                {c.name}
                <span
                  data-init
                  data-count
                  className={clsx("ml-auto text-[11px] font-normal tabular-nums", c.active ? "text-ink/60" : "text-muted/70")}
                >
                  {c.count}
                </span>
              </li>
            ))}
          </ul>

          <p className="mb-1.5 mt-5 px-2 text-[10.5px] font-medium uppercase tracking-[0.12em] text-muted">Saved from</p>
          <ul className="space-y-0.5 text-[13px] text-ink/80">
            {sources.map((s) => (
              <li key={s.name} className="flex h-8 items-center gap-2.5 rounded-lg px-2">
                <s.icon className="h-[15px] w-[15px] text-ink" strokeWidth={1.9} />
                {s.name}
                <span className="ml-auto flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-ink/25" aria-hidden="true" />
                  <span data-init data-count className="text-[11px] font-normal tabular-nums text-muted/70">
                    {s.count}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main canvas */}
        <div className="min-w-0 px-4 py-5 sm:px-6">
          <div className="mb-3 flex items-baseline justify-between">
            <h3 className="text-[15px] font-semibold tracking-[-0.02em]">Ask your library</h3>
            <span className="font-mono text-[11px] text-muted">⌘K</span>
          </div>
          <SearchField value={value} placeholder="Describe what you remember…" className="h-12" />

          <ul data-init data-meta className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-muted-strong">
            <li className="flex items-center gap-1.5">
              <Layers3 className="h-3.5 w-3.5 text-ink" strokeWidth={1.9} /> 4 matches
            </li>
            <li className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-ink" strokeWidth={1.9} /> 2 connected saves
            </li>
            <li className="hidden items-center gap-1.5 sm:flex">
              <Globe2 className="h-3.5 w-3.5 text-ink" strokeWidth={1.9} /> Across Browser, Screenshot and Slack
            </li>
          </ul>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {cards.map((c, i) => (
              <div key={c.title} data-init data-result className={clsx(i > 1 && "hidden sm:block")}>
                <ResultCard card={c} active={i === 0} />
              </div>
            ))}
          </div>
        </div>

        {/* Inspector */}
        <div className="hidden border-l border-line bg-[#FBFBF8] p-4 lg:flex lg:flex-col">
          <div data-init data-detail className="flex flex-1 flex-col">
            <div className="overflow-hidden rounded-xl border border-line">
              <div className="aspect-[4/5]">
                <WebPreview large />
              </div>
            </div>
            <p className="mt-3 text-[14px] font-medium leading-snug tracking-[-0.02em]">First-run patterns that teach by doing</p>
            <p className="mt-0.5 flex items-center gap-1 text-[11.5px] text-muted">
              <Globe2 className="h-3 w-3" strokeWidth={2} /> craftlog.io <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
            </p>

            <div className="mt-3">
              <InspectorBlock icon={Bookmark} label="Why saved">
                The empty state doubles as the tutorial.
              </InspectorBlock>
              <InspectorBlock icon={Sparkles} label="Recall noticed">
                Connected to 2 saves in Research.
              </InspectorBlock>
              <InspectorBlock icon={Tags} label="Topics">
                <span className="mt-1 flex flex-wrap gap-1">
                  {["onboarding", "empty states", "activation"].map((t) => (
                    <span key={t} className="rounded-full border border-line bg-surface px-2 py-[1px] text-[10.5px] text-muted-strong">
                      {t}
                    </span>
                  ))}
                </span>
              </InspectorBlock>
            </div>

            <p className="mt-auto flex items-center gap-1.5 border-t border-line pt-3 text-[11px] text-muted">
              <LockKeyhole className="h-3 w-3" strokeWidth={2} /> Private to your workspace
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
