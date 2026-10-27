import { Logo } from "../ui/Logo";

const columns = [
  {
    title: "Product",
    links: [
      { href: "#search", label: "Search" },
      { href: "#capture", label: "Capture" },
      { href: "#privacy", label: "Privacy" },
      { href: "#faq", label: "FAQ" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "mailto:hello@recall.example", label: "Contact" },
      { href: "#", label: "Terms" },
      { href: "#privacy", label: "Privacy policy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 xl:px-12">
        <div className="grid grid-cols-1 gap-12 border-t border-line pt-14 sm:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-[260px] text-[15px] font-medium leading-[1.45] tracking-[-0.02em] text-muted">
              A memory layer for your work.
            </p>
          </div>
          {columns.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">{c.title}</p>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-[15px] font-medium tracking-[-0.02em] text-ink/75 transition-colors hover:text-ink">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-20 flex items-center justify-between text-[13px] font-medium tracking-[-0.01em] text-muted">
          <p>© {new Date().getFullYear()} Recall. All rights reserved.</p>
          <p>Made for people who keep things.</p>
        </div>

        {/* Oversized wordmark, barely there. */}
        <p
          aria-hidden="true"
          className="mt-6 select-none text-center text-[27vw] font-medium leading-[0.72] tracking-[-0.075em] text-ink/[0.045] min-[1600px]:text-[430px]"
        >
          recall
        </p>
      </div>
    </footer>
  );
}
