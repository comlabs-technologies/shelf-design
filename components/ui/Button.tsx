import clsx from "clsx";

type Variant = "lime" | "ink" | "ghost";

// Lime and ink are pressable (lifted, rise on hover, sink on press);
// ghost is the quieter secondary.
const styles: Record<Variant, string> = {
  lime: "btn-press bg-lime text-ink border border-[rgba(25,25,24,.12)] hover:bg-[#B2F57A]",
  ink: "btn-press bg-ink text-paper border border-ink",
  ghost: "btn-soft bg-surface text-ink border border-[rgba(25,25,24,.1)] hover:border-[rgba(25,25,24,.18)]",
};

const base =
  "inline-flex select-none items-center justify-center gap-1.5 whitespace-nowrap rounded-full font-medium tracking-[-0.01em] disabled:pointer-events-none disabled:opacity-70";

const sizes = {
  sm: "h-9 px-4 text-[14px]",
  md: "h-11 px-5 text-[15px]",
};

interface Common {
  variant?: Variant;
  size?: keyof typeof sizes;
}

export function ButtonLink({
  variant = "lime",
  size = "md",
  className,
  ...props
}: Common & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={clsx(base, styles[variant], sizes[size], className)} {...props} />;
}

export function Button({
  variant = "lime",
  size = "md",
  className,
  ...props
}: Common & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={clsx(base, styles[variant], sizes[size], className)} {...props} />;
}
