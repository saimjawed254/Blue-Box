import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/db";
import { products } from "@/src/db/schema/products";
import { sql } from "drizzle-orm";

// Helper: Get current & previous month codes like JAN25
function getValidMonthCodes(): string[] {
  const now = new Date();
  const thisMonth = now
    .toLocaleString("en-US", { month: "short" })
    .toUpperCase();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
  const prevMonth = lastMonth
    .toLocaleString("en-US", { month: "short" })
    .toUpperCase();

  const yearSuffix = now.getFullYear().toString().slice(-2);

  return [`${thisMonth}${yearSuffix}`, `${prevMonth}${yearSuffix}`]; // e.g., ['JUN25', 'MAY25']
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = (page - 1) * limit;

    const monthCodes = getValidMonthCodes(); // e.g., ['JUN25', 'MAY25']

    const likePatterns = monthCodes.map((code) => `%${code}%`);

    const newProducts = await db.execute(
      sql`
    SELECT * FROM ${products}
    WHERE ${products.product_code} ILIKE ANY (ARRAY[${sql.join(
        likePatterns.map((pattern) => sql`${pattern}`),
        sql`,`
      )}]::text[])
    LIMIT ${limit} OFFSET ${offset}
  `
    );

    const totalResult = await db.execute(
      sql`
        SELECT COUNT(*) AS count FROM ${products}
        WHERE ${products.product_code} ILIKE ANY (ARRAY[${sql.join(
        likePatterns.map((pattern) => sql`${pattern}`),
        sql`,`
      )}]::text[])
      `
    );

    const total = Number(totalResult.rows[0]?.count || 0);

    return NextResponse.json({
      page,
      limit,
      total,
      monthCodes,
      data: newProducts.rows,
    });
  } catch (error) {
    console.error("Error fetching new products:", error);
    return NextResponse.json(
      { error: "Failed to fetch new products" },
      { status: 500 }
    );
  }
}
