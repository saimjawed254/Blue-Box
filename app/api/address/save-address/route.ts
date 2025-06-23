import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/db";
import { users } from "@/src/db/schema/users";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { address, coords } = await req.json();

  if (!address || typeof address !== "string") {
    return NextResponse.json({ message: "Invalid address" }, { status: 400 });
  }

  try {
    await db
      .update(users)
      .set({
        address,
        coordinate_X: coords?.lat ?? null,
        coordinate_Y: coords?.lon ?? null,
      })
      .where(eq(users.clerk_id, userId));

    return NextResponse.json({ message: "Address saved successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to save address" },
      { status: 500 }
    );
  }
}