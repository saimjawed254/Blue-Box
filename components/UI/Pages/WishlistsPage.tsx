"use client";

import "./WishlistsPage.css";
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

type WishlistsPageProps = {
  wishlistData: Product[];
};

gsap.registerPlugin(ScrollTrigger)
export default function WishlistsPage({ wishlistData }: WishlistsPageProps) {
  const [products, setProducts] = useState(wishlistData);

  useEffect(() => {
    const cols = document.querySelectorAll(".wp-cards");
    cols.forEach((col) => {
      const speed = parseFloat(col.getAttribute("data-speed") || "1");

      gsap.fromTo(
        col,
        { y: 0 },
        {
          y: -(window.innerHeight * speed),
          ease: "none",
          scrollTrigger: {
            trigger: ".wp-cards-wrapper",
            start: "top 12.5%",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.trigger?.classList.contains("wp-cards-wrapper"))
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
      <section className={`wishlists-products ${poppins.className}`}>
        <div className="wp-content">
          <div className="wp-top-buffer">Wishlisted Products</div>
          <div className="wp-cards-wrapper">
            {columns.map((col, i) => (
              <div key={i} className="wp-cards" data-speed={i % 2 === 0 ? 1.0 : 1.5}>
                {col.map((product) => (
                  <ProductCard key={product.product_id} product={product} />
                ))}
              </div>
            ))}
          </div>
          <div className="wp-footer-space"></div>
        </div>
      </section>
    </>
  );
}
