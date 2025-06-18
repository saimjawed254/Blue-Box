import { z } from "zod";

export const productSchema = z.object({
  product_code: z.string().min(1).max(32),
  title: z.string().min(1).max(256),
  description: z.string().min(1),

  category: z.string().min(1).max(64),
  brand: z.string().min(1).max(128),

  color: z.string().min(1).max(64),
  size: z.string().min(1).max(16),
  quantity: z.number().int().nonnegative(),

  price: z.number().int().positive(),
  mrp: z.number().int().positive(),
  discount: z.number().int().nonnegative(),

  order_count: z.number().int().nonnegative().optional(), // optional: default 0

  image_urls: z
    .array(z.string().url())
    .min(1, "At least one image is required"),

  tags: z
    .array(z.string().min(1).max(64))
    .min(1, "At least one tag is required"),

  material: z.string().max(128).optional(),
  dimensions: z.string().max(128).optional(),

  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

export type ProductSchemaType = z.infer<typeof productSchema>;