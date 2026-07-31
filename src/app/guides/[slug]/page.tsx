import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IntentLanding } from "@/components/seo/intent-landing";
import { GUIDE_PAGES, getIntentPage } from "@/lib/seo-intent";
import { buildPageMetadata } from "@/lib/seo-metadata";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return GUIDE_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getIntentPage("guides", slug);
  if (!page) return {};
  return buildPageMetadata({
    title: page.title,
    description: page.description,
    path: `/guides/${page.slug}`,
  });
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const page = getIntentPage("guides", slug);
  if (!page) notFound();
  return <IntentLanding page={page} />;
}
