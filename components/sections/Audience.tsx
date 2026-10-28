import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow, SectionTitle } from "../ui/Eyebrow";
import { type SourceKind } from "../ui/SourceChip";

// One image per persona, in order.
const images = ["/personas/1.webp", "/personas/2.webp", "/personas/3.webp", "/personas/4.webp"];

type Persona = {
  role: string;
  saves: string;
  ask: string;
  results: { kind: SourceKind; source: string; title: string; why: string }[];
};

const personas: Persona[] = [
  {
    role: "Founders",
    saves: "Pricing pages, competitor launches, investor updates, advice buried in threads.",
    ask: "the pricing page with the usage tier I liked",
    results: [
      { kind: "web", source: "Web", title: "Three-tier pricing that makes the model obvious", why: "The story for slide 9 of the investor deck." },
      { kind: "slack", source: "Slack", title: "#founders — Ana on bridge-round terms", why: "Compare against our term sheet before Thursday." },
    ],
  },
  {
    role: "Product designers",
    saves: "Onboarding flows, empty states, type specimens, half-finished Figma explorations.",
    ask: "empty states that teach without a tour",
    results: [
      { kind: "screenshot", source: "Screenshot", title: "Orbit — setup checklist, step 2 of 4", why: "The progress ring feels calm. Compare with ours." },
      { kind: "doc", source: "Figma", title: "Onboarding v3 — explorations", why: "Option C is the one the team kept coming back to." },
    ],
  },
  {
    role: "Researchers",
    saves: "Papers, interview notes, verbatim quotes, the dataset someone mentioned once.",
    ask: "the interview where someone exported everything to spreadsheets",
    results: [
      { kind: "note", source: "Note", title: "Interview 07 — ops lead, logistics", why: "Mentions CSV exports twice; strong workaround signal." },
      { kind: "doc", source: "PDF", title: "Diary study synthesis, wave 2", why: "Page 14 backs the export finding with numbers." },
    ],
  },
  {
    role: "Agency strategists",
    saves: "Campaign references, client decks, LinkedIn posts, trend reports you'll quote later.",
    ask: "LinkedIn posts that made B2B feel human",
    results: [
      { kind: "web", source: "LinkedIn", title: "“We fired our best client” — a CEO’s post", why: "Tone reference for the Halden rebrand pitch." },
      { kind: "doc", source: "PDF", title: "B2B attention report 2026", why: "Stat on founder-led posts for slide 4." },
    ],
  },
];

export function Audience() {
  return (
    <section aria-labelledby="audience-title" className="pb-32 sm:pb-44">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 xl:px-12">
        <div className="max-w-[720px]">
          <Eyebrow data-reveal>Who it&rsquo;s for</Eyebrow>
          <SectionTitle id="audience-title" data-reveal className="mt-5">
            For people whose work is made of references.
          </SectionTitle>
        </div>

        <ul
          data-reveal
          className="-mx-5 mt-20 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 scrollbar-none sm:-mx-8 sm:px-8 xl:mx-0 xl:grid xl:grid-cols-4 xl:gap-5 xl:overflow-visible xl:px-0 xl:pb-0"
        >
          {personas.map((p, i) => (
            <li
              key={p.role}
              className="group relative min-h-[460px] w-[80%] shrink-0 snap-start overflow-hidden rounded-[20px] shadow-[0_1px_0_rgba(25,25,24,.04),0_20px_44px_-28px_rgba(25,25,24,.35)] sm:w-[46%] lg:w-[31%] xl:aspect-[3/4] xl:min-h-0 xl:w-auto"
            >
                            <Image
                src={images[i]}
                alt=""
                fill
                sizes="(min-width: 1024px) 25vw, 80vw"
                className="object-cover object-[70%_center] transition-transform duration-700 ease-recall group-hover:scale-[1.04]"
              />
              {/* Clear glass panel: barely tinted, light blur with boosted colour, and a
                  bright specular rim so it reads as a pane of glass rather than frost. */}
              <div className="glass-panel absolute inset-3 flex flex-col justify-between rounded-[16px] p-5 lg:p-6">
                <span className="text-[12px] font-medium tabular-nums tracking-[0.04em] text-ink/60">0{i + 1}</span>
                <div>
                  <h3 className="flex items-center gap-1.5 whitespace-nowrap text-[22px] font-medium sm:text-[24px] leading-[1] tracking-[-0.04em] text-ink xl:text-[clamp(20px,1.6vw,28px)]">
                    {p.role}
                    <ArrowUpRight
                      aria-hidden="true"
                      strokeWidth={1.8}
                      className="h-[0.8em] w-[0.8em] shrink-0 transition-transform duration-300 ease-recall group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </h3>
                  {/* Revealed on hover (always shown where there is no hover). */}
                  <div className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-300 ease-recall group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-within:grid-rows-[1fr] group-focus-within:opacity-100 [@media(hover:none)]:grid-rows-[1fr] [@media(hover:none)]:opacity-100">
                    <p className="overflow-hidden">
                      <span className="block max-w-[240px] pt-3 text-[14px] font-medium leading-[1.45] tracking-[-0.02em] text-ink/65">
                        {p.saves}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
