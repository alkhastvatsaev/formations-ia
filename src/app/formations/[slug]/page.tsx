import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXContent } from "@content-collections/mdx/react";
import { allFormations, allTestimonials } from "content-collections";
import { CheckoutButton } from "@/components/forms/checkout-button";
import { ReadinessChecklist } from "@/components/forms/readiness-checklist";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { env } from "@/lib/env";
import {
  breadcrumbJsonLd,
  courseJsonLd,
  faqJsonLd,
} from "@/lib/json-ld";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { formatDateFr, formatPrice } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

const TOC = [
  { id: "faits", label: "Prix & dates" },
  { id: "pour-qui", label: "Pour qui" },
  { id: "programme", label: "Programme" },
  { id: "detail", label: "En détail" },
  { id: "faq", label: "FAQ" },
] as const;

export function generateStaticParams() {
  return allFormations
    .filter((f) => !f.draft)
    .map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const formation = allFormations.find((f) => f.slug === slug && !f.draft);
  if (!formation) return {};
  return buildPageMetadata({
    title: formation.title,
    description: formation.description,
    path: `/formations/${formation.slug}`,
  });
}

export default async function FormationPage({ params }: Props) {
  const { slug } = await params;
  const formation = allFormations.find((f) => f.slug === slug && !f.draft);
  if (!formation) notFound();

  const related = allTestimonials.filter(
    (t) => t.formationSlug === formation.slug,
  );
  const otherFormations = allFormations.filter(
    (f) => !f.draft && f.slug !== formation.slug,
  );

  return (
    <article className="bg-[var(--paper)]">
      <JsonLd
        data={courseJsonLd({
          title: formation.title,
          description: formation.description,
          slug: formation.slug,
          priceCents: formation.priceCents,
          currency: formation.currency,
          duration: formation.duration,
          mode: formation.mode,
          nextSessions: formation.nextSessions,
        })}
      />
      <JsonLd data={faqJsonLd(formation.faq)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Formations", path: "/formations" },
          { name: formation.title, path: `/formations/${formation.slug}` },
        ])}
      />

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <Breadcrumbs
          items={[
            { name: "Accueil", href: "/" },
            { name: "Formations", href: "/formations" },
            { name: formation.title },
          ]}
        />
        <p className="mt-4 text-sm text-[var(--muted)]">
          Mis à jour le {formatDateFr(formation.updatedAt)} ·{" "}
          <a href="/a-propos" className="text-[var(--accent)] hover:underline">
            Alkhast Vatsaev
          </a>
        </p>

        <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl leading-tight tracking-tight text-[var(--ink)] sm:text-4xl">
          {formation.title}
        </h1>

        <p className="mt-5 text-lg leading-relaxed text-[var(--ink-soft)]">
          {formation.summary}
        </p>

        <nav
          aria-label="Sur cette page"
          className="mt-8 flex flex-wrap gap-x-4 gap-y-2 border-y border-[var(--line)] py-3 text-sm"
        >
          {TOC.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-[var(--accent)] hover:underline"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <section id="faits" className="mt-10 scroll-mt-24">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--line)] pb-6">
            <div>
              <p className="text-sm text-[var(--muted)]">Prix</p>
              <p className="text-3xl font-semibold tracking-tight text-[var(--ink)]">
                {formatPrice(formation.priceCents)}
              </p>
              <p className="mt-1 text-sm text-[var(--muted)]">
                {formation.mode} · {formation.level} ·{" "}
                {formation.nextSessions[0]?.label ?? "Dates sur demande"}
              </p>
            </div>
            <div id="cta" className="w-full sm:w-auto">
              <CheckoutButton
                formationSlug={formation.slug}
                priceCents={formation.priceCents}
                label="Réserver ma place"
              />
              <p className="mt-2 text-sm text-[var(--muted)]">
                Envie d&apos;être écouté·e d&apos;abord ?{" "}
                <a
                  href={env.NEXT_PUBLIC_CAL_LINK}
                  className="text-[var(--accent)] hover:underline"
                >
                  Parler de mon cas (20 min)
                </a>
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-6 text-sm sm:grid-cols-2">
            <div>
              <p className="font-semibold text-[var(--ink)]">Inclus</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-[var(--ink-soft)]">
                <li>Atelier live / animation</li>
                <li>Supports et exemples</li>
                <li>Questions sur votre contexte</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-[var(--ink)]">Hors périmètre</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-[var(--ink-soft)]">
                <li>LMS / espace membre</li>
                <li>Accès illimité post-session</li>
                <li>Données sensibles de votre SI</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="mt-10">
          <ReadinessChecklist />
        </div>

        <section id="pour-qui" className="mt-12 scroll-mt-24">
          <h2 className="font-[family-name:var(--font-display)] text-2xl">
            Pour qui
          </h2>
          <p className="mt-3 leading-relaxed text-[var(--ink-soft)]">
            {formation.audience}
          </p>
          <h3 className="mt-8 text-lg font-semibold">Vous repartirez capable de</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--ink-soft)]">
            {formation.outcomes.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </section>

        <section id="programme" className="mt-12 scroll-mt-24">
          <h2 className="font-[family-name:var(--font-display)] text-2xl">
            Programme
          </h2>
          <div className="mt-6 space-y-6">
            {formation.program.map((block) => (
              <div key={block.title}>
                <h3 className="font-semibold text-[var(--ink)]">{block.title}</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-[var(--ink-soft)]">
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <div className="prose prose-formation prose-readable mt-12 max-w-none scroll-mt-24" id="detail">
          <MDXContent code={formation.body} />
        </div>

        <aside className="mt-10 border border-[var(--line)] p-4 text-sm text-[var(--ink-soft)]">
          <p className="font-semibold text-[var(--ink)]">Sur le blog</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {formation.slug === "premiers-pas-ia" ? (
              <>
                <li>
                  <Link className="text-[var(--accent)] hover:underline" href="/blog/formation-prompt-engineering">
                    Formation prompt engineering
                  </Link>
                </li>
                <li>
                  <Link className="text-[var(--accent)] hover:underline" href="/blog/formation-chatgpt-entreprise">
                    Formation ChatGPT en entreprise
                  </Link>
                </li>
                <li>
                  <Link className="text-[var(--accent)] hover:underline" href="/blog/formation-ia-vs-autoformation">
                    Formation IA vs autoformation
                  </Link>
                </li>
              </>
            ) : null}
            {formation.slug === "coder-avec-ia" ? (
              <>
                <li>
                  <Link className="text-[var(--accent)] hover:underline" href="/blog/formation-github-copilot-developpeurs">
                    Formation GitHub Copilot
                  </Link>
                </li>
                <li>
                  <Link className="text-[var(--accent)] hover:underline" href="/blog/formation-ia-pour-developpeurs-c-est-quoi">
                    Qu&apos;est-ce qu&apos;une formation IA pour développeurs ?
                  </Link>
                </li>
                <li>
                  <Link className="text-[var(--accent)] hover:underline" href="/blog/atelier-ia-pratique">
                    Atelier IA pratique
                  </Link>
                </li>
              </>
            ) : null}
            {formation.slug === "ia-equipe-intra" ? (
              <>
                <li>
                  <Link className="text-[var(--accent)] hover:underline" href="/blog/former-son-equipe-a-l-ia">
                    Former son équipe à l&apos;IA
                  </Link>
                </li>
                <li>
                  <Link className="text-[var(--accent)] hover:underline" href="/blog/cout-formation-ia-equipe">
                    Coût d&apos;une formation IA pour une équipe
                  </Link>
                </li>
                <li>
                  <Link className="text-[var(--accent)] hover:underline" href="/blog/formation-ia-tpe-pme">
                    Formation IA pour TPE/PME
                  </Link>
                </li>
              </>
            ) : null}
          </ul>
        </aside>

        {related.length > 0 ? (
          <section className="mt-12">
            <h2 className="font-[family-name:var(--font-display)] text-2xl">
              Preuve
            </h2>
            <ul className="mt-5 space-y-5">
              {related.map((t) => (
                <li key={t.name}>
                  <blockquote className="leading-relaxed text-[var(--ink-soft)]">
                    “{t.quote}”
                  </blockquote>
                  <p className="mt-2 text-sm text-[var(--muted)]">
                    {t.name} — {t.role}
                    {t.company ? `, ${t.company}` : ""}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {otherFormations.length > 0 ? (
          <section className="mt-12">
            <h2 className="font-[family-name:var(--font-display)] text-2xl">
              Autres ateliers
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--ink-soft)]">
              {otherFormations.map((f) => (
                <li key={f.slug}>
                  <Link
                    href={`/formations/${f.slug}`}
                    className="text-[var(--accent)] hover:underline"
                  >
                    {f.title}
                  </Link>
                  <span className="text-[var(--muted)]">
                    {" "}
                    · {formatPrice(f.priceCents)}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-[var(--muted)]">
              <Link href="/formation-ia" className="text-[var(--accent)] hover:underline">
                Hub formation IA
              </Link>
              {" · "}
              <Link href="/pour" className="text-[var(--accent)] hover:underline">
                Parcours
              </Link>
              {" · "}
              <Link href="/guides" className="text-[var(--accent)] hover:underline">
                Guides
              </Link>
            </p>
          </section>
        ) : null}

        <section id="faq" className="mt-12 scroll-mt-24">
          <h2 className="font-[family-name:var(--font-display)] text-2xl">FAQ</h2>
          <dl className="mt-5 space-y-6">
            {formation.faq.map((item) => (
              <div key={item.question}>
                <dt className="font-semibold text-[var(--ink)]">{item.question}</dt>
                <dd className="mt-2 leading-relaxed text-[var(--ink-soft)]">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-12 border-t border-[var(--line)] pt-8">
          <h2 className="font-[family-name:var(--font-display)] text-2xl">
            Prochaines dates
          </h2>
          <ul className="mt-3 space-y-1 text-[var(--ink-soft)]">
            {formation.nextSessions.map((s) => (
              <li key={s.date}>
                <time dateTime={s.date}>{s.label}</time>
              </li>
            ))}
          </ul>
          <div className="mt-6" id="inscription">
            <CheckoutButton
              formationSlug={formation.slug}
              priceCents={formation.priceCents}
              label="Réserver ma place"
            />
          </div>
        </section>
      </div>
    </article>
  );
}
