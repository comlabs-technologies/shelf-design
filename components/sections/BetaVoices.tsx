import { AvatarStack } from "../ui/AvatarStack";
import { Eyebrow } from "../ui/Eyebrow";

// PLACEHOLDER CONTENT — replace the count and quotes with real, attributable
// beta feedback (with permission) before launch.
export const BETA_COUNT = 40;

const quotes = [
  {
    quote:
      "I asked for “the onboarding teardown with the empty-state trick” and it was the first result. I didn’t remember the title, the site, or that I’d saved it in January.",
    name: "Priya N.",
    role: "Founder, seed-stage fintech",
    initial: "P",
  },
  {
    quote:
      "The line I add when saving is the whole point. Months later it’s exactly what I search by — it’s like leaving notes for future me that actually get read.",
    name: "Daniel O.",
    role: "Product designer, studio of 12",
    initial: "D",
  },
];

export function BetaVoices() {
  return (
    <section aria-labelledby="beta-title" className="pb-24 sm:pb-32">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 xl:px-12">
        <div className="flex flex-col gap-5 border-t border-line pt-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow data-reveal>In the private beta</Eyebrow>
            <h2
              id="beta-title"
              data-reveal
              className="mt-4 text-[30px] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-[40px]"
            >
              Trusted by {BETA_COUNT} early users.
            </h2>
          </div>
          <p data-reveal className="flex items-center gap-3 text-[14px] text-muted-strong">
            <AvatarStack />
            Founders, designers and researchers, using it daily
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {quotes.map((q) => (
            <figure key={q.name} data-reveal className="flex flex-col justify-between rounded-[20px] border border-line bg-surface p-6 sm:p-8">
              <blockquote className="text-[18px] leading-[1.5] tracking-[-0.015em] text-ink sm:text-[20px]">
                {q.quote}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-sand text-[13px] font-semibold">
                  {q.initial}
                </span>
                <span>
                  <span className="block text-[14px] font-medium">{q.name}</span>
                  <span className="block text-[13px] text-muted">{q.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <figure data-reveal className="mt-4 flex flex-col gap-4 rounded-[20px] bg-sand p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-8">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-[14px] font-semibold text-paper">
            M
          </span>
          <blockquote className="flex-1 text-[16px] leading-[1.55] text-muted-strong">
            &ldquo;We built Recall because our own best thinking kept disappearing into bookmarks. Every beta
            member gets a direct line to us — we read every note.&rdquo;
          </blockquote>
          <figcaption className="text-[13px] text-muted sm:text-right">
            <span className="block font-medium text-ink">Maya Lindqvist</span>
            Co-founder, Recall
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
