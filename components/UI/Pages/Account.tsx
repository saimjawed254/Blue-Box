"use client";

import { User } from "@/src/db/schema/users";
import "./Account.css";
import { Poppins } from "next/font/google";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "500", "400", "200"],
});

type Props = {
  userData: User;
};

export default function AccountPage({ userData }: Props) {
  const [wishlistTotalPrice, setWishlistTotalPrice] = useState(0);
  const [wishlistTotalQuantity, setWishlistTotalQuantity] = useState(0);
  const [loadingWishlist, setLoadingWishlist] = useState(true);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const [cartTotalQuantity, setCartTotalQuantity] = useState(0);
  const [loadingCart, setLoadingCart] = useState(true);

  const { user } = useUser();

  useEffect(() => {
    async function fetchCartSummary() {
      try {
        const res = await fetch(`/api/cart?clerk_id=${user?.id}`);
        const data = await res.json();

        if (res.ok) {
          setCartTotalQuantity(data.total_items || 0);
          setCartTotalPrice(data.total_price || 0);
        }
      } catch (err) {
        console.error("Failed to load cart summary", err);
      } finally {
        setLoadingCart(false);
      }
    }

    async function fetchWishlistTotals() {
      try {
        const res = await fetch(`/api/wishlist/stats?clerk_id=${user?.id}`);
        const data = await res.json();

        if (res.ok) {
          const prices = data.prices || [];
          const totalQty = prices.length;
          const totalAmt = prices.reduce(
            (sum: number, item: { price: number }) => sum + item.price,
            0
          );

          setWishlistTotalQuantity(totalQty);
          setWishlistTotalPrice(totalAmt);
        }
      } catch (err) {
        console.error("Error loading wishlist totals:", err);
      } finally {
        setLoadingWishlist(false);
      }
    }

    if (user?.id) {
      fetchWishlistTotals();
      fetchCartSummary();
    }
  }, [user?.id]);

  return (
    <div className={`dashboard ${poppins.className}`}>
      <div className="dashboard-sidebar">
        <div className="dashboard-sidebar-header">Account</div>

        <div className="ds-user-name">{userData.name}</div>
        <div className="ds-user-email">{userData.email}</div>

        <div className="ds-info-box">
          <div className="ds-info-box-header">Pincode</div>
          <div className="ds-info-box-content">{userData.pincode}</div>
        </div>

        <div className="ds-info-box">
          <div className="ds-info-box-header">Address</div>
          <div className="ds-info-box-content">{userData.address}</div>
        </div>

        <div className="ds-info-box">
          <div className="ds-info-box-header">Account created</div>
          <div className="ds-info-box-content">
            {userData.created_at?.toLocaleDateString()}
          </div>
        </div>

        <div className="ds-logout">
          <SignOutButton>
            <div className="ds-logout-button">Logout</div>
          </SignOutButton>
        </div>

        <div className="ds-buffer"></div>
      </div>

      <div className="dashboard-header">Dashboard</div>

      <div className="dashboard-nav">
        <Link href={'/user/cart'} className="dashboard-cart">
          <div className="dashboard-nav-header">Cart</div>
          {loadingCart ? (
            <div className="dashboard-nav-price">Loading...</div>
          ) : (
            <>
              <div className="dashboard-nav-price">
                Total price:{" "}
                <span
                  style={{
                    color: "rgb(var(--blue))",
                  }}
                >
                  ₹{cartTotalPrice}
                </span>
              </div>
              <div className="dashboard-nav-items">
                Total items:{" "}
                <span
                  style={{
                    color: "rgb(var(--blue))",
                  }}
                >
                  {cartTotalQuantity}
                </span>
              </div>
            </>
          )}
        </Link>

        <Link href={'/user/wishlist'} className="dashboard-wishlists">
          <div className="dashboard-nav-header">Wishlists</div>
          {loadingWishlist ? (
            <div className="dashboard-nav-price">Loading...</div>
          ) : (
            <>
              <div className="dashboard-nav-price">
                Total price:{" "}
                <span
                  style={{
                    color: "rgb(var(--blue))",
                  }}
                >
                  ₹{wishlistTotalPrice}
                </span>
              </div>
              <div className="dashboard-nav-items">
                Total items:{" "}
                <span
                  style={{
                    color: "rgb(var(--blue))",
                  }}
                >
                  {wishlistTotalQuantity}
                </span>
              </div>
            </>
          )}
        </Link>
      </div>
    </div>
  );
}
