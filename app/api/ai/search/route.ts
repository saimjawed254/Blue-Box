import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/db";
import { SQL, sql } from "drizzle-orm";
import Together from "together-ai";
import * as dotenv from "dotenv";
import { createRateLimiter } from "@/src/lib/limiter";

dotenv.config({ path: ".env" });

const together = new Together({ apiKey: process.env.TOGETHER_API_KEY });

export async function GET(req: NextRequest) {
  const limiter = createRateLimiter(4, "60 s");
  const ip = req.headers.get("x-forwarded-for") ?? "anonymous";

  const { success, limit, remaining, reset } = await limiter.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  console.log(query);

  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  const [brandRows, tagRows] = await Promise.all([
    db.execute(
      sql`SELECT DISTINCT brand FROM products WHERE brand IS NOT NULL`
    ),
    db.execute(sql`SELECT DISTINCT UNNEST(tags) AS color FROM products`),
  ]);

  const knownBrands = brandRows.rows.map((r: any) => r.brand);
  const knownTags = Array.from(new Set(tagRows.rows.map((r: any) => r.tag)));

  const structurePrompt = `
You are a shopping assistant AI.
Extract the following structured fields from the query:
- category ("CARGO" | "LADIES' SUIT" | null)
- max_price (number or null)
- brand (string or null)
- colors (array of strings)
- tags (array of strings)

You must use only values from these lists:
- Brands: ${knownBrands.join(", ")}
- Tags (includes colors, styles, etc.): ${knownTags.join(", ")}

Examples of tags include: fabric type, fit (e.g., "oversized"), use-case (e.g., "casual", "party wear"), or other keywords.

If an exact tag is not found in the list, choose the closest related tag(s) from the known tags.

Don't return anything else except valid JSON.

User Query: "${query}"
`;

  let parsed = {
    category: null,
    max_price: null,
    brand: null,
    colors: [],
    tags: [],
  };

  try {
    const structureRes = await together.chat.completions.create({
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
      messages: [{ role: "user", content: structurePrompt }],
      temperature: 0.2,
    });

    const content = structureRes.choices?.[0]?.message?.content;
    if (content) {
      console.log(content);
      const cleaned = content
        .replace(/```(?:json)?/gi, "")
        .replace(/```/g, "")
        .trim();
      parsed = JSON.parse(cleaned);
    }
  } catch (err) {
    console.warn("⚠️ Failed to parse structured query:", err);
  }

  const priceCap = parsed.max_price ? parsed.max_price + 100 : null;

  const filters: SQL[] = [];

  filters.push(sql`embedding IS NOT NULL`);

  if (parsed.category) {
    filters.push(sql`category ILIKE ${parsed.category}`);
  }
  if (parsed.brand) {
    filters.push(sql`brand ILIKE ${parsed.brand}`);
  }
  if (priceCap) {
    filters.push(sql`price <= ${sql`${priceCap}::int`}`);
  }
  const allTags = Array.from(new Set([...parsed.colors, ...parsed.tags]));

  if (allTags.length > 0) {
    const tagArray = allTags.map((t) => `'${t}'`).join(",");
    filters.push(
      sql.raw(`
      EXISTS (
        SELECT 1 FROM UNNEST(tags) AS tag WHERE tag = ANY(ARRAY[${tagArray}]::text[])
      )
    `)
    );
  }

  const filterResults = await db.execute(
    sql`
      SELECT *
      FROM products
      WHERE ${sql.join(filters, sql` AND `)}
      LIMIT 20;
    `
  );

  if (filterResults.rows.length >= 20) {
    return NextResponse.json({ results: filterResults.rows });
  }

  const embeddingRes = await together.embeddings.create({
    model: "togethercomputer/m2-bert-80M-32k-retrieval",
    input: query,
  });

  const queryEmbedding = embeddingRes.data[0].embedding;
  const embeddingLiteral = "[" + queryEmbedding.join(",") + "]";

  const semanticResults = await db.execute(
    sql`
    SELECT
     *
    FROM products
    WHERE embedding IS NOT NULL
    ${parsed.category ? sql`AND category ILIKE ${parsed.category}` : sql``}
    ORDER BY embedding <#> ${sql`${embeddingLiteral}::vector`} ASC
    LIMIT ${20 - filterResults.rows.length};
  `
  );

  const seen = new Set();
  const merged: typeof filterResults.rows = [];

  for (const item of [...filterResults.rows, ...semanticResults.rows]) {
    if (!seen.has(item.product_id)) {
      seen.add(item.product_id);
      merged.push(item);
    }
  }

  const cleaned = merged.map(
    ({ embedding, similarity, category_boost, price_boost, ...rest }) => rest
  );

  return NextResponse.json({ results: cleaned });
}
