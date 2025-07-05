"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.5,
      touchMultiplier: 0.5,
    });

    // Sync ScrollTrigger on every Lenis scroll
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // Tell ScrollTrigger how to handle Lenis' scroll position
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value?: number) {
        if (typeof value === "number") {
          lenis.scrollTo(value);
        }
        return window.scrollY;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.body.style.transform ? "transform" : "fixed",
    });

    // Start Lenis raf loop
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // Refresh ScrollTrigger once Lenis is ready
    ScrollTrigger.addEventListener("refresh", () =>
      lenis.raf(performance.now())
    );
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll()
        .filter((trigger) => trigger.scroller === document.body)
        .forEach((trigger) => trigger.kill());
    };
  }, []);
}
