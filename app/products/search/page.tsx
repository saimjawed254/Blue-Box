import ProductsPage from "@/components/UI/Pages/ProductsPage";
import { notFound } from "next/navigation";

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
  let rateLimited = false;

  try {
    const res = await fetch(
      `https://blueboxxx.vercel.app/api/ai/search?query=${encodeURIComponent(
        query
      )}`
    );
    if (res.status === 429) {
      rateLimited = true;
    } else if (!res.ok) {
      throw new Error("Search API failed");
    } else {
      data = await res.json();
    }
    console.log(data);
  } catch (err) {
    console.error(err);
    notFound();
  }

  if (rateLimited) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "10vh 2rem",
          fontSize: "1.5rem",
        }}
      >
        ⚠️ Rate Limited <br /> You’re searching too fast. <br /> Please wait a few seconds and try again.
      </div>
    );
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
