import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { headers, cookies } from "next/headers";
import WishlistsPage from "@/components/UI/Pages/WishlistsPage";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    notFound();
  }

  let wishlistData = [];

  try {
    const cookieStore = await cookies(); 
    const headerList = await headers();  

    const res = await fetch(
      `${process.env.FRONTEND_URL}/api/products/wishlists?clerk_id=${userId}`,
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

    if (!res.ok) throw new Error("Failed to fetch wishlist items");
    const data = await res.json();
    wishlistData = data.items || [];
  } catch (err) {
    console.error("Wishlist fetch error:", err);
    notFound();
  }

  return <WishlistsPage wishlistData={wishlistData} />;
}
