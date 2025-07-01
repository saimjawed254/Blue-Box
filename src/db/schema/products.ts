import {
  text,
  uuid,
  integer,
  timestamp,
  pgTable,
  varchar,
  vector,
} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  product_id: uuid("product_id").defaultRandom().primaryKey(),

  product_code: varchar("product_code", { length: 32 }), // Links related variants

  title: varchar("title", { length: 256 }).notNull(),
  description: text("description").notNull(),

  category: varchar("category", { length: 64 }).notNull(),
  brand: varchar("brand", { length: 128 }).notNull(),

  color: varchar("color", { length: 64 }).notNull(),
  size: varchar("size", { length: 16 }).notNull(),       // S, M, L, XL, etc.
  quantity: integer("quantity").notNull(),               // Inventory per size

  price: integer("price").notNull(),
  mrp: integer("mrp").notNull(),
  discount: integer("discount").notNull(),

  order_count: integer("order_count").default(0).notNull(),

  image_urls: varchar("image_urls", { length: 512 }).array().notNull(),
  tags: varchar("tags", { length: 64 }).array().notNull(),

  material: varchar("material", { length: 128 }),
  dimensions: varchar("dimensions", { length: 128 }),

  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),

  embedding: vector("embedding", { dimensions: 768 }),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
