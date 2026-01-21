import { db } from "@/src/db";
import { products } from "@/src/db/schema/products";
import { and, between, eq, inArray, gte, sql, desc, asc } from "drizzle-orm";
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
    category,
    sort = "price_low_to_high",
  }: {
    brands?: string[];
    priceRange?: [number, number];
    colors?: string[];
    discounts?: string;
    category?: string; // 'cargo' | 'suits' | etc.
    sort?:
      | "price_low_to_high"
      | "price_high_to_low"
      | "best_sellers"
      | "newest_arrivals"
      | "discount_high_to_low";
    page?: number;
    limit?: number;
  } = body;

  // console.log(body);

  const offset = (page - 1) * limit;

  const filters = [];

  if (brands?.length) {
    filters.push(inArray(products.brand, brands));
  }

  if (priceRange?.length === 2) {
    filters.push(between(products.price, priceRange[0], priceRange[1]));
  }

  if (colors?.length) {
    filters.push(inArray(products.color, colors));
  }

  if (discounts) {
    const discount = discounts.slice(1, 3);
    const discountValue = parseInt(discount, 10);
    if (!isNaN(discountValue)) {
      filters.push(gte(products.discount, discountValue));
    }
  }
  if (
    category &&
    category !== "best_sellers" &&
    category !== "newest_arrivals"
  ) {
    if (category === "cargos") {
      filters.push(eq(products.category, "CARGO"));
    } else if (category === "suits") {
      filters.push(eq(products.category, "LADIES' SUIT"));
    }
  }

  // Sorting logic
  let orderByClause;
  switch (sort) {
    case "price_low_to_high":
      orderByClause = asc(products.price);
      break;
    case "price_high_to_low":
      orderByClause = desc(products.price);
      break;
    case "best_sellers":
      orderByClause = desc(products.order_count);
      break;
    case "newest_arrivals":
      orderByClause = desc(products.created_at);
      break;
    case "discount_high_to_low":
      orderByClause = desc(products.discount);
      break;
    default:
      orderByClause = asc(products.price); // fallback
  }

  const whereClause = filters.length > 0 ? and(...filters) : undefined;

  // Main product query
  const result = await db
    .select()
    .from(products)
    .where(whereClause)
    .orderBy(orderByClause)
    .limit(limit)
    .offset(offset);

  // Total count for pagination
  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(products)
    .where(whereClause);

  return NextResponse.json({ products: result, total: Number(count) });
}
