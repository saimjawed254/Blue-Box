import ProductsPage from "@/components/UI/Pages/ProductsPage";
import { notFound, redirect } from "next/navigation";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const search_params = await searchParams;
  const query =
    typeof search_params.query === "string" ? search_params.query : "";
  const page = parseInt((search_params?.page as string) ?? "1");
  const limit = parseInt((search_params?.limit as string) ?? "20");

  if (!query || query.trim().length === 0) {
    notFound();
  }

  let data = [];
  let status;
  try {
    const apiUrl = `${process.env.FRONTEND_URL}/api/ai/search?query=${encodeURIComponent(query)}`;
    // console.log("🔗 Fetching from:", apiUrl);
    
    const res = await fetch(apiUrl);
    if (res.status === 429) {
      status = true;
    } else if (!res.ok) {
      throw new Error("Search API failed");
    } else {
      data = await res.json();
    }
  } catch (err) {
    console.error(err);
    notFound();
  }

  if (status === true) {
    redirect("/ratelimit");
  }

  return (
    <>
      <ProductsPage
        key={query}
        slug={["search"]}
        total={data.total ?? data.results?.length ?? 0}
        productsData={data.results ?? []}
      />
    </>
  );
}
