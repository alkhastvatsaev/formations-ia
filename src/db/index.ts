import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env, hasDatabase } from "@/lib/env";
import * as schema from "./schema";

let client: ReturnType<typeof postgres> | null = null;

export function getDb() {
  if (!hasDatabase() || !env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured");
  }
  if (!client) {
    client = postgres(env.DATABASE_URL, { max: 5 });
  }
  return drizzle(client, { schema });
}

export type Db = ReturnType<typeof getDb>;
