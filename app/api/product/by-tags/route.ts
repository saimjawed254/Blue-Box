import { db } from "@/src/db";
import { products } from "@/src/db/schema/products";
import { sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tags = searchParams.getAll("tags");

  // Pagination
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "12");
  const offset = (page - 1) * limit;

  if (!tags || tags.length === 0) {
    return NextResponse.json({ error: "Missing tags" }, { status: 400 });
  }

  try {
    const tagConditions = tags.map((tag) =>
      sql`${products.tags}::text[] @> ARRAY[${tag}]`
    );

    const whereClause = sql.join(tagConditions, sql` OR `);

    // Main query
    const matched = await db
      .select()
      .from(products)
      .where(whereClause)
      .limit(limit)
      .offset(offset);

    // Count query
    const countResult = await db.execute(
      sql`SELECT COUNT(*) FROM ${products} WHERE ${whereClause}`
    );

    const total = Number(countResult.rows[0]?.count || 0);

    return NextResponse.json({
      page,
      limit,
      total,
      data: matched,
    });
  } catch (err) {
    console.error("Error fetching similar products:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
