import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/db";
import { cart } from "@/src/db/schema/cart";
import { cart_items } from "@/src/db/schema/cartItems";
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
    const [userCart] = await db
      .select({ cart_id: cart.cart_id })
      .from(cart)
      .where(eq(cart.clerk_id, clerk_id));

    if (!userCart) {
      return NextResponse.json({ items: [] });
    }

    const items = await db
      .select({
        product_id: cart_items.product_id,
        quantity: cart_items.quantity,
        color: cart_items.color,
        size: cart_items.size,
      })
      .from(cart_items)
      .where(eq(cart_items.cart_id, userCart.cart_id));

    if (items.length === 0) {
      return NextResponse.json({ items: [] });
    }

    const productIds = items.map((item) => item.product_id);

    const productData = await db
      .select()
      .from(products)
      .where(inArray(products.product_id, productIds));

    const productMap = new Map(
      (await productData).map((p) => [p.product_id, p])
    );

    const result = items.map((item) => {
      const product = productMap.get(item.product_id);
      return {
        ...product,
        color: item.color,
        size: item.size,
        quantity: item.quantity,
      };
    });

    return NextResponse.json({ items: result });
  } catch (err) {
    console.error("Failed to fetch cart items:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
