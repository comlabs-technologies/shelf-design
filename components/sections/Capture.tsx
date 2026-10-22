"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Lock, RotateCw } from "lucide-react";
import { Eyebrow, SectionTitle } from "../ui/Eyebrow";
import { LogoMark } from "../ui/Logo";
import { ScaledStage } from "../ui/ScaledStage";
import { useTypewriter } from "@/hooks/useTypewriter";
import { setupGsap } from "@/lib/gsap";

const ease = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    title: "You find something worth keeping",
    body: "A pricing essay, a sharp paragraph, a screen you want to study later. You know why it matters right now.",
  },
  {
    title: "Save it in one tap",
    body: "The toolbar button, the share sheet on your phone, or ⌘⇧S. No folders to choose — Recall suggests one.",
  },
  {
    title: "Add the reason before it disappears",
    body: "One line of why. Recall keeps it with the item, and that line is what you'll search by months from now.",
  },
];

const REASON = "Usage-first story for slide 9 of the investor deck";

/* ---------- Stage: one browser window that changes with each step ---------- */

function Cursor({ step }: { step: number }) {
  const pos = [
    { x: 292, y: 236 },
    { x: 556, y: 30 },
    { x: 520, y: 252 },
  ][step];
  return (
    <motion.svg
      viewBox="0 0 20 20"
      className="pointer-events-none absolute left-0 top-0 z-30 h-5 w-5 drop-shadow-[0_2px_3px_rgba(20,20,18,.25)]"
      initial={false}
      animate={{ x: pos.x, y: pos.y, opacity: step === 2 ? 0 : 1 }}
      transition={{ duration: 0.6, ease }}
    >
      <path d="M3 2l12.5 7.2-5.6 1.4 3.1 6.1-2.2 1.1-3.1-6.1L3.5 15.6z" fill="#191918" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
    </motion.svg>
  );
}

