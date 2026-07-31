import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IntentLanding } from "@/components/seo/intent-landing";
import { POUR_PAGES, getIntentPage } from "@/lib/seo-intent";
import { buildPageMetadata } from "@/lib/seo-metadata";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return POUR_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getIntentPage("pour", slug);
  if (!page) return {};
  return buildPageMetadata({
    title: page.title,
    description: page.description,
    path: `/pour/${page.slug}`,
  });
}

export default async function PourPage({ params }: Props) {
  const { slug } = await params;
  const page = getIntentPage("pour", slug);
  if (!page) notFound();
  return <IntentLanding page={page} />;
}
