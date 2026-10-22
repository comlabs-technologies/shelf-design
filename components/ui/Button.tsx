"use client";

import clsx from "clsx";
import { motion, type HTMLMotionProps } from "framer-motion";

type Variant = "lime" | "ink" | "ghost";

const styles: Record<Variant, string> = {
  lime: "bg-lime text-ink border border-[#97E256] hover:border-[#86D145] hover:shadow-[0_6px_16px_rgba(120,190,60,.22)]",
  ink: "bg-ink text-paper border border-ink hover:shadow-[0_6px_16px_rgba(20,20,18,.18)]",
  ghost: "bg-surface text-ink border border-line hover:border-line-strong",
};

const base =
  "inline-flex select-none items-center justify-center gap-1.5 whitespace-nowrap rounded-full font-medium tracking-[-0.01em] transition-[box-shadow,border-color,background-color] duration-200 ease-recall";

const sizes = {
  sm: "h-9 px-4 text-[14px]",
  md: "h-11 px-5 text-[15px]",
};

interface Common {
  variant?: Variant;
  size?: keyof typeof sizes;
}

const lift = { whileHover: { y: -1.5 }, whileTap: { y: 0 } };

export function ButtonLink({
  variant = "lime",
  size = "md",
  className,
  ...props
}: Common & HTMLMotionProps<"a">) {
  return <motion.a {...lift} className={clsx(base, styles[variant], sizes[size], className)} {...props} />;
}

export function Button({
  variant = "lime",
  size = "md",
  className,
  ...props
}: Common & HTMLMotionProps<"button">) {
  return (
    <motion.button {...lift} className={clsx(base, styles[variant], sizes[size], className)} {...props} />
  );
}
