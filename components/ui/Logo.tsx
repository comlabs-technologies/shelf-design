import clsx from "clsx";

/** Recall mark: an open loop closing around a single point of focus. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={clsx("h-6 w-6", className)}>
      <rect width="24" height="24" rx="7" fill="#191918" />
      <path
        d="M16.9 8.4A5.6 5.6 0 1 0 17.6 12"
        fill="none"
        stroke="#FAFAF7"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="1.9" fill="#FAFAF7" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={clsx("inline-flex items-center gap-2", className)}>
      <LogoMark />
      <span className="text-[19px] font-semibold tracking-[-0.04em] text-ink">recall</span>
    </span>
  );
}
