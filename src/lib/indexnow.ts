import { absoluteUrl } from "@/lib/utils";
import { env } from "@/lib/env";
import { logger } from "@/lib/logger";

/**
 * Ping IndexNow for newly published or updated URLs.
 * Covers Bing ecosystem (+ Yandex, Naver, Seznam). Google uses sitemap.
 */
export async function pingIndexNow(urls: string[]): Promise<void> {
  const key = env.INDEXNOW_KEY;
  if (!key || urls.length === 0) {
    logger.debug({ urls }, "IndexNow skipped (no key or empty urls)");
    return;
  }

  const host = new URL(env.NEXT_PUBLIC_SITE_URL).host;
  const keyLocation = absoluteUrl(`/${key}.txt`);

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key,
      keyLocation,
      urlList: urls.map((u) => (u.startsWith("http") ? u : absoluteUrl(u))),
    }),
  });

  if (!res.ok) {
    logger.error(
      { status: res.status, body: await res.text() },
      "IndexNow ping failed",
    );
    return;
  }

  logger.info({ count: urls.length }, "IndexNow ping succeeded");
}
