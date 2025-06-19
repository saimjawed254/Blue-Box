import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { cart } from "./cart";

export const orders = pgTable("orders", {
  order_id: uuid("order_id").defaultRandom().primaryKey(),
  clerk_id: varchar("clerk_id", { length: 64 })
    .notNull()
    .references(() => users.clerk_id, { onDelete: "cascade" }),
  total_amount: integer("total_amount").notNull(),
  payment_status: varchar("payment_status", {
    enum: ["pending", "paid", "failed", "refunded"],
  }).notNull(),
  order_status: varchar("order_status", {
    enum: ["processing", "shipped", "delivered", "cancelled", "returned"],
  }).default("processing"),
  placed_at: timestamp("placed_at", { mode: "date" }).defaultNow(),
  shipping_address: text("shipping_address").notNull(),
  billing_address: text("billing_address").notNull(),
  shipping_method: varchar("shipping_method", { length: 100 }),
  tracking_id: varchar("tracking_id", { length: 100 }).unique(),
  estimated_delivery: timestamp("estimated_delivery", { mode: "date" }),
});

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
