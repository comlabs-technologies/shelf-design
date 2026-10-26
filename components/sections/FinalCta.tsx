import { AvatarStack } from "../ui/AvatarStack";
import { EmailForm } from "../ui/EmailForm";
import { BETA_COUNT } from "./BetaVoices";

export function FinalCta() {
  return (
    <section id="request" aria-labelledby="cta-title" className="border-t border-line py-28 sm:py-40">
      <div className="mx-auto max-w-[760px] px-5 text-center sm:px-8">
        <h2
          id="cta-title"
          data-reveal
          className="text-balance text-[42px] font-semibold leading-[1.0] tracking-[-0.05em] sm:text-[60px] lg:text-[68px]"
        >
          Your future self will thank{" "}
          <span className="relative inline-block">
            you.
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="absolute -right-7 top-0 h-6 w-6 sm:-right-11 sm:top-1 sm:h-8 sm:w-8"
            >
              <path
                d="M12 1.5c.6 5.6 4.9 9.9 10.5 10.5-5.6.6-9.9 4.9-10.5 10.5C11.4 16.9 7.1 12.6 1.5 12 7.1 11.4 11.4 7.1 12 1.5Z"
                fill="#A8F36A"
                stroke="#191918"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </h2>
        <p data-reveal className="mx-auto mt-6 max-w-[460px] text-[17px] leading-[1.6] text-muted sm:text-[18px]">
          Start keeping things with their reasons today, and find them in a sentence next year. The private
          beta opens in small groups.
        </p>
        <div data-reveal className="mt-10">
          <EmailForm align="center" note="First 100 members get founder pricing — locked in for as long as you stay." />
          <p className="mt-5 flex items-center justify-center gap-3 text-left text-[13.5px] text-muted-strong">
            <AvatarStack className="shrink-0" />
            <span>Join {BETA_COUNT} early users already saving with Recall</span>
          </p>
        </div>
      </div>
    </section>
  );
}
