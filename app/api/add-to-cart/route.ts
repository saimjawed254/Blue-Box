import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/db";
import { cart } from "@/src/db/schema/cart";
import { cart_items } from "@/src/db/schema/cartItems";
import { products } from "@/src/db/schema/products";
import { eq, and, inArray } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      user_id,
      product_id,
      color,
      size,
      quantity = 1,
    }: {
      user_id: string;
      product_id: string;
      color: string;
      size: string;
      quantity?: number;
    } = body;

    // 1. Get cart for user
    const [userCart] = await db
      .select({ cart_id: cart.cart_id })
      .from(cart)
      .where(eq(cart.clerk_id, user_id));

    if (!userCart) {
      return NextResponse.json(
        { error: "Cart not found for user" },
        { status: 404 }
      );
    }

    const cart_id = userCart.cart_id;

    // 2. Check if item exists
    const existing = await db
      .select()
      .from(cart_items)
      .where(
        and(
          eq(cart_items.cart_id, cart_id),
          eq(cart_items.product_id, product_id),
          eq(cart_items.color, color),
          eq(cart_items.size, size)
        )
      );

    if (existing.length > 0) {
      await db
        .update(cart_items)
        .set({ quantity: existing[0].quantity + quantity })
        .where(eq(cart_items.item_id, existing[0].item_id));
    } else {
      await db.insert(cart_items).values({
        cart_id,
        product_id,
        color,
        size,
        quantity,
      });
    }

    const items = await db
      .select({
        quantity: cart_items.quantity,
        product_id: cart_items.product_id,
      })
      .from(cart_items)
      .where(eq(cart_items.cart_id, cart_id));

    if (items.length === 0) {
      await db
        .update(cart)
        .set({ total_items: 0, total_price: 0 })
        .where(eq(cart.cart_id, cart_id));
    } else {

      const productIds = items.map((item) => item.product_id);
      const prices = await db
        .select({ product_id: products.product_id, price: products.price })
        .from(products)
        .where(inArray(products.product_id, productIds))

      const priceMap = new Map(
        prices.map((p) => [p.product_id, p.price])
      );

      let total_items = 0;
      let total_price = 0;

      for (const item of items) {
        const price = priceMap.get(item.product_id) || 0;
        total_items += item.quantity;
        total_price += item.quantity * price;
      }

      await db
        .update(cart)
        .set({ total_items, total_price })
        .where(eq(cart.cart_id, cart_id));
    }

    return NextResponse.json(
      { message: "Cart updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Add to cart error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
