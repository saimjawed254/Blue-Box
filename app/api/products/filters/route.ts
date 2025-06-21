import { db } from "@/src/db";
import { products } from "@/src/db/schema/products";
import { and, between, eq, inArray, gte, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    brands,
    priceRange,
    colors,
    discounts,
    page = 1,
    limit = 20,
  }: {
    brands?: string[];
    priceRange?: [number, number];
    colors?: string[];
    discounts?: number[]; // interpreted as "min discount" thresholds
    page?: number;
    limit?: number;
  } = body;

  const offset = (page - 1) * limit;

  // Construct dynamic filters
  const filters = [];

  if (brands && brands.length > 0) {
    filters.push(inArray(products.brand, brands));
  }

  if (priceRange && priceRange.length === 2) {
    filters.push(between(products.price, priceRange[0], priceRange[1]));
  }

  if (colors && colors.length > 0) {
    filters.push(inArray(products.color, colors));
  }

  if (discounts && discounts.length > 0) {
    // Example: if discounts = [10, 20], treat it as "discount >= MIN(10, 20)"
    const minDiscount = Math.min(...discounts);
    filters.push(gte(products.discount, minDiscount));
  }

  // Fetch filtered data
  const result = await db
    .select()
    .from(products)
    .where(filters.length > 0 ? and(...filters) : undefined)
    .limit(limit)
    .offset(offset);

  // Optional: get total count for frontend pagination
  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(products)
    .where(filters.length > 0 ? and(...filters) : undefined);

  return NextResponse.json({ products: result, total: Number(count) });
}
