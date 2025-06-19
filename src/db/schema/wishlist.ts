import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { products } from "./products";
import { users } from "./users";

export const wishlist = pgTable("wishlist", {
  wishlist_id: uuid("wishlist_id").defaultRandom().primaryKey(),
  clerk_id: varchar("clerk_id", { length: 64 })
    .notNull()
    .references(() => users.clerk_id, { onDelete: "cascade" }),
  product_id: uuid("product_id")
    .notNull()
    .references(() => products.product_id, { onDelete: "cascade" }),
  color: varchar("color", { length: 32 }).notNull(),
  size: varchar("size", { length: 16 }).notNull(),
});

export type Wishlist = typeof wishlist.$inferSelect;
export type NewWishlist = typeof wishlist.$inferInsert;
