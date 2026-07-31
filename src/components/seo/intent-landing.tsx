import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { env } from "@/lib/env";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/json-ld";
import type { IntentPage } from "@/lib/seo-intent";
import { intentPath } from "@/lib/seo-intent";
import { formatDateFr } from "@/lib/utils";

export function IntentLanding({ page }: { page: IntentPage }) {
  const path = intentPath(page);
  const kindLabel = page.kind === "pour" ? "Pour qui" : "Guides";

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          {
            name: kindLabel,
            path: page.kind === "pour" ? "/pour" : "/guides",
          },
          { name: page.h1, path },
        ])}
      />
      <JsonLd data={faqJsonLd(page.faq)} />

      <Breadcrumbs
        items={[
          { name: "Accueil", href: "/" },
          {
            name: kindLabel,
            href: page.kind === "pour" ? "/pour" : "/guides",
          },
          { name: page.title },
        ]}
      />

      <p className="mt-4 text-sm text-[var(--muted)]">
        Mis à jour le {formatDateFr(page.updatedAt)} ·{" "}
        <Link href="/a-propos" className="text-[var(--accent)] hover:underline">
          Alkhast Vatsaev
        </Link>
      </p>

      <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl leading-tight tracking-tight sm:text-4xl">
        {page.h1}
      </h1>

      <p className="mt-5 text-lg leading-relaxed text-[var(--ink-soft)]">
        {page.summary}
      </p>

      <section className="mt-10">
        <h2 className="font-[family-name:var(--font-display)] text-2xl">
          Une scène que vous connaissez
        </h2>
        <p className="mt-3 leading-relaxed text-[var(--ink-soft)]">{page.scene}</p>
      </section>

      <section className="mt-10">
        <h2 className="font-[family-name:var(--font-display)] text-2xl">
          Ce que vous voulez vraiment
        </h2>
        <p className="mt-3 leading-relaxed text-[var(--ink-soft)]">{page.desire}</p>
      </section>

      <section className="mt-10 border-y border-[var(--line)] py-8" id="cta">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
          Prochain pas
        </p>
        <Link
          href={page.primary.href}
          className="mt-3 inline-flex items-center gap-2 text-xl font-semibold text-[var(--ink)] hover:underline"
        >
          {page.primary.label} <ArrowRight className="h-5 w-5" />
        </Link>
        <p className="mt-3 text-sm text-[var(--muted)]">
          Ou{" "}
          <a
            href={env.NEXT_PUBLIC_CAL_LINK}
            className="text-[var(--accent)] hover:underline"
          >
            parler de votre cas (20 min)
          </a>{" "}
          — l&apos;échange sert à écouter.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-[family-name:var(--font-display)] text-2xl">
          Approfondir
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--ink-soft)]">
          {page.secondary.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-[var(--accent)] hover:underline">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-[family-name:var(--font-display)] text-2xl">FAQ</h2>
        <dl className="mt-5 space-y-6">
          {page.faq.map((item) => (
            <div key={item.question}>
              <dt className="font-semibold text-[var(--ink)]">{item.question}</dt>
              <dd className="mt-2 leading-relaxed text-[var(--ink-soft)]">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </article>
  );
}