function SavePopover({ step }: { step: number }) {
  const { value } = useTypewriter({ text: REASON, play: step === 2, speed: 28 });
  return (
    <AnimatePresence>
      {step >= 1 && (
        <motion.div
          key="pop"
          initial={{ opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.32, ease }}
          style={{ transformOrigin: "90% 0%" }}
          className="absolute right-3 top-[50px] z-20 w-[284px] overflow-hidden rounded-[14px] border border-line bg-surface shadow-[0_18px_40px_rgba(20,20,18,.12)]"
        >
          <div className="flex items-center justify-between border-b border-line px-3.5 py-2.5">
            <span className="flex items-center gap-2 text-[12.5px] font-medium">
              <LogoMark className="h-4 w-4" /> Saved to Recall
            </span>
            <span className="grid h-5 w-5 place-items-center rounded-full bg-ink text-paper">
              <Check className="h-3 w-3" strokeWidth={2.6} />
            </span>
          </div>
          <div className="flex gap-2.5 px-3.5 py-3">
            <div className="h-10 w-12 shrink-0 rounded-md border border-line bg-paper p-1.5">
              <div className="h-1 w-4/5 rounded bg-ink/50" />
              <div className="mt-1 h-[3px] w-full rounded bg-ink/10" />
              <div className="mt-[3px] h-[3px] w-3/4 rounded bg-ink/10" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-[12.5px] font-medium tracking-[-0.01em]">Price on the moment value shows up</p>
              <p className="text-[11px] text-muted">pricewell.studio</p>
            </div>
          </div>
          <div className="flex items-center justify-between px-3.5 pb-3 text-[11.5px]">
            <span className="text-muted">Collection</span>
            <span className="flex items-center gap-1.5">
              <span className="text-[10.5px] text-muted">Suggested</span>
              <span className="rounded-full border border-line bg-paper px-2 py-0.5 font-medium">Fundraising</span>
            </span>
          </div>

          <AnimatePresence initial={false}>
            {step === 2 && (
              <motion.div
                key="why"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease }}
                className="overflow-hidden"
              >
                <div className="border-t border-line px-3.5 pb-3.5 pt-3">
                  <p className="text-[11px] font-medium text-ink">Why are you keeping this?</p>
                  <div className="mt-1.5 min-h-[52px] rounded-[10px] border border-ink/30 bg-paper px-2.5 py-2 text-[12px] leading-[1.45] text-ink">
                    {value}
                    <span className="caret" />
                  </div>
                  <p className="mt-2.5 text-[10.5px] text-muted">Recall will also remember</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {["pricing", "usage-based", "investor deck"].map((t) => (
                      <span key={t} className="rounded-full bg-sand px-2 py-0.5 text-[10.5px] text-muted-strong">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-muted">esc to skip</span>
                    <span className="rounded-full bg-ink px-2.5 py-1 text-[11px] font-medium text-paper">Save ↵</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PhoneShare({ show }: { show: boolean }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 28 }}
      transition={{ duration: 0.4, ease }}
      className="absolute bottom-0 left-0 z-20 h-[250px] w-[150px] overflow-hidden rounded-[30px] border border-line bg-sand p-1.5 shadow-[0_18px_40px_rgba(20,20,18,.12)]"
    >
      <div className="relative h-full overflow-hidden rounded-[24px] bg-surface">
        <div className="mx-auto mt-2 h-3.5 w-12 rounded-full bg-ink" />
        <div className="space-y-1.5 px-3 pt-4">
          <div className="h-1.5 w-4/5 rounded bg-ink/40" />
          <div className="h-1 w-full rounded bg-ink/10" />
          <div className="h-1 w-5/6 rounded bg-ink/10" />
        </div>
        <div className="absolute inset-x-0 bottom-0 rounded-t-[18px] border-t border-line bg-paper px-2.5 pb-3 pt-2">
          <div className="mx-auto mb-2 h-1 w-7 rounded-full bg-line-strong" />
          <p className="mb-2 text-[8.5px] font-medium text-muted-strong">Share</p>
          <div className="flex justify-between">
            <div className="flex flex-col items-center gap-1">
              <span className="rounded-[9px] ring-2 ring-lime ring-offset-1 ring-offset-paper">
                <LogoMark className="h-7 w-7" />
              </span>
              <span className="text-[8px] font-medium">Recall</span>
            </div>
            {["Mail", "Notes"].map((a) => (
              <div key={a} className="flex flex-col items-center gap-1">
                <span className="h-7 w-7 rounded-[8px] bg-surface ring-1 ring-line" />
                <span className="text-[8px] text-muted">{a}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CaptureStage({ step }: { step: number }) {
  return (
    <ScaledStage width={640} height={500}>
      <div className="absolute bottom-10 left-12 right-0 top-0 overflow-hidden rounded-2xl border border-line bg-surface shadow-mock">
        {/* chrome */}
        <div className="flex h-12 items-center gap-2.5 border-b border-line bg-[#FCFCFA] px-4">
          <div className="mr-1 flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-2.5 w-2.5 rounded-full bg-[#E4E3DC]" />
            ))}
          </div>
          <ArrowLeft className="h-3.5 w-3.5 text-muted" strokeWidth={2} />
          <ArrowRight className="h-3.5 w-3.5 text-line-strong" strokeWidth={2} />
          <RotateCw className="h-3.5 w-3.5 text-muted" strokeWidth={2} />
          <div className="flex h-7 flex-1 items-center gap-1.5 rounded-full bg-paper px-3 text-[11.5px] text-muted-strong">
            <Lock className="h-3 w-3" strokeWidth={2} /> pricewell.studio/usage-first-pricing
          </div>
          <span className="h-5 w-5 rounded-md bg-sand" />
          <span
            className={clsx(
              "grid h-8 w-8 place-items-center rounded-[10px] transition-colors duration-300",
              step >= 1 ? "bg-sand" : "bg-transparent",
            )}
          >
            <LogoMark className="h-5 w-5" />
          </span>
        </div>

        {/* page */}
        <div className="px-10 pt-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Essay · 8 min read</p>
          <p className="mt-2 max-w-[330px] text-[25px] font-semibold leading-[1.08] tracking-[-0.04em]">
            Price on the moment value shows up.
          </p>
          <div className="mt-3 flex items-center gap-2 text-[11px] text-muted">
            <span className="h-5 w-5 rounded-full bg-sand" /> Dana Whitfield · Pricewell
          </div>
          <p className="mt-4 max-w-[400px] text-[12.5px] leading-[1.65] text-muted-strong">
            Most teams price on seats because it&rsquo;s easy to explain.{" "}
            <motion.span
              initial={false}
              animate={{ backgroundColor: step === 0 ? "rgba(168,243,106,.55)" : "rgba(168,243,106,0)" }}
              transition={{ duration: 0.4, ease }}
              className="rounded-[3px] text-ink [box-decoration-break:clone]"
            >
              The best ones price on the moment value shows up, and let seats follow.
            </motion.span>{" "}
            It reads as fair, and it grows with the customer.
          </p>
          <div className="mt-5 grid max-w-[400px] grid-cols-3 gap-2">
            {[
              ["Starter", "$0"],
              ["Team", "$12"],
              ["Scale", "Usage"],
            ].map(([n, p], i) => (
              <div key={n} className={clsx("rounded-lg border p-2.5", i === 2 ? "border-ink/30" : "border-line")}>
                <p className="text-[10px] text-muted">{n}</p>
                <p className="text-[14px] font-semibold tracking-[-0.03em]">{p}</p>
                <div className="mt-1.5 h-1 w-3/4 rounded bg-ink/10" />
              </div>
            ))}
          </div>
          <p className="mt-5 max-w-[400px] text-[11px] text-muted">Fig. 2 — Usage tier anchors the story; seats follow.</p>
          <div className="mt-4 max-w-[400px] space-y-2" aria-hidden="true">
            <div className="h-1.5 w-full rounded bg-ink/[0.07]" />
            <div className="h-1.5 w-11/12 rounded bg-ink/[0.07]" />
            <div className="h-1.5 w-4/5 rounded bg-ink/[0.07]" />
          </div>
        </div>

        <SavePopover step={step} />
        <Cursor step={step} />
      </div>
      <PhoneShare show={step === 1} />
    </ScaledStage>
  );
}

/* ---------- Section ---------- */

export function Capture() {
  const section = useRef<HTMLElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const [step, setStep] = useState(0);

  // Desktop: the section is three screens tall and the stage stays pinned;
  // scroll progress drives the active step and the lime progress line.
  useEffect(() => {
    const { gsap, ScrollTrigger } = setupGsap();
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      ScrollTrigger.create({
        trigger: section.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          setStep(Math.min(2, Math.floor(self.progress * 3.2)));
          gsap.set(fill.current, { scaleY: self.progress });
        },
      });
    });
    return () => mm.revert();
  }, []);

  const goTo = (i: number) => {
    const el = section.current;
    if (!el || window.innerWidth < 1024) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + span * ((i + 0.5) / 3.2) });
  };

  return (
    <section id="capture" ref={section} aria-labelledby="capture-title" className="relative pt-28 sm:pt-36 lg:h-[320vh] lg:pt-0">
      <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-16 lg:pt-16">
          <div>
            <Eyebrow data-reveal>Capture without breaking flow</Eyebrow>
            <SectionTitle id="capture-title" data-reveal className="mt-4 max-w-[440px]">
              Save it where the thought happens.
            </SectionTitle>

            {/* Desktop: scroll-driven step list */}
            <ol className="relative mt-10 hidden lg:block">
              <span className="absolute bottom-2 left-[11px] top-2 w-[2px] rounded-full bg-line" aria-hidden="true" />
              <span
                ref={fill}
                className="absolute bottom-2 left-[11px] top-2 w-[2px] origin-top scale-y-0 rounded-full bg-lime"
                aria-hidden="true"
              />
              {steps.map((s, i) => (
                <li key={s.title}>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={step === i ? "step" : undefined}
                    className="group relative flex w-full gap-5 rounded-card py-4 text-left"
                  >
                    <span
                      className={clsx(
                        "relative z-10 grid h-6 w-6 shrink-0 place-items-center rounded-full border font-mono text-[10.5px] transition-colors duration-300",
                        step >= i ? "border-ink bg-ink text-paper" : "border-line-strong bg-paper text-muted",
                      )}
                    >
                      {i + 1}
                    </span>
                    <span>
                      <span
                        className={clsx(
                          "block text-[19px] font-semibold tracking-[-0.03em] transition-colors duration-300",
                          step === i ? "text-ink" : "text-muted group-hover:text-muted-strong",
                        )}
                      >
                        {s.title}
                      </span>
                      <motion.span
                        initial={false}
                        animate={{ height: step === i ? "auto" : 0, opacity: step === i ? 1 : 0 }}
                        transition={{ duration: 0.32, ease }}
                        className="block overflow-hidden"
                      >
                        <span className="block max-w-[380px] pt-2 text-[15px] leading-[1.55] text-muted">{s.body}</span>
                      </motion.span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
            <p className="mt-8 hidden font-mono text-[11px] uppercase tracking-[0.12em] text-muted lg:block">
              Chrome · Arc · Safari · Firefox · iOS · Android
            </p>
          </div>

          <div className="hidden lg:block">
            <CaptureStage step={step} />
          </div>

          {/* Below desktop: each step with its own frame */}
          <ol className="space-y-14 lg:hidden">
            {steps.map((s, i) => (
              <li key={s.title} data-reveal>
                <div className="flex items-center gap-3">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-ink font-mono text-[10.5px] text-paper">{i + 1}</span>
                  <span className="h-[2px] w-8 rounded-full bg-lime" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-[22px] font-semibold tracking-[-0.03em]">{s.title}</h3>
                <p className="mt-2 max-w-[460px] text-[15.5px] leading-[1.55] text-muted">{s.body}</p>
                <div className="mt-6" aria-hidden="true">
                  <CaptureStage step={i} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
