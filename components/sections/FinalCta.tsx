import Image from "next/image";
import { AvatarStack } from "../ui/AvatarStack";
import { EmailForm } from "../ui/EmailForm";
import { BETA_COUNT } from "./BetaVoices";

/** Closes the page: the visor-wearing David looks on, the copy sits in the open space. */
export function FinalCta() {
  return (
    <section id="request" aria-labelledby="cta-title" className="px-3 pb-24 sm:px-5 sm:pb-32 xl:px-9">
      <div className="relative mx-auto max-w-[1600px] overflow-hidden rounded-[28px] bg-[#F6F4EF]">
        <div aria-hidden="true" className="relative aspect-[4/3] w-full sm:aspect-[16/9] lg:absolute lg:inset-0 lg:aspect-auto">
          <Image
            src="/cta-david.webp"
            alt=""
            fill
            sizes="(min-width: 1024px) 1600px, 100vw"
            className="object-cover object-[92%_30%] lg:object-[100%_35%]"
          />
          <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#F6F4EF] to-transparent lg:hidden" />
        </div>

        <div className="relative px-6 pb-14 sm:px-12 lg:max-w-[640px] lg:px-20 lg:py-32">
          <p data-reveal className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
            Private beta
          </p>
          <h2
            id="cta-title"
            data-reveal
            className="mt-5 text-balance text-[44px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[60px] lg:text-[72px]"
          >
            Your future self will thank you.
          </h2>
          <p data-reveal className="mt-6 max-w-[420px] text-[17px] font-medium leading-[1.5] tracking-[-0.02em] text-muted">
            Start keeping things with their reasons today, and find them in a sentence next year.
          </p>
          <div data-reveal className="mt-10">
            <EmailForm note="First 100 members get founder pricing — locked in for as long as you stay." />
          </div>
          <p data-reveal className="mt-5 flex items-center gap-3 text-[13.5px] font-medium tracking-[-0.01em] text-muted-strong">
            <AvatarStack className="shrink-0" />
            <span>Join {BETA_COUNT} early users already saving with Recall</span>
          </p>
        </div>
      </div>
    </section>
  );
}
