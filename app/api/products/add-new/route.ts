import { NextResponse } from "next/server";
import { db } from "@/src/db";
import { products } from "@/src/db/schema/products";
import { productSchema } from "@/src/zod/productSchema";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = productSchema.parse(body);

    const result = await db.insert(products).values(parsed).returning();

    return NextResponse.json(
      { success: true, product: parsed },
      { status: 200 }
    );
  } catch (error) {
    console.error("[PRODUCTS_POST_ERROR]", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation Failed", issues: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
