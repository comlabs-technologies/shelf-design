import { ArrowRight, Download } from "lucide-react";
import { Eyebrow, SectionTitle } from "../ui/Eyebrow";
import { SearchField } from "../ui/SearchField";
import { SourceChip } from "../ui/SourceChip";

function MeaningFragment() {
  return (
    <div className="rounded-card border border-line bg-paper p-3 sm:p-4" aria-hidden="true">
      <SearchField value="that chart Sam sent about week-one drop-off" caret={false} />
      <div className="mt-3 rounded-card border border-line bg-surface p-3.5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[13.5px] font-medium tracking-[-0.015em]">Cohort retention, March signups</p>
            <p className="mt-0.5 text-[11.5px] text-muted">From Sam Okafor · Slack · 6 Mar</p>
          </div>
          <SourceChip kind="screenshot" label="Screenshot" />
        </div>
        {/* tiny retention curve */}
        <svg viewBox="0 0 240 56" className="mt-3 h-14 w-full" fill="none">
          <path d="M0 6 C 30 8, 40 34, 70 38 S 140 44, 240 46" stroke="#191918" strokeWidth="1.6" />
          <path d="M0 55.5 H240" stroke="#E9E8E2" />
          <circle cx="70" cy="38" r="3" fill="#191918" />
        </svg>
        <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-line pt-3 text-[11.5px] text-muted-strong">
          <span className="text-muted">Matched on</span>
          <span className="rounded-full bg-paper px-2 py-0.5">drop-off</span>
          <ArrowRight className="h-3 w-3 text-muted" strokeWidth={1.8} />
          <span className="rounded-full bg-paper px-2 py-0.5">retention</span>
          <span className="rounded-full bg-paper px-2 py-0.5">week one</span>
          <ArrowRight className="h-3 w-3 text-muted" strokeWidth={1.8} />
          <span className="rounded-full bg-paper px-2 py-0.5">day 1–7</span>
        </div>
      </div>
    </div>
  );
}

function AnnotationFragment() {
  return (
    <div className="relative rounded-card border border-line bg-surface p-4" aria-hidden="true">
      <p className="text-[10.5px] font-medium uppercase tracking-[0.12em] text-muted">pricewell.studio</p>
      <p className="mt-2 text-[13px] leading-[1.6] text-muted-strong">
        Most teams price on seats because it&rsquo;s easy to explain.{" "}
        <span className="text-ink underline decoration-ink/60 decoration-[1.5px] underline-offset-[3px]">
          The best ones price on the moment value shows up
        </span>
        , and let seats follow.
      </p>
      <div className="relative mt-4 ml-4 border-l border-line-strong pl-3">
        <p className="text-[10.5px] font-medium uppercase tracking-[0.12em] text-muted">Your note</p>
        <p className="mt-1 text-[12.5px] leading-[1.5] text-ink">Anchor for pricing slide — usage first, seats second.</p>
        <p className="mt-1.5 text-[11px] text-muted">Added 14 Feb · searchable</p>
      </div>
    </div>
  );
}

function PrivacyFragment() {
  const rows = [
    { k: "Workspace", v: "Private", on: true },
    { k: "Public links", v: "Off" },
    { k: "Ad tracking", v: "Never" },
    { k: "Export", v: ".zip · Markdown", action: true },
  ];
  return (
    <ul className="divide-y divide-line rounded-card border border-line bg-surface" aria-hidden="true">
      {rows.map((r) => (
        <li key={r.k} className="flex h-11 items-center justify-between px-3.5 text-[12.5px]">
          <span className="text-muted-strong">{r.k}</span>
          <span className="flex items-center gap-1.5 font-medium text-ink">
            {r.on && <span className="h-1.5 w-1.5 rounded-full bg-ink" />}
            {r.action && <Download className="h-3 w-3" strokeWidth={2} />}
            {r.v}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Capabilities() {
  return (
    <section aria-labelledby="capabilities-title" className="pb-24 pt-8 sm:pb-36">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="max-w-[640px]">
          <Eyebrow data-reveal>What Recall does</Eyebrow>
          <SectionTitle id="capabilities-title" data-reveal className="mt-4">
            Three quiet ideas, built carefully.
          </SectionTitle>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-[1.35fr_1fr_0.85fr] lg:items-start lg:gap-6">
          <article data-reveal className="rounded-2xl border border-line bg-surface p-4 sm:p-6">
            <MeaningFragment />
            <div className="mt-6 px-1 pb-1">
              <h3 className="text-[22px] font-semibold tracking-[-0.035em]">Search by meaning</h3>
              <p className="mt-2 max-w-[400px] text-[15px] leading-[1.55] text-muted">
                Describe it the way you remember it. Recall matches ideas, not keywords.
              </p>
            </div>
          </article>

          <article data-reveal className="rounded-2xl bg-sand p-4 sm:p-6 lg:mt-16">
            <div className="px-1">
              <h3 className="text-[22px] font-semibold tracking-[-0.035em]">Remember the why</h3>
              <p className="mt-2 text-[15px] leading-[1.55] text-muted">
                Every save keeps the reason you kept it. Months later, the reason is what you search.
              </p>
            </div>
            <div className="mt-6">
              <AnnotationFragment />
            </div>
          </article>

          <article data-reveal className="border-t border-ink pt-5 lg:mt-32">
            <h3 className="text-[22px] font-semibold tracking-[-0.035em]">Keep it private</h3>
            <p className="mt-2 text-[15px] leading-[1.55] text-muted">
              Your library is yours. Nothing is public unless you say so.
            </p>
            <div className="mt-6">
              <PrivacyFragment />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
