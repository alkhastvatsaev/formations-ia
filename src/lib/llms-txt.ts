import { allArticles, allFormations } from "content-collections";
import { ALL_INTENT_PAGES, intentPath } from "@/lib/seo-intent";
import { SITE } from "@/lib/site";
import { absoluteUrl } from "@/lib/utils";

export function generateLlmsTxt(): string {
  const formations = allFormations
    .filter((f) => !f.draft)
    .map(
      (f) =>
        `- [${f.title}](${absoluteUrl(`/formations/${f.slug}`)}): ${f.summary}`,
    )
    .join("\n");

  const pour = ALL_INTENT_PAGES.filter((p) => p.kind === "pour")
    .map(
      (p) =>
        `- [${p.title}](${absoluteUrl(intentPath(p))}): ${p.summary}`,
    )
    .join("\n");

  const guides = ALL_INTENT_PAGES.filter((p) => p.kind === "guides")
    .map(
      (p) =>
        `- [${p.title}](${absoluteUrl(intentPath(p))}): ${p.summary}`,
    )
    .join("\n");

  const articles = allArticles
    .filter((a) => !a.draft)
    .map(
      (a) =>
        `- [${a.title}](${absoluteUrl(`/blog/${a.slug}`)}): ${a.summary}`,
    )
    .join("\n");

  return `# ${SITE.fullName}

> ${SITE.tagline}

Ateliers IA pour débutants (ChatGPT, prompts, Cursor, intra-entreprise) animés par ${SITE.author.name}. Hub intentionnel : /formation-ia. Parcours : /pour/*. Guides : /guides/*. Approche : partir du cas du lecteur. Preuve : GitHub et portfolio.

## Pages principales

- [Accueil](${absoluteUrl("/")}): ${SITE.tagline}
- [Formation IA (hub)](${absoluteUrl("/formation-ia")}): Vue d'ensemble formation IA débutants, ateliers, FAQ.
- [Formations](${absoluteUrl("/formations")}): Catalogue des ateliers (prix et dates).
- [Pour qui](${absoluteUrl("/pour")}): Parcours débutants, code, freelances, équipes.
- [Guides](${absoluteUrl("/guides")}): ChatGPT, Cursor, prompts, former son équipe.
- [À propos](${absoluteUrl("/a-propos")}): Qui est ${SITE.author.name}.
- [Blog](${absoluteUrl("/blog")}): Articles réponse SEO.

## Parcours /pour

${pour}

## Guides

${guides}

## Formations

${formations || "- (aucune formation publiée)"}

## Articles

${articles || "- (aucun article publié)"}

## Contact

- Portfolio développeur: ${SITE.author.url}
- Email: ${SITE.author.email}
`;
}
