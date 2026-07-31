import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXContent } from "@content-collections/mdx/react";
import { allArticles } from "content-collections";
import { JsonLd } from "@/components/seo/json-ld";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/json-ld";
import { absoluteUrl, formatDateFr } from "@/lib/utils";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allArticles.filter((a) => !a.draft).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = allArticles.find((a) => a.slug === slug && !a.draft);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      url: absoluteUrl(`/blog/${article.slug}`),
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      images: [{ url: `/og?title=${encodeURIComponent(article.title)}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [`/og?title=${encodeURIComponent(article.title)}`],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = allArticles.find((a) => a.slug === slug && !a.draft);
  if (!article) notFound();

  return (
    <article className="atmosphere mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <JsonLd
        data={articleJsonLd({
          title: article.title,
          description: article.description,
          slug: article.slug,
          publishedAt: article.publishedAt,
          updatedAt: article.updatedAt,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: article.title, path: `/blog/${article.slug}` },
        ])}
      />

      <Breadcrumbs
        items={[
          { name: "Accueil", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: article.title },
        ]}
      />

      <p className="mt-4 text-sm text-[var(--muted)]">
        Publié le {formatDateFr(article.publishedAt)} · Mis à jour le{" "}
        {formatDateFr(article.updatedAt)} ·{" "}
        <Link href="/a-propos" className="text-[var(--accent)] hover:underline">
          Alkhast Vatsaev
        </Link>
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl leading-tight sm:text-5xl">
        {article.title}
      </h1>
      <p className="mt-6 text-lg text-[var(--ink-soft)]">{article.summary}</p>
      <div className="prose prose-formation mt-12 max-w-none">
        <MDXContent code={article.body} />
      </div>
    </article>
  );
}
