import { db } from "@/src/db";
import { cart } from "@/src/db/schema/cart";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const clerk_id = searchParams.get("clerk_id");

  const { userId } = await auth();

  if (!userId || userId !== clerk_id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await db
      .select({
        total_items: cart.total_items,
        total_price: cart.total_price,
      })
      .from(cart)
      .where(eq(cart.clerk_id, clerk_id));

    if (result.length === 0) {
      return NextResponse.json({ total_items: 0, total_price: 0 });
    }

    return NextResponse.json(result[0]);
  } catch (err) {
    console.error("Error fetching cart summary:", err);
    return NextResponse.json(
      { error: "Failed to fetch cart summary" },
      { status: 500 }
    );
  }
}
