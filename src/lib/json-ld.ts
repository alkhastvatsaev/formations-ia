import { absoluteUrl } from "@/lib/utils";
import { ORG_ID, PERSON_ID, SITE } from "@/lib/site";

type JsonLd = Record<string, unknown>;

export function personJsonLd(): JsonLd {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: SITE.author.name,
    jobTitle: SITE.author.jobTitle,
    url: SITE.author.url,
    email: SITE.author.email,
    sameAs: SITE.author.sameAs,
  };
}

export function organizationJsonLd(): JsonLd {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.fullName,
    url: absoluteUrl("/"),
    founder: { "@id": PERSON_ID },
    sameAs: SITE.author.sameAs,
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd(),
      personJsonLd(),
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: absoluteUrl("/"),
        name: SITE.fullName,
        description: SITE.tagline,
        publisher: { "@id": ORG_ID },
        inLanguage: "fr-FR",
      },
    ],
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function courseJsonLd(input: {
  title: string;
  description: string;
  slug: string;
  priceCents: number;
  currency: string;
  duration: string;
  mode: string;
  nextSessions: { date: string; label: string }[];
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: input.title,
    description: input.description,
    url: absoluteUrl(`/formations/${input.slug}`),
    provider: { "@id": ORG_ID },
    instructor: { "@id": PERSON_ID },
    inLanguage: "fr-FR",
    hasCourseInstance: input.nextSessions.map((session) => ({
      "@type": "CourseInstance",
      name: session.label,
      startDate: session.date,
      courseMode: input.mode,
      duration: input.duration,
    })),
    offers: {
      "@type": "Offer",
      price: (input.priceCents / 100).toFixed(2),
      priceCurrency: input.currency.toUpperCase(),
      availability: "https://schema.org/InStock",
      url: absoluteUrl(`/formations/${input.slug}`),
    },
  };
}

export function faqJsonLd(
  items: { question: string; answer: string }[],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt: string;
}): JsonLd {
  const pageUrl = absoluteUrl(`/blog/${input.slug}`);
  const imageUrl = absoluteUrl(
    `/og?title=${encodeURIComponent(input.title)}`,
  );
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    datePublished: input.publishedAt,
    dateModified: input.updatedAt,
    author: { "@id": PERSON_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: pageUrl,
    image: [imageUrl],
    inLanguage: "fr-FR",
  };
}
