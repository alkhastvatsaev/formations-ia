import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";

/** Unique metadata + OG for any public page (hubs, intent, content). */
export function buildPageMetadata(input: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  const url = absoluteUrl(input.path);
  const ogImage = `/og?title=${encodeURIComponent(input.title)}`;
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: input.path },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      type: input.type ?? "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: input.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [ogImage],
    },
  };
}
