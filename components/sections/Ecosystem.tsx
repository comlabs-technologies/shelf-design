import { CornerDownRight } from "lucide-react";
import { Eyebrow, SectionTitle } from "../ui/Eyebrow";
import { LogoMark } from "../ui/Logo";
import { ScaledStage } from "../ui/ScaledStage";
import { SearchField } from "../ui/SearchField";
import { SOURCES, SourceBadge, type Source } from "../ui/SourceBadge";

const inputs: Source[] = [
  SOURCES.chrome,
  SOURCES.slack,
  SOURCES.linkedin,
  SOURCES.screenshots,
  SOURCES.notes,
  SOURCES.figma,
  SOURCES.pdf,
  SOURCES.youtube,
  SOURCES.substack,
];

// Design canvas for the desktop diagram (scaled to fit).
const W = 1120;
const H = 460;
const COL = 200; // where source lines start
const HUB = { x: 470, y: H / 2, w: 190, h: 112 };
const OUT_X = 760;

const rowY = (i: number) => 34 + i * ((H - 68) / (inputs.length - 1));

function Hub() {
  return (
    <div className="ui-focus rounded-2xl border border-line bg-surface p-4 text-left">
      <div className="flex items-center gap-2">
        <LogoMark className="h-7 w-7" />
        <span className="text-[15px] font-semibold tracking-[-0.03em]">Your library</span>
      </div>
      <p className="mt-2.5 text-[12px] leading-[1.45] text-muted">
        1,284 saves · every one read, understood, and kept with its reason
      </p>
    </div>
  );
}

function Answer() {
  return (
    <div className="rounded-2xl border border-line bg-surface p-3 text-left shadow-mock">
      <SearchField value="pricing example for the investor deck" caret={false} />
      <div className="mt-2.5 rounded-card bg-paper p-3">
        <p className="text-[13.5px] font-medium tracking-[-0.015em]">Three-tier pricing that makes the model obvious</p>
        <p className="mt-0.5 text-[11.5px] text-muted">From Chrome · saved 14 Feb</p>
        <p className="mt-2 flex gap-1.5 text-[12px] text-muted-strong">
          <CornerDownRight className="mt-[2px] h-3 w-3 shrink-0 text-muted" strokeWidth={1.8} aria-hidden="true" />
          Saved for slide 9 of the investor deck.
        </p>
      </div>
    </div>
  );
}

export function Ecosystem() {
  return (
    <section aria-labelledby="ecosystem-title" className="py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="mx-auto max-w-[640px] text-center">
          <Eyebrow data-reveal>Every source, one library</Eyebrow>
          <SectionTitle id="ecosystem-title" data-reveal className="mt-4">
            Wherever you found it, it ends up here.
          </SectionTitle>
          <p data-reveal className="mx-auto mt-5 max-w-[520px] text-[17px] leading-[1.6] text-muted">
            Links, threads, posts, screenshots, files and your own notes flow into one private library — and
            come back out as answers.
          </p>
        </div>

        {/* Desktop: sources → library → answer */}
        <div data-reveal className="mt-14 hidden md:block" role="img" aria-label="Sources such as Chrome, Slack, LinkedIn, screenshots, notes, Figma, PDFs, YouTube and newsletters flow into your Recall library, which answers a natural-language question with the right saved item.">
          <ScaledStage width={W} height={H} className="mx-auto max-w-[1120px]">
            <svg width={W} height={H} className="absolute inset-0" fill="none" aria-hidden="true">
              {inputs.map((_, i) => {
                const y = rowY(i);
                const endY = HUB.y + (i - (inputs.length - 1) / 2) * 6;
                const d = `M${COL} ${y} C ${COL + 150} ${y}, ${HUB.x - 130} ${endY}, ${HUB.x} ${endY}`;
                return (
                  <g key={i}>
                    <path d={d} stroke="#E9E8E2" strokeWidth="1.5" />
                    <path d={d} stroke="#191918" strokeOpacity="0.35" strokeWidth="1.5" className="flow-line" />
                  </g>
                );
              })}
              <path d={`M${HUB.x + HUB.w} ${HUB.y} H ${OUT_X}`} stroke="#E9E8E2" strokeWidth="1.5" />
              <path d={`M${HUB.x + HUB.w} ${HUB.y} H ${OUT_X}`} stroke="#191918" strokeOpacity="0.5" strokeWidth="1.5" className="flow-line" />
              <circle cx={OUT_X} cy={HUB.y} r="3.5" fill="#191918" />
            </svg>

            {inputs.map((s, i) => (
              <div key={s.name} className="absolute flex w-[188px] justify-end" style={{ left: 0, top: rowY(i) - 16 }}>
                <SourceBadge source={s} />
              </div>
            ))}

            <div className="absolute" style={{ left: HUB.x, top: HUB.y - HUB.h / 2, width: HUB.w }}>
              <Hub />
            </div>
            <div className="absolute" style={{ left: OUT_X + 12, top: HUB.y - 92, width: W - OUT_X - 12 }}>
              <Answer />
            </div>
          </ScaledStage>
        </div>

        {/* Mobile: stacked */}
        <div data-reveal className="mt-12 md:hidden">
          <ul className="flex flex-wrap justify-center gap-1.5" aria-label="Sources">
            {inputs.map((s) => (
              <li key={s.name}>
                <SourceBadge source={s} />
              </li>
            ))}
          </ul>
          <div className="mx-auto my-3 h-10 w-px border-l border-dashed border-ink/30" aria-hidden="true" />
          <div className="mx-auto max-w-[260px]">
            <Hub />
          </div>
          <div className="mx-auto my-3 h-10 w-px border-l border-dashed border-ink/30" aria-hidden="true" />
          <Answer />
        </div>
      </div>
    </section>
  );
}
