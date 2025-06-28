"use client";

import { Italiana, Poppins } from "next/font/google";
import "./NACardDown.css";
import Image from "next/image";
import { Product } from "@/src/db/schema/products";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "200", "100"],
});
const italiana = Italiana({ subsets: ["latin"], weight: ["400"] });

type NACardProps = {
  product: Product;
};

export default function NACardDown({ product }: NACardProps) {
  return (
    <>
      <div className="na-card-down">
        <div className="na-card-down-svg center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M19.7987 19.7012L24.612 24.4692L22.352 26.7052L17.5387 21.9385C17.3359 21.737 17.0954 21.5775 16.831 21.469C16.5665 21.3606 16.2832 21.3053 15.9973 21.3065C15.4107 21.3065 14.8693 21.5292 14.456 21.9385L9.64267 26.7065L7.384 24.4692L12.1973 19.7012H19.7987ZM20.6013 18.3279L27.1747 20.0692L28 17.0105L21.4267 15.2679C21.1504 15.1959 20.8911 15.0699 20.6639 14.8971C20.4366 14.7243 20.2459 14.5082 20.1027 14.2612C19.9591 14.0161 19.8659 13.7448 19.8286 13.4631C19.7912 13.1815 19.8105 12.8953 19.8853 12.6212L21.6453 6.11188L18.5573 5.29321L16.7973 11.8052L20.5973 18.3225L20.6013 18.3279ZM11.3987 18.3279L4.82533 20.0692L4 17.0105L10.5733 15.2679C10.8496 15.1959 11.1089 15.0699 11.3361 14.8971C11.5634 14.7243 11.7541 14.5082 11.8973 14.2612C12.0409 14.0161 12.1341 13.7448 12.1714 13.4631C12.2088 13.1815 12.1895 12.8953 12.1147 12.6212L10.3547 6.11188L13.4427 5.29321L15.2027 11.8052L11.4027 18.3225L11.3987 18.3279Z"
              fill="rgb(var(--bronze))"
            />
          </svg>
        </div>
        <Link href={product ? `product/suit?id=${product.product_id}` : '/products/newest-arrivals'}  className="na-card-down-image">
          <Image
          className="na-card-img-up"
            src={product?.image_urls[0] || "/Rem.png"}
            alt=""
            layout="fill"
            objectFit="cover"
            objectPosition="0% 0%"
          />
        </Link>
        <div className={`na-card-down-product-info ${poppins.className}`}>
          <div className="na-card-down-product-price">
            &#x20B9;{product?.price}
          </div>
          <div className="na-card-down-product-options">
            <div
              className="na-card-down-color-options"
              style={{ backgroundColor: "rgb(119,204,0)" }}
            ></div>

            <div
              className="na-card-down-color-options"
              style={{ backgroundColor: "rgb(0,216,249)" }}
            ></div>

            <div
              className="na-card-down-color-options"
              style={{ backgroundColor: "rgb(100, 100, 100)" }}
            ></div>
          </div>
          <div className={`na-card-down-product-company ${italiana.className}`}>
            {product?.brand}
          </div>
          <div className="na-card-down-product-title">{product?.title}</div>
          <div className="na-card-down-product-description">
            {product?.description}
          </div>
        </div>
      </div>
    </>
  );
}
