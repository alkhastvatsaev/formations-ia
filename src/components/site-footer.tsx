import Link from "next/link";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--line)] bg-[var(--ink)] text-[var(--paper)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-[family-name:var(--font-display)] text-xl">
            {SITE.name}
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--paper)]/70">
            {SITE.tagline}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--paper)]/50">
            Parcourir
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/formation-ia" className="hover:underline">
                Hub formation IA
              </Link>
            </li>
            <li>
              <Link href="/formations" className="hover:underline">
                Toutes les formations
              </Link>
            </li>
            <li>
              <Link href="/pour" className="hover:underline">
                Parcours (pour qui)
              </Link>
            </li>
            <li>
              <Link href="/guides" className="hover:underline">
                Guides
              </Link>
            </li>
            <li>
              <Link href="/formations/premiers-pas-ia" className="hover:underline">
                Premiers pas IA
              </Link>
            </li>
            <li>
              <Link href="/formations/coder-avec-ia" className="hover:underline">
                Coder avec l&apos;IA
              </Link>
            </li>
            <li>
              <Link href="/formations/ia-equipe-intra" className="hover:underline">
                Intra-entreprise
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:underline">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/a-propos" className="hover:underline">
                À propos
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--paper)]/50">
            Légal & liens
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/mentions-legales" className="hover:underline">
                Mentions légales
              </Link>
            </li>
            <li>
              <Link href="/cgv" className="hover:underline">
                CGV
              </Link>
            </li>
            <li>
              <Link href="/confidentialite" className="hover:underline">
                Confidentialité
              </Link>
            </li>
            <li>
              <a href={SITE.author.url} className="hover:underline">
                Portfolio développeur
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-[var(--paper)]/50">
        © {new Date().getFullYear()} {SITE.author.name}
      </div>
    </footer>
  );
}
