import Link from "next/link";
import { SITE } from "@/lib/site";
import { env } from "@/lib/env";

const links = [
  { href: "/formation-ia", label: "Formation IA" },
  { href: "/formations", label: "Ateliers" },
  { href: "/guides", label: "Guides" },
  { href: "/a-propos", label: "À propos" },
  { href: "/blog", label: "Blog" },
];

export function SiteHeader() {
  return (
    <header className="relative z-20 border-b border-[var(--line)]/60 bg-[var(--paper)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6">
        <Link
          href="/"
          className="shrink-0 font-[family-name:var(--font-display)] text-lg tracking-tight text-[var(--ink)]"
        >
          {SITE.name}
        </Link>
        <nav className="flex items-center gap-3 text-sm sm:gap-5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={env.NEXT_PUBLIC_CAL_LINK}
            className="rounded-md bg-[var(--accent)] px-3 py-2 text-[var(--accent-fg)] transition-colors hover:bg-[var(--accent-hover)]"
          >
            Parler 20 min
          </a>
        </nav>
      </div>
    </header>
  );
}
