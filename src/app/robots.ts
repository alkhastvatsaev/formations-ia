import type { MetadataRoute } from "next";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/confirmation"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/confirmation"],
      },
      {
        userAgent: "bingbot",
        allow: "/",
        disallow: ["/api/", "/confirmation"],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/", "/confirmation"],
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/api/", "/confirmation"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/api/", "/confirmation"],
      },
      {
        userAgent: "Claude-SearchBot",
        allow: "/",
        disallow: ["/api/", "/confirmation"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api/", "/confirmation"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/api/", "/confirmation"],
      },
      {
        userAgent: "Applebot-Extended",
        allow: "/",
        disallow: ["/api/", "/confirmation"],
      },
    ],
    sitemap: `${site}/sitemap.xml`,
    host: site,
  };
}
