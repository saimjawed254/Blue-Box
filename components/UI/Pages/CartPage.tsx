"use client";

import "./CartPage.css";
import ProductCard from "@/components/UI/Cards/ProductCard";
import { useEffect, useMemo, useState } from "react";
import { Poppins } from "next/font/google";
import { Product } from "@/src/db/schema/products";
import { useLenis } from "@/components/lenis/useLenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "400", "200", "100"],
});

type CartPageProps = {
  cartData: Product[];
};

gsap.registerPlugin(ScrollTrigger)
export default function CartPage({ cartData }: CartPageProps) {
  const [products, setProducts] = useState(cartData);

  useEffect(() => {
    const cols = document.querySelectorAll(".cp-cards");
    cols.forEach((col) => {
      const speed = parseFloat(col.getAttribute("data-speed") || "1");

      gsap.fromTo(
        col,
        { y: 0 },
        {
          y: -(window.innerHeight * speed),
          ease: "none",
          scrollTrigger: {
            trigger: ".cp-cards-wrapper",
            start: "top 12.5%",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.trigger?.classList.contains("cp-cards-wrapper"))
        .forEach((t) => t.kill());
    };
  }, [products]);

const columns = useMemo(() => {
  const result = [[], [], [], [], []] as Product[][];

  products?.forEach((product, index) => {
    result[index % 5].push(product);
  });

  return result;
}, [products]);


  useLenis();

  return (
    <>
      <section className={`cart-products ${poppins.className}`}>
        <div className="cp-content">
          <div className="cp-top-buffer">Cart Items</div>
          <div className="cp-cards-wrapper">
            {columns.map((col, i) => (
              <div key={i} className="cp-cards" data-speed={i % 2 === 0 ? 1.0 : 1.5}>
                {col.map((product) => (
                  <ProductCard key={product.product_id} product={product} />
                ))}
              </div>
            ))}
          </div>
          <div className="cp-footer-space"></div>
        </div>
      </section>
    </>
  );
}
