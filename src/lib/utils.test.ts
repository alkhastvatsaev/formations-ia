import { describe, expect, it } from "vitest";
import { formatPrice, absoluteUrl } from "@/lib/utils";
import { newsletterSchema, contactSchema, checkoutSchema } from "@/lib/validators";
import { rateLimit } from "@/lib/rate-limit";

describe("formatPrice", () => {
  it("formats cents in EUR fr-FR", () => {
    expect(formatPrice(89000)).toMatch(/890/);
    expect(formatPrice(89000)).toMatch(/€/);
  });
});

describe("absoluteUrl", () => {
  it("joins base and path", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";
    expect(absoluteUrl("/blog")).toBe("https://example.com/blog");
  });
});

describe("validators", () => {
  it("accepts valid newsletter email", () => {
    const r = newsletterSchema.safeParse({ email: "a@b.co" });
    expect(r.success).toBe(true);
  });

  it("rejects honeypot filled as optional empty only", () => {
    const r = newsletterSchema.safeParse({
      email: "a@b.co",
      website: "http://spam",
    });
    expect(r.success).toBe(false);
  });

  it("validates contact message length", () => {
    const r = contactSchema.safeParse({
      name: "Al",
      email: "a@b.co",
      message: "trop court",
    });
    expect(r.success).toBe(false);
  });

  it("requires formationSlug for checkout", () => {
    const r = checkoutSchema.safeParse({ formationSlug: "premiers-pas-ia" });
    expect(r.success).toBe(true);
  });
});

describe("rateLimit", () => {
  it("blocks after limit", () => {
    const key = `test-${Math.random()}`;
    expect(rateLimit(key, 2).ok).toBe(true);
    expect(rateLimit(key, 2).ok).toBe(true);
    expect(rateLimit(key, 2).ok).toBe(false);
  });
});
