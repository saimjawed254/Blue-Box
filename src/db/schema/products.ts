import {
  text,
  uuid,
  integer,
  timestamp,
  pgTable,
  varchar,
  json,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const products = pgTable("products", {
  product_id: uuid("product_id").defaultRandom().primaryKey(),
  product_code: varchar("product_code", { length: 32 }),

  title: varchar("title", { length: 256 }).notNull(),
  description: text("description").notNull(),

  category: varchar("category", { length: 64 }).notNull(),
  brand: varchar("brand", { length: 128 }).notNull(),

  price: integer("price").notNull(),
  mrp: integer("mrp").notNull(),
  discount: integer("discount").notNull(),

  variants: json("variants").notNull(),

  image_urls: varchar("image_urls", { length: 512 }).array(),

  material: varchar("material", { length: 128 }),
  dimensions: varchar("dimensions", { length: 128 }),

  tags: varchar("tags", { length: 64 }).array(),

  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;