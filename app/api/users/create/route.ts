import { db } from "@/src/db";
import { cart } from "@/src/db/schema/cart";
import { users } from "@/src/db/schema/users";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { userId } = await auth();
  if (!userId || userId !== body.clerk_id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const forwardedFor = req.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0] ?? "Unknown";

  const existing = await db
    .select()
    .from(users)
    .where(eq(users.clerk_id, body.clerk_id));

  if (existing.length > 0) {
    return NextResponse.json({ message: "User already exists" });
  }

  const newUser = await db
    .insert(users)
    .values({
      clerk_id: body.clerk_id,
      email: body.email,
      name: body.name,
      avatar_url: body.avatar_url,
      ip_addresses: [ip],
    })

  await db.insert(cart).values({
    clerk_id: body.clerk_id,
    total_items: 0,
    total_price: 0,
  });

  return NextResponse.json({ message: "User inserted" });
}
