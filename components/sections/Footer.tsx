import { Logo } from "../ui/Logo";

const links = [
  { href: "#privacy", label: "Privacy" },
  { href: "#", label: "Terms" },
  { href: "mailto:hello@recall.example", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-5 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-8 xl:px-12">
        <div>
          <Logo />
          <p className="mt-3 text-[14px] text-muted">A memory layer for your work.</p>
        </div>
        <div className="flex flex-col gap-4 sm:items-end">
          <ul className="flex gap-6 text-[14px]">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-muted-strong transition-colors hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-[12.5px] text-muted">© {new Date().getFullYear()} Recall. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
