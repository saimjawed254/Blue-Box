"use client";

import { Poppins } from "next/font/google";
import "./Reviews.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useLayoutEffect } from "react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReviewCard from "../Cards/ReviewCard";

const poppins = Poppins({subsets:["latin"], weight: ["400"] });

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Reviews() {
  const headerRef = useRef<HTMLDivElement>(null);

  const vwToPx = (vw: number) => (window.innerWidth * vw) / 100;
  const vhToPx = (vh: number) => (window.innerHeight * vh) / 100;

  useGSAP(() => {
    const imgBoxes = document.querySelectorAll(".r-cards");
    const scrollStart = window.innerHeight * 26; // 2600vh
    const scrollEnd = window.innerHeight * 27; // 2700vh
    const scrollRange = scrollEnd - scrollStart;

    const container = document.querySelector(".reviews") as HTMLDivElement;
    if (container) {
      const containerRect = container.getBoundingClientRect();
      const containerCenterX = container.offsetWidth / 2;
      const containerCenterY = container.offsetHeight / 2;

      // Precompute radial direction based on initial DOM layout (not screen position)
      const transforms = Array.from(imgBoxes).map((box) => {
        const el = box as HTMLElement;
        const boxX = el.offsetLeft + el.offsetWidth / 2;
        const boxY = el.offsetTop + el.offsetHeight / 2;

        const dx = boxX - containerCenterX;
        const dy = boxY - containerCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;

        const rawFactor = 1 / distance;
        const movementScale = gsap.utils.clamp(0.8, 4, rawFactor * 2000);

        const x = (dx / distance) * 250 * movementScale;
        const y = (dy / distance) * 250 * movementScale;
        const scale = 1 + movementScale * 0.5;

        return { box, x, y, scale };
      });

      // Apply movement on scroll based on progress
      const updateOnScroll = () => {
        const scrollY = window.scrollY;
        const progress = gsap.utils.clamp(
          0,
          1,
          (scrollY - scrollStart) / scrollRange
        );

        transforms.forEach(({ box, x, y, scale }) => {
          gsap.set(box, {
            x: x * progress,
            y: y * progress,
            scale: 1 + (scale - 1) * progress,
          });
        });

        requestAnimationFrame(updateOnScroll);
      };

      requestAnimationFrame(updateOnScroll);
    }

    const splitLine = document.querySelector(".reviews-header");
    const split = new SplitText(splitLine, {
      type: "lines",
      mask: "lines",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".reviews",
        start: `${vhToPx(2600)}`,
        toggleActions: "play none reverse none",
        invalidateOnRefresh: true,
      },
    });

    tl.from(split.lines[0], {
      rotationX: -100,
      transformOrigin: `50% 50% -${vwToPx(10)}px`,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
    }).from(
      split.lines[1],
      {
        rotationX: -100,
        transformOrigin: `50% 50% -${vwToPx(10)}px`,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
      },
      "<"
    );
  }, []);

  return (
    <section className="reviews">
      <div ref={headerRef} className={`reviews-header ${poppins.className}`}>
        Growing Trust
        <br />
        Building Connections
      </div>

      <div className="reviews-card1 r-cards">
        <div style={{
            scale: 0.75
        }}>
          <ReviewCard />
        </div>
      </div>
      <div className="reviews-card2 r-cards">
        <div style={{
            scale: 1.25
        }}>
          <ReviewCard />
        </div>
      </div>
      <div className="reviews-card3 r-cards">
        <div style={{
            scale: 1.25
        }}>
          <ReviewCard />
        </div>
      </div>
      <div className="reviews-card4 r-cards">
        <div style={{
            scale: 0.5
        }}>
          <ReviewCard />
        </div>
      </div>
      <div className="reviews-card5 r-cards">
        <div style={{
            scale: 0.5
        }}>
          <ReviewCard />
        </div>
      </div>
      <div className="reviews-card6 r-cards">
        <div style={{
            scale: 1
        }}>
          <ReviewCard />
        </div>
      </div>
      <div className="reviews-card7 r-cards">
        <div style={{
            scale: 1.25
        }}>
          <ReviewCard />
        </div>
      </div>
      <div className="reviews-card8 r-cards">
        <div style={{
            scale: 0.5
        }}>
          <ReviewCard />
        </div>
      </div>
      <div className="reviews-card9 r-cards">
        <div style={{
            scale: 0.5
        }}>
          <ReviewCard />
        </div>
      </div>
      <div className="reviews-card10 r-cards">
        <div style={{
            scale: 0.75
        }}>
          <ReviewCard />
        </div>
      </div>
      <div className="reviews-card11 r-cards">
        <div style={{
            scale: 1
        }}>
          <ReviewCard />
        </div>
      </div>
      <div className="reviews-card12 r-cards">
        <div style={{
            scale: 0.5
        }}>
          <ReviewCard />
        </div>
      </div>
    </section>
  );
}
