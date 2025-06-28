import { db } from "@/src/db";
import { products } from "@/src/db/schema/products";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    const result = await db
      .select()
      .from(products)
      .where(eq(products.product_id, id));

    if (!result || result.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
