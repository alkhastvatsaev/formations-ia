import { allFormations } from "content-collections";
import { getDb } from "@/db";
import { orders } from "@/db/schema";
import { env, hasDatabase } from "@/lib/env";
import { logger } from "@/lib/logger";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { getStripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { apiError, apiSuccess, checkoutSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const ip = clientIp(request);
  const limited = rateLimit(`checkout:${ip}`, env.RATE_LIMIT_MAX);
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

  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    return apiError("validation_error", "Données invalides.");
  }
  if (parsed.data.website) {
    return apiError("spam", "Requête rejetée.", 400);
  }

  const formation = allFormations.find(
    (f) => f.slug === parsed.data.formationSlug && !f.draft,
  );
  if (!formation) {
    return apiError("not_found", "Formation introuvable.", 404);
  }

  const stripe = getStripe();
  if (!stripe) {
    return apiError(
      "stripe_not_configured",
      "Le paiement en ligne n'est pas encore configuré. Réservez un appel découverte ou contactez hello@alkhastvatsaev.dev.",
      503,
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: parsed.data.email,
      line_items: [
        formation.stripePriceId
          ? { price: formation.stripePriceId, quantity: 1 }
          : {
              quantity: 1,
              price_data: {
                currency: formation.currency,
                unit_amount: formation.priceCents,
                product_data: {
                  name: formation.title,
                  description: formation.description.slice(0, 500),
                },
              },
            },
      ],
      success_url: absoluteUrl(
        `/confirmation?session_id={CHECKOUT_SESSION_ID}&formation=${formation.slug}`,
      ),
      cancel_url: absoluteUrl(`/formations/${formation.slug}`),
      metadata: {
        formationSlug: formation.slug,
        amountCents: String(formation.priceCents),
      },
    });

    if (hasDatabase() && session.id) {
      const db = getDb();
      await db.insert(orders).values({
        email: parsed.data.email?.toLowerCase() ?? null,
        formationSlug: formation.slug,
        amountCents: formation.priceCents,
        currency: formation.currency,
        stripeSessionId: session.id,
        status: "pending",
      });
    }

    if (!session.url) {
      return apiError("stripe_error", "Session Stripe sans URL.", 500);
    }

    return apiSuccess({ url: session.url });
  } catch (err) {
    logger.error({ err }, "checkout failed");
    return apiError("stripe_error", "Impossible de créer la session de paiement.", 500);
  }
}
