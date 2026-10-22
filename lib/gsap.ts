"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

let registered = false;

/** Registers plugins once and defines the shared easing curve. */
export function setupGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, CustomEase);
    CustomEase.create("recall", "0.22, 1, 0.36, 1");
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

export const NO_MOTION = "(prefers-reduced-motion: no-preference)";
export const DESKTOP = "(min-width: 768px)";
