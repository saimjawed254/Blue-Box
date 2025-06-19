import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  integer,
  text,
  numeric,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  clerk_id: varchar("clerk_id", { length: 64 }).unique().notNull().primaryKey(), 

  email: varchar("email", { length: 255 }).unique(),
  phone: varchar("phone", { length: 20 }).unique(),

  name: varchar("name", { length: 100 }).notNull(),
  avatar_url: text("avatar_url"),
  gender: varchar("gender", { length: 10 }),

  coordinate_X: numeric("coordinate_X"),
  coordinate_Y: numeric("coordinate_Y"),
  address: text("address"),

  tryons_used: integer("tryons_used").default(0).notNull(),

  total_logins: integer("total_logins").default(1).notNull(),
  last_login_ip: varchar("last_login_ip", { length: 45 }),
  last_login_at: timestamp("last_login_at", { mode: "date" }).defaultNow(),

  ip_addresses: varchar("ip_addresses", { length: 45 }).array().notNull(),
  
  created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;