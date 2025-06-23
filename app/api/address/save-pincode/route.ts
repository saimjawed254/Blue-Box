
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/db";
import { users } from "@/src/db/schema/users";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { pincode } = await req.json();

  if (!pincode || !/^\d{6}$/.test(pincode)) {
    return NextResponse.json({ message: "Invalid pincode" }, { status: 400 });
  }

  try {
    await db
      .update(users)
      .set({ pincode: pincode })
      .where(eq(users.clerk_id, userId));

    return NextResponse.json({ message: "Pincode saved successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to save pincode" },
      { status: 500 }
    );
  }
}
