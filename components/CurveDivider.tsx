import clsx from "clsx";

/** Dome control points in the 1440×120 viewBox, shared with the falling tags. */
export const DOME = [
  [0, 120],
  [360, -8],
  [1080, -8],
  [1440, 120],
] as const;

/**
 * A wide, gentle arc in the section's surface colour. `dome` rises into the
 * section above; `bowl` hangs below into the section after.
 */
export function CurveDivider({
  shape,
  className,
  fill = "#F3F2EC",
}: {
  shape: "dome" | "bowl";
  className?: string;
  fill?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className={clsx("pointer-events-none absolute inset-x-0 block h-[44px] w-full sm:h-[80px] lg:h-[120px]", className)}
    >
      <path d={shape === "dome" ? `M${DOME[0]} C ${DOME[1]} ${DOME[2]} ${DOME[3]} Z` : "M0 0 C 360 128 1080 128 1440 0 Z"} fill={fill} />
    </svg>
  );
}
