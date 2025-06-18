import { boolean, integer, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";
import { products } from "./products";

export const try_ons = pgTable("try_ons", {
  tryon_id: uuid("tryon_id").defaultRandom().primaryKey(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.user_id, { onDelete: "cascade" }),
  product_id: uuid("product_id")
    .notNull()
    .references(() => products.product_id, { onDelete: "cascade" }),
  color: varchar("color", { length: 32 }),
  size: varchar("size", { length: 16 }),
  image_url: text("image_url"),
  device_type: varchar("device_type", { length: 100 }), // mobile, desktop
  tryon_time: timestamp("tryon_time", { mode: "date" }).defaultNow(),
  result_saved: boolean("result_saved").default(false),
});

export type TryOn = typeof try_ons.$inferSelect;
export type NewTryOn = typeof try_ons.$inferInsert;