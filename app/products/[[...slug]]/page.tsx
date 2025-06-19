import ProductsPage from "@/components/UI/Pages/ProductsPage";
import "./page.css";
import { notFound } from "next/navigation";
import * as React from "react";

const validTopLevel = ["best-sellers", "new-arrivals", "cargos", "suits"];

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
  if (query) {
    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 40;
    console.log(page, limit);
  }


  return (
    <>
      <ProductsPage data={{}}/>
    </>
  );
}
