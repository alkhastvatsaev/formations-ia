import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const leads = pgTable("leads", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 320 }).notNull(),
  source: varchar("source", { length: 64 }).notNull().default("newsletter"),
  confirmedAt: timestamp("confirmed_at", { withTimezone: true }),
  confirmToken: varchar("confirm_token", { length: 128 }),
  unsubscribedAt: timestamp("unsubscribed_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  metadata: jsonb("metadata").$type<Record<string, string>>(),
});

export const contactMessages = pgTable("contact_messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  company: varchar("company", { length: 120 }),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 320 }),
  formationSlug: varchar("formation_slug", { length: 160 }).notNull(),
  amountCents: integer("amount_cents").notNull(),
  currency: varchar("currency", { length: 8 }).notNull().default("eur"),
  stripeSessionId: varchar("stripe_session_id", { length: 256 }).unique(),
  stripePaymentIntentId: varchar("stripe_payment_intent_id", { length: 256 }),
  status: varchar("status", { length: 32 }).notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const webhookEvents = pgTable("webhook_events", {
  id: uuid("id").defaultRandom().primaryKey(),
  provider: varchar("provider", { length: 32 }).notNull(),
  eventId: varchar("event_id", { length: 256 }).notNull().unique(),
  type: varchar("type", { length: 128 }).notNull(),
  processed: boolean("processed").notNull().default(false),
  payload: jsonb("payload").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
