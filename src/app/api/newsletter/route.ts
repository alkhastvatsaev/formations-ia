import { randomBytes } from "node:crypto";
import { eq } from "drizzle-orm";
import { allFormations } from "content-collections";
import { getDb } from "@/db";
import { leads } from "@/db/schema";
import { env, hasDatabase } from "@/lib/env";
import { sendConfirmNewsletter } from "@/lib/email";
import { logger } from "@/lib/logger";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { absoluteUrl } from "@/lib/utils";
import { apiError, apiSuccess, newsletterSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const ip = clientIp(request);
  const limited = rateLimit(`newsletter:${ip}`, env.RATE_LIMIT_MAX);
  if (!limited.ok) {
    return apiError(
      "rate_limited",
      `Trop de tentatives. Réessayez dans ${limited.retryAfterSec}s.`,
      429,
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("invalid_json", "Corps de requête invalide.");
  }

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return apiError("validation_error", parsed.error.issues[0]?.message ?? "Données invalides.");
  }

  if (parsed.data.website) {
    return apiSuccess({ ok: true, message: "Inscription enregistrée." });
  }

  const email = parsed.data.email.toLowerCase();
  const token = randomBytes(24).toString("hex");
  const confirmUrl = absoluteUrl(`/api/newsletter/confirm?token=${token}`);

  if (hasDatabase()) {
    try {
      const db = getDb();
      const existing = await db
        .select()
        .from(leads)
        .where(eq(leads.email, email))
        .limit(1);
      if (existing[0]?.confirmedAt && !existing[0].unsubscribedAt) {
        return apiSuccess({
          ok: true,
          message: "Cet email est déjà inscrit.",
        });
      }
      if (existing[0]) {
        await db
          .update(leads)
          .set({ confirmToken: token, unsubscribedAt: null })
          .where(eq(leads.email, email));
      } else {
        await db.insert(leads).values({
          email,
          source: "newsletter",
          confirmToken: token,
        });
      }
    } catch (err) {
      logger.error({ err }, "newsletter db error");
      return apiError("db_error", "Impossible d'enregistrer l'inscription.", 500);
    }
  } else {
    logger.info({ email }, "newsletter lead (no database)");
  }

  const sent = await sendConfirmNewsletter(email, confirmUrl);
  if (!sent.ok && sent.reason === "send_failed") {
    return apiError("email_error", "Impossible d'envoyer l'email de confirmation.", 500);
  }

  return apiSuccess({
    ok: true,
    message: hasDatabase() && sent.ok
      ? "Vérifiez votre boîte mail pour confirmer l'inscription (double opt-in)."
      : "Demande reçue. En environnement sans email/DB, la confirmation est simulée — configurez RESEND_API_KEY et DATABASE_URL.",
  });
}

export function getPublishedFormation(slug: string) {
  return allFormations.find((f) => f.slug === slug && !f.draft);
}
