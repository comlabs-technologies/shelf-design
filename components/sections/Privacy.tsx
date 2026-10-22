import { Download, Lock } from "lucide-react";
import { Eyebrow, SectionTitle } from "../ui/Eyebrow";

const promises = [
  { title: "Never public", body: "Nothing you save gets a public URL unless you share it on purpose." },
  { title: "Never advertising", body: "Your library is not used to profile you, target ads, or sold to anyone." },
  { title: "Always yours to take", body: "Export everything — items, notes, and reasons — as files you can open anywhere." },
];

export function Privacy() {
  return (
    <section id="privacy" aria-labelledby="privacy-title" className="px-3 sm:px-5">
      <div className="mx-auto max-w-[1280px] rounded-[28px] bg-sand px-5 py-20 sm:px-10 sm:py-28 lg:px-16">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <Eyebrow data-reveal>Privacy</Eyebrow>
            <SectionTitle id="privacy-title" data-reveal className="mt-4 max-w-[540px]">
              A private library should stay private.
            </SectionTitle>
            <p data-reveal className="mt-6 max-w-[500px] text-[17px] leading-[1.6] tracking-[-0.01em] text-muted">
              What you save is personal working material: unreleased research, half-formed ideas, notes
              meant only for you. Recall reads it for one reason — to help you find it again.
            </p>
            <div data-reveal className="mt-8 flex flex-wrap gap-2">
              <span className="inline-flex h-9 items-center gap-2 rounded-full border border-line-strong/70 bg-surface px-3.5 text-[13.5px] font-medium">
                <Lock className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" /> Private workspace
              </span>
              <span className="inline-flex h-9 items-center gap-2 rounded-full border border-line-strong/70 bg-surface px-3.5 text-[13.5px] font-medium">
                <Download className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" /> Export anytime
              </span>
            </div>
          </div>

          <ul data-reveal className="divide-y divide-line-strong/60 border-y border-line-strong/60 lg:mt-2">
            {promises.map((p, i) => (
              <li key={p.title} className="grid grid-cols-[32px_1fr] gap-3 py-6">
                <span className="pt-0.5 font-mono text-[12px] text-muted">0{i + 1}</span>
                <div>
                  <p className="text-[17px] font-medium tracking-[-0.02em]">{p.title}</p>
                  <p className="mt-1.5 text-[14.5px] leading-[1.55] text-muted-strong">{p.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
