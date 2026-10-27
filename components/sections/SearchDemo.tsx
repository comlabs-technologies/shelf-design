"use client";

import { useEffect, useRef, useState } from "react";
import { CornerDownRight } from "lucide-react";
import { CredibilityStrip } from "../CredibilityStrip";
import { CurveDivider } from "../CurveDivider";
import { FallingTags } from "../FallingTags";
import { Eyebrow, SectionTitle } from "../ui/Eyebrow";
import { SearchField } from "../ui/SearchField";
import { SourceChip, type SourceKind } from "../ui/SourceChip";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { useTypewriter } from "@/hooks/useTypewriter";
import { NO_MOTION, setupGsap } from "@/lib/gsap";

const QUERY = "pricing example for the investor deck";

const scattered = ["Bookmarks", "Slack threads", "Screenshots", "Notes apps", "Forty open tabs"];

const results: {
  kind: SourceKind;
  source: string;
  title: string;
  meta: string;
  why: string;
}[] = [
  {
    kind: "web",
    source: "Web · pricewell.studio",
    title: "Three-tier pricing that makes the model obvious",
    meta: "Saved 14 Feb · Fundraising",
    why: "The usage-to-seat bridge is exactly the story for slide 9 of the investor deck.",
  },
  {
    kind: "screenshot",
    source: "Screenshot · Desktop",
    title: "Kiln pricing table with annual toggle",
    meta: "Saved 3 Jan · Design references",
    why: "Maya liked how the annual discount is shown without shouting.",
  },
  {
    kind: "slack",
    source: "Slack · #fundraising",
    title: "Priya: “this is how Orbit framed expansion revenue”",
    meta: "Saved 22 Mar · Fundraising",
    why: "Backs up our net revenue retention claim when partners ask.",
  },
];

export function SearchDemo() {
  const [panel, seen] = useInViewOnce<HTMLDivElement>(0.6);
  const list = useRef<HTMLUListElement>(null);
  const [typed, setTyped] = useState(false);
  const { value } = useTypewriter({ text: QUERY, play: seen, speed: 42, onDone: () => setTyped(true) });

  // Plays once: row rises, its source chip follows, the "why" note lands last.
  useEffect(() => {
    if (!typed) return;
    const { gsap } = setupGsap();
    const mm = gsap.matchMedia();
    mm.add(NO_MOTION, () => {
      const tl = gsap.timeline({ delay: 0.18, defaults: { ease: "recall", duration: 0.34 } });
      const q = gsap.utils.selector(list);
      tl.to(q("[data-status]"), { opacity: 1, duration: 0.24 });
      q("[data-row]").forEach((row, i) => {
        const at = 0.12 + i * 0.16;
        tl.fromTo(row, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, at)
          .to(row.querySelector("[data-chip]"), { opacity: 1, duration: 0.26 }, at + 0.14)
          .fromTo(row.querySelector("[data-why]"), { opacity: 0, y: 4 }, { opacity: 1, y: 0 }, at + 0.28);
      });
    });
    return () => mm.revert();
  }, [typed]);

  return (
    <section
      id="search"
      aria-labelledby="search-title"
      className="relative z-10 bg-sand pb-32 pt-14 sm:pb-44 sm:pt-20 lg:pb-56"
    >
      <CurveDivider shape="dome" className="bottom-[calc(100%-1px)]" />

      <div data-reveal className="mx-auto max-w-[1600px] px-5 pb-16 sm:px-8 xl:px-12 sm:pb-24">
        <CredibilityStrip />
      </div>

      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-14 px-5 sm:px-8 xl:px-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:pt-10">
          <Eyebrow data-reveal>Why Recall</Eyebrow>
          <SectionTitle id="search-title" data-reveal className="mt-4 max-w-[480px]">
            Your best references are scattered everywhere.
          </SectionTitle>
          <div data-reveal className="mt-6 max-w-[460px] space-y-4 text-[17px] leading-[1.6] tracking-[-0.01em] text-muted">
            <p>
              The perfect example lives in a bookmark folder you never open, a Slack thread from March, a
              screenshot buried in your camera roll, or a note called &ldquo;untitled 7&rdquo;.
            </p>
            <p>
              You saved it. You just can&rsquo;t reach it — because none of those places remember{" "}
              <em className="not-italic text-ink">why</em> it mattered. Recall does, so you can search by what
              you meant, not what you typed.
            </p>
          </div>
          <div data-reveal className="mt-9 max-w-[460px] rounded-[16px] border border-line bg-paper/70 p-5">
            <p className="text-[20px] font-semibold leading-[1.2] tracking-[-0.03em]">
              Find a saved thought in seconds, not an hour of digging.
            </p>
            <dl className="mt-4 space-y-2.5 text-[12.5px]">
              <div className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1.5">
                <dt className="text-muted-strong">Digging through folders, tabs and threads</dt>
                <dd className="text-right font-mono text-muted">~1 hr</dd>
                <span className="col-span-2 h-1.5 rounded-full bg-line-strong/70" aria-hidden="true" />
              </div>
              <div className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1.5">
                <dt className="font-medium text-ink">Asking Recall</dt>
                <dd className="text-right font-mono text-ink">seconds</dd>
                <span className="col-span-2 h-1.5 w-[6%] rounded-full bg-ink" aria-hidden="true" />
              </div>
            </dl>
          </div>
          <ul data-reveal className="mt-6 flex flex-wrap gap-1.5" aria-label="Where references get lost">
            {scattered.map((s) => (
              <li
                key={s}
                className="rounded-full border border-line-strong/70 px-3 py-1 text-[12.5px] text-muted"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div ref={panel} className="rounded-2xl border border-line bg-surface p-3 shadow-mock sm:p-4">
          <div className="flex items-center justify-between px-1 pb-3 pt-1">
            <p className="text-[12px] font-medium tracking-[-0.005em] text-ink">Search by meaning</p>
            <p className="text-[11.5px] text-muted">All collections</p>
          </div>
          <SearchField value={value} placeholder="" className="h-12" />

          <ul ref={list} className="mt-3" aria-live="polite">
            <li data-init data-status className="flex items-center justify-between px-1 py-2 text-[12px] text-muted">
              <span>3 matches · none of them contain the word &ldquo;investor&rdquo;</span>
            </li>
            {results.map((r) => (
              <li
                key={r.title}
                data-init
                data-row
                className="border-t border-line px-1 py-4 first-of-type:border-t-0 sm:px-2"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="min-w-0">
                    <p className="text-[15px] font-medium leading-snug tracking-[-0.02em]">{r.title}</p>
                    <p className="mt-1 text-[12px] text-muted">{r.meta}</p>
                  </div>
                  <SourceChip data-init data-chip kind={r.kind} label={r.source} className="shrink-0 self-start" />
                </div>
                <div data-init data-why className="mt-3 flex gap-2 rounded-[10px] bg-paper px-3 py-2.5">
                  <CornerDownRight className="mt-[3px] h-3.5 w-3.5 shrink-0 text-muted" strokeWidth={1.8} aria-hidden="true" />
                  <p className="text-[13px] leading-[1.5] text-muted-strong">
                    <span className="font-medium text-ink">Why I saved this — </span>
                    {r.why}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Everything you saved lands here: tags drop onto the curved floor. */}
      <FallingTags shape="bowl" />
    </section>
  );
}
