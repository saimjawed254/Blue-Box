import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/db";
import { wishlist } from "@/src/db/schema/wishlist";
import { products } from "@/src/db/schema/products";
import { auth } from "@clerk/nextjs/server";
import { eq, inArray } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const clerk_id = searchParams.get("clerk_id");

  const { userId } = await auth();

  if (!userId || userId !== clerk_id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const items = await db
      .select({
        product_id: wishlist.product_id,
        color: wishlist.color,
        size: wishlist.size,
      })
      .from(wishlist)
      .where(eq(wishlist.clerk_id, clerk_id));

    if (items.length === 0) {
      return NextResponse.json({ items: [] });
    }

    const productIds = items.map((item) => item.product_id);

    const productData = await db
      .select()
      .from(products)
      .where(inArray(products.product_id, productIds));

    const productMap = new Map(productData.map((p) => [p.product_id, p]));

    const result = items.map((item) => {
      const product = productMap.get(item.product_id);
      return {
        ...product,
        color: item.color,
        size: item.size,
      };
    });

    return NextResponse.json({ items: result });
  } catch (err) {
    console.error("Failed to fetch wishlist items:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
