"use client";

import { useId, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { Eyebrow, SectionTitle } from "../ui/Eyebrow";

const faqs = [
  {
    q: "What can I save in Recall?",
    a: "Web pages, articles, PDFs, screenshots, images, Slack and email snippets, and quick notes of your own. If you can share it or copy it, you can keep it — along with a line about why.",
  },
  {
    q: "Do I need to organise everything manually?",
    a: "No. Collections are there if you like them, but you never have to file anything. Recall reads each item and the reason you gave, so you can find it later just by describing it.",
  },
  {
    q: "Can I import my existing bookmarks?",
    a: "Yes. Import from Chrome, Safari, Arc, and Firefox, or from an HTML or CSV export from most read-later apps. Imported items are searchable by meaning straight away.",
  },
  {
    q: "Who can see my workspace?",
    a: "Only you, unless you invite someone. Nothing is published, nothing is used for advertising, and you can export or delete your whole library at any time.",
  },
  {
    q: "When will Recall be available?",
    a: "We’re opening the private beta in small groups, starting with founders, designers, and researchers. Join the list and we’ll email you when your spot is ready — the first 100 members get founder pricing.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  const base = useId();
  const t = { duration: reduce ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section id="faq" aria-labelledby="faq-title" className="py-24 sm:py-36">
      <div className="mx-auto max-w-[880px] px-5 sm:px-8">
        <div className="text-center">
          <Eyebrow data-reveal>Before you join</Eyebrow>
          <SectionTitle id="faq-title" data-reveal className="mt-4">
            Questions worth asking.
          </SectionTitle>
        </div>

        <div data-reveal className="mt-14 space-y-2.5">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            const btn = `${base}-q${i}`;
            const panel = `${base}-a${i}`;
            return (
              <div
                key={f.q}
                className={clsx(
                  "relative overflow-hidden rounded-[16px] border bg-paper transition-[transform,box-shadow,border-color,background-color] duration-200 ease-recall",
                  isOpen
                    ? "border-line-strong/70 bg-surface"
                    : "border-line hover:-translate-y-px hover:border-line-strong/80 hover:shadow-[0_7px_18px_rgba(25,25,24,.06)] motion-reduce:hover:translate-y-0",
                )}
              >
                {/* Thin lime indicator marks the open row instead of a heavy shadow. */}
                <span
                  aria-hidden="true"
                  className={clsx(
                    "absolute bottom-5 left-0 top-5 w-[3px] rounded-r-full bg-lime transition-opacity duration-200",
                    isOpen ? "opacity-100" : "opacity-0",
                  )}
                />
                <h3>
                  <button
                    id={btn}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panel}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 rounded-[16px] px-5 py-5 text-left sm:px-7 sm:py-6"
                  >
                    <span className="text-[17px] font-medium tracking-[-0.025em] text-ink sm:text-[20px]">{f.q}</span>
                    <span
                      className={clsx(
                        "grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-colors duration-200",
                        isOpen ? "border-ink bg-ink text-paper" : "border-line bg-surface text-ink group-hover:border-line-strong",
                      )}
                      aria-hidden="true"
                    >
                      <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={t} className="grid">
                        <Plus className="h-4 w-4" strokeWidth={2} />
                      </motion.span>
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panel}
                      role="region"
                      aria-labelledby={btn}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={t}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[680px] px-5 pb-6 pr-14 text-[16px] leading-[1.65] text-muted-strong sm:px-7 sm:pb-7">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
