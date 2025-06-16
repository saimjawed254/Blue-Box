import { pgTable, uuid, varchar, timestamp, integer } from "drizzle-orm/pg-core";

export const anonymous_visitors = pgTable("anonymous_visitors", {
  id: uuid("id").defaultRandom().primaryKey(),
  ip: varchar("ip", { length: 45 }).notNull(),
  user_agent: varchar("user_agent", { length: 255 }),
  first_seen: timestamp("first_seen", { mode: "date" }).defaultNow(),
  last_seen: timestamp("last_seen", { mode: "date" }).defaultNow(),
  visit_count: integer("visit_count").default(1).notNull(),
  country: varchar("country", { length: 100 }), // Optional - geo IP
  path: varchar("path", { length: 255 }),       // Optional - page they visited
});

export type AnonymousVisitors = typeof anonymous_visitors.$inferSelect;
export type NewAnonymousVisitors = typeof anonymous_visitors.$inferInsert;
