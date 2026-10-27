import { Download, LockKeyhole } from "lucide-react";

const promises = [
  { title: "Never public", body: "Nothing you save gets a public link unless you share it on purpose." },
  { title: "Never advertising", body: "Your library isn’t used to profile you, target ads, or sold to anyone." },
  { title: "Always yours to take", body: "Export everything — items, notes and reasons — as files you can open anywhere." },
];

export function Privacy() {
  return (
    <section id="privacy" aria-labelledby="privacy-title" className="px-3 pb-32 sm:px-5 sm:pb-44 xl:px-9">
      <div className="mx-auto max-w-[1600px] rounded-[28px] bg-ink px-6 py-20 text-paper sm:px-12 sm:py-28 lg:px-20 lg:py-32">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
          <div>
            <p data-reveal className="text-[11px] font-medium uppercase tracking-[0.14em] text-paper/45">
              Privacy
            </p>
            <h2
              id="privacy-title"
              data-reveal
              className="mt-5 max-w-[560px] text-balance text-[38px] font-medium leading-[0.98] tracking-[-0.05em] sm:text-[52px] lg:text-[64px]"
            >
              A private library should stay private.
            </h2>
            <p data-reveal className="mt-7 max-w-[460px] text-[17px] font-medium leading-[1.5] tracking-[-0.02em] text-paper/55">
              What you save is working material — unreleased research, half-formed ideas, notes meant only for you.
              Recall reads it for one reason: to help you find it again.
            </p>
            <div data-reveal className="mt-10 flex flex-wrap gap-2">
              <span className="inline-flex h-10 items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.06] px-4 text-[14px] font-medium tracking-[-0.01em]">
                <span className="h-1.5 w-1.5 rounded-full bg-lime" aria-hidden="true" />
                <LockKeyhole className="h-3.5 w-3.5 text-paper/70" strokeWidth={2} aria-hidden="true" /> Private workspace
              </span>
              <span className="inline-flex h-10 items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.06] px-4 text-[14px] font-medium tracking-[-0.01em]">
                <Download className="h-3.5 w-3.5 text-paper/70" strokeWidth={2} aria-hidden="true" /> Export anytime
              </span>
            </div>
          </div>

          <ol data-reveal className="self-end">
            {promises.map((p, i) => (
              <li key={p.title} className="grid grid-cols-[44px_1fr] border-t border-white/10 py-7 last:border-b">
                <span className="pt-1 text-[12px] font-medium tabular-nums tracking-[0.04em] text-paper/35">0{i + 1}</span>
                <div>
                  <p className="text-[22px] font-medium leading-[1.1] tracking-[-0.035em]">{p.title}</p>
                  <p className="mt-2 max-w-[400px] text-[15px] font-medium leading-[1.5] tracking-[-0.015em] text-paper/50">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
