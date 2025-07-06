import { db } from "@/src/db";
import { wishlist } from "@/src/db/schema/wishlist";
import { products } from "@/src/db/schema/products";
import { auth } from "@clerk/nextjs/server";
import { eq, inArray } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const clerk_id = searchParams.get("clerk_id") || "";

  const { userId } = await auth();
  if (!userId || userId !== clerk_id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const wishlisted = await db
      .select({ product_id: wishlist.product_id })
      .from(wishlist)
      .where(eq(wishlist.clerk_id, clerk_id));

    const productIds = wishlisted.map(item => item.product_id);

    if (productIds.length === 0) {
      return NextResponse.json({ prices: [] });
    }

    const prices = await db
      .select({ product_id: products.product_id, price: products.price })
      .from(products)
      .where(inArray(products.product_id, productIds));

    return NextResponse.json({ prices });
  } catch (error) {
    console.error("Error fetching wishlist prices:", error);
    return NextResponse.json(
      { error: "Failed to fetch wishlist prices" },
      { status: 500 }
    );
  }
}
