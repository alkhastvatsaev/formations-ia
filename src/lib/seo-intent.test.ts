import { describe, expect, it } from "vitest";
import {
  ALL_INTENT_PAGES,
  GUIDE_PAGES,
  POUR_PAGES,
  getIntentPage,
  intentPath,
} from "@/lib/seo-intent";

describe("seo intent routes", () => {
  it("exposes unique pour and guides slugs", () => {
    const pourSlugs = POUR_PAGES.map((p) => p.slug);
    const guideSlugs = GUIDE_PAGES.map((p) => p.slug);
    expect(new Set(pourSlugs).size).toBe(pourSlugs.length);
    expect(new Set(guideSlugs).size).toBe(guideSlugs.length);
    expect(ALL_INTENT_PAGES.length).toBe(pourSlugs.length + guideSlugs.length);
  });

  it("resolves pages by kind and path", () => {
    const page = getIntentPage("guides", "cursor-sans-se-perdre");
    expect(page?.title).toMatch(/Cursor/i);
    expect(intentPath(page!)).toBe("/guides/cursor-sans-se-perdre");
  });

  it("keeps citable summaries", () => {
    for (const page of ALL_INTENT_PAGES) {
      expect(page.summary.length).toBeGreaterThan(80);
      expect(page.faq.length).toBeGreaterThanOrEqual(2);
      expect(page.primary.href.startsWith("/")).toBe(true);
    }
  });
});
