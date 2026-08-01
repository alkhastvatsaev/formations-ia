#!/usr/bin/env node
/**
 * Index all public URLs for Bing (and IndexNow partners).
 *
 * 1) IndexNow → https://www.bing.com/indexnow (+ api.indexnow.org)
 * 2) Optional Bing Webmaster SubmitUrlBatch if BING_WEBMASTER_API_KEY is set
 *
 * Usage:
 *   NEXT_PUBLIC_SITE_URL=https://formations.alkhastvatsaev.dev \
 *   INDEXNOW_KEY=... \
 *   BING_WEBMASTER_API_KEY=... \   # optional
 *   node scripts/ping-indexnow.mjs
 */
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const site = process.env.NEXT_PUBLIC_SITE_URL;
const key = process.env.INDEXNOW_KEY;
const bingApiKey = process.env.BING_WEBMASTER_API_KEY;

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

console.log(`Host: ${host}`);
console.log(`URLs from sitemap: ${urls.length}`);

async function postIndexNow(endpoint, urlList, label) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host, key, keyLocation, urlList }),
  });
  const body = await res.text();
  console.log(`${label}`, res.status, body || "(empty)", `(${urlList.length} urls)`);
  return res.ok || res.status === 202;
}

/** IndexNow: Bing first, then open protocol hub. Chunk ≤ 100. */
const indexNowChunk = 100;
const indexNowEndpoints = [
  { url: "https://www.bing.com/indexnow", label: "Bing IndexNow" },
  { url: "https://api.indexnow.org/indexnow", label: "IndexNow hub" },
];

let failed = false;
for (const { url: endpoint, label } of indexNowEndpoints) {
  for (let i = 0; i < urls.length; i += indexNowChunk) {
    const urlList = urls.slice(i, i + indexNowChunk);
    const ok = await postIndexNow(
      endpoint,
      urlList,
      `${label} chunk ${Math.floor(i / indexNowChunk) + 1}`,
    );
    if (!ok) failed = true;
  }
}

/** Bing Webmaster URL Submission API (optional, needs API key from BWT). Max 500/batch. */
if (bingApiKey) {
  // Bing stores verified sites with a trailing slash
  const siteUrl = `${new URL(site).origin}/`;
  const batchSize = 500;
  for (let i = 0; i < urls.length; i += batchSize) {
    const urlList = urls.slice(i, i + batchSize);
    const endpoint = `https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlBatch?apikey=${encodeURIComponent(bingApiKey)}`;
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({ siteUrl, urlList }),
    });
    const body = await res.text();
    console.log(
      `Bing SubmitUrlBatch chunk ${Math.floor(i / batchSize) + 1}`,
      res.status,
      body || "(empty)",
      `(${urlList.length} urls)`,
    );
    if (!res.ok) failed = true;
  }

  const quotaRes = await fetch(
    `https://ssl.bing.com/webmaster/api.svc/json/GetUrlSubmissionQuota?siteUrl=${encodeURIComponent(siteUrl)}&apikey=${encodeURIComponent(bingApiKey)}`,
  );
  console.log("Bing URL submission quota", quotaRes.status, await quotaRes.text());
} else {
  console.log(
    "BING_WEBMASTER_API_KEY not set — skipped SubmitUrlBatch. Generate key in Bing Webmaster Tools → Settings → API Access, then re-run.",
  );
}

if (failed) process.exit(1);
console.log("Done.");
