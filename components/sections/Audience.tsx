import Image from "next/image";
import { Eyebrow, SectionTitle } from "../ui/Eyebrow";
import { type SourceKind } from "../ui/SourceChip";

// Placeholder images, one per persona, in order.
const images = ["/capture/step-1.png", "/capture/step-2.png", "/capture/step-3.png", "/hero-statue.webp"];

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
          className="-mx-5 mt-20 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 scrollbar-none sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0"
        >
          {personas.map((p, i) => (
            <li
              key={p.role}
              className="group relative min-h-[460px] w-[80%] shrink-0 snap-start overflow-hidden rounded-[20px] shadow-[0_1px_0_rgba(25,25,24,.04),0_20px_44px_-28px_rgba(25,25,24,.35)] sm:w-[46%] lg:aspect-[3/4] lg:min-h-0 lg:w-auto"
            >
              {/* PLACEHOLDER imagery — swap for one image per role. */}
              <Image
                src={images[i]}
                alt=""
                fill
                sizes="(min-width: 1024px) 25vw, 80vw"
                className="object-cover transition-transform duration-700 ease-recall group-hover:scale-[1.04]"
              />
              {/* Butter-paper overlay: white frost, translucent, inset from the edge. */}
              <div className="absolute inset-3 flex flex-col justify-between rounded-[14px] border border-white/60 bg-white/[0.58] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,.7)] backdrop-blur-md backdrop-saturate-[1.1] lg:p-7">
                <span className="text-[12px] font-medium tabular-nums tracking-[0.04em] text-ink/55">0{i + 1}</span>
                <div>
                  <h3 className="text-[30px] font-medium leading-[0.96] tracking-[-0.04em] text-ink">{p.role}</h3>
                  <p className="mt-3 max-w-[240px] text-[14px] font-medium leading-[1.45] tracking-[-0.02em] text-ink/60">{p.saves}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
