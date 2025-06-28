"use client";

import { Poppins } from "next/font/google";
import "./ProductCard.css";
import Image from "next/image";
import { Product } from "@/src/db/schema/products";
import { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { user, isSignedIn, isLoaded } = useUser();
  const [isAdding, setIsAdding] = useState(true);
  const router = useRouter();
  const wishlistIconRef = useRef<HTMLDivElement>(null);

  const clerk_id = user?.id;
  const { product_id, color, size } = product;

  useEffect(() => {
    if (!isLoaded) {
      return;
    }
    const fetchIsWishlist = async () => {
      try {
        const res = await fetch(
          `/api/wishlist?clerk_id=${clerk_id}&product_id=${product_id}`
        );
        const data = await res.json();
        if (data.length > 0) {
          wishlistIconRef.current?.classList.add("product-wishlist-icon-pink");
          setIsAdding(!isAdding);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchIsWishlist();
  }, [isLoaded, user?.id]);
  const handleAddToWishlist = async () => {
    if (!isSignedIn) {
      router.push("/sign-in");
    }
    if (isAdding) {
      wishlistIconRef.current?.classList.add("product-wishlist-icon-pink");
      setIsAdding(!isAdding);
      try {
        const res = await fetch("/api/wishlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ clerk_id, product_id, color, size }),
        });

        const data = await res.json();
        console.log("Wishlist", data);

        if (!res.ok) throw new Error(data.error || "Failed to add to wishlist");
        return data;
      } catch (err) {
        console.log("Add to wishlist error:", err);
        throw err;
      }
    } else {
      wishlistIconRef.current?.classList.remove("product-wishlist-icon-pink");
      setIsAdding(!isAdding);
      try {
        const res = await fetch("/api/wishlist", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ clerk_id, product_id, color, size }),
        });

        const data = await res.json();
        console.log("Wishlist", data);

        if (!res.ok)
          throw new Error(data.error || "Failed to delete from wishlist");
        return data;
      } catch (err) {
        console.log("Remove from wishlist error:", err);
        throw err;
      }
    }
  };

  return (
    <>
      <div className="product-card center">
        <Link
          href={`/product/cargo?id=${product.product_id}`}
          className="product-image"
        >
          <Image
            src={product.image_urls[0]}
            alt=""
            layout="fill"
            objectFit="contain"
          />
        </Link>
        <div className={`product-info ${poppins.className}`}>
          <div className="product-company">{product.brand}</div>
          <div className="product-quantity center">
            Qty:&nbsp;{product.quantity}
          </div>
          <div className="product-title">{product.title}</div>
          <div className="product-price">
            <span className="product-price-discounted">
              &#x20B9;{product.price}&nbsp;&nbsp;&nbsp;
            </span>
            <span className="product-price-original">
              &#x20B9;{product.mrp}{" "}
            </span>
            <span className="product-discount">
              &nbsp;&nbsp;&nbsp;{product.discount}% off
            </span>
          </div>
          <div className="product-options">
            <div
              className="color-options"
              style={{ backgroundColor: "rgb(119,204,0)" }}
            ></div>

            <div
              className="color-options"
              style={{ backgroundColor: "rgb(0,216,249)" }}
            ></div>

            <div
              className="color-options"
              style={{ backgroundColor: "rgb(100, 100, 100)" }}
            ></div>
          </div>
          <div className="product-wishlist center">
            <div
              onClick={handleAddToWishlist}
              className="product-wishlist-icon center"
              ref={wishlistIconRef}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 28 25"
                fill="none"
              >
                <path
                  d="M14.1565 6.41781L13.5327 7.01852C13.6135 7.10237 13.7104 7.16907 13.8176 7.21462C13.9248 7.26018 14.04 7.28366 14.1565 7.28366C14.2729 7.28366 14.3882 7.26018 14.4954 7.21462C14.6026 7.16907 14.6995 7.10237 14.7803 7.01852L14.1565 6.41781ZM8.38162 19.0326C8.20392 18.8865 7.97544 18.8169 7.74645 18.8392C7.51746 18.8616 7.30671 18.9739 7.16057 19.1516C7.01442 19.3293 6.94486 19.5578 6.96717 19.7868C6.98948 20.0158 7.10185 20.2265 7.27955 20.3727L8.38162 19.0326ZM2.99952 15.5566C3.05413 15.6564 3.12787 15.7445 3.21653 15.8159C3.30518 15.8872 3.40702 15.9403 3.51622 15.9723C3.62542 16.0043 3.73985 16.0144 3.85297 16.0022C3.9661 15.9899 4.0757 15.9555 4.17552 15.9009C4.27534 15.8463 4.36343 15.7725 4.43475 15.6839C4.50607 15.5952 4.55923 15.4934 4.5912 15.3842C4.62317 15.275 4.63331 15.1605 4.62106 15.0474C4.6088 14.9343 4.57438 14.8247 4.51977 14.7249L2.99952 15.5566ZM3.47084 10.6193C3.47084 8.1356 4.87442 6.05161 6.7909 5.17481C8.65309 4.32343 11.1553 4.54869 13.5327 7.01852L14.7803 5.81826C11.9616 2.88751 8.68543 2.40348 6.07005 3.59911C3.51243 4.76933 1.73804 7.48637 1.73804 10.6193H3.47084ZM10.1098 22.5907C10.7024 23.0574 11.3378 23.5541 11.9812 23.9307C12.6247 24.3073 13.3594 24.6123 14.1565 24.6123V22.8795C13.7984 22.8795 13.3779 22.7408 12.8557 22.4347C12.3324 22.1297 11.7906 21.7092 11.183 21.2298L10.1098 22.5907ZM18.2032 22.5907C19.8505 21.2911 21.9576 19.8032 23.6095 17.9421C25.2926 16.0476 26.5749 13.6991 26.5749 10.6193H24.8421C24.8421 13.1584 23.8024 15.1142 22.3145 16.7915C20.7954 18.5012 18.8813 19.8494 17.13 21.2298L18.2032 22.5907ZM26.5749 10.6193C26.5749 7.48637 24.8017 4.76933 22.2429 3.59911C19.6275 2.40348 16.3537 2.88751 13.5327 5.8171L14.7803 7.01852C17.1577 4.54985 19.6599 4.32343 21.5221 5.17481C23.4385 6.05161 24.8421 8.13444 24.8421 10.6193H26.5749ZM17.13 21.2298C16.5223 21.7092 15.9805 22.1297 15.4572 22.4347C14.9339 22.7397 14.5146 22.8795 14.1565 22.8795V24.6123C14.9536 24.6123 15.6883 24.3061 16.3317 23.9307C16.9763 23.5541 17.6105 23.0574 18.2032 22.5907L17.13 21.2298ZM11.183 21.2298C10.2634 20.5055 9.32888 19.8124 8.38162 19.0326L7.27955 20.3727C8.23837 21.1617 9.25264 21.9149 10.1098 22.5907L11.183 21.2298ZM4.51977 14.726C3.82379 13.4697 3.46258 12.0555 3.47084 10.6193H1.73804C1.73804 12.5115 2.22322 14.1369 2.99952 15.5566L4.51977 14.726Z"
                  fill="black"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
