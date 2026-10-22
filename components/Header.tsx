"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "./ui/Logo";
import { ButtonLink } from "./ui/Button";
import { setupGsap } from "@/lib/gsap";

const links = [
  { href: "#search", label: "Search" },
  { href: "#capture", label: "Capture" },
  { href: "#privacy", label: "Privacy" },
  { href: "#faq", label: "FAQ" },
];

/**
 * Sits naturally at the top of the page, then becomes a centred floating
 * capsule once the hero headline has scrolled past.
 */
export function Header() {
  const [floating, setFloating] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const { ScrollTrigger } = setupGsap();
    const st = ScrollTrigger.create({
      trigger: "#hero-title",
      start: "bottom top+=40",
      onEnter: () => setFloating(true),
      onLeaveBack: () => setFloating(false),
    });
    return () => st.kill();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={clsx(
        "inset-x-0 top-0 z-50",
        floating ? "fixed px-4 pt-3 sm:pt-4" : "absolute",
      )}
    >
      <div
        // Remount on change so the capsule entrance plays each time it appears.
        key={floating ? "capsule" : "top"}
        className={clsx(
          "relative mx-auto flex items-center justify-between",
          floating
            ? "nav-capsule-in h-14 max-w-[400px] rounded-2xl border border-line bg-surface pl-4 pr-2 shadow-nav md:max-w-[760px]"
            : "h-[76px] max-w-[1200px] px-5 sm:px-8",
        )}
      >
        <a href="#top" aria-label="Recall home" className="rounded-lg">
          <Logo />
        </a>

        <nav aria-label="Primary" className="absolute left-1/2 hidden -translate-x-1/2 md:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-3.5 py-2 text-[14.5px] tracking-[-0.01em] text-muted-strong transition-colors duration-200 hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <ButtonLink href="#request" size="sm" className="hidden sm:inline-flex">
            Request access <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href="#request" size="sm" className="px-3.5 sm:hidden">
            Join
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-9 w-9 place-items-center rounded-full text-ink transition-colors hover:bg-sand md:hidden"
          >
            {open ? <X className="h-[18px] w-[18px]" strokeWidth={1.8} /> : <Menu className="h-[18px] w-[18px]" strokeWidth={1.8} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              id="mobile-menu"
              aria-label="Mobile"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className={clsx(
                "absolute top-full mt-2 rounded-2xl border border-line bg-surface p-2 shadow-nav md:hidden",
                floating ? "inset-x-0" : "inset-x-4",
              )}
            >
              <ul>
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex h-12 items-center rounded-card px-3 text-[16px] tracking-[-0.01em] hover:bg-paper"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
