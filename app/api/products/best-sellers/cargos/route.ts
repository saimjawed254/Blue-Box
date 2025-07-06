import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/db";
import { products } from "@/src/db/schema/products";
import { desc, eq, sql } from "drizzle-orm";
import { getOrSetCache } from "@/src/lib/cache";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = (page - 1) * limit;

    const cacheKey = `best-sellers-cargos:p${page}:l${limit}`;

    const data = await getOrSetCache(cacheKey, async () => {
      const bestSellers = await db
        .select()
        .from(products)
        .where(eq(products.category, "CARGO"))
        .orderBy(desc(products.order_count))
        .limit(limit)
        .offset(offset);

      const totalResult = await db.execute(
        sql`SELECT COUNT(*) AS count FROM ${products}`
      );

      const total = Number(totalResult.rows[0]?.count || 0);

      return {
        page,
        limit,
        total,
        data: bestSellers,
      };
    }, 300); 

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching best sellers:", error);
    return NextResponse.json(
      { error: "Failed to fetch best sellers" },
      { status: 500 }
    );
  }
}
