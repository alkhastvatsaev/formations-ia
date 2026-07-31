import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { leads } from "@/db/schema";
import { hasDatabase } from "@/lib/env";
import { logger } from "@/lib/logger";
import { absoluteUrl } from "@/lib/utils";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  if (!token) {
    return Response.redirect(absoluteUrl("/?newsletter=invalid"), 302);
  }

  if (!hasDatabase()) {
    logger.info({ token }, "confirm newsletter without DB");
    return Response.redirect(absoluteUrl("/?newsletter=confirmed"), 302);
  }

  try {
    const db = getDb();
    const rows = await db
      .select()
      .from(leads)
      .where(eq(leads.confirmToken, token))
      .limit(1);
    const lead = rows[0];
    if (!lead) {
      return Response.redirect(absoluteUrl("/?newsletter=invalid"), 302);
    }
    await db
      .update(leads)
      .set({
        confirmedAt: new Date(),
        confirmToken: null,
      })
      .where(eq(leads.id, lead.id));
    return Response.redirect(absoluteUrl("/?newsletter=confirmed"), 302);
  } catch (err) {
    logger.error({ err }, "confirm newsletter failed");
    return Response.redirect(absoluteUrl("/?newsletter=error"), 302);
  }
}
