import { db } from "@/src/db";
import { wishlist } from "@/src/db/schema/wishlist";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const clerk_id = searchParams.get("clerk_id") || "";
  const product_id = searchParams.get("product_id") || "";

  const { userId } = await auth();
  if (!userId || userId !== clerk_id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const isWishlist = await db
      .select()
      .from(wishlist)
      .where(
        and(eq(wishlist.clerk_id, clerk_id), eq(wishlist.product_id, product_id))
      );
    return NextResponse.json(isWishlist);
  } catch (error) {
    console.error("Error fetching wishlists:", error);
    return NextResponse.json(
      { error: "Failed to fetch wishlist" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { clerk_id, product_id, color, size } = body;

    if (!userId || userId != clerk_id) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    if (!clerk_id || !product_id || !color || !size) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await db.insert(wishlist).values({
      clerk_id,
      product_id,
      color,
      size,
    });

    return NextResponse.json({ message: "Added to wishlist" });
  } catch (err) {
    console.error("Error adding to wishlist:", err);
    return NextResponse.json(
      { error: "Failed to add to wishlist" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { clerk_id, product_id, color, size } = body;

    if (!userId || userId != clerk_id) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    if (!clerk_id || !product_id || !color || !size) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await db
      .delete(wishlist)
      .where(
        and(
          eq(wishlist.clerk_id, clerk_id),
          eq(wishlist.product_id, product_id),
          eq(wishlist.color, color),
          eq(wishlist.size, size)
        )
      );

    return NextResponse.json({ message: "Removed from wishlist" });
  } catch (err) {
    console.error("Error removing from wishlist:", err);
    return NextResponse.json(
      { error: "Failed to remove from wishlist" },
      { status: 500 }
    );
  }
}
