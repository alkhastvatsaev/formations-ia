import type { Metadata } from "next";
import Link from "next/link";
import { allFormations } from "content-collections";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { env } from "@/lib/env";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/json-ld";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { absoluteUrl, formatPrice } from "@/lib/utils";

export const metadata: Metadata = buildPageMetadata({
  title: "Formation IA — ateliers débutants (ChatGPT, Cursor, équipes)",
  description:
    "Formation IA pratique pour débutants : ChatGPT et prompts, coder avec Cursor, former son équipe. Prix, programmes et dates en clair. Ateliers live animés par un développeur.",
  path: "/formation-ia",
});

const FAQ = [
  {
    question: "Qu'est-ce qu'une formation IA adaptée aux débutants ?",
    answer:
      "C'est un atelier pratique qui part de votre métier : ChatGPT, prompts, ou IDE assisté (Cursor). Vous repartez avec une méthode et un cas utilisable. Prix et programme sont publiés en HTML sur chaque page atelier.",
  },
  {
    question: "Combien coûte une formation IA ici ?",
    answer:
      "890 € HT pour une journée individuelle (Premiers pas IA ou Coder avec l'IA). 2 400 € HT pour une journée intra jusqu'à 12 personnes. Les dates et inclus sont sur chaque fiche formation.",
  },
  {
    question: "Formation IA en ligne ou présentiel ?",
    answer:
      "Les ateliers individuels sont en visio live, petit groupe. L'intra peut être sur site (Île-de-France) ou en visio. Un appel de 20 minutes clarifie le format qui vous convient.",
  },
];

export default function FormationIaHubPage() {
  const formations = allFormations
    .filter((f) => !f.draft)
    .sort((a, b) => a.priceCents - b.priceCents);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Formation IA", path: "/formation-ia" },
        ])}
      />
      <JsonLd data={faqJsonLd(FAQ)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Formations IA débutants",
          itemListElement: formations.map((f, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: absoluteUrl(`/formations/${f.slug}`),
            name: f.title,
          })),
        }}
      />

      <Breadcrumbs
        items={[{ name: "Accueil", href: "/" }, { name: "Formation IA" }]}
      />

      <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl tracking-tight sm:text-4xl">
        Formation IA — le hub
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-[var(--ink-soft)]">
        Vous cherchez une <strong>formation IA</strong> concrète : pas une
        conférence, un atelier. Ici, trois formats débutants — ChatGPT &amp;
        prompts, coder avec Cursor, former une équipe — avec prix et dates
        visibles, animés par un développeur qui shippe.
      </p>

      <section className="mt-10">
        <h2 className="font-[family-name:var(--font-display)] text-2xl">
          Les ateliers
        </h2>
        <ul className="mt-6 space-y-8">
          {formations.map((f) => (
            <li key={f.slug} className="border-t border-[var(--line)] pt-6">
              <h3 className="text-xl font-semibold">
                <Link
                  href={`/formations/${f.slug}`}
                  className="hover:text-[var(--accent)]"
                >
                  {f.title}
                </Link>
              </h3>
              <p className="mt-2 leading-relaxed text-[var(--ink-soft)]">
                {f.summary}
              </p>
              <p className="mt-3 text-sm font-medium">
                {formatPrice(f.priceCents)}
                <span className="font-normal text-[var(--muted)]">
                  {" "}
                  · {f.nextSessions[0]?.label}
                </span>
              </p>
              <Link
                href={`/formations/${f.slug}`}
                className="mt-3 inline-flex items-center gap-1 text-[var(--accent)] hover:underline"
              >
                Voir le programme <ArrowRight className="h-4 w-4" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-[family-name:var(--font-display)] text-2xl">
          Parcours & guides
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--ink-soft)]">
          <li>
            <Link href="/pour" className="text-[var(--accent)] hover:underline">
              Pour qui ? (débutants, code, freelances, équipes)
            </Link>
          </li>
          <li>
            <Link href="/guides" className="text-[var(--accent)] hover:underline">
              Guides (ChatGPT, Cursor, prompts, équipes)
            </Link>
          </li>
          <li>
            <Link href="/blog" className="text-[var(--accent)] hover:underline">
              Blog réponses SEO
            </Link>
          </li>
        </ul>
      </section>

      <section className="mt-12" id="cta">
        <h2 className="font-[family-name:var(--font-display)] text-2xl">
          Pas sûr du format ?
        </h2>
        <p className="mt-2 text-[var(--muted)]">
          Vingt minutes pour écouter votre cas — l&apos;atelier n&apos;est
          qu&apos;une option.
        </p>
        <a
          href={env.NEXT_PUBLIC_CAL_LINK}
          className="mt-4 inline-flex h-11 items-center rounded-md bg-[var(--accent)] px-5 text-[var(--accent-fg)] hover:bg-[var(--accent-hover)]"
        >
          Parler de mon cas (20 min)
        </a>
      </section>

      <section className="mt-12">
        <h2 className="font-[family-name:var(--font-display)] text-2xl">FAQ</h2>
        <dl className="mt-5 space-y-6">
          {FAQ.map((item) => (
            <div key={item.question}>
              <dt className="font-semibold">{item.question}</dt>
              <dd className="mt-2 leading-relaxed text-[var(--ink-soft)]">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
