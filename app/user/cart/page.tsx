import CartPage from "@/components/UI/Pages/CartPage";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { headers, cookies } from "next/headers";

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    notFound();
  }

  let cartData = [];

  try {
    const cookieStore = await cookies(); 
    const headerList = await headers();  

    const res = await fetch(
      `${process.env.FRONTEND_URL}/api/products/cart-items?clerk_id=${userId}`,
      {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
          "User-Agent": headerList.get("user-agent") || "",
          Authorization: headerList.get("authorization") || "",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) throw new Error("Failed to fetch cart items");
    const data = await res.json();
    cartData = data.items || [];
  } catch (err) {
    console.error("Cart fetch error:", err);
    notFound();
  }

  return <CartPage cartData={cartData} />;
}
