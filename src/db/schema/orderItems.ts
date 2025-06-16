import { integer, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { orders } from "./orders";
import { products } from "./products";

export const order_items = pgTable("order_items", {
  order_item_id: uuid("order_item_id").defaultRandom().primaryKey(),
  order_id: uuid("order_id").notNull().references(() => orders.order_id, { onDelete: "cascade" }),
  product_id: varchar("product_id", { length: 32 }).notNull().references(() => products.product_id),
  color: varchar("color", { length: 32 }).notNull(),
  size: varchar("size", { length: 16 }).notNull(),
  quantity: integer("quantity").notNull(),
  price_per_unit: integer("price_per_unit").notNull(),
  subtotal: integer("subtotal").notNull(),
});

export type OrderItem = typeof order_items.$inferSelect;
export type NewOrderItem = typeof order_items.$inferInsert;