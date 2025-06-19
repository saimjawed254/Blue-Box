import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { products } from "./products";
import { orders } from "./orders";

export const reviews = pgTable("reviews", {
  review_id: uuid("review_id").defaultRandom().primaryKey(),
clerk_id: varchar("clerk_id", { length: 64 })
  .notNull()
  .references(() => users.clerk_id, { onDelete: "cascade" }),
  product_id: uuid("product_id")
    .notNull()
    .references(() => products.product_id, { onDelete: "cascade" }),
  order_id: uuid("order_id").references(() => orders.order_id),
  rating: integer("rating").notNull(), // 1-5
  title: varchar("title", { length: 255 }),
  comment: text("comment"),
  created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
  verified_purchase: boolean("verified_purchase").default(false),
});

export type Review = typeof reviews.$inferSelect;
export type NewReview = typeof reviews.$inferInsert;
