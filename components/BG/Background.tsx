"use client";

import gsap from "gsap/all";
import { useGSAP } from "@gsap/react";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import "./Background.css";

export default function GradientBG() {
    useGSAP(()=>{
    gsap.registerPlugin(ScrollTrigger)

    gsap.to(".bg-cover",{
      scale: 1.05,
      scrollTrigger:{
        trigger:".background",
        start:`top top`,
        end: 'bottom top',
        scrub:1,
        invalidateOnRefresh: false,
      }
    })
  })
  return (
    <>
      <section className="background">
        <div className="bg-cover">
          <div className="bg-mask-gradient"></div>
        </div>
      </section>
    </>
  );
}
