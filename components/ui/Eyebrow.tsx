import clsx from "clsx";

export function Eyebrow({ className, ...rest }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={clsx(
        "font-mono text-[11.5px] font-medium uppercase tracking-[0.14em] text-muted-strong",
        className,
      )}
      {...rest}
    />
  );
}

export function SectionTitle({
  className,
  as: Tag = "h2",
  ...rest
}: React.HTMLAttributes<HTMLHeadingElement> & { as?: "h2" | "h3" }) {
  return (
    <Tag
      className={clsx(
        "text-balance text-[34px] font-semibold leading-[1.04] tracking-[-0.045em] text-ink sm:text-[44px] lg:text-[52px]",
        className,
      )}
      {...rest}
    />
  );
}
