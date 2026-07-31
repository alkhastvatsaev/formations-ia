import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { POUR_PAGES } from "@/lib/seo-intent";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { breadcrumbJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = buildPageMetadata({
  title: "Parcours formation IA — pour qui ?",
  description:
    "Choisissez votre parcours formation IA : débutants, ceux qui codent, freelances, équipes qui démarrent. Pages intentionnelles vers les ateliers.",
  path: "/pour",
});

export default function PourIndexPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Pour qui", path: "/pour" },
        ])}
      />
      <Breadcrumbs
        items={[{ name: "Accueil", href: "/" }, { name: "Pour qui" }]}
      />
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl tracking-tight sm:text-4xl">
        Formation IA — pour qui ?
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
        Vous savez déjà ce que vous voulez gagner. Choisissez le parcours qui
        vous ressemble — chaque page mène à un atelier concret, avec prix et
        programme.
      </p>
      <ul className="mt-10 space-y-8">
        {POUR_PAGES.map((page) => (
          <li key={page.slug} className="border-t border-[var(--line)] pt-6">
            <h2 className="text-xl font-semibold">
              <Link
                href={`/pour/${page.slug}`}
                className="hover:text-[var(--accent)]"
              >
                {page.h1}
              </Link>
            </h2>
            <p className="mt-2 leading-relaxed text-[var(--ink-soft)]">
              {page.summary}
            </p>
            <Link
              href={`/pour/${page.slug}`}
              className="mt-3 inline-flex items-center gap-1 text-[var(--accent)] hover:underline"
            >
              Lire le parcours <ArrowRight className="h-4 w-4" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
