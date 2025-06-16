import { boolean, integer, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";
import { products } from "./products";
import { orders } from "./orders";

export const reviews = pgTable("reviews", {
  review_id: uuid("review_id").defaultRandom().primaryKey(),
  user_id: varchar("user_id", { length: 255 }).notNull().references(() => users.user_id),
  product_id: varchar("product_id", { length: 32 }).notNull().references(() => products.product_id),
  order_id: uuid("order_id").references(() => orders.order_id),
  rating: integer("rating").notNull(), // 1-5
  title: varchar("title", { length: 255 }),
  comment: text("comment"),
  created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
  verified_purchase: boolean("verified_purchase").default(false),
});

export type Review = typeof reviews.$inferSelect;
export type NewReview = typeof reviews.$inferInsert;