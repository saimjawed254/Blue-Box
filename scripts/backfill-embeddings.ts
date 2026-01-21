import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { products } from "@/src/db/schema/products";
import { eq } from "drizzle-orm";
import Together from "together-ai";

dotenv.config({ path: ".env" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY,
});

async function getEmbedding(text: string): Promise<number[]> {
  const res = await together.embeddings.create({
    model: "togethercomputer/m2-bert-80M-32k-retrieval",
    input: text,
  });

  return res.data[0].embedding;
}

async function main() {
  const rows = await db.select().from(products);

  // console.log(`Together found ${rows.length} products to Embed`);

  for (const row of rows) {
    const title = row.title || "";
    const description = row.description || "";
    const category = row.category || "";
    const tags = (row.tags || []).join(", ");
    const brand = row.brand || "";
    const price = row.price ? `${row.price} INR` : "";
    const discount = row.discount ? `${row.discount}% off` : "";
    const size = row.size;
    const color = row.color;
    const material = row.material;
    const dimensions = row.dimensions;

    const input = `
      TITLE: ${title}
      DESCRIPTION: ${description}
      CATEGORY: ${category}
      CATEGORY: ${category}
      TAGS: ${tags}
      BRAND: ${brand}
      PRICE: ${price}
      DISCOUNT: ${discount}
      COLOR: ${color}
      SIZE: ${size}
      MATERIAL: ${material}
      DIMENSIONS: ${dimensions}
    `;

    const embedding = await getEmbedding(input);

    await db
      .update(products)
      .set({ embedding })
      .where(eq(products.product_id, row.product_id));

    // console.log(`Embedded: ${title}`);
  }

  // console.log("All product embeddings updated!");
}

main().catch((err) => {
  console.error("Error in backfill:", err);
});
