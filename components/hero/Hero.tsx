"use client";

import { useEffect, useRef, useState } from "react";
import { EmailForm } from "../ui/EmailForm";
import { SOURCES, SourceBadge } from "../ui/SourceBadge";
import { DashboardMockup } from "./DashboardMockup";
import { DESKTOP, NO_MOTION, setupGsap } from "@/lib/gsap";

export function Hero() {
  const copy = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const scrub = useRef<HTMLDivElement>(null);
  const enter = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const { gsap, ScrollTrigger } = setupGsap();
    const mm = gsap.matchMedia();
    let animated = false;

    mm.add(NO_MOTION, () => {
      animated = true;
      const q = gsap.utils.selector(copy);

      // 1. Hero copy settles in quietly; the highlight draws under "ready".
      const intro = gsap.timeline({ defaults: { ease: "recall" } });
      intro
        .fromTo(q("[data-hero]"), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.06 })
        .fromTo(
          q("[data-highlight]"),
          { scaleX: 0 },
          { scaleX: 1, duration: 0.42, transformOrigin: "0% 50%" },
          0.22,
        );

      // 2. The dashboard enters after the copy, once it is actually on screen.
      let copyDone = false;
      let inView = false;
      const reveal = () => {
        if (!copyDone || !inView) return;
        gsap.fromTo(
          enter.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.48, ease: "recall", onComplete: () => setPlay(true) },
        );
      };
      intro.eventCallback("onComplete", () => {
        copyDone = true;
        reveal();
      });
      ScrollTrigger.create({
        trigger: stage.current,
        start: "top 92%",
        once: true,
        onEnter: () => {
          inView = true;
          reveal();
        },
      });
    });

    // 3. Desktop: pin the dashboard briefly; the next section's curved surface
    //    slides over it while it scales to 0.96 and softens.
    mm.add(`${NO_MOTION} and ${DESKTOP}`, () => {
      const next = document.getElementById("search");
      if (!next || !stage.current) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage.current,
          start: "top 88px",
          end: () =>
            `+=${Math.max(
              200,
              next.getBoundingClientRect().top - stage.current!.getBoundingClientRect().top + 24,
            )}`,
          pin: true,
          pinSpacing: false,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      tl.to({}, { duration: 0.3 }).to(scrub.current, {
        scale: 0.96,
        opacity: 0.35,
        duration: 0.7,
        ease: "none",
        transformOrigin: "50% 0%",
      });
    });

    // Reduced motion: final state, no typing theatre.
    if (!animated) setPlay(true);
    return () => mm.revert();
  }, []);

  return (
    <section aria-labelledby="hero-title" className="relative pb-24 pt-[100px] sm:pt-[132px] md:pb-[150px] lg:pt-[104px]">
      <div ref={copy} className="mx-auto max-w-[1200px] px-5 text-center sm:px-8">
        <p
          data-init
          data-hero
          className="tag-lift inline-flex h-8 items-center gap-2 rounded-full bg-surface px-3.5 text-[13px] tracking-[-0.005em] text-muted-strong"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-ink" aria-hidden="true" />
          Your context, remembered
        </p>

        <h1
          id="hero-title"
          data-init
          data-hero
          className="mx-auto mt-5 max-w-[1100px] text-balance text-[44px] font-semibold leading-[1.0] tracking-[-0.05em] sm:text-[60px] md:text-[72px] lg:text-[78px]"
        >
          <span className="md:block">Everything you meant to keep,</span>{" "}
          <span className="md:block">
            <span className="relative isolate inline-block">
              <span
                data-highlight
                aria-hidden="true"
                className="absolute -inset-x-[0.08em] bottom-[0.02em] top-[0.14em] -z-10 -rotate-[0.6deg] rounded-[0.2em] bg-lime"
              />
              ready
            </span>{" "}
            when you need it.
          </span>
        </h1>

        <p
          data-init
          data-hero
          className="mx-auto mt-5 max-w-[560px] text-pretty text-[17px] leading-[1.55] tracking-[-0.01em] text-muted sm:text-[18px]"
        >
          Recall turns the links, notes, screenshots, and half-formed ideas you save every day into a
          library you can actually ask.
        </p>

        <div data-init data-hero className="mt-8">
          <EmailForm
            align="center"
            note={
              <>
                Private by default. No credit card. <span className="text-ink">First 100 members get founder pricing.</span>
              </>
            }
          />
        </div>

        <div
          data-init
          data-hero
          className="mx-auto mt-6 flex max-w-[1080px] flex-col items-center gap-3 lg:mt-7 lg:flex-row lg:justify-center lg:gap-5"
        >
          <p className="shrink-0 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
            Built for people who save professionally
          </p>
          <ul
            className="-mx-5 flex max-w-[calc(100%+40px)] gap-1.5 overflow-x-auto px-5 py-2 scrollbar-none [mask-image:linear-gradient(90deg,transparent,#000_20px,#000_calc(100%-20px),transparent)] lg:mx-0 lg:max-w-none lg:flex-wrap lg:justify-center lg:overflow-visible lg:p-0 lg:[mask-image:none]"
            aria-label="Saves from"
          >
            {(["chrome", "safari", "ios", "slack", "notion", "figma", "linkedin", "x"] as const).map((k) => (
              <li key={k} className="shrink-0">
                <SourceBadge source={SOURCES[k]} className="h-7 px-2.5 text-[12.5px]" />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div ref={stage} className="relative z-0 mx-auto mt-7 max-w-[1200px] px-4 sm:mt-8 sm:px-8">
        <div ref={scrub}>
          <div ref={enter} data-init>
            <DashboardMockup play={play} />
          </div>
        </div>
      </div>
    </section>
  );
}
