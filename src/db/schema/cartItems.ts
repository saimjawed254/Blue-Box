import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { cart } from "./cart";
import { products } from "./products";

export const cart_items = pgTable("cart_items", {
  item_id: uuid("item_id").defaultRandom().primaryKey(),
  cart_id: uuid("cart_id").notNull().references(() => cart.cart_id, { onDelete: "cascade" }),
  product_id: uuid("product_id").notNull().references(() => products.product_id, { onDelete: "cascade" }),
  color: varchar("color", { length: 32 }).notNull(),
  size: varchar("size", { length: 16 }).notNull(),
  quantity: integer("quantity").notNull(),
});

export type CartItem = typeof cart_items.$inferSelect;
export type NewCartItem = typeof cart_items.$inferInsert;