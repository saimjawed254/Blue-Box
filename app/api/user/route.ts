import { db } from "@/src/db";
import { users } from "@/src/db/schema/users";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const clerk_id = searchParams.get("clerk_id") || "";
  const { userId } = await auth();
  if (!userId || userId !== clerk_id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const result = await db
      .select({ clerk_id: users.clerk_id })
      .from(users)
      .where(eq(users.clerk_id, clerk_id));

    if (!result || result.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user_id: result[0].clerk_id });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
