"use client";

import "./page.css";
import ProductsSidebar from "@/components/UI/ProductsSideBar";
import ProductCard from "@/components/UI/Cards/ProductCard";
import { useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Page() {
  function vwToPx(e: number) {
    return (window.innerWidth * e) / 100;
  }
  function vhToPx(e: number) {
    return (window.innerHeight * e) / 100;
  }
  useEffect(() => {
    const totalHeight = document.documentElement.scrollHeight;
    console.log("Total scrollable page height:", totalHeight, vhToPx(90));

    if (typeof window !== "undefined") {
      const sidebar = document.querySelector(
        ".products-sidebar"
      ) as HTMLElement;
      const footer = document.querySelector(".footer");
      const products = document.querySelector(".products") as HTMLElement;
      const sidebarBg = document.querySelector(
        ".products-page-sidebar"
      ) as HTMLElement;

      if (products && sidebarBg) {
        console.log(products.clientHeight);
        sidebarBg.style.height = `${products.clientHeight}`;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && sidebar) {
            sidebar.style.position = "absolute";
            sidebar.style.top = `${totalHeight - Math.round(vhToPx(190))}px`;
          } else {
            sidebar.style.position = "fixed";
            sidebar.style.top = "0px";
          }
        },
        {
          root: null, // viewport
          threshold: 0,
        }
      );

      if (footer) observer.observe(footer);

      return () => {
        if (footer) observer.unobserve(footer);
      };
    }
  }, []);

  useGSAP(() => {
    // gsap.registerPlugin(ScrollTrigger);
    //     const trigger = ScrollTrigger.create({
    //   trigger: ".products", // or sidebarRef.current.parentElement
    //   start: "top 0",
    //   endTrigger: ".pp-footer-space", // acts as a stop before footer
    //   end: "bottom bottom",
    //   pin: ".products-page-sidebar",
    //   pinSpacing: false,
    //   markers:true,
    //   // scrub: true,
    // });
  });
  return (
    <>
      <section className="products">
        <div className="products-page-sidebar">
          {/* <ProductsSidebar slug={`best-sellers`} /> */}
        </div>
        <div className="products-content">
          <div className="pp-header"></div>
          <div className="pp-cards">
            <div className="pp-card">
              <ProductCard />
            </div>
            <div className="pp-card">
              <ProductCard />
            </div>
            <div className="pp-card">
              <ProductCard />
            </div>
            <div className="pp-card">
              <ProductCard />
            </div>
            <div className="pp-card">
              <ProductCard />
            </div>
            <div className="pp-card">
              <ProductCard />
            </div>
            <div className="pp-card">
              <ProductCard />
            </div>
            <div className="pp-card">
              <ProductCard />
            </div>
            <div className="pp-card">
              <ProductCard />
            </div>
            <div className="pp-card">
              <ProductCard />
            </div>
            <div className="pp-card">
              <ProductCard />
            </div>
            <div className="pp-card">
              <ProductCard />
            </div>
            <div className="pp-card">
              <ProductCard />
            </div>
          </div>
          <div className="pp-footer-space"></div>
        </div>
      </section>
    </>
  );
}
