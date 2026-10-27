import { FileText, Globe, Image as ImageIcon, Layers, LockKeyhole } from "lucide-react";
import { CredibilityStrip } from "../CredibilityStrip";
import { FallingTags } from "../FallingTags";
import { SOURCES, type Source } from "../ui/SourceBadge";

/** Brand mark in a single ink (or white) colour. */
function Mark({ source, className }: { source: Source; className?: string }) {
  return (
    <svg viewBox={source.mark!.viewBox} className={className} fill="currentColor" aria-hidden="true">
      <path d={source.mark!.path} />
    </svg>
  );
}

const eyebrow = "text-[11px] font-medium uppercase tracking-[0.14em]";
const cardHeading = "text-[34px] font-medium leading-[0.96] tracking-[-0.04em] sm:text-[44px]";
const label = "text-[14px] font-medium tracking-[-0.02em] sm:text-[15px]";

/* ---------- Left: dark "Found across everything" ---------- */

const found = [
  { label: "Web", icon: <Globe className="h-6 w-6" strokeWidth={1.6} /> },
  { label: "Slack", icon: <Mark source={SOURCES.slack} className="h-[22px] w-[22px]" /> },
  { label: "Screenshots", icon: <ImageIcon className="h-6 w-6" strokeWidth={1.6} /> },
  { label: "Notes", icon: <FileText className="h-6 w-6" strokeWidth={1.6} /> },
];

function FoundCard() {
  return (
    <article
      data-reveal
      className="flex aspect-[9/16] flex-col rounded-[20px] bg-ink p-6 text-paper shadow-[0_1px_0_rgba(25,25,24,.2),0_24px_50px_-24px_rgba(25,25,24,.45)] sm:p-8"
    >
      <p className={`${eyebrow} text-paper/45`}>One search</p>
      <h3 className={`${cardHeading} mt-4 text-paper`}>
        Found across
        <br />
        everything.
      </h3>

      <div className="relative mt-auto">
        <p
          className="relative inline-block text-[clamp(150px,22vw,250px)] font-medium leading-[0.8] tracking-[-0.075em] text-paper"
          aria-label="12 source types"
        >
          12
          <span aria-hidden="true" className="absolute -right-[0.24em] top-[0.02em] h-[0.16em] w-[0.16em] rounded-full bg-lime" />
        </p>
        <p className={`${label} mt-5 text-paper/55`}>source types, searched as one library</p>
      </div>

      <ul className="mt-8 grid grid-cols-4 gap-2.5 sm:gap-3">
        {found.map((f) => (
          <li key={f.label} className="flex flex-col items-center gap-2.5">
            <span className="grid aspect-square w-full place-items-center rounded-[16px] border border-white/10 bg-white/[0.06] text-paper">
              {f.icon}
            </span>
            <span className="text-[12.5px] font-medium tracking-[-0.02em] text-paper/70 sm:text-[13.5px]">{f.label}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

/* ---------- Right: light "Save from anywhere" ---------- */

const rowA = [SOURCES.chrome, SOURCES.safari, SOURCES.ios, SOURCES.slack];
const rowB = [SOURCES.notion, SOURCES.figma, SOURCES.linkedin];

function AppTile({ source }: { source: Source }) {
  return (
    <span
      title={source.name}
      className="grid aspect-square w-full place-items-center rounded-[16px] border border-[rgba(25,25,24,.07)] bg-surface text-ink shadow-[0_2px_7px_rgba(25,25,24,.06)]"
    >
      {source.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={source.logo} alt="" className="h-[42%] w-[42%]" />
      ) : (
        <Mark source={source} className="h-[38%] w-[38%]" />
      )}
    </span>
  );
}

function AnywhereCard() {
  return (
    <article
      data-reveal
      className="flex aspect-[9/16] flex-col rounded-[20px] border border-[rgba(25,25,24,.06)] bg-[#FCFCFA] p-6 shadow-[0_1px_0_rgba(25,25,24,.04),0_24px_50px_-28px_rgba(25,25,24,.25)] sm:p-8"
    >
      <p className={`${eyebrow} text-muted`}>One tap</p>
      <h3 className={`${cardHeading} mt-4 text-ink`}>
        Save from
        <br />
        anywhere.
      </h3>

      <div className="mt-auto">
        <ul className="grid grid-cols-4 gap-2.5 sm:gap-3" aria-label="Save from">
          {rowA.map((s) => (
            <li key={s.name}>
              <AppTile source={s} />
            </li>
          ))}
        </ul>
        <ul className="mx-auto mt-2.5 grid w-[75%] grid-cols-3 gap-2.5 sm:mt-3 sm:gap-3">
          {rowB.map((s) => (
            <li key={s.name}>
              <AppTile source={s} />
            </li>
          ))}
        </ul>

        {/* Everything routes into one place. */}
        <svg viewBox="0 0 300 64" className="mx-auto mt-1 block w-[75%] text-ink/35" fill="none" aria-hidden="true">
          <path
            d="M37 0 V18 Q37 30 49 30 H251 Q263 30 263 18 V0"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path d="M150 30 V58" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M144 52 L150 58 L156 52" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <div className="mt-2 flex flex-col items-center">
          <span className="grid h-[84px] w-[84px] place-items-center rounded-[20px] bg-lime text-ink shadow-[0_1px_0_rgba(25,25,24,.12),0_12px_26px_-10px_rgba(25,25,24,.3)] sm:h-[96px] sm:w-[96px]">
            <Layers className="h-9 w-9" strokeWidth={1.8} aria-hidden="true" />
          </span>
          <p className={`${label} mt-3 text-ink`}>Your Recall library</p>
        </div>
      </div>
    </article>
  );
}

/* ---------- Section ---------- */

export function SearchDemo() {
  return (
    <section
      id="search"
      aria-labelledby="search-title"
      className="relative z-10 bg-sand pb-[170px] pt-14 sm:pb-[250px] sm:pt-20 lg:pb-[330px]"
    >
      <div data-reveal className="mx-auto max-w-[1600px] px-5 pb-16 sm:px-8 sm:pb-24 xl:px-12">
        <CredibilityStrip />
      </div>

      <div className="font-inter mx-auto max-w-[980px] px-5 sm:px-8">
        <h2 id="search-title" className="sr-only">
          Found across everything, saved from anywhere
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          <FoundCard />
          <AnywhereCard />
        </div>

        <div
          data-reveal
          className="mt-4 flex items-center gap-4 rounded-[20px] border border-[rgba(25,25,24,.06)] bg-[#FCFCFA] p-4 shadow-[0_1px_0_rgba(25,25,24,.03),0_10px_24px_-18px_rgba(25,25,24,.25)] sm:mt-5 sm:p-5"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-sand text-ink">
            <LockKeyhole className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
          </span>
          <div>
            <p className="text-[16px] font-medium tracking-[-0.02em] text-ink">Private by design.</p>
            <p className="mt-0.5 text-[14px] font-medium tracking-[-0.02em] text-muted">
              Your research stays yours. Export whenever you need.
            </p>
          </div>
        </div>
      </div>

      {/* Everything you saved lands here: tags drop onto the floor. */}
      <FallingTags shape="valley" />
    </section>
  );
}
