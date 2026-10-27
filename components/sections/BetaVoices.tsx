import { AvatarStack } from "../ui/AvatarStack";
import { Eyebrow } from "../ui/Eyebrow";

// PLACEHOLDER CONTENT — replace the count and quotes with real, attributable
// beta feedback (with permission) before launch.
export const BETA_COUNT = 40;

const lead = {
  quote:
    "I asked for “the onboarding teardown with the empty-state trick” and it was the first result. I didn’t remember the title, the site, or that I’d saved it in January.",
  name: "Priya N.",
  role: "Founder, seed-stage fintech",
  initial: "P",
};

const second = {
  quote:
    "The line I add when saving is the whole point. Months later it’s exactly what I search by — notes to future me that actually get read.",
  name: "Daniel O.",
  role: "Product designer, studio of 12",
  initial: "D",
};

export function BetaVoices() {
  return (
    <section aria-labelledby="beta-title" className="pb-32 sm:pb-44">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 xl:px-12">
        <div className="mx-auto max-w-[1040px] text-center">
          <Eyebrow data-reveal>In the private beta</Eyebrow>
          <h2 id="beta-title" className="sr-only">
            Trusted by {BETA_COUNT} early users
          </h2>
          <figure data-reveal className="mt-10">
            <blockquote className="text-balance text-[28px] font-medium leading-[1.18] tracking-[-0.035em] text-ink sm:text-[40px] lg:text-[48px]">
              &ldquo;{lead.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-10 inline-flex items-center gap-3 text-left">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-sand text-[14px] font-medium">{lead.initial}</span>
              <span>
                <span className="block text-[15px] font-medium tracking-[-0.02em]">{lead.name}</span>
                <span className="block text-[13.5px] font-medium tracking-[-0.01em] text-muted">{lead.role}</span>
              </span>
            </figcaption>
          </figure>
        </div>

        <div className="mx-auto mt-24 grid max-w-[1180px] grid-cols-1 gap-5 md:grid-cols-[1.2fr_1fr]">
          <figure
            data-reveal
            className="flex flex-col justify-between rounded-[20px] border border-[rgba(25,25,24,.06)] bg-[#FCFCFA] p-7 shadow-[0_1px_0_rgba(25,25,24,.03),0_20px_44px_-30px_rgba(25,25,24,.28)] sm:p-9"
          >
            <blockquote className="text-[19px] font-medium leading-[1.45] tracking-[-0.02em] text-ink/85">&ldquo;{second.quote}&rdquo;</blockquote>
            <figcaption className="mt-10 flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-sand text-[13px] font-medium">{second.initial}</span>
              <span>
                <span className="block text-[14px] font-medium tracking-[-0.02em]">{second.name}</span>
                <span className="block text-[13px] font-medium text-muted">{second.role}</span>
              </span>
            </figcaption>
          </figure>

          <div data-reveal className="flex flex-col justify-between rounded-[20px] bg-sand p-7 sm:p-9">
            <div>
              <p className="text-[64px] font-medium leading-[0.8] tracking-[-0.07em] sm:text-[88px]">{BETA_COUNT}</p>
              <p className="mt-4 max-w-[260px] text-[15px] font-medium leading-[1.4] tracking-[-0.02em] text-muted-strong">
                founders, designers and researchers saving with Recall every day.
              </p>
            </div>
            <div className="mt-10 flex items-center justify-between gap-4 border-t border-ink/10 pt-5">
              <AvatarStack />
              <p className="text-right text-[13px] font-medium tracking-[-0.01em] text-muted">
                &ldquo;We read every note.&rdquo; — Maya, co-founder
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
