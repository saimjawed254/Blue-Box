import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/db";
import { products } from "@/src/db/schema/products";
import { desc, sql } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = (page - 1) * limit;

    const bestSellers = await db
      .select()
      .from(products)
      .orderBy(desc(products.order_count))
      .limit(limit)
      .offset(offset);

    const totalResult = await db.execute(
      sql`SELECT COUNT(*) AS count FROM ${products}`
    );

    const total = Number(totalResult.rows[0]?.count || 0);

    return NextResponse.json({
      page,
      limit,
      total,
      data: bestSellers,
    });
  } catch (error) {
    console.error("Error fetching best sellers:", error);
    return NextResponse.json(
      { error: "Failed to fetch best sellers" },
      { status: 500 }
    );
  }
}
