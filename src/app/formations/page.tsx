import type { Metadata } from "next";
import Link from "next/link";
import { allFormations } from "content-collections";
import { ArrowRight } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = buildPageMetadata({
  title: "Formations IA pour débutants",
  description:
    "Vous voulez démarrer l'IA : catalogue des ateliers ChatGPT, Cursor et équipes TPE/PME. Prix et dates en clair, programmes lisibles.",
  path: "/formations",
});

const ORDER = ["premiers-pas-ia", "coder-avec-ia", "ia-equipe-intra"] as const;

export default function FormationsIndexPage() {
  const bySlug = Object.fromEntries(
    allFormations.filter((f) => !f.draft).map((f) => [f.slug, f]),
  );
  const formations = [
    ...ORDER.map((slug) => bySlug[slug]).filter(Boolean),
    ...allFormations.filter(
      (f) => !f.draft && !ORDER.includes(f.slug as (typeof ORDER)[number]),
    ),
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-tight sm:text-4xl">
        Formations IA
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
        Vous cherchez un premier pas concret — pas une théorie. Voici les
        ateliers : utiliser l&apos;IA au quotidien, apprendre à coder avec
        Cursor, ou former votre équipe. Prix, programme et dates sont en texte
        clair.
      </p>

      <ul className="mt-10 space-y-10">
        {formations.map((formation) => {
          if (!formation) return null;
          return (
            <li key={formation.slug} className="border-t border-[var(--line)] pt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                {formation.level} · {formation.mode}
              </p>
              <h2 className="mt-2 text-xl font-semibold leading-snug">
                <Link
                  href={`/formations/${formation.slug}`}
                  className="hover:text-[var(--accent)]"
                >
                  {formation.title}
                </Link>
              </h2>
              <p className="mt-3 leading-relaxed text-[var(--ink-soft)]">
                {formation.summary}
              </p>
              <p className="mt-4 text-sm font-medium text-[var(--ink)]">
                {formatPrice(formation.priceCents)}
                <span className="font-normal text-[var(--muted)]">
                  {" "}
                  · {formation.nextSessions[0]?.label}
                </span>
              </p>
              <Link
                href={`/formations/${formation.slug}`}
                className="mt-4 inline-flex items-center gap-1 text-[var(--accent)] hover:underline"
              >
                Voir le programme <ArrowRight className="h-4 w-4" />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
