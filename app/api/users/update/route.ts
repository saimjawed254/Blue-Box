import { db } from "@/src/db";
import { users } from "@/src/db/schema/users";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId } = await auth();
    if (!userId || userId !== body.clerk_id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { clerk_id, ...inputUpdates } = body;

    if (!clerk_id) {
      return NextResponse.json({ error: "Missing user_id" }, { status: 400 });
    }

    const notAllowedFields = ["clerk_id", "email", "name"];
    const updates: Record<string, any> = {};

    for (const key of notAllowedFields) {
      if (key in inputUpdates) {
        return NextResponse.json(
          { error: "You are trying to update an immutable field" },
          { status: 400 }
        );
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 }
      );
    }

    const result = await db
      .update(users)
      .set(updates)
      .where(eq(users.clerk_id, clerk_id))
      .returning();

    return NextResponse.json({
      message: "User updated successfully",
      updated: result[0],
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
