import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url()
    .default("http://localhost:3000"),
  NEXT_PUBLIC_SITE_NAME: z
    .string()
    .default("Formations IA — Alkhast Vatsaev"),
  DATABASE_URL: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().email().default("formations@alkhastvatsaev.dev"),
  NEXT_PUBLIC_CAL_LINK: z
    .string()
    .default("https://cal.com/alkhastvatsaev/decouverte"),
  NEXT_PUBLIC_PLAUSIBLE_DOMAIN: z.string().optional(),
  INDEXNOW_KEY: z.string().optional(),
  BING_WEBMASTER_API_KEY: z.string().optional(),
  SENTRY_DSN: z.string().optional(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(10),
  CONTACT_TO_EMAIL: z
    .string()
    .email()
    .default("hello@alkhastvatsaev.dev"),
});

export type Env = z.infer<typeof envSchema>;

function loadEnv(): Env {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(`Invalid environment variables:\n${issues}`);
  }
  return parsed.data;
}

export const env = loadEnv();

export function hasDatabase(): boolean {
  return Boolean(env.DATABASE_URL);
}

export function hasStripe(): boolean {
  return Boolean(env.STRIPE_SECRET_KEY);
}

export function hasResend(): boolean {
  return Boolean(env.RESEND_API_KEY);
}
