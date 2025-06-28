import ProductsPage from "@/components/UI/Pages/ProductsPage";
import "./page.css";
import { notFound } from "next/navigation";

const validTopLevel = ["best-sellers", "newest-arrivals", "cargos", "suits"];

type PageProps = {
  params: { slug: string[] | undefined };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({
  params,
  searchParams,
}: PageProps) {
  const slugParts = params.slug || [];

  if (slugParts.length > 2) {
    notFound();
  }

  const topLevel = slugParts[0] || "";
  if (!validTopLevel.includes(topLevel)) {
    notFound();
  }

  const page = parseInt((searchParams?.page as string) ?? "1", 10);
  const limit = parseInt((searchParams?.limit as string) ?? "20", 10);

  let apiURL = `http://localhost:3000/api/products/${topLevel}?page=${page}&limit=${limit}`;

  if (slugParts.length === 2) {
    const category =
      slugParts[1] === "cargos"
        ? "CARGO"
        : slugParts[1] === "suits"
        ? "LADIES' SUIT"
        : null;

    if (!category) {
      notFound();
    }

    apiURL += `&category=${encodeURIComponent(category)}`;
  }

  let result;
  try {
    const res = await fetch(apiURL, { cache: "no-store" });
    if (!res.ok) throw new Error("API failed");
    result = await res.json();
  } catch (err) {
    console.error(err);
    notFound();
  }

  return (
    <ProductsPage
      slug={slugParts}
      total={result.total}
      productsData={result.data}
    />
  );
}
