import "./page.css";
import { notFound } from "next/navigation";
import ProductPage from "@/components/UI/Pages/Product";

const validTopLevel = ["cargo", "suit"];

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const slugParts = params.slug || [];

  if (slugParts.length > 2) {
    notFound();
  }

  const topLevel = slugParts[0] || "";
  if (!validTopLevel.includes(topLevel)) {
    notFound();
  }

  const product_id = searchParams.id;
  if (!product_id || typeof product_id !== "string") {
    notFound();
  }

  let product;
  try {
    const res = await fetch(`http://localhost:3000/api/product/${product_id}`, {
      cache: "no-store", // optional, disables ISR caching
    });

    if (!res.ok) throw new Error("API failed");

    product = await res.json();
  } catch (err) {
    console.error(err);
    notFound();
  }

  return <ProductPage product={product} />;
}
