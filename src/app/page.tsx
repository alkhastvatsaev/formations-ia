import type { Metadata } from "next";
import Link from "next/link";
import { allFormations, allTestimonials } from "content-collections";
import { ArrowRight } from "lucide-react";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { env } from "@/lib/env";
import { formatPrice } from "@/lib/utils";
import { SITE } from "@/lib/site";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: SITE.fullName,
    description: SITE.tagline,
    path: "/",
  }),
  title: { absolute: SITE.fullName },
};

const OFFER_ORDER = ["premiers-pas-ia", "coder-avec-ia", "ia-equipe-intra"] as const;

const OFFER_LABEL: Record<(typeof OFFER_ORDER)[number], string> = {
  "premiers-pas-ia": "Je démarre l'IA",
  "coder-avec-ia": "Je veux coder avec l'IA",
  "ia-equipe-intra": "Je forme mon équipe",
};

export default function HomePage() {
  const bySlug = Object.fromEntries(
    allFormations.filter((f) => !f.draft).map((f) => [f.slug, f]),
  );
  const offers = OFFER_ORDER.map((slug) => bySlug[slug]).filter(Boolean);
  const testimonials = allTestimonials;

  return (
    <div className="atmosphere relative overflow-hidden">
      <div className="grid-noise pointer-events-none absolute inset-x-0 top-0 h-[42vh]" />

      <section className="relative mx-auto max-w-6xl px-4 pb-14 pt-14 sm:px-6 sm:pt-20">
        <p className="font-[family-name:var(--font-display)] text-4xl leading-none tracking-tight text-[var(--ink)] sm:text-6xl">
          {SITE.name}
        </p>
        <h1 className="mt-5 max-w-xl text-2xl font-semibold leading-snug tracking-tight text-[var(--ink)] sm:text-3xl">
          Formation IA pour débutants — pour gagner du temps sur{" "}
          <em>votre</em> métier.
        </h1>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-[var(--ink-soft)]">
          Vous savez déjà faire votre travail. Ce qui manque, souvent : une
          méthode simple pour que ChatGPT, Claude ou Cursor délivrent du
          premier coup. Ateliers live, petit groupe, faits clairs (prix,
          dates).
        </p>
        <div className="mt-8" id="cta">
          <a
            href={env.NEXT_PUBLIC_CAL_LINK}
            className="inline-flex h-12 items-center rounded-md bg-[var(--accent)] px-6 text-[var(--accent-fg)] transition-colors hover:bg-[var(--accent-hover)]"
          >
            Parler de mon cas (20 min)
          </a>
          <p className="mt-3 text-sm text-[var(--muted)]">
            L&apos;appel sert à écouter. Ou choisissez un atelier ci-dessous.
          </p>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)] sm:text-3xl">
          Choisissez le chemin qui vous ressemble
        </h2>
        <p className="mt-2 max-w-xl text-[var(--muted)]">
          Trois ateliers débutants. Prix et prochaines dates visibles — pour
          décider sans friction.
        </p>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {offers.map((formation, index) => {
            if (!formation) return null;
            const label =
              OFFER_LABEL[formation.slug as keyof typeof OFFER_LABEL] ??
              "Atelier";
            return (
              <li
                key={formation.slug}
                className={
                  index === 0
                    ? "border-t-2 border-[var(--accent)] pt-5"
                    : "border-t-2 border-[var(--line)] pt-5"
                }
              >
                <p
                  className={
                    index === 0
                      ? "text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]"
                      : "text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]"
                  }
                >
                  {label}
                </p>
                <h3 className="mt-2 text-lg font-semibold leading-snug text-[var(--ink)]">
                  <Link
                    href={`/formations/${formation.slug}`}
                    className="hover:underline"
                  >
                    {formation.title}
                  </Link>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
                  {formation.summary}
                </p>
                <p className="mt-4 text-sm font-medium text-[var(--ink)]">
                  {formatPrice(formation.priceCents)}
                  <span className="font-normal text-[var(--muted)]">
                    {" "}
                    · {formation.mode} · {formation.nextSessions[0]?.label}
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
        <p className="mt-6 text-sm text-[var(--muted)]">
          <Link href="/formations" className="text-[var(--accent)] hover:underline">
            Voir toutes les formations
          </Link>
          {" · "}
          <Link href="/formation-ia" className="text-[var(--accent)] hover:underline">
            Hub formation IA
          </Link>
          {" · "}
          <Link href="/guides" className="text-[var(--accent)] hover:underline">
            Guides
          </Link>
        </p>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--paper-soft)]/50">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl">
            Ce que d&apos;autres ont emporté
          </h2>
          <ul className="mt-8 grid gap-8 md:grid-cols-3">
            {testimonials.map((t) => (
              <li key={t.name}>
                <blockquote className="leading-relaxed text-[var(--ink-soft)]">
                  “{t.quote}”
                </blockquote>
                <p className="mt-3 text-sm text-[var(--muted)]">
                  {t.name} — {t.role}
                  {t.company ? `, ${t.company}` : ""}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-[var(--muted)]">
            Animé par un développeur qui shippe :{" "}
            <a
              href="https://github.com/alkhastvatsaev"
              className="text-[var(--accent)] hover:underline"
            >
              GitHub
            </a>
            {" · "}
            <a href={SITE.author.url} className="text-[var(--accent)] hover:underline">
              portfolio
            </a>
            .
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="max-w-md">
          <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl">
            D&apos;abord une checklist gratuite (5 min)
          </h2>
          <p className="mt-2 leading-relaxed text-[var(--muted)]">
            Outils, prompts, routine — pour avancer sur{" "}
            <em>votre</em> premier cas. Double opt-in, sans pression.
          </p>
          <div className="mt-5">
            <NewsletterForm source="home-guide" />
          </div>
        </div>
      </section>
    </div>
  );
}
