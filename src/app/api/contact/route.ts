import { getDb } from "@/db";
import { contactMessages } from "@/db/schema";
import { env, hasDatabase, hasResend } from "@/lib/env";
import { logger } from "@/lib/logger";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { apiError, apiSuccess, contactSchema } from "@/lib/validators";
import { Resend } from "resend";

export async function POST(request: Request) {
  const ip = clientIp(request);
  const limited = rateLimit(`contact:${ip}`, env.RATE_LIMIT_MAX);
  if (!limited.ok) {
    return apiError(
      "rate_limited",
      `Trop de tentatives. Réessayez dans ${limited.retryAfterSec}s.`,
      429,
    );
  }

  const contentType = request.headers.get("content-type") ?? "";
  let body: unknown;
  try {
    if (contentType.includes("application/json")) {
      body = await request.json();
    } else {
      const fd = await request.formData();
      body = {
        name: fd.get("name"),
        email: fd.get("email"),
        company: fd.get("company") || undefined,
        message: fd.get("message"),
        website: fd.get("website") || "",
      };
    }
  } catch {
    return apiError("invalid_json", "Corps de requête invalide.");
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return apiError(
      "validation_error",
      parsed.error.issues[0]?.message ?? "Données invalides.",
    );
  }

  if (parsed.data.website) {
    return apiSuccess({ ok: true });
  }

  const { name, email, company, message } = parsed.data;

  if (hasDatabase()) {
    try {
      const db = getDb();
      await db.insert(contactMessages).values({
        name,
        email: email.toLowerCase(),
        company: company ?? null,
        message,
      });
    } catch (err) {
      logger.error({ err }, "contact db error");
      return apiError("db_error", "Impossible d'enregistrer le message.", 500);
    }
  }

  if (hasResend() && env.RESEND_API_KEY) {
    const resend = new Resend(env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: env.EMAIL_FROM,
      to: env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `Contact formations — ${name}`,
      text: `De: ${name} <${email}>\nEntreprise: ${company ?? "—"}\n\n${message}`,
    });
    if (error) {
      logger.error({ error }, "contact email failed");
      return apiError("email_error", "Impossible d'envoyer le message.", 500);
    }
  } else {
    logger.info({ name, email }, "contact message (no resend)");
  }

  return apiSuccess({ ok: true });
}
