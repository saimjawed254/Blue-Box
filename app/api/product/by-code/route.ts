import { db } from "@/src/db";
import { products } from "@/src/db/schema/products";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const productCode = searchParams.get("product_code");

  if (!productCode) {
    return NextResponse.json(
      { error: "Missing product_code" },
      { status: 400 }
    );
  }

  try {
    const result = await db
      .select()
      .from(products)
      .where(eq(products.product_code, productCode));

    return NextResponse.json(result);
  } catch (err) {
    console.error("Error fetching by product_code:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
