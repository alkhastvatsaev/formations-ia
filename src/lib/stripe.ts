import Stripe from "stripe";
import { env, hasStripe } from "@/lib/env";

export function getStripe(): Stripe | null {
  if (!hasStripe() || !env.STRIPE_SECRET_KEY) return null;
  return new Stripe(env.STRIPE_SECRET_KEY);
}
