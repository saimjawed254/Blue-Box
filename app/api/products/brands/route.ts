import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/db";
import { products } from "@/src/db/schema/products";
import { eq, or, and, like } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  if (!category) {
    return NextResponse.json(
      { error: "Missing 'category' parameter" },
      { status: 400 }
    );
  }

  try {
    const result = await db
      .selectDistinct({ brand: products.brand })
      .from(products)
      .where(
        and(
          eq(products.category, category),
          or(
            like(products.product_code, `%JUL25-%`),
            like(products.product_code, `%JUN25-%`)
          )
        )
      );

    const brands = result.map((row) => row.brand);
    return NextResponse.json({ brands });
  } catch (error) {
    console.error("Error fetching brands:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
