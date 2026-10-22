"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Lock, RotateCw } from "lucide-react";
import { Eyebrow, SectionTitle } from "../ui/Eyebrow";
import { LogoMark } from "../ui/Logo";
import { NO_MOTION, setupGsap } from "@/lib/gsap";

const channels = [
  { name: "Browser extension", detail: "Chrome, Arc, Safari and Firefox. One click, or ⌘⇧S." },
  { name: "Mobile share sheet", detail: "Send anything from any app on iOS and Android." },
  { name: "Quick notes", detail: "Catch the thought itself, before it becomes another tab." },
];

function BrowserFragment() {
  return (
    <div className="overflow-hidden rounded-card border border-line bg-surface" aria-hidden="true">
      <div className="flex items-center gap-2 border-b border-line px-3 py-2">
        <ArrowLeft className="h-3 w-3 text-muted" strokeWidth={2} />
        <ArrowRight className="h-3 w-3 text-line-strong" strokeWidth={2} />
        <RotateCw className="h-3 w-3 text-muted" strokeWidth={2} />
        <div className="flex h-6 min-w-0 flex-1 items-center gap-1.5 rounded-full bg-paper px-2.5 text-[10.5px] text-muted-strong">
          <Lock className="h-2.5 w-2.5 shrink-0" strokeWidth={2} />
          <span className="truncate">craftlog.io/first-run-patterns</span>
        </div>
        <span className="h-4 w-4 rounded-[5px] bg-sand" />
        <span className="relative">
          <LogoMark className="h-[18px] w-[18px]" />
          <span className="absolute -inset-1 rounded-[8px] ring-1 ring-ink/15" />
        </span>
      </div>
      <div className="space-y-2 p-3.5">
        <div className="h-2 w-3/4 rounded bg-ink/70" />
        <div className="h-1.5 w-full rounded bg-ink/10" />
        <div className="h-1.5 w-11/12 rounded bg-ink/10" />
        <div className="grid grid-cols-3 gap-1.5 pt-1">
          <div className="h-9 rounded-md bg-sand" />
          <div className="h-9 rounded-md border border-dashed border-line-strong" />
          <div className="h-9 rounded-md bg-sand" />
        </div>
      </div>
    </div>
  );
}

function ShareSheetFragment() {
  return (
    <div className="relative mx-auto h-[148px] w-full max-w-[260px] overflow-hidden rounded-t-[26px] border border-b-0 border-line bg-sand px-2.5 pt-2.5" aria-hidden="true">
      <div className="absolute left-1/2 top-3 z-10 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-ink px-2.5 py-1 text-[10.5px] text-paper">
        <Check className="h-3 w-3" strokeWidth={2.4} /> Saved to Inbox
      </div>
      <div className="mt-8 h-full rounded-t-[18px] border border-line bg-surface px-3 pt-2">
        <div className="mx-auto mb-2.5 h-1 w-8 rounded-full bg-line-strong" />
        <p className="mb-2 text-[10.5px] font-medium text-muted-strong">Share “Kiln — Pricing”</p>
        <div className="flex justify-between">
          <div className="flex flex-col items-center gap-1">
            <LogoMark className="h-9 w-9" />
            <span className="text-[9.5px] font-medium text-ink">Recall</span>
          </div>
          {["Messages", "Mail", "Notes"].map((a) => (
            <div key={a} className="flex flex-col items-center gap-1">
              <span className="h-9 w-9 rounded-[10px] bg-paper ring-1 ring-line" />
              <span className="text-[9.5px] text-muted">{a}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NoteFragment() {
  return (
    <div className="rounded-card border border-line bg-surface p-3.5" aria-hidden="true">
      <div className="flex items-center gap-2">
        <span className="h-6 w-6 rounded-md bg-sand" />
        <div className="min-w-0">
          <p className="truncate text-[11.5px] font-medium">Kiln — Pricing</p>
          <p className="text-[10px] text-muted">kiln.app/pricing</p>
        </div>
      </div>
      <div className="mt-3 rounded-[9px] border border-ink/25 bg-paper px-2.5 py-2 text-[11.5px] leading-[1.45] text-ink">
        Annual toggle done quietly — use for pricing v2
        <span className="caret" />
      </div>
      <div className="mt-2.5 flex items-center justify-between">
        <span className="rounded-full border border-line px-2 py-0.5 text-[10px] text-muted-strong">+ Fundraising</span>
        <span className="font-mono text-[10px] text-muted">↵ Save</span>
      </div>
    </div>
  );
}

const steps = [
  {
    n: "01",
    title: "You find something worth keeping",
    body: "A pricing page, a sharp paragraph, a screen you want to study later.",
    visual: <BrowserFragment />,
  },
  {
    n: "02",
    title: "Save it in one tap",
    body: "From the toolbar, the share sheet, or a shortcut. No folders to pick.",
    visual: <ShareSheetFragment />,
  },
  {
    n: "03",
    title: "Add the reason before it disappears",
    body: "One line of why. Recall keeps it with the item and searches by it later.",
    visual: <NoteFragment />,
  },
];

export function Capture() {
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = setupGsap();
    const mm = gsap.matchMedia();
    mm.add(NO_MOTION, () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-step]", list.current);
      ScrollTrigger.batch(cards, {
        start: "top 82%",
        once: true,
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.42, ease: "recall", stagger: 0.15 },
          ),
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="capture" aria-labelledby="capture-title" className="relative pb-24 pt-32 sm:pb-32 sm:pt-44 lg:pt-52">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow data-reveal>Capture without breaking flow</Eyebrow>
          <SectionTitle id="capture-title" data-reveal className="mt-4 max-w-[420px]">
            Save it where the thought happens.
          </SectionTitle>
          <p data-reveal className="mt-6 max-w-[420px] text-[17px] leading-[1.6] tracking-[-0.01em] text-muted">
            The moment you find something is the moment you know why it matters. Recall is there in
            that moment, wherever you are.
          </p>
          <dl data-reveal className="mt-9 max-w-[420px] divide-y divide-line border-y border-line">
            {channels.map((c) => (
              <div key={c.name} className="py-4">
                <dt className="text-[15px] font-medium tracking-[-0.015em]">{c.name}</dt>
                <dd className="mt-1 text-[14px] leading-[1.5] text-muted">{c.detail}</dd>
              </div>
            ))}
          </dl>
        </div>

        <ol ref={list} className="space-y-4">
          {steps.map((s) => (
            <li key={s.n} data-init data-step>
              <motion.article
                whileHover={{ y: -3 }}
                className="grid grid-cols-1 gap-6 rounded-2xl border border-line bg-surface p-5 transition-[border-color,box-shadow] duration-200 ease-recall hover:border-line-strong hover:shadow-lift sm:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] sm:items-center sm:p-7"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[12px] font-medium text-ink">{s.n}</span>
                    <span className="h-[2px] w-7 rounded-full bg-lime" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-[21px] font-semibold leading-[1.15] tracking-[-0.03em]">{s.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-[1.55] text-muted">{s.body}</p>
                </div>
                <div className="rounded-card bg-paper p-3 sm:p-4">{s.visual}</div>
              </motion.article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
