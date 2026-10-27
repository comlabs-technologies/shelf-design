import clsx from "clsx";

/** 11px medium uppercase label — the small voice above every heading. */
export function Eyebrow({ className, ...rest }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={clsx("text-[11px] font-medium uppercase tracking-[0.14em] text-muted", className)}
      {...rest}
    />
  );
}

/** Section display heading: medium weight, tight tracking, never bold. */
export function SectionTitle({
  className,
  as: Tag = "h2",
  ...rest
}: React.HTMLAttributes<HTMLHeadingElement> & { as?: "h2" | "h3" }) {
  return (
    <Tag
      className={clsx(
        "text-balance text-[38px] font-medium leading-[0.98] tracking-[-0.05em] text-ink sm:text-[52px] lg:text-[64px]",
        className,
      )}
      {...rest}
    />
  );
}
