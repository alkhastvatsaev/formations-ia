#!/usr/bin/env node
/**
 * Post-deploy IndexNow ping — fetches sitemap.xml so the list stays complete.
 * Usage: INDEXNOW_KEY=... NEXT_PUBLIC_SITE_URL=https://... node scripts/ping-indexnow.mjs
 */
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const site = process.env.NEXT_PUBLIC_SITE_URL;
const key = process.env.INDEXNOW_KEY;

if (!site || !key) {
  console.error("NEXT_PUBLIC_SITE_URL and INDEXNOW_KEY are required");
  process.exit(1);
}

const host = new URL(site).host;
const keyLocation = new URL(`/${key}.txt`, site).toString();
const keyFile = resolve(process.cwd(), "public", `${key}.txt`);
if (!existsSync(keyFile)) {
  console.warn(
    `Warning: public/${key}.txt missing — create it with the key as content.`,
  );
}

const sitemapUrl = new URL("/sitemap.xml", site).toString();
const sitemapRes = await fetch(sitemapUrl);
if (!sitemapRes.ok) {
  console.error("Failed to fetch sitemap", sitemapRes.status);
  process.exit(1);
}
const xml = await sitemapRes.text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

if (urls.length === 0) {
  console.error("No URLs found in sitemap");
  process.exit(1);
}

/** IndexNow accepts max 10_000 URLs; chunk by 100 for safety. */
const chunkSize = 100;
for (let i = 0; i < urls.length; i += chunkSize) {
  const urlList = urls.slice(i, i + chunkSize);
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host, key, keyLocation, urlList }),
  });
  console.log(
    `IndexNow chunk ${i / chunkSize + 1}`,
    res.status,
    await res.text(),
    `(${urlList.length} urls)`,
  );
  if (!res.ok) process.exit(1);
}
