import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/contact-form";
import { JsonLd } from "@/components/seo/json-ld";
import { env } from "@/lib/env";
import { personJsonLd } from "@/lib/json-ld";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "À propos",
  description:
    "Vous voulez démarrer l'IA au travail ou coder avec Cursor : Alkhast Vatsaev anime des ateliers débutants — écoute d'abord, portfolio et GitHub en preuve.",
  path: "/a-propos",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          ...personJsonLd(),
        }}
      />
      <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-tight sm:text-4xl">
        À propos
      </h1>

      <p className="mt-5 text-lg leading-relaxed text-[var(--ink-soft)]">
        Vous maîtrisez déjà votre métier — emails, ops, code, direction
        d&apos;équipe. Ce que vous voulez, c&apos;est que l&apos;IA vous fasse
        gagner du temps <em>sur ce que vous faites déjà bien</em>, sans jargon
        inutile.
      </p>

      <p className="mt-4 leading-relaxed text-[var(--ink-soft)]">
        Je suis <strong>{SITE.author.name}</strong>. Je construis des
        applications avec l&apos;IA (
        <a href={SITE.author.url} className="text-[var(--accent)] hover:underline">
          {SITE.author.url.replace("https://", "")}
        </a>
        , heynota.app) et, en parallèle, j&apos;anime des ateliers pour
        débutants : prompts, outils du quotidien, méthode pour coder avec un
        IDE assisté.
      </p>

      <p className="mt-4 leading-relaxed text-[var(--ink-soft)]">
        L&apos;approche est simple : on part de{" "}
        <em>votre</em> cas, on pratique ensemble, vous repartez avec quelque
        chose d&apos;utilisable dès le lendemain. Preuve ouverte sur{" "}
        <a
          href="https://github.com/alkhastvatsaev"
          className="text-[var(--accent)] hover:underline"
        >
          GitHub
        </a>
        .
      </p>

      <section className="mt-12" id="cta">
        <h2 className="font-[family-name:var(--font-display)] text-2xl">
          Parlons de votre situation
        </h2>
        <p className="mt-2 leading-relaxed text-[var(--muted)]">
          Vingt minutes pour écouter ce que vous voulez accomplir. L&apos;atelier
          n&apos;est qu&apos;une option — on construit la suite ensemble.
        </p>
        <p className="mt-4">
          <a
            href={env.NEXT_PUBLIC_CAL_LINK}
            className="inline-flex h-11 items-center rounded-md bg-[var(--accent)] px-5 text-[var(--accent-fg)] hover:bg-[var(--accent-hover)]"
          >
            Réserver 20 min d&apos;écoute
          </a>
        </p>
        <p className="mt-6 text-sm text-[var(--muted)]">Ou écrivez librement :</p>
        <div className="mt-3">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
