// app/api/cart/add/route.ts

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/db";
import { cart } from "@/src/db/schema/cart";
import { cart_items } from "@/src/db/schema/cartItems";
import { eq, and } from "drizzle-orm";

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

      return NextResponse.json(
        { message: "Cart updated successfully" },
        { status: 200 }
      );
    }

    await db.insert(cart_items).values({
      cart_id,
      product_id,
      color,
      size,
      quantity,
    });

    return NextResponse.json(
      { message: "Item added to cart" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Add to cart error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
