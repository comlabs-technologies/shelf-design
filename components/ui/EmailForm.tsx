"use client";

import { useId, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "./Button";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * One refined horizontal field on ≥sm; stacked input + button on mobile.
 * Submission is simulated client-side — wire `onSubmit` to a real waitlist endpoint.
 */
export function EmailForm({
  className,
  align = "left",
  cta = "Join the private beta",
  note,
}: {
  className?: string;
  align?: "left" | "center";
  cta?: string;
  /** Quiet line under the field; the validation message replaces it when needed. */
  note?: React.ReactNode;
}) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "loading" | "done">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL.test(email.trim())) {
      setState("error");
      return;
    }
    setState("loading");
    await new Promise((r) => setTimeout(r, 650));
    setState("done");
  }

  return (
    <div className={clsx("w-full max-w-[480px]", align === "center" && "mx-auto", className)}>
      <AnimatePresence mode="wait" initial={false}>
        {state === "done" ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={clsx(
              "flex h-14 items-center gap-3 rounded-full border border-line bg-surface px-5 text-[15px]",
              align === "center" && "justify-center",
            )}
            role="status"
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-lime">
              <Check className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden="true" />
            </span>
            <span>
              You&rsquo;re on the list. We&rsquo;ll write to <span className="font-medium">{email.trim()}</span>.
            </span>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            exit={{ opacity: 0, y: -4 }}
            onSubmit={submit}
            noValidate
            className={clsx(
              "flex flex-col gap-2.5",
              // ≥sm: the whole pill is the inset field; the CTA sits lifted inside it.
              "sm:field-inset sm:h-14 sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:p-1.5 sm:pl-5",
            )}
            data-invalid={state === "error"}
          >
            <label htmlFor={id} className="sr-only">
              Work email
            </label>
            <input
              id={id}
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="Enter your work email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (state === "error") setState("idle");
              }}
              aria-invalid={state === "error"}
              aria-describedby={state === "error" ? `${id}-err` : undefined}
              className={clsx(
                "field-inset h-[52px] w-full min-w-0 rounded-card px-4 text-[16px] tracking-[-0.01em] text-ink placeholder:text-muted",
                "outline-none focus-visible:outline-none",
                // ≥sm the wrapper carries the inset field styling.
                "sm:h-full sm:flex-1 sm:rounded-none sm:!border-transparent sm:!bg-transparent sm:px-0 sm:text-[15px] sm:!shadow-none",
              )}
            />
            <Button type="submit" className="h-[52px] sm:h-full sm:px-5" disabled={state === "loading"}>
              {state === "loading" ? "Joining…" : cta}
              <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
      <p
        id={`${id}-err`}
        aria-live="polite"
        className={clsx(
          "mt-3 min-h-[20px] text-[13px]",
          align === "center" && "text-center",
          state === "error" ? "text-[#A4533C]" : "text-muted",
        )}
      >
        {state === "error" ? "Please enter a valid work email." : state === "done" ? null : note}
      </p>
    </div>
  );
}
