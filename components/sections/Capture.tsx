"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Lock, RotateCw } from "lucide-react";
import { Eyebrow, SectionTitle } from "../ui/Eyebrow";
import { LogoMark } from "../ui/Logo";
import { SOURCES } from "../ui/SourceBadge";
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

// One backdrop per step; they crossfade as the story advances.
const backdrops = ["/capture/step-1.png", "/capture/step-2.png", "/capture/step-3.png"];

function Backdrop({ step, only }: { step: number; only?: boolean }) {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      {backdrops.map((src, i) =>
        only && i !== step ? null : (
          <motion.div
            key={src}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: i === step ? 1 : 0, scale: i === step ? 1 : 1.04 }}
            transition={{ duration: 0.7, ease }}
          >
            <Image src={src} alt="" fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
          </motion.div>
        ),
      )}
    </div>
  );
}

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
          className="absolute right-3 top-[50px] z-20 w-[284px] overflow-hidden rounded-[14px] border border-white/30 bg-white/[0.16] text-white shadow-[0_24px_60px_rgba(0,0,0,.35),inset_0_1px_0_rgba(255,255,255,.3)] backdrop-blur-2xl backdrop-saturate-150"
        >
          <div className="flex items-center justify-between border-b border-white/15 px-3.5 py-2.5">
            <span className="flex items-center gap-2 text-[12.5px] font-medium">
              <LogoMark className="h-4 w-4" /> Saved to Recall
            </span>
            <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-ink">
              <Check className="h-3 w-3" strokeWidth={2.6} />
            </span>
          </div>
          <div className="flex gap-2.5 px-3.5 py-3">
            <div className="h-10 w-12 shrink-0 rounded-md border border-white/20 bg-white/10 p-1.5">
              <div className="h-1 w-4/5 rounded bg-white/60" />
              <div className="mt-1 h-[3px] w-full rounded bg-white/25" />
              <div className="mt-[3px] h-[3px] w-3/4 rounded bg-white/25" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-[12.5px] font-medium tracking-[-0.01em]">Price on the moment value shows up</p>
              <p className="text-[11px] text-white/60">pricewell.studio</p>
            </div>
          </div>
          <div className="flex items-center justify-between px-3.5 pb-3 text-[11.5px]">
            <span className="text-white/60">Collection</span>
            <span className="flex items-center gap-1.5">
              <span className="text-[10.5px] text-white/60">Suggested</span>
              <span className="rounded-full bg-lime px-2 py-0.5 font-medium text-ink">Fundraising</span>
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
                <div className="border-t border-white/15 px-3.5 pb-3.5 pt-3">
                  <p className="text-[11px] font-medium text-white">Why are you keeping this?</p>
                  <div className="mt-1.5 min-h-[52px] rounded-[10px] border border-white/40 bg-white/10 px-2.5 py-2 text-[12px] leading-[1.45] text-white [&_.caret]:bg-white">
                    {value}
                    <span className="caret" />
                  </div>
                  <p className="mt-2.5 text-[10.5px] text-white/60">Recall will also remember</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {["pricing", "usage-based", "investor deck"].map((t) => (
                      <span key={t} className="rounded-full bg-white/15 px-2 py-0.5 text-[10.5px] text-white/85">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-white/55">esc to skip</span>
                    <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-ink">Save ↵</span>
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
      className="absolute bottom-0 left-0 z-20 h-[250px] w-[150px] overflow-hidden rounded-[30px] border border-white/30 bg-white/10 p-1.5 shadow-[0_24px_60px_rgba(0,0,0,.35),inset_0_1px_0_rgba(255,255,255,.3)] backdrop-blur-2xl backdrop-saturate-150"
    >
      <div className="relative h-full overflow-hidden rounded-[24px] border border-white/15 bg-white/[0.08]">
        <div className="mx-auto mt-2 h-3.5 w-12 rounded-full bg-black/70" />
        <div className="space-y-1.5 px-3 pt-4">
          <div className="h-1.5 w-4/5 rounded bg-white/60" />
          <div className="h-1 w-full rounded bg-white/25" />
          <div className="h-1 w-5/6 rounded bg-white/25" />
        </div>
        <div className="absolute inset-x-0 bottom-0 rounded-t-[18px] border-t border-white/25 bg-white/20 px-2.5 pb-3 pt-2 text-white backdrop-blur-xl">
          <div className="mx-auto mb-2 h-1 w-7 rounded-full bg-white/50" />
          <p className="mb-2 text-[8.5px] font-medium text-white/80">Share</p>
          <div className="flex justify-between">
            <div className="flex flex-col items-center gap-1">
              <span className="rounded-[9px] ring-2 ring-lime">
                <LogoMark className="h-7 w-7" />
              </span>
              <span className="text-[8px] font-medium">Recall</span>
            </div>
            {["Mail", "Notes"].map((a) => (
              <div key={a} className="flex flex-col items-center gap-1">
                <span className="h-7 w-7 rounded-[8px] bg-white/25 ring-1 ring-white/30" />
                <span className="text-[8px] text-white/70">{a}</span>
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
    <ScaledStage width={640} height={500} className="mx-auto max-w-[640px]">
      <div className="absolute bottom-10 left-12 right-0 top-0 overflow-hidden rounded-2xl border border-white/25 bg-white/[0.1] text-white shadow-[0_30px_80px_rgba(0,0,0,.35),inset_0_1px_0_rgba(255,255,255,.28)] backdrop-blur-2xl backdrop-saturate-150">
        {/* chrome */}
        <div className="flex h-12 items-center gap-2.5 border-b border-white/15 bg-white/[0.06] px-4">
          <div className="mr-1 flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-2.5 w-2.5 rounded-full bg-white/35" />
            ))}
          </div>
          <ArrowLeft className="h-3.5 w-3.5 text-white/70" strokeWidth={2} />
          <ArrowRight className="h-3.5 w-3.5 text-white/35" strokeWidth={2} />
          <RotateCw className="h-3.5 w-3.5 text-white/70" strokeWidth={2} />
          <div className="flex h-7 flex-1 items-center gap-1.5 rounded-full bg-white/10 px-3 text-[11.5px] text-white/80">
            <Lock className="h-3 w-3" strokeWidth={2} /> pricewell.studio/usage-first-pricing
          </div>
          <span className="h-5 w-5 rounded-md bg-white/15" />
          <span
            className={clsx(
              "grid h-8 w-8 place-items-center rounded-[10px] transition-colors duration-300",
              step >= 1 ? "bg-white/20" : "bg-transparent",
            )}
          >
            <LogoMark className="h-5 w-5" />
          </span>
        </div>

        {/* page */}
        <div className="px-10 pt-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/55">Essay · 8 min read</p>
          <p className="mt-2 max-w-[330px] text-[25px] font-semibold leading-[1.08] tracking-[-0.04em]">
            Price on the moment value shows up.
          </p>
          <div className="mt-3 flex items-center gap-2 text-[11px] text-white/60">
            <span className="h-5 w-5 rounded-full bg-white/20" /> Dana Whitfield · Pricewell
          </div>
          <p className="mt-4 max-w-[400px] text-[12.5px] leading-[1.65] text-white/70">
            Most teams price on seats because it&rsquo;s easy to explain.{" "}
            <motion.span
              initial={false}
              animate={{
                backgroundColor: step === 0 ? "rgba(168,243,106,.9)" : "rgba(168,243,106,0)",
                color: step === 0 ? "#191918" : "rgba(255,255,255,.95)",
              }}
              transition={{ duration: 0.4, ease }}
              className="rounded-[3px] [box-decoration-break:clone]"
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
              <div key={n} className={clsx("rounded-lg border bg-white/[0.06] p-2.5", i === 2 ? "border-white/45" : "border-white/15")}>
                <p className="text-[10px] text-white/55">{n}</p>
                <p className="text-[14px] font-semibold tracking-[-0.03em]">{p}</p>
                <div className="mt-1.5 h-1 w-3/4 rounded bg-white/20" />
              </div>
            ))}
          </div>
          <p className="mt-5 max-w-[400px] text-[11px] text-white/50">Fig. 2 — Usage tier anchors the story; seats follow.</p>
          <div className="mt-4 max-w-[400px] space-y-2" aria-hidden="true">
            <div className="h-1.5 w-full rounded bg-white/15" />
            <div className="h-1.5 w-11/12 rounded bg-white/15" />
            <div className="h-1.5 w-4/5 rounded bg-white/15" />
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
    <section id="capture" ref={section} aria-labelledby="capture-title" className="relative pt-32 sm:pt-44 lg:h-[320vh] lg:pt-0">
      <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-14 px-5 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-20 lg:pt-20 xl:px-12">
          <div>
            <Eyebrow data-reveal>Capture without breaking flow</Eyebrow>
            <SectionTitle id="capture-title" data-reveal className="mt-5 max-w-[480px]">
              Save it where the thought happens.
            </SectionTitle>

            {/* Desktop: scroll-driven step index */}
            <ol className="relative mt-14 hidden lg:block">
              <span className="absolute bottom-0 left-0 top-0 w-px bg-ink/10" aria-hidden="true" />
              <span
                ref={fill}
                className="absolute bottom-0 left-0 top-0 w-px origin-top scale-y-0 bg-ink"
                aria-hidden="true"
              />
              {steps.map((s, i) => (
                <li key={s.title}>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={step === i ? "step" : undefined}
                    className="group flex w-full gap-6 py-4 pl-7 text-left"
                  >
                    <span
                      className={clsx(
                        "pt-[7px] text-[12px] font-medium tabular-nums tracking-[0.04em] transition-colors duration-300",
                        step === i ? "text-ink" : "text-ink/25",
                      )}
                    >
                      0{i + 1}
                    </span>
                    <span>
                      <span
                        className={clsx(
                          "block text-[26px] font-medium leading-[1.08] tracking-[-0.04em] transition-colors duration-300",
                          step === i ? "text-ink" : "text-ink/25 group-hover:text-ink/45",
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
                        <span className="block max-w-[380px] pt-3 text-[15.5px] leading-[1.55] text-muted">{s.body}</span>
                      </motion.span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>

            <div className="mt-12 hidden items-center gap-4 lg:flex">
              <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">Works where you save</span>
              <span className="flex items-center gap-2.5" aria-label="Chrome, Safari, iOS, Slack, Notion and Figma">
                {(["chrome", "safari", "ios", "slack", "notion", "figma"] as const).map((k) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={k} src={SOURCES[k].logo} alt="" className="h-[18px] w-[18px]" />
                ))}
              </span>
            </div>
          </div>

          {/* Each step has its own backdrop behind the stage; they crossfade on scroll. */}
          <div className="relative hidden overflow-hidden rounded-[28px] bg-[#0B1E5B] px-10 pb-12 pt-14 lg:block">
            <Backdrop step={step} />
            <div className="relative">
              <CaptureStage step={step} />
            </div>
          </div>

          {/* Below desktop: each step with its own frame */}
          <ol className="space-y-20 lg:hidden">
            {steps.map((s, i) => (
              <li key={s.title} data-reveal>
                <span className="text-[12px] font-medium tabular-nums tracking-[0.04em] text-muted">0{i + 1}</span>
                <h3 className="mt-3 text-[26px] font-medium leading-[1.08] tracking-[-0.04em]">{s.title}</h3>
                <p className="mt-3 max-w-[460px] text-[15.5px] leading-[1.55] text-muted">{s.body}</p>
                <div className="relative mt-8 overflow-hidden rounded-[24px] bg-[#0B1E5B] px-4 pb-6 pt-8 sm:px-8" aria-hidden="true">
                  <Backdrop step={i} only />
                  <div className="relative">
                    <CaptureStage step={i} />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
