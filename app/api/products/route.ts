// app/api/products/unique/route.ts
import { NextResponse } from "next/server";
import { db } from "@/src/db";
import { products } from "@/src/db/schema/products";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const allProducts = await db.select().from(products);

    const uniqueMap = new Map<string, typeof allProducts[0]>();
    for (const product of allProducts) {
      if (product.product_code && !uniqueMap.has(product.product_code)) {
        uniqueMap.set(product.product_code, product);
      }
    }

    const uniqueProducts = Array.from(uniqueMap.values()).slice(0, 40);

    return NextResponse.json({ success: true, data: uniqueProducts });
  } catch (error) {
    console.error("Error fetching unique products:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
