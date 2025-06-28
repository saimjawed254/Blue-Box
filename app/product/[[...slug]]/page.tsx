import "./page.css";
import { notFound } from "next/navigation";
import * as React from "react";
import ProductPage from "@/components/UI/Pages/Product";

const validTopLevel = ["cargo", "suit"];

type Props = {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params;
  const slugParts = slug || [];
  if (slugParts && slugParts.length > 2) {
    notFound();
  }

  const topLevel = slugParts[0] || "";
  if (!validTopLevel.includes(topLevel)) {
    notFound();
  }
  console.log(slugParts);

  const query = await searchParams;
  const product_id = query.id || null;

  console.log(query);
  let product;
  try {
    const res = await fetch(`https://blueboxxx.vercel.app/api/product/${product_id}`);
    if (!res?.ok) throw new Error("API failed");
    product = await res.json();
    console.log(product);
  } catch (err) {
    console.error(err);
    notFound(); // fallback on error
  }

  return (
    <>
      <ProductPage product={product} />
    </>
  );
}
