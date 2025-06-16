import { pgTable, uuid, varchar, integer } from "drizzle-orm/pg-core";
import { products } from "./products";

export const productVariants = pgTable("product_variants", {
  id: uuid("id").primaryKey().defaultRandom(),
  product_id: uuid("product_id")
    .notNull()
    .references(() => products.product_id, {
      onDelete: "cascade",
    }),

  color: varchar("color", { length: 64 }).notNull(),
  images: varchar("images", { length: 512 }).array().notNull(),
  qty: integer("qty").notNull(),
});

export type ProductVariants = typeof productVariants.$inferSelect;
export type NewProductVariants = typeof productVariants.$inferInsert;