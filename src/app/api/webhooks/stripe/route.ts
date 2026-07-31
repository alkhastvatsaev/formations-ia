import { eq } from "drizzle-orm";
import { allFormations } from "content-collections";
import type Stripe from "stripe";
import { getDb } from "@/db";
import { orders, webhookEvents } from "@/db/schema";
import { env, hasDatabase } from "@/lib/env";
import { sendOrderReceipt } from "@/lib/email";
import { logger } from "@/lib/logger";
import { getStripe } from "@/lib/stripe";
import { formatPrice } from "@/lib/utils";
import { apiError, apiSuccess } from "@/lib/validators";

export async function POST(request: Request) {
  const stripe = getStripe();
  if (!stripe || !env.STRIPE_WEBHOOK_SECRET) {
    return apiError("stripe_not_configured", "Webhook non configuré.", 503);
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return apiError("missing_signature", "Signature manquante.", 400);
  }

  const payload = await request.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    logger.error({ err }, "stripe signature verification failed");
    return apiError("invalid_signature", "Signature invalide.", 400);
  }

  if (hasDatabase()) {
    const db = getDb();
    const existing = await db
      .select()
      .from(webhookEvents)
      .where(eq(webhookEvents.eventId, event.id))
      .limit(1);
    if (existing[0]?.processed) {
      return apiSuccess({ ok: true, deduped: true });
    }
    if (!existing[0]) {
      await db.insert(webhookEvents).values({
        provider: "stripe",
        eventId: event.id,
        type: event.type,
        payload: event as unknown as Record<string, unknown>,
        processed: false,
      });
    }
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const slug = session.metadata?.formationSlug;
    const expectedCents = Number(session.metadata?.amountCents ?? 0);
    const paid = session.amount_total ?? 0;

    if (!slug || expectedCents <= 0 || paid !== expectedCents) {
      logger.error(
        { slug, expectedCents, paid, sessionId: session.id },
        "amount mismatch or missing metadata",
      );
      return apiError("amount_mismatch", "Montant incohérent.", 400);
    }

    const formation = allFormations.find((f) => f.slug === slug);
    if (hasDatabase()) {
      const db = getDb();
      await db
        .update(orders)
        .set({
          status: "paid",
          email: session.customer_details?.email?.toLowerCase() ?? null,
          stripePaymentIntentId:
            typeof session.payment_intent === "string"
              ? session.payment_intent
              : session.payment_intent?.id ?? null,
          updatedAt: new Date(),
        })
        .where(eq(orders.stripeSessionId, session.id));
    }

    const email = session.customer_details?.email;
    if (email && formation) {
      await sendOrderReceipt({
        email,
        formationTitle: formation.title,
        amountLabel: formatPrice(paid, formation.currency.toUpperCase()),
      });
    }
  }

  if (hasDatabase()) {
    const db = getDb();
    await db
      .update(webhookEvents)
      .set({ processed: true })
      .where(eq(webhookEvents.eventId, event.id));
  }

  return apiSuccess({ ok: true });
}
