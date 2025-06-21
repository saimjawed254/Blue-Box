import ProductsPage from "@/components/UI/Pages/ProductsPage";
import "./page.css";
import { notFound } from "next/navigation";
import ProductsSidebar from "@/components/UI/ProductsSideBar";

const validTopLevel = ["best-sellers", "newest-arrivals", "cargos", "suits"];

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug?: string[] };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { slug } = await params;
  const slugParts = slug || [];

  // const slugParts = slug || [];

  if (slugParts && slugParts.length > 2) {
    notFound();
  }

  const topLevel = slugParts[0] || "";
  if (!validTopLevel.includes(topLevel)) {
    notFound();
  }
  console.log(slugParts);

  const search_params = await searchParams;
  const page = parseInt((search_params?.page as string) ?? "1");
  const limit = parseInt((search_params?.limit as string) ?? "20");
  console.log(page, limit);

  let data = [];
  try {
    let res;
    if (slugParts.length === 1) {
      res = await fetch(
        `http://localhost:3000/api/products/${slugParts[0]}?page=${page}&limit=${limit}`
      );
    } else if (slugParts.length === 2) {
      if (slugParts[1] === "cargos") {
        res = await fetch(
          `http://localhost:3000/api/products/${slugParts[0]}?category=CARGO&page=${page}&limit=${limit}`
        );
      } else if (slugParts[1] === "suits") {
        res = await fetch(
          `http://localhost:3000/api/products/${slugParts[0]}?category=LADIES' SUIT&page=${page}&limit=${limit}`
        );
      }
    }

    if (!res?.ok) throw new Error("API failed");
    data = await res.json();
  } catch (err) {
    console.error(err);
    notFound(); // fallback on error
  }

  return (
    <>
      <ProductsPage slug={slugParts} total={data.total} productsData={data.data} />
    </>
  );
}
