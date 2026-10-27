import clsx from "clsx";

type Curve = readonly (readonly [number, number])[];

/** Arc control points in the 1440×120 viewBox, shared with the falling tags. */
export const CURVES: Record<"dome" | "bowl", Curve> = {
  dome: [
    [0, 120],
    [360, -8],
    [1080, -8],
    [1440, 120],
  ],
  bowl: [
    [0, 0],
    [360, 128],
    [1080, 128],
    [1440, 0],
  ],
};

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
      <path d={`M${CURVES[shape][0]} C ${CURVES[shape][1]} ${CURVES[shape][2]} ${CURVES[shape][3]} Z`} fill={fill} />
    </svg>
  );
}
