import type { Metadata } from "next";
import Link from "next/link";
import { allArticles } from "content-collections";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { formatDateFr } from "@/lib/utils";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog — formation IA débutant, prompts, Cursor, équipes",
  description:
    "Articles réponse sur la formation IA pour débutants et entreprises : ChatGPT, prompts, Copilot, Cursor, coûts, intra, OPCO.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const articles = allArticles
    .filter((a) => !a.draft)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-tight sm:text-4xl">
        Blog formation IA
      </h1>
      <p className="mt-4 leading-relaxed text-[var(--muted)]">
        Vous cherchez une réponse claire — coûts, ChatGPT, Cursor, former une
        équipe. Chaque article commence par la réponse, puis le détail. Quand
        c&apos;est pertinent, on renvoie vers un atelier débutant, sans
        pression.
      </p>

      <p className="mt-4 text-sm text-[var(--ink-soft)]">
        Formations :{" "}
        <Link
          href="/formations/premiers-pas-ia"
          className="text-[var(--accent)] hover:underline"
        >
          premiers pas
        </Link>
        {" · "}
        <Link
          href="/formations/coder-avec-ia"
          className="text-[var(--accent)] hover:underline"
        >
          coder avec l&apos;IA
        </Link>
        {" · "}
        <Link
          href="/formations/ia-equipe-intra"
          className="text-[var(--accent)] hover:underline"
        >
          équipes (intra)
        </Link>
      </p>

      <ul className="mt-10 space-y-8">
        {articles.map((article) => (
          <li key={article.slug} className="border-t border-[var(--line)] pt-6">
            <p className="text-sm text-[var(--muted)]">
              {formatDateFr(article.publishedAt)}
              {article.tags.length > 0 ? (
                <>
                  {" · "}
                  {article.tags.slice(0, 3).join(" · ")}
                </>
              ) : null}
            </p>
            <h2 className="mt-1 text-xl font-semibold leading-snug">
              <Link
                href={`/blog/${article.slug}`}
                className="hover:text-[var(--accent)]"
              >
                {article.title}
              </Link>
            </h2>
            <p className="mt-2 leading-relaxed text-[var(--ink-soft)]">
              {article.summary}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
