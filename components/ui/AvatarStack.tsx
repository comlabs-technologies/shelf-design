import clsx from "clsx";

const people = [
  { i: "P", tone: "bg-ink text-paper" },
  { i: "D", tone: "bg-sand text-ink" },
  { i: "J", tone: "bg-[#E4E3DC] text-ink" },
  { i: "A", tone: "bg-surface text-ink" },
];

export function AvatarStack({ className }: { className?: string }) {
  return (
    <span className={clsx("flex -space-x-2", className)} aria-hidden="true">
      {people.map((p) => (
        <span
          key={p.i}
          className={clsx(
            "grid h-7 w-7 place-items-center rounded-full border-2 border-paper text-[11px] font-semibold shadow-sm",
            p.tone,
          )}
        >
          {p.i}
        </span>
      ))}
    </span>
  );
}
