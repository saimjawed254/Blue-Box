"use client";

import Image from "next/image";
import "./page.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useEffect, useState } from "react";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import LocomotiveScroll from "locomotive-scroll";

export default function Home() {
  gsap.registerPlugin(SplitText, ScrollTrigger, DrawSVGPlugin);

  const [toggle, setToggle] = useState(true);

  const vwToPx = (vwValue: number) => {
    if (typeof window !== "undefined")
      return (window.innerWidth * vwValue) / 100;
    return 0;
  };
  const vhToPx = (vhValue: number) => {
    if (typeof window !== "undefined")
      return (window.innerHeight * vhValue) / 100;
    return 0;
  };

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();

    const htp1: Element | null = document.querySelector(".home-tagline-part1");
    const htp2: Element | null = document.querySelector(".home-tagline-part2");
    const htp3: Element | null = document.querySelector(
      ".home-tagline-split-part1"
    );
    const htp4: Element | null = document.querySelector(
      ".home-tagline-split-part2"
    );

    let svg = document.querySelector(".home-hero-vector-path");
    console.log(svg);
    let path = svg?.querySelector("path");
    path?.setAttribute("stroke-width", vwToPx(2).toString());
    console.log(path);
    const pathLength = path?.getTotalLength();

    console.log(pathLength);

    const tl1 = gsap.timeline();
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: path,
        start: "top top",
        end: "bottom center",
        scrub: 2,
      },
    });
    const tl3 = gsap.timeline({
      repeat: -1,
    });

    // gsap.fromTo(
    //   vectorPath,
    //   { strokeDasharray: "1000", strokeDashoffset: "1000" }, // Start fully hidden
    //   { strokeDashoffset: "0", duration: 2, ease: "power2.out" , fill: "#00d8f9"}
    // );

    if (path) {
      tl2.set(svg, {
        visibility: "visible",
      });
      tl2.set(path, {
        strokeDasharray: pathLength,
      });

      tl2.fromTo(
        path,
        { strokeDashoffset: pathLength },
        {
          strokeDashoffset: 0,
          ease: "power2.out",
        }
      );
    }

    //     gsap.fromTo(
    //   vectorPath,
    //   { strokeDasharray: pathLength, strokeDashoffset: "1000" }, // Start fully hidden
    //   { strokeDashoffset: "0", duration: 2, ease: "power2.out" , fill: "#00d8f9"}
    // );

    let splithtp1 = SplitText.create(htp1, {
      type: "lines",
      mask: "lines",
      preserveWhitespace: true,
    });

    let splithtp2 = SplitText.create(htp2, {
      type: "lines",
      mask: "lines",
      preserveWhitespace: true,
    });

    let splithtp3 = SplitText.create(htp3, {
      type: "lines",
      // mask: "lines",
      preserveWhitespace: true,
    });

    let splithtp4 = SplitText.create(htp4, {
      type: "lines",
      // mask: "lines",
      preserveWhitespace: true,
    });

    tl1.set(".home-tagline", {
      visibility: "visible",
    });
    tl1
      .addLabel("htp1-start")
      .from(splithtp1.lines[0], {
        rotationX: -100,
        transformOrigin: () => `50% 50% -${vwToPx(10)}px`,
        opacity: 0,
        duration: 1.5,
        ease: "power3",
        // stagger: 4,
      })
      .addLabel("htp2-start")
      .from(
        splithtp2.lines[0],
        {
          rotationX: 100,
          transformOrigin: () => `50% 50% -${vwToPx(10)}px`,
          opacity: 0,
          duration: 1.5,
          ease: "power3",
          // stagger: 4,
        },
        "<"
      )
      .addLabel("htp3-start")
      .from(
        splithtp3.lines[0],
        {
          rotationX: -100,
          transformOrigin: () => `50% 50% -${vwToPx(10)}px`,
          opacity: 0,
          duration: 1,
          ease: "power3",
          // stagger: 4,
        },
        "-=1"
      )
      .addLabel("htp4-start")
      .from(
        splithtp4.lines[0],
        {
          rotationX: 100,
          transformOrigin: () => `50% 50% -${vwToPx(10)}px`,
          opacity: 0,
          duration: 1,
          ease: "power3",
          // stagger: 4,
        },
        "<"
      )
      .addLabel("htp1-moveRight")
      .to(splithtp1.lines[0], {
        x: () => `${vwToPx(8)}`,
        duration: 0.5,
        ease: "power3.out",
      })
      .addLabel("htp34-moveRight")
      .to(splithtp3.lines[0], {
        x: vwToPx(12),
        duration: 0.8,
        ease: "power4.out",
      })
      .to(
        splithtp4.lines[0],
        {
          x: vwToPx(12),
          duration: 0.8,
          ease: "power4.out",
        },
        "-=0.9"
      );

    window.addEventListener("scroll", () => {
      const currentScroll = window.scrollY;

      if (currentScroll > vhToPx(15)) {
        tl1.timeScale(2).reverse(); // Scroll down → Reverse timeline
      } else {
        tl1.play(); // Scroll up → Play forward
      }
    });

    tl3.to(".marquee-one",{
      x: `-${vwToPx(100)}px`,
      duration: 20,
      ease:"none",
      stagger:2,
    }).set(".marquee-one",{
      x: `${vwToPx(100)}px`
    })
    
    tl3.to(".marquee-two",{
      x: `-${vwToPx(100)}px`,
      duration: 20,
      ease:"none",
      stagger:2,
    },"-=20").set(".marquee-two",{
      x: `${vwToPx(100)}px`
    })

  }, [toggle]);

  return (
    <>
      <svg
        className="home-hero-vector-path"
        xmlns="http://www.w3.org/2000/svg"
        width="2037"
        height="880"
        viewBox="0 0 2037 880"
        fill="none"
      >
        <path
          d="M-52.7903 20C117.876 75.8333 435.41 282.4 340.21 662C297.876 807.167 155.71 1059.9 -74.2903 909.5C-304.29 759.1 44.2097 568.833 247.21 492.5C342.376 458.833 563.934 436.246 652.5 575C742.5 716 873.5 710 932 674.5C1085.83 577.167 1262.71 364.5 1363.21 516C1419.26 600.5 1646.71 791 1767.21 745.5C1792.21 737 1874 701.8 1938 613C2002 524.2 2088.67 675 2098 745.5"
          stroke="#00D8F9"
          strokeWidth="0"
          strokeLinecap="round"
        />
      </svg>

      <div className="home-hero">
        <div className="home-grid-hero">
          <div className="home-tagline">
            <span className="home-tagline-part1">LATEST STYLES</span>
            <span className="home-tagline-split">
              <span className="home-tagline-split-part1">BEYOND</span>&nbsp;
              <span className="home-tagline-split-part2">
                VISIONS <br />
              </span>
            </span>
            <span className="home-tagline-part2">WITHIN&nbsp;REACH</span>
          </div>
          <div className="home-highlighted-product">
            <div className="home-highlighted-product-container1">
              <Image
                className="home-highlighted-product-bg"
                src="/pexels-jos-penaran-927928177-27240488.jpg"
                alt=""
                width={709}
                height={1013}
                quality={100}
                priority
              />
            </div>
            <div className="home-highlighted-product-container2">
              <Image
                className="home-highlighted-product-png"
                src="/Bluebox4.png"
                alt=""
                width={709}
                height={1013}
                quality={100}
                priority
              />
            </div>
          </div>
          <div className="home-highlighted-ratings">
            <div className="home-highlighted-ratings-text">
              <div className="home-highlighted-ratings-text-numbers">15+</div>
              Indian Brands
            </div>
            <div className="home-highlighted-ratings-divider">|</div>
            <div className="home-highlighted-ratings-text">
              <div className="home-highlighted-ratings-text-numbers">200+</div>
              Quality Products
            </div>
            <div className="home-highlighted-ratings-divider">|</div>
            <div className="home-highlighted-ratings-text">
              <div className="home-highlighted-ratings-text-numbers">329+</div>
              Happy Customers
            </div>
          </div>
          <div className="home-shop-now-button">Shop Now!</div>
          <div className="home-tagline-text">
            Elevate your style with trend-setting fashion that blends comfort
            and confidence! Discover premium clothing designed to make every
            look effortlessly stand out. Shop now and redefine your wardrobe
            with innovation and timeless designs.
          </div>
          <div className="home-footer-banner-png">
            <Image
              className="rem-png"
              src="/Rem.png"
              alt="Rem Icon"
              width={80}
              height={155}
              quality={100}
              priority
            />
          </div>
          <div className="home-footer-banner">
            <div className="marquee">
              <div className="marquee-one">&nbsp;&nbsp;&nbsp;Fashion that speaks for you&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fashion that speaks for you&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fashion that speaks for you&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fashion that speaks for you&nbsp;&nbsp;&nbsp;</div>
              <div className="marquee-two">&nbsp;&nbsp;&nbsp;Fashion that speaks for you&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fashion that speaks for you&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fashion that speaks for you&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fashion that speaks for you&nbsp;&nbsp;&nbsp;</div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer"></div>
    </>
  );
}
