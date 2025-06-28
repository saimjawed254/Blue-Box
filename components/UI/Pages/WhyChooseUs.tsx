"use client";

import { Bruno_Ace, IBM_Plex_Mono, Italiana, Poppins } from "next/font/google";
import "./WhyChooseUs.css";
import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/all";

const poppins = Poppins({subsets:["latin"], weight: ["300", "400", "500"] });
const bruno_ace = Bruno_Ace({subsets:["latin"], weight: ["400"] });
const italiana = Italiana({subsets:["latin"], weight: ["400"] });

gsap.registerPlugin(ScrollTrigger);

export default function WhyChooseUs() {
  const vwToPx = (vw: number) => (window.innerWidth * vw) / 100;
  const vhToPx = (vh: number) => (window.innerHeight * vh) / 100;

  const [svgSize, setSvgSize] = useState(20);
  useEffect(() => {
    if (typeof window !== "undefined") {
    const vwToPx = (vw: number) => (window.innerWidth * vw) / 100;
    const vhToPx = (vh: number) => (window.innerHeight * vh) / 100;
    setSvgSize(vwToPx(2.4));
    }
  }, []);

  useGSAP(() => {
    const items = [
      { selector: ".wcu-image-landscape", offset: 0 },
      { selector: ".wcu-image-portrait", offset: vwToPx(30) },
      { selector: ".wcu-button-explore", offset: vwToPx(41.25) },
    ];

    items.forEach(({ selector, offset }, index) => {
      const el = document.querySelector(selector);
      const img = el?.querySelector(".wcu-image");

      // Animate into place (final position in grid)
      gsap.to(el, {
        x: -offset,
        scrollTrigger: {
          trigger: ".why-choose-us", // adjust to your scroll section
          start: "top bottom",
          end: "bottom center",
          scrub: true,
        },
        ease: "power2.inOut",
      });

      if (img) {
        gsap.set(img, {
          scale: 1.5,
          transformOrigin: "90% 0%",
        });
        gsap.to(img, {
          x: offset === 0 ? items[index + 1].offset * 0.2 : offset * 0.2,
          scrollTrigger: {
            trigger: ".why-choose-us",
            start: "top bottom",
            end: "bottom center",
            scrub: true,
          },
          ease: "none",
        });
      }
    });

    gsap.to(".wcu-marquee-text", {
      yPercent: -100,
      duration: 5,
      ease: "linear",
      repeat: -1,
    });

    ScrollTrigger.refresh();
  });

  return (
    <>
      <section className={`why-choose-us ${poppins.className}`}>
        <div className="wcu-left-text-box">
          Your AI Powered wardrobe is here. Bluebox brings you curated fashion,
          bold drops, and trusted delivery — from Patna to your doorstep. Try
          on. Stand out. Repeat.
        </div>
        <div className="wcu-left-ai-text-box center">
          <div>
            <div className="wcu-left-ai-try-on">AI Virtual Try On</div>
            <div className="wcu-left-ai-try-on-text">
              Not sure how it’ll look on you? Bluebox makes it easy. With our
              AI-powered Virtual Try-On, you can see outfits on yourself in real
              time — no more guessing, no more returns. Try different styles,
              colors, and fits instantly and make the right choice with
              confidence.
            </div>
          </div>
          <div>
            <div className="wcu-left-ai-search">AI Powered Search</div>
            <div className="wcu-left-ai-search-text">
              Looking for something specific? Just describe it. Our AI Search
              understands what you mean — from “oversized beige hoodie” to
              “Patna-ready ethnic wear” — and finds it fast. No filters, just
              results.
            </div>
          </div>
        </div>
        <div className={`wcu-right-text-box ${italiana.className}`}>
          <div className="wcu-right-text-box-item center">
            Handpicked Products &nbsp;&nbsp;&nbsp;
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={`${svgSize*1.6}`}
              height="2"
              viewBox="0 0 77 2"
              fill="none"
            >
              <path d="M77 1H0" stroke="black" strokeWidth="2" />
            </svg>
          </div>

          <div className="wcu-right-text-box-item center">
            COD available within Patna &nbsp;&nbsp;&nbsp;
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={`${svgSize*1.6}`}
              height="2"
              viewBox="0 0 77 2"
              fill="none"
            >
              <path d="M77 1H0" stroke="black" strokeWidth="2" />
            </svg>
          </div>
          <div className="wcu-right-text-box-item center">
            Free Delivery across Patna &nbsp;&nbsp;&nbsp;
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={`${svgSize*1.6}`}
              height="2"
              viewBox="0 0 77 2"
              fill="none"
            >
              <path d="M77 1H0" stroke="black" strokeWidth="2" />
            </svg>
          </div>
          <div className="wcu-right-text-box-item center">
            All India delivery &nbsp;&nbsp;&nbsp;
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={`${svgSize*1.6}`}
              height="2"
              viewBox="0 0 77 2"
              fill="none"
            >
              <path d="M77 1H0" stroke="black" strokeWidth="2" />
            </svg>
          </div>
        </div>
        <div className="wcu-marquee">
          <div className={`wcu-marquee-text ${italiana.className}`}>
            Why Choose Us? Why Choose Us?&nbsp;
          </div>
        </div>
        <div className="wcu-image-landscape">
          <Image
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            className="wcu-image"
            src={"/mark-adriane-1533MrY5liQ-unsplash.jpg"}
            alt=""
            fill
          />
        </div>
        <div className="wcu-image-portrait">
          <Image
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            className="wcu-image"
            src={"/wilson-montoya-LP-MzWsvLd0-unsplash.jpg"}
            alt=""
            fill
          />
        </div>
        <div className="wcu-button-explore">
          <div className="wcu-button">
            <div className={`wcu-button-text center ${bruno_ace.className}`}>
              EXPLORE
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
