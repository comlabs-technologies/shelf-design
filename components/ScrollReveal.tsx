"use client";

import { useEffect } from "react";
import { NO_MOTION, setupGsap } from "@/lib/gsap";

/**
 * Restrained reveal for section headings and copy marked `data-reveal`.
 * Rendered last so it registers after the hero pin.
 */
export function ScrollReveal() {
  useEffect(() => {
    const { gsap, ScrollTrigger } = setupGsap();
    const mm = gsap.matchMedia();
    mm.add(NO_MOTION, () => {
      const els = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      gsap.set(els, { opacity: 0, y: 12 });
      ScrollTrigger.batch(els, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 0.35, ease: "recall", stagger: 0.07 }),
      });
      ScrollTrigger.refresh();
    });
    return () => mm.revert();
  }, []);
  return null;
}
