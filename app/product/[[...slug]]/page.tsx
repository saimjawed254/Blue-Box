import "./page.css";
import { notFound } from "next/navigation";
import * as React from "react";
import ProductPage from "@/components/UI/Pages/Product";

const validTopLevel = ["cargo", "suit"];

export default function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = React.use(params);
  const slugParts = slug || [];
  if (slugParts && slugParts.length > 2) {
    notFound();
  }

  const topLevel = slugParts[0] || "";
  if (!validTopLevel.includes(topLevel)) {
    notFound(); 
  }
  console.log(slugParts);

  const query = React.use(searchParams);
  console.log(query);

  return (
    <>
      <ProductPage/>
    </>
  );
}
