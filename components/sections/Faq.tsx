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
    <section id="faq" aria-labelledby="faq-title" className="pb-32 sm:pb-44">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 xl:px-12">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow data-reveal>Before you join</Eyebrow>
          <SectionTitle id="faq-title" data-reveal className="mt-5 max-w-[420px]">
            Questions worth asking.
          </SectionTitle>
          <p data-reveal className="mt-7 max-w-[340px] text-[15px] font-medium leading-[1.5] tracking-[-0.02em] text-muted">
            Something we didn&rsquo;t cover?{" "}
            <a href="mailto:hello@recall.example" className="text-ink underline decoration-ink/20 underline-offset-4 hover:decoration-ink">
              Write to us
            </a>{" "}
            — a person replies.
          </p>
        </div>

        <div data-reveal className="border-t border-line">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            const btn = `${base}-q${i}`;
            const panel = `${base}-a${i}`;
            return (
              <div key={f.q} className="relative border-b border-line">
                {/* Thin lime indicator marks the open row. */}
                <span
                  aria-hidden="true"
                  className={clsx(
                    "absolute -left-5 bottom-7 top-7 w-[2px] rounded-full bg-lime transition-opacity duration-200 sm:-left-6",
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
                    className="group flex w-full items-center justify-between gap-8 py-7 text-left"
                  >
                    <span
                      className={clsx(
                        "text-[19px] font-medium leading-[1.2] tracking-[-0.03em] transition-colors duration-200 sm:text-[24px]",
                        isOpen ? "text-ink" : "text-ink/75 group-hover:text-ink",
                      )}
                    >
                      {f.q}
                    </span>
                    <span
                      className={clsx(
                        "grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-[background-color,border-color,box-shadow] duration-200",
                        isOpen
                          ? "border-ink bg-ink text-paper"
                          : "border-line bg-surface text-ink group-hover:border-line-strong group-hover:shadow-[0_6px_14px_rgba(25,25,24,.08)]",
                      )}
                      aria-hidden="true"
                    >
                      <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={t} className="grid">
                        <Plus className="h-4 w-4" strokeWidth={1.8} />
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
                      <p className="max-w-[640px] pb-8 pr-16 text-[16px] font-medium leading-[1.6] tracking-[-0.015em] text-muted">{f.a}</p>
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
