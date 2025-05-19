"use client";

import { useEffect } from "react";
import "./Background.css";
import { Orbitron } from "next/font/google";

export const orbitron = Orbitron({ subsets: ["latin"], weight: ["700"] });

export default function GradientBG() {
  useEffect(() => {
    const interBubble : HTMLElement | null = document.querySelector(".primary-interactive-cursor");
    console.log(window.innerHeight,window.innerWidth);

    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    function move3() {
      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;
      if (interBubble) {
        interBubble.style.transform = `translate(${Math.round(
          curX
        )}px, ${Math.round(curY)}px)`;
      }
      requestAnimationFrame(() => {
        move3();
      });
    }

    window.addEventListener("mousemove", (event) => {
      tgX = event.clientX;
      tgY = event.clientY;
      console.log(tgX, tgY);
      move3();
    });
  }, []);

  return (
    <>
      <div className="primary-gradient-bg">
        <svg xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        <div className="primary-gradients-container">
          <div className="pgc1"></div>
          <div className="pgc2"></div>
          <div className="pgc3"></div>
          <div className="pgc4"></div>
          <div className="pgc5"></div>
          <div className="primary-interactive-cursor"></div>
        </div>
      </div>
      <div className={`primary-text-bg ${orbitron.className}`}>
        {[...Array(13)].map((_, index) => (
          <div key={index} className="primary-text-container">
            <div className="primary-text">BLUE BOX B</div>
          </div>
        ))}
      </div>
    </>
  );
}
