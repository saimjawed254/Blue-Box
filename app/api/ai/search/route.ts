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

  const [brandRows, colorRows] = await Promise.all([
    db.execute(
      sql`SELECT DISTINCT brand FROM products WHERE brand IS NOT NULL`
    ),
    db.execute(sql`SELECT DISTINCT UNNEST(tags) AS color FROM products`),
  ]);

  const knownBrands = brandRows.rows.map((r: any) => r.brand);
  const knownColors = Array.from(
    new Set(colorRows.rows.map((r: any) => r.color))
  );

  const structurePrompt = `
You are a shopping assistant AI.
Extract the following structured fields from the query.
There are only two categories, CARGO and LADIES' SUIT. 
You have to choose from only one of the two if there is any indication of type else null.
You can use the typical gender of the type of clothes to decide the category as well.
Use these known brands: ${knownBrands.join(", ")}
Use these known colors: ${knownColors.join(", ")}
If you are not able to find an exact same color choose the closest colors from the available colors.
Don't return anything else except json.
Return valid JSON with keys:
- category (\"CARGO\" | \"LADIES' SUIT\" | null)
- max_price (number or null)
- brand (string or null)
- colors (array of strings)
- tags (array of strings)

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
  const colorArray = parsed.colors.map((c) => `'${c}'`).join(",");
  filters.push(
    sql.raw(`
  EXISTS (
    SELECT 1 FROM UNNEST(tags) AS tag WHERE tag = ANY(ARRAY[${colorArray}]::text[])
  )
`)
  );

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
