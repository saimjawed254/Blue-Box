import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/db";
import { products } from "@/src/db/schema/products";
import { eq, sql } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const offset = (page - 1) * limit;

    const cargoProducts = await db
      .select()
      .from(products)
      .where(eq(products.category, "LADIES' SUIT"))
      .limit(limit)
      .offset(offset);

    const total = await db
      .select({ count: sql<number>`count(*)` })
      .from(products)
      .where(eq(products.category, "LADIES' SUIT"));
    return NextResponse.json({
      page,
      limit,
      total: total[0].count,
      data: cargoProducts,
    });
  } catch (error) {
    console.error("Error fetching cargo products:", error);
    return NextResponse.json(
      { error: "Failed to fetch cargo products" },
      { status: 500 }
    );
  }
}
