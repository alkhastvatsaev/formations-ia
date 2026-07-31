import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { GUIDE_PAGES } from "@/lib/seo-intent";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { breadcrumbJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = buildPageMetadata({
  title: "Guides formation IA — ChatGPT, Cursor, prompts, équipes",
  description:
    "Guides pratiques formation IA : ChatGPT au travail, Cursor, prompts qui délivrent, former son équipe. Méthode + lien vers ateliers.",
  path: "/guides",
});

export default function GuidesIndexPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Guides", path: "/guides" },
        ])}
      />
      <Breadcrumbs
        items={[{ name: "Accueil", href: "/" }, { name: "Guides" }]}
      />
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl tracking-tight sm:text-4xl">
        Guides formation IA
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-[var(--ink-soft)]">
        Réponses extractibles aux intentions que vous tapez dans Google ou
        ChatGPT — puis le pas suivant : un atelier live si vous voulez
        pratiquer.
      </p>
      <ul className="mt-10 space-y-8">
        {GUIDE_PAGES.map((page) => (
          <li key={page.slug} className="border-t border-[var(--line)] pt-6">
            <h2 className="text-xl font-semibold">
              <Link
                href={`/guides/${page.slug}`}
                className="hover:text-[var(--accent)]"
              >
                {page.title}
              </Link>
            </h2>
            <p className="mt-2 leading-relaxed text-[var(--ink-soft)]">
              {page.summary}
            </p>
            <Link
              href={`/guides/${page.slug}`}
              className="mt-3 inline-flex items-center gap-1 text-[var(--accent)] hover:underline"
            >
              Lire le guide <ArrowRight className="h-4 w-4" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
