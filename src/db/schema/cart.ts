import { integer, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";

export const cart = pgTable("cart", {
  cart_id: uuid("cart_id").defaultRandom().primaryKey(),
  user_id: varchar("user_id", { length: 255 }).notNull().references(() => users.user_id, { onDelete: "cascade" }),
  created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow(),
  total_items: integer("total_items").default(0),
  total_price: integer("total_price").default(0),
});

export type Cart = typeof cart.$inferSelect;
export type NewCart = typeof cart.$inferInsert;