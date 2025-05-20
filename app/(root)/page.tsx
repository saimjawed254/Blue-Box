"use client";

import Image from "next/image";
import "./page.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useEffect, useState } from "react";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import LocomotiveScroll from "locomotive-scroll";
import { Orbitron, Poppins } from "next/font/google";

export const orbitron = Orbitron({ subsets: ["latin"], weight: ["400"] });
export const poppins = Poppins({ subsets: ["latin"], weight: ["400", "300"] });

export default function Home() {
  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  }, []);

  return (
    <>
      <main className={`${poppins.className}`}>
        <div className="hero-ll">
          <div className="hero-ll-head">
            Beyond Fashion <br />
            &nbsp;&nbsp;&nbsp;&nbsp;—Built for You.
          </div>
          <div className="hero-ll-points1">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d="M19.7987 19.7013L24.612 24.4693L22.352 26.7053L17.5387 21.9387C17.3359 21.7371 17.0954 21.5776 16.831 21.4691C16.5665 21.3607 16.2832 21.3055 15.9973 21.3067C15.4107 21.3067 14.8693 21.5293 14.456 21.9387L9.64267 26.7067L7.384 24.4693L12.1973 19.7013H19.7987ZM20.6013 18.328L27.1747 20.0693L28 17.0107L21.4267 15.268C21.1504 15.196 20.8911 15.07 20.6639 14.8972C20.4366 14.7244 20.2459 14.5083 20.1027 14.2613C19.9591 14.0162 19.8659 13.7449 19.8286 13.4633C19.7912 13.1816 19.8105 12.8954 19.8853 12.6213L21.6453 6.112L18.5573 5.29333L16.7973 11.8053L20.5973 18.3227L20.6013 18.328ZM11.3987 18.328L4.82533 20.0693L4 17.0107L10.5733 15.268C10.8496 15.196 11.1089 15.07 11.3361 14.8972C11.5634 14.7244 11.7541 14.5083 11.8973 14.2613C12.0409 14.0162 12.1341 13.7449 12.1714 13.4633C12.2088 13.1816 12.1895 12.8954 12.1147 12.6213L10.3547 6.112L13.4427 5.29333L15.2027 11.8053L11.4027 18.3227L11.3987 18.328Z"
                  fill="black"
                />
              </svg>
            </span>
            <span>&nbsp;200+&nbsp;</span>
            <span>Products</span>
          </div>
          <div className="hero-ll-points2">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d="M19.7987 19.7013L24.612 24.4693L22.352 26.7053L17.5387 21.9387C17.3359 21.7371 17.0954 21.5776 16.831 21.4691C16.5665 21.3607 16.2832 21.3055 15.9973 21.3067C15.4107 21.3067 14.8693 21.5293 14.456 21.9387L9.64267 26.7067L7.384 24.4693L12.1973 19.7013H19.7987ZM20.6013 18.328L27.1747 20.0693L28 17.0107L21.4267 15.268C21.1504 15.196 20.8911 15.07 20.6639 14.8972C20.4366 14.7244 20.2459 14.5083 20.1027 14.2613C19.9591 14.0162 19.8659 13.7449 19.8286 13.4633C19.7912 13.1816 19.8105 12.8954 19.8853 12.6213L21.6453 6.112L18.5573 5.29333L16.7973 11.8053L20.5973 18.3227L20.6013 18.328ZM11.3987 18.328L4.82533 20.0693L4 17.0107L10.5733 15.268C10.8496 15.196 11.1089 15.07 11.3361 14.8972C11.5634 14.7244 11.7541 14.5083 11.8973 14.2613C12.0409 14.0162 12.1341 13.7449 12.1714 13.4633C12.2088 13.1816 12.1895 12.8954 12.1147 12.6213L10.3547 6.112L13.4427 5.29333L15.2027 11.8053L11.4027 18.3227L11.3987 18.328Z"
                  fill="black"
                />
              </svg>
            </span>
            <span>&nbsp;128&nbsp;</span>
            <span>Happy Customers</span>
          </div>
          <div className="hero-ll-text">
            Uncompromising quality, effortless versatility, and statement-making
            designs
          </div>
          <div className="hero-ll-svg center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="68"
              height="70"
              viewBox="0 0 68 70"
              fill="none"
            >
              <path
                d="M0.00012207 0L0.000244141 70H67.0693L0.00012207 0Z"
                fill="#F0F1FA"
                fill-opacity="0.4"
              />
            </svg>
          </div>
        </div>
        <div className="hero-ml">
          <div className="hero-ml-head">We sell Men’s Cargo.</div>
          <div className="hero-ml-text">
            Utility Meets Edge <br /> <br />
            Dynamic fits, rugged function, and street-ready impact for your
            everyday bold moves
          </div>
          <div className="hero-ml-svg center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="68"
              height="70"
              viewBox="0 0 68 70"
              fill="none"
            >
              <path
                d="M0.00012207 0L0.000244141 70H67.0693L0.00012207 0Z"
                fill="#F0F1FA"
                fill-opacity="0.4"
              />
            </svg>
          </div>
        </div>
        <div className="hero-mr">
          <div className="hero-mr-head">We sell Men’s Cargo.</div>
          <div className="hero-mr-text">
            Utility Meets Edge <br /> <br />
            Dynamic fits, rugged function, and street-ready impact for your
            everyday bold moves
          </div>
          <div className="hero-mr-svg center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="68"
              height="70"
              viewBox="0 0 68 70"
              fill="none"
            >
              <path
                d="M67.0692 0L67.0691 70H0L67.0692 0Z"
                fill="#F0F1FA"
                fill-opacity="0.4"
              />
            </svg>
          </div>
        </div>
        <div className="hero-rr">
          <div className="hero-rr-head">
            Beyond Fashion <br />
            &nbsp;&nbsp;&nbsp;&nbsp;—Built for You.
          </div>
          <div className="hero-rr-points1">
            <span>&nbsp;200+&nbsp;</span>
            <span>Products&nbsp;</span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d="M19.7987 19.7013L24.612 24.4693L22.352 26.7053L17.5387 21.9387C17.3359 21.7371 17.0954 21.5776 16.831 21.4691C16.5665 21.3607 16.2832 21.3055 15.9973 21.3067C15.4107 21.3067 14.8693 21.5293 14.456 21.9387L9.64267 26.7067L7.384 24.4693L12.1973 19.7013H19.7987ZM20.6013 18.328L27.1747 20.0693L28 17.0107L21.4267 15.268C21.1504 15.196 20.8911 15.07 20.6639 14.8972C20.4366 14.7244 20.2459 14.5083 20.1027 14.2613C19.9591 14.0162 19.8659 13.7449 19.8286 13.4633C19.7912 13.1816 19.8105 12.8954 19.8853 12.6213L21.6453 6.112L18.5573 5.29333L16.7973 11.8053L20.5973 18.3227L20.6013 18.328ZM11.3987 18.328L4.82533 20.0693L4 17.0107L10.5733 15.268C10.8496 15.196 11.1089 15.07 11.3361 14.8972C11.5634 14.7244 11.7541 14.5083 11.8973 14.2613C12.0409 14.0162 12.1341 13.7449 12.1714 13.4633C12.2088 13.1816 12.1895 12.8954 12.1147 12.6213L10.3547 6.112L13.4427 5.29333L15.2027 11.8053L11.4027 18.3227L11.3987 18.328Z"
                  fill="#F0F1FA"
                />
              </svg>
            </span>
          </div>
          <div className="hero-rr-points2">
            <span>&nbsp;128&nbsp;</span>
            <span>Happy Customers&nbsp;</span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d="M19.7987 19.7013L24.612 24.4693L22.352 26.7053L17.5387 21.9387C17.3359 21.7371 17.0954 21.5776 16.831 21.4691C16.5665 21.3607 16.2832 21.3055 15.9973 21.3067C15.4107 21.3067 14.8693 21.5293 14.456 21.9387L9.64267 26.7067L7.384 24.4693L12.1973 19.7013H19.7987ZM20.6013 18.328L27.1747 20.0693L28 17.0107L21.4267 15.268C21.1504 15.196 20.8911 15.07 20.6639 14.8972C20.4366 14.7244 20.2459 14.5083 20.1027 14.2613C19.9591 14.0162 19.8659 13.7449 19.8286 13.4633C19.7912 13.1816 19.8105 12.8954 19.8853 12.6213L21.6453 6.112L18.5573 5.29333L16.7973 11.8053L20.5973 18.3227L20.6013 18.328ZM11.3987 18.328L4.82533 20.0693L4 17.0107L10.5733 15.268C10.8496 15.196 11.1089 15.07 11.3361 14.8972C11.5634 14.7244 11.7541 14.5083 11.8973 14.2613C12.0409 14.0162 12.1341 13.7449 12.1714 13.4633C12.2088 13.1816 12.1895 12.8954 12.1147 12.6213L10.3547 6.112L13.4427 5.29333L15.2027 11.8053L11.4027 18.3227L11.3987 18.328Z"
                  fill="#F0F1FA"
                />
              </svg>
            </span>
          </div>
          <div className="hero-rr-text">
            Uncompromising quality, effortless versatility, and statement-making
            designs
          </div>
          <div className="hero-rr-svg center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="68"
              height="70"
              viewBox="0 0 68 70"
              fill="none"
            >
              <path
                d="M67.0692 0L67.0691 70H0L67.0692 0Z"
                fill="#F0F1FA"
                fill-opacity="0.4"
              />
            </svg>
          </div>
        </div>
        <div className={`hero-name center ${orbitron.className}`}>BLUE BOX</div>
      </main>
    </>
  );
}
