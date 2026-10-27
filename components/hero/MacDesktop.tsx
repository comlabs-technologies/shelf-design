import clsx from "clsx";
import { BatteryMedium, Folder, Mail, MessageCircle, Search, Trash2, Wifi } from "lucide-react";
import { siApple } from "simple-icons";
import { LogoMark } from "../ui/Logo";
import { SOURCES, type Source } from "../ui/SourceBadge";

/** Original wallpaper: layered ridgelines at dusk with one lime sun. */
function Wallpaper() {
  return (
    <svg viewBox="0 0 1520 980" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="wp-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D9D6CB" />
          <stop offset="0.55" stopColor="#EEEBE2" />
          <stop offset="1" stopColor="#F6F4EE" />
        </linearGradient>
      </defs>
      <rect width="1520" height="980" fill="url(#wp-sky)" />
      <circle cx="1210" cy="250" r="64" fill="#A8F36A" />
      <path d="M0 520 L140 450 L260 500 L420 400 L560 470 L700 380 L860 460 L1000 400 L1160 470 L1300 410 L1520 480 V980 H0Z" fill="#D2CEC2" />
      <path d="M0 610 L180 520 L330 590 L500 500 L660 580 L820 510 L980 590 L1140 520 L1320 600 L1520 540 V980 H0Z" fill="#B8B3A5" />
      <path d="M0 720 L200 640 L380 700 L560 630 L760 710 L940 650 L1120 720 L1320 660 L1520 720 V980 H0Z" fill="#8F8A7D" />
      <path d="M0 840 L240 770 L480 830 L720 780 L980 850 L1240 790 L1520 850 V980 H0Z" fill="#5F5B52" />
    </svg>
  );
}

function MenuBar() {
  return (
    <div className="absolute inset-x-0 top-0 z-10 flex h-[30px] items-center justify-between bg-[rgba(250,250,247,.62)] px-5 text-[13px] text-ink">
      <div className="flex items-center gap-5">
        <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="currentColor" aria-hidden="true">
          <path d={siApple.path} />
        </svg>
        <span className="font-semibold">Recall</span>
        {["File", "Edit", "View", "Window", "Help"].map((m) => (
          <span key={m} className="text-ink/80">
            {m}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-4 text-ink/80">
        <BatteryMedium className="h-4 w-4" strokeWidth={1.8} />
        <Wifi className="h-4 w-4" strokeWidth={1.8} />
        <Search className="h-3.5 w-3.5" strokeWidth={2} />
        <span>Tue 27 Oct&nbsp;&nbsp;9:41</span>
      </div>
    </div>
  );
}

type Tile = { key: string; label: string; bg: string; content: React.ReactNode; running?: boolean };

const brand = (s: Source, size = "h-7 w-7") => (
  <svg viewBox={s.mark!.viewBox} className={size} fill="#fff" aria-hidden="true">
    <path d={s.mark!.path} />
  </svg>
);

const tiles: (Tile | "divider")[] = [
  { key: "files", label: "Files", bg: "bg-[#4E8EF7]", content: <Folder className="h-7 w-7 text-white" strokeWidth={1.8} /> },
  { key: "safari", label: "Safari", bg: "bg-[#0A84FF]", content: brand(SOURCES.safari), running: true },
  { key: "messages", label: "Messages", bg: "bg-[#34C759]", content: <MessageCircle className="h-7 w-7 text-white" strokeWidth={1.8} /> },
  { key: "mail", label: "Mail", bg: "bg-[#2F7BF6]", content: <Mail className="h-7 w-7 text-white" strokeWidth={1.8} /> },
  {
    key: "calendar",
    label: "Calendar",
    bg: "bg-white",
    content: (
      <span className="flex flex-col items-center leading-none">
        <span className="text-[9px] font-semibold uppercase text-[#FF3B30]">Oct</span>
        <span className="text-[22px] font-light text-ink">27</span>
      </span>
    ),
  },
  {
    key: "notes",
    label: "Notes",
    bg: "bg-[#FFD60A]",
    content: (
      <span className="flex h-full w-full flex-col justify-end gap-[3px] rounded-[13px] bg-[linear-gradient(#FFD60A_0_30%,#FFFDF2_30%)] p-2">
        <span className="h-[2px] w-full rounded bg-ink/15" />
        <span className="h-[2px] w-4/5 rounded bg-ink/15" />
        <span className="h-[2px] w-full rounded bg-ink/15" />
      </span>
    ),
  },
  { key: "figma", label: "Figma", bg: "bg-[#1E1E1E]", content: brand(SOURCES.figma, "h-6 w-6") },
  { key: "slack", label: "Slack", bg: "bg-[#4A154B]", content: brand(SOURCES.slack, "h-7 w-7"), running: true },
  { key: "notion", label: "Notion", bg: "bg-[#191918]", content: brand(SOURCES.notion, "h-7 w-7") },
  {
    key: "recall",
    label: "Recall",
    bg: "bg-ink",
    content: <LogoMark className="h-[56px] w-[56px]" />,
    running: true,
  },
  "divider",
  { key: "trash", label: "Trash", bg: "bg-[#E9E8E2]", content: <Trash2 className="h-7 w-7 text-ink/60" strokeWidth={1.6} /> },
];

function Dock() {
  return (
    <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-end gap-2 rounded-[22px] border border-white/60 bg-[rgba(250,250,247,.55)] px-2.5 pb-2.5 pt-2.5 shadow-[0_10px_30px_rgba(25,25,24,.18)]">
      {tiles.map((t, i) =>
        t === "divider" ? (
          <span key={i} className="mx-1 h-12 w-px self-center bg-ink/20" />
        ) : (
          <span key={t.key} className="relative flex flex-col items-center" title={t.label}>
            <span
              className={clsx(
                "grid h-[56px] w-[56px] place-items-center overflow-hidden rounded-[14px] shadow-[0_2px_6px_rgba(25,25,24,.18)]",
                t.bg,
              )}
            >
              {t.content}
            </span>
            <span className={clsx("absolute -bottom-2 h-1 w-1 rounded-full", t.running ? "bg-ink/70" : "bg-transparent")} />
          </span>
        ),
      )}
    </div>
  );
}

/** A Mac desktop at a fixed design size (1520×980): wallpaper, menu bar, window, dock. */
export function MacDesktop({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-[980px] w-[1520px] overflow-hidden rounded-[22px] border border-line shadow-mock" aria-hidden="true">
      <Wallpaper />
      <MenuBar />
      <div className="absolute left-[64px] right-[64px] top-[56px] h-[808px]">{children}</div>
      <Dock />
    </div>
  );
}
