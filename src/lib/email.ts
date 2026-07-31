import { Resend } from "resend";
import { env, hasResend } from "@/lib/env";
import { logger } from "@/lib/logger";
import {
  ConfirmNewsletterEmail,
  OrderReceiptEmail,
} from "@/emails/templates";

function getResend() {
  if (!hasResend() || !env.RESEND_API_KEY) return null;
  return new Resend(env.RESEND_API_KEY);
}

export async function sendConfirmNewsletter(
  email: string,
  confirmUrl: string,
): Promise<{ ok: true } | { ok: false; reason: string }> {
  const resend = getResend();
  if (!resend) {
    logger.warn({ email }, "Resend not configured — confirm email skipped");
    return { ok: false, reason: "email_not_configured" };
  }
  const { error } = await resend.emails.send({
    from: env.EMAIL_FROM,
    to: email,
    subject: "Confirmez votre inscription — Formations IA",
    react: ConfirmNewsletterEmail({ confirmUrl }),
  });
  if (error) {
    logger.error({ error }, "Failed to send confirm email");
    return { ok: false, reason: "send_failed" };
  }
  return { ok: true };
}

export async function sendOrderReceipt(input: {
  email: string;
  formationTitle: string;
  amountLabel: string;
}): Promise<void> {
  const resend = getResend();
  if (!resend) {
    logger.warn(input, "Resend not configured — receipt skipped");
    return;
  }
  const { error } = await resend.emails.send({
    from: env.EMAIL_FROM,
    to: input.email,
    subject: `Confirmation — ${input.formationTitle}`,
    react: OrderReceiptEmail({
      formationTitle: input.formationTitle,
      amountLabel: input.amountLabel,
    }),
  });
  if (error) logger.error({ error }, "Failed to send order receipt");
}
