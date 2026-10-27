"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Menu, X } from "lucide-react";
import { Logo } from "./ui/Logo";
import { ButtonLink } from "./ui/Button";

const links = [
  { href: "#search", label: "Search" },
  { href: "#capture", label: "Capture" },
  { href: "#privacy", label: "Privacy" },
  { href: "#faq", label: "FAQ" },
];

/**
 * One elevated white bar, the same at the top of the page and while
 * scrolling: rounded, hairline border, soft shadow weighted to the bottom edge.
 */
export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-3">
      <div className="mx-auto max-w-[1600px] px-3 sm:px-5 xl:px-9">
        <div className="relative flex h-[60px] items-center justify-between rounded-2xl border border-[rgba(25,25,24,.06)] bg-surface pl-4 pr-2 shadow-[0_1px_2px_rgba(25,25,24,.04),0_10px_20px_-12px_rgba(25,25,24,.28)] sm:pl-5">
          <a href="#top" aria-label="Recall home" className="rounded-lg">
            <Logo />
          </a>

          <nav aria-label="Primary" className="absolute left-1/2 hidden -translate-x-1/2 md:block">
            <ul className="flex items-center gap-2">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="rounded-full px-3.5 py-2 text-[15px] tracking-[-0.01em] text-ink/85 transition-colors duration-200 hover:text-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-3">
            <a
              href="#request"
              className="hidden rounded-full px-2 py-2 text-[15px] tracking-[-0.01em] text-ink/85 transition-colors hover:text-ink sm:block"
            >
              Sign in
            </a>
            <ButtonLink href="#request" className="hidden h-11 rounded-xl px-4 sm:inline-flex">
              Get early access <ChevronRight className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="#request" size="sm" className="rounded-xl px-3.5 sm:hidden">
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
                className="absolute inset-x-0 top-full mt-2 rounded-2xl border border-line bg-surface p-2 shadow-float md:hidden"
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
                  <li>
                    <a
                      href="#request"
                      onClick={() => setOpen(false)}
                      className="flex h-12 items-center rounded-card px-3 text-[16px] tracking-[-0.01em] text-muted-strong hover:bg-paper"
                    >
                      Sign in
                    </a>
                  </li>
                </ul>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
