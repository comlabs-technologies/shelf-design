"use client";

import { useEffect, useRef, useState } from "react";
import { EmailForm } from "../ui/EmailForm";
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
        )
        // "ready" drops in letter by letter: -10px → -5px, then springs to rest.
        .fromTo(
          q("[data-letter]"),
          { y: -10, opacity: 0 },
          { y: -5, opacity: 1, duration: 0.16, ease: "power2.out", stagger: 0.06 },
          0.3,
        )
        .to(q("[data-letter]"), { y: 0, duration: 0.6, ease: "elastic.out(1, 0.45)", stagger: 0.06 }, 0.46);

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
              <span aria-label="ready">
                {"ready".split("").map((ch, i) => (
                  <span key={i} data-letter aria-hidden="true" className="inline-block">
                    {ch}
                  </span>
                ))}
              </span>
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

      </div>

      <div ref={stage} className="relative z-0 mx-auto mt-10 max-w-[1200px] px-4 sm:mt-14 sm:px-8">
        <div ref={scrub}>
          <div ref={enter} data-init>
            <DashboardMockup play={play} />
          </div>
        </div>
      </div>
    </section>
  );
}
