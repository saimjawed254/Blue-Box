"use client";
import { Bruno_Ace, IBM_Plex_Mono } from "next/font/google";
import "./Home.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useEffect, useRef, useState } from "react";
import { tr } from "zod/v4/locales";
import { Product } from "@/src/db/schema/products";

const bruno_ace = Bruno_Ace({ subsets: ["latin"], weight: ["400"] });
const ibm_plex_mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400"] });

gsap.registerPlugin(SplitText, ScrollTrigger);

type Props = {
  productsData: Product[];
};

export default function Home({ productsData }: Props) {
  // console.log(productsData);
  const vwToPx = (vw: number) => (window.innerWidth * vw) / 100;
  const vhToPx = (vh: number) => (window.innerHeight * vh) / 100;
  const [svgSize, setSvgSize] = useState(1);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleHover = () => {
    if (containerRef) {
      const svgs = containerRef.current?.querySelectorAll("svg");
      if (!svgs) return;

      gsap.fromTo(
        svgs,
        {
          scale: 1,
          y: 0,
          filter: "drop-shadow(0 0 0px #808080)",
        },
        {
          scale: 1.1,
          y: -10,
          filter: "drop-shadow(0 5px 15px #aaa)",
          duration: 0.4,
          ease: "power1.out",
          yoyo: true,
          repeat: 1,
          stagger: 0.05,
          transformOrigin: "center center",
        }
      );
    }
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      const vwToPx = (vw: number) => (window.innerWidth * vw) / 100;
      const vhToPx = (vh: number) => (window.innerHeight * vh) / 100;
      setSvgSize(vwToPx(10.8));
      const boxes = document.querySelectorAll(
        ".home-img"
      ) as NodeListOf<HTMLDivElement>;
      boxes.forEach((box, index) => {
        box.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = box.getBoundingClientRect();
          const x = e.clientX - (rect.left + rect.width / 2);
          const y = e.clientY - (rect.top + rect.height / 2);
          const movementFactor = 0.4;

          box.style.transform = `translate(${x * movementFactor}px, ${
            y * movementFactor
          }px)`;
          box.style.cursor = `pointer`;
        });

        box.addEventListener("mouseleave", () => {
          box.style.transform = "translate(0, 0)";
        });
      });
    }
  }, []);

  useGSAP(() => {
    const svgs = containerRef.current?.querySelectorAll("svg");

    if (svgs) {
      svgs.forEach((svg, index) => {
        gsap.to(svg, {
          rotate: index === 0 ? 360 : -360,
          duration: 5 + index * 2,
          ease: "linear",
          repeat: -1,
          transformOrigin: "center center",
        });
      });
    }

    const imgBoxes = document.querySelectorAll(".home-img");
    const container = document.querySelector(".home");

    let centerX = window.innerWidth / 2;
    let centerY = window.innerHeight / 2;

    if (container) {
      const containerRect = container.getBoundingClientRect();
      centerX = containerRect.left + containerRect.width / 2;
      centerY = containerRect.top + containerRect.height / 2;
    }

    const tlMove = gsap.timeline({
      scrollTrigger: {
        trigger: ".home",
        start: "top top",
        end: `bottom top`,
        scrub: true,
        pin: true,
      },
    });

    imgBoxes.forEach((box, index) => {
      const boxRect = box.getBoundingClientRect();
      const boxCenterX = boxRect.left + boxRect.width / 2;
      const boxCenterY = boxRect.top + boxRect.height / 2;

      // Direction vector from center to box
      const dx = boxCenterX - centerX;
      const dy = boxCenterY - centerY;

      // Normalize and scale movement
      const distance = Math.sqrt(dx * dx + dy * dy) || 1;

      const rawFactor = 1 / distance;
      const movementScale = gsap.utils.clamp(0.8, 4, rawFactor * 2000); // more explosive

      const x = (dx / distance) * 250 * movementScale;
      const y = (dy / distance) * 250 * movementScale;
      const scale = 1 + movementScale * 0.5;
      tlMove.to(
        box,
        {
          x,
          y,
          scale,
          // opacity: 0.3,
          ease: "power2.out",
        },
        0
      );
    });

    // tlMove.to(".home", {
    //   opacity: 0,
    // });

    const splitText1 = document.querySelector(".home-center-heading-wrapper1");
    const splitText2 = document.querySelector(".home-center-heading-wrapper2");
    const splitText3 = document.querySelector(".home-center-heading-wrapper3");
    const splitText4 = document.querySelector(".home-center-text");
    const splitText5 = document.querySelector(".home-bottom-text-line-text");
    const splitText6 = document.querySelector(".home-bottom-text-line2");

    const split1 = SplitText.create(splitText1, {
      type: "lines",
      mask: "lines",
      preserveWhitespace: true,
    });
    const split2 = SplitText.create(splitText2, {
      type: "lines",
      mask: "lines",
      preserveWhitespace: true,
    });
    const split3 = SplitText.create(splitText3, {
      type: "lines",
      mask: "lines",
      preserveWhitespace: true,
    });
    const split4 = SplitText.create(splitText4, {
      type: "lines",
      mask: "lines",
      preserveWhitespace: true,
    });
    const split5 = SplitText.create(splitText5, {
      type: "lines",
      mask: "lines",
      preserveWhitespace: true,
    });
    const split6 = SplitText.create(splitText6, {
      type: "lines",
      mask: "lines",
      preserveWhitespace: true,
    });

    const tl = gsap.timeline();

    tl.to({}, { duration: 1 })
      .from(split1.lines[0], {
        rotationX: -100,
        transformOrigin: `50% 50% -${vwToPx(10)}px`,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
      })

      .from(
        split2.lines[0],
        {
          rotationX: -100,
          transformOrigin: `50% 50% -${vwToPx(10)}px`,
          opacity: 0,
          duration: 1.5,
          ease: "power3.out",
        },
        "<"
      )

      .from(
        split3.lines[0],
        {
          rotationX: -100,
          transformOrigin: `50% 50% -${vwToPx(10)}px`,
          opacity: 0,
          duration: 1.5,
          ease: "power3.out",
        },
        "<"
      )
      .from(
        split4.lines[0],
        {
          rotationX: -100,
          transformOrigin: `50% 50% -${vwToPx(10)}px`,
          opacity: 0,
          duration: 1.5,
          ease: "power3.out",
        },
        "<"
      )
      .from(
        split5.lines[0],
        {
          rotationX: 100,
          transformOrigin: `50% 50% -${vwToPx(10)}px`,
          opacity: 0,
          duration: 1.5,
          ease: "power3.out",
        },
        "<"
      )
      .from(
        split6.lines[0],
        {
          rotationX: 100,
          transformOrigin: `50% 50% -${vwToPx(10)}px`,
          opacity: 0,
          duration: 1.5,
          ease: "power3.out",
        },
        "<"
      );

    const Slideshow1Items = document.querySelectorAll(
      ".home-img1-slideshow-item"
    );
    const Slideshow2Items = document.querySelectorAll(
      ".home-img2-slideshow-item"
    );
    const Slideshow3Items = document.querySelectorAll(
      ".home-img3-slideshow-item"
    );
    const Slideshow4Items = document.querySelectorAll(
      ".home-img4-slideshow-item"
    );
    const Slideshow5Items = document.querySelectorAll(
      ".home-img5-slideshow-item"
    );
    const Slideshow6Items = document.querySelectorAll(
      ".home-img6-slideshow-item"
    );
    const Slideshow7Items = document.querySelectorAll(
      ".home-img7-slideshow-item"
    );
    const Slideshow8Items = document.querySelectorAll(
      ".home-img8-slideshow-item"
    );
    const Slideshow9Items = document.querySelectorAll(
      ".home-img9-slideshow-item"
    );
    const Slideshow10Items = document.querySelectorAll(
      ".home-img10-slideshow-item"
    );
    const Slideshow11Items = document.querySelectorAll(
      ".home-img11-slideshow-item"
    );
    const Slideshow12Items = document.querySelectorAll(
      ".home-img12-slideshow-item"
    );

    const tl1 = gsap.timeline({
      repeat: -1,
      defaults: { ease: "power2.inOut", duration: 1.5 },
    });
    const tl2 = gsap.timeline({
      repeat: -1,
      defaults: { ease: "power2.inOut", duration: 1.5 },
    });
    const tl3 = gsap.timeline({
      repeat: -1,
      defaults: { ease: "power2.inOut", duration: 1.5 },
    });
    const tl4 = gsap.timeline({
      repeat: -1,
      defaults: { ease: "power2.inOut", duration: 1.5 },
    });
    const tl5 = gsap.timeline({
      repeat: -1,
      defaults: { ease: "power2.inOut", duration: 1.5 },
    });
    const tl6 = gsap.timeline({
      repeat: -1,
      defaults: { ease: "power2.inOut", duration: 1.5 },
    });
    const tl7 = gsap.timeline({
      repeat: -1,
      defaults: { ease: "power2.inOut", duration: 1.5 },
    });
    const tl8 = gsap.timeline({
      repeat: -1,
      defaults: { ease: "power2.inOut", duration: 1.5 },
    });
    const tl9 = gsap.timeline({
      repeat: -1,
      defaults: { ease: "power2.inOut", duration: 1.5 },
    });
    const tl10 = gsap.timeline({
      repeat: -1,
      defaults: { ease: "power2.inOut", duration: 1.5 },
    });
    const tl11 = gsap.timeline({
      repeat: -1,
      defaults: { ease: "power2.inOut", duration: 1.5 },
    });
    const tl12 = gsap.timeline({
      repeat: -1,
      defaults: { ease: "power2.inOut", duration: 1.5 },
    });

    Slideshow1Items.forEach((item, index) => {
      if (index !== 0) {
        gsap.set(item, {
          yPercent: 100,
        });
        gsap.set(item.querySelector("img"), {
          yPercent: -100,
        });
      }
    });

    Slideshow1Items.forEach((item, index) => {
      if (index !== Slideshow1Items.length - 1) {
        tl1
          .to(item, {
            yPercent: -100,
          })
          .to(
            item.querySelector("img"),
            {
              yPercent: 100,
            },
            "<"
          )
          .to(
            Slideshow1Items[index + 1],
            {
              yPercent: 0,
            },
            "<"
          )
          .to(
            Slideshow1Items[index + 1].querySelector("img"),
            {
              yPercent: 0,
            },
            "<"
          )
          .to({}, { duration: 2 });
      }
    });

    Slideshow2Items.forEach((item, index) => {
      if (index !== 0) {
        gsap.set(item, {
          xPercent: -100,
        });
        gsap.set(item.querySelector("img"), {
          xPercent: 100,
        });
      }
    });
    Slideshow2Items.forEach((item, index) => {
      if (index !== Slideshow2Items.length - 1) {
        tl2
          .to(item, {
            xPercent: 100,
          })
          .to(
            item.querySelector("img"),
            {
              xPercent: -100,
            },
            "<"
          )
          .to(
            Slideshow2Items[index + 1],
            {
              xPercent: 0,
            },
            "<"
          )
          .to(
            Slideshow2Items[index + 1].querySelector("img"),
            {
              xPercent: 0,
            },
            "<"
          )
          .to({}, { duration: 2 });
      }
    });

    Slideshow3Items.forEach((item, index) => {
      if (index !== 0) {
        gsap.set(item, {
          yPercent: 100,
        });
        gsap.set(item.querySelector("img"), {
          yPercent: -100,
        });
      }
    });

    Slideshow3Items.forEach((item, index) => {
      if (index !== Slideshow3Items.length - 1) {
        tl3
          .to(item, {
            yPercent: -100,
          })
          .to(
            item.querySelector("img"),
            {
              yPercent: 100,
            },
            "<"
          )
          .to(
            Slideshow3Items[index + 1],
            {
              yPercent: 0,
            },
            "<"
          )
          .to(
            Slideshow3Items[index + 1].querySelector("img"),
            {
              yPercent: 0,
            },
            "<"
          )
          .to({}, { duration: 2 });
      }
    });

    Slideshow4Items.forEach((item, index) => {
      if (index !== 0) {
        gsap.set(item, {
          xPercent: -100,
        });
        gsap.set(item.querySelector("img"), {
          xPercent: 100,
        });
      }
    });
    Slideshow4Items.forEach((item, index) => {
      if (index !== Slideshow4Items.length - 1) {
        tl4
          .to(item, {
            xPercent: 100,
          })
          .to(
            item.querySelector("img"),
            {
              xPercent: -100,
            },
            "<"
          )
          .to(
            Slideshow4Items[index + 1],
            {
              xPercent: 0,
            },
            "<"
          )
          .to(
            Slideshow4Items[index + 1].querySelector("img"),
            {
              xPercent: 0,
            },
            "<"
          )
          .to({}, { duration: 2 });
      }
    });
    Slideshow5Items.forEach((item, index) => {
      if (index !== 0) {
        gsap.set(item, {
          yPercent: 100,
        });
        gsap.set(item.querySelector("img"), {
          yPercent: -100,
        });
      }
    });

    Slideshow5Items.forEach((item, index) => {
      if (index !== Slideshow5Items.length - 1) {
        tl5
          .to(item, {
            yPercent: -100,
          })
          .to(
            item.querySelector("img"),
            {
              yPercent: 100,
            },
            "<"
          )
          .to(
            Slideshow5Items[index + 1],
            {
              yPercent: 0,
            },
            "<"
          )
          .to(
            Slideshow5Items[index + 1].querySelector("img"),
            {
              yPercent: 0,
            },
            "<"
          )
          .to({}, { duration: 2 });
      }
    });

    Slideshow6Items.forEach((item, index) => {
      if (index !== 0) {
        gsap.set(item, {
          xPercent: -100,
        });
        gsap.set(item.querySelector("img"), {
          xPercent: 100,
        });
      }
    });
    Slideshow6Items.forEach((item, index) => {
      if (index !== Slideshow6Items.length - 1) {
        tl6
          .to(item, {
            xPercent: 100,
          })
          .to(
            item.querySelector("img"),
            {
              xPercent: -100,
            },
            "<"
          )
          .to(
            Slideshow6Items[index + 1],
            {
              xPercent: 0,
            },
            "<"
          )
          .to(
            Slideshow6Items[index + 1].querySelector("img"),
            {
              xPercent: 0,
            },
            "<"
          )
          .to({}, { duration: 2 });
      }
    });
    Slideshow7Items.forEach((item, index) => {
      if (index !== 0) {
        gsap.set(item, {
          yPercent: 100,
        });
        gsap.set(item.querySelector("img"), {
          yPercent: -100,
        });
      }
    });

    Slideshow7Items.forEach((item, index) => {
      if (index !== Slideshow7Items.length - 1) {
        tl7
          .to(item, {
            yPercent: -100,
          })
          .to(
            item.querySelector("img"),
            {
              yPercent: 100,
            },
            "<"
          )
          .to(
            Slideshow7Items[index + 1],
            {
              yPercent: 0,
            },
            "<"
          )
          .to(
            Slideshow7Items[index + 1].querySelector("img"),
            {
              yPercent: 0,
            },
            "<"
          )
          .to({}, { duration: 2 });
      }
    });

    Slideshow8Items.forEach((item, index) => {
      if (index !== 0) {
        gsap.set(item, {
          xPercent: -100,
        });
        gsap.set(item.querySelector("img"), {
          xPercent: 100,
        });
      }
    });
    Slideshow8Items.forEach((item, index) => {
      if (index !== Slideshow8Items.length - 1) {
        tl8
          .to(item, {
            xPercent: 100,
          })
          .to(
            item.querySelector("img"),
            {
              xPercent: -100,
            },
            "<"
          )
          .to(
            Slideshow8Items[index + 1],
            {
              xPercent: 0,
            },
            "<"
          )
          .to(
            Slideshow8Items[index + 1].querySelector("img"),
            {
              xPercent: 0,
            },
            "<"
          )
          .to({}, { duration: 2 });
      }
    });
    Slideshow9Items.forEach((item, index) => {
      if (index !== 0) {
        gsap.set(item, {
          yPercent: 100,
        });
        gsap.set(item.querySelector("img"), {
          yPercent: -100,
        });
      }
    });

    Slideshow9Items.forEach((item, index) => {
      if (index !== Slideshow9Items.length - 1) {
        tl9
          .to(item, {
            yPercent: -100,
          })
          .to(
            item.querySelector("img"),
            {
              yPercent: 100,
            },
            "<"
          )
          .to(
            Slideshow9Items[index + 1],
            {
              yPercent: 0,
            },
            "<"
          )
          .to(
            Slideshow9Items[index + 1].querySelector("img"),
            {
              yPercent: 0,
            },
            "<"
          )
          .to({}, { duration: 2 });
      }
    });

    Slideshow10Items.forEach((item, index) => {
      if (index !== 0) {
        gsap.set(item, {
          xPercent: -100,
        });
        gsap.set(item.querySelector("img"), {
          xPercent: 100,
        });
      }
    });
    Slideshow10Items.forEach((item, index) => {
      if (index !== Slideshow10Items.length - 1) {
        tl10
          .to(item, {
            xPercent: 100,
          })
          .to(
            item.querySelector("img"),
            {
              xPercent: -100,
            },
            "<"
          )
          .to(
            Slideshow10Items[index + 1],
            {
              xPercent: 0,
            },
            "<"
          )
          .to(
            Slideshow10Items[index + 1].querySelector("img"),
            {
              xPercent: 0,
            },
            "<"
          )
          .to({}, { duration: 2 });
      }
    });
    Slideshow11Items.forEach((item, index) => {
      if (index !== 0) {
        gsap.set(item, {
          yPercent: 100,
        });
        gsap.set(item.querySelector("img"), {
          yPercent: -100,
        });
      }
    });

    Slideshow11Items.forEach((item, index) => {
      if (index !== Slideshow11Items.length - 1) {
        tl11
          .to(item, {
            yPercent: -100,
          })
          .to(
            item.querySelector("img"),
            {
              yPercent: 100,
            },
            "<"
          )
          .to(
            Slideshow11Items[index + 1],
            {
              yPercent: 0,
            },
            "<"
          )
          .to(
            Slideshow11Items[index + 1].querySelector("img"),
            {
              yPercent: 0,
            },
            "<"
          )
          .to({}, { duration: 2 });
      }
    });

    Slideshow12Items.forEach((item, index) => {
      if (index !== 0) {
        gsap.set(item, {
          xPercent: -100,
        });
        gsap.set(item.querySelector("img"), {
          xPercent: 100,
        });
      }
    });
    Slideshow12Items.forEach((item, index) => {
      if (index !== Slideshow12Items.length - 1) {
        tl12
          .to(item, {
            xPercent: 100,
          })
          .to(
            item.querySelector("img"),
            {
              xPercent: -100,
            },
            "<"
          )
          .to(
            Slideshow12Items[index + 1],
            {
              xPercent: 0,
            },
            "<"
          )
          .to(
            Slideshow12Items[index + 1].querySelector("img"),
            {
              xPercent: 0,
            },
            "<"
          )
          .to({}, { duration: 2 });
      }
    });
    ScrollTrigger.refresh();
  });
  return (
    <>
      <section className="home">
        {Array.from({ length: 12 }).map((_, index) => {
          const start = (index * 3) % productsData.length;

          const images = [
            productsData[start]?.image_urls?.[0],
            productsData[(start + 1) % productsData.length]?.image_urls?.[0],
            productsData[(start + 2) % productsData.length]?.image_urls?.[0],
          ];

          const imageSet = [...images, images[0]];

          return (
            <div
              style={{
                transition: "transform 0.15s ease",
                willChange: "transform",
              }}
              key={index}
              className={`home-img${index + 1} home-img`}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                }}
                className={`home-img${index + 1}-slideshow-container`}
              >
                {imageSet.map((src, i) => (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      overflow: "hidden",
                      width: "100%",
                      height: "100%",
                    }}
                    key={i}
                    className={`home-img${index + 1}-slideshow-item`}
                  >
                    <Image
                      fill
                      src={src || "/Rem.png"}
                      alt={`Slideshow ${index + 1} Image ${i + 1}`}
                      style={{
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* <div
          style={{
            transition: "transform 0.15s ease",
            willChange: "transform",
          }}
          className="home-img1 home-img"
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
            className="home-img1-slideshow-container"
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img1-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1015/1000/600"
                alt="Image 1"
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img1-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1010/1000/600"
                alt="Image 1"
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img1-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1016/1000/600"
                alt="Image 1"
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img1-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1015/1000/600"
                alt="Image 1"
              />
            </div>
          </div>
        </div> */}
        {/* <div
          style={{
            transition: "transform 0.15s ease",
            willChange: "transform",
          }}
          className="home-img2 home-img"
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
            className="home-img2-slideshow-container"
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img2-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1015/1000/600"
                alt="Image 1"
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img2-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1010/1000/600"
                alt="Image 1"
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img2-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1016/1000/600"
                alt="Image 1"
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img2-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1015/1000/600"
                alt="Image 1"
              />
            </div>
          </div>
        </div>
        <div
          style={{
            transition: "transform 0.15s ease",
            willChange: "transform",
          }}
          className="home-img3 home-img"
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
            className="home-img3-slideshow-container"
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img3-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1015/1000/600"
                alt="Image 1"
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img3-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1010/1000/600"
                alt="Image 1"
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img3-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1016/1000/600"
                alt="Image 1"
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img3-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1015/1000/600"
                alt="Image 1"
              />
            </div>
          </div>
        </div>
        <div
          style={{
            transition: "transform 0.15s ease",
            willChange: "transform",
          }}
          className="home-img4 home-img"
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
            className="home-img4-slideshow-container"
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img4-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1015/1000/600"
                alt="Image 1"
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img4-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1010/1000/600"
                alt="Image 1"
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img4-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1016/1000/600"
                alt="Image 1"
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img4-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1015/1000/600"
                alt="Image 1"
              />
            </div>
          </div>
        </div>
        <div
          style={{
            transition: "transform 0.15s ease",
            willChange: "transform",
          }}
          className="home-img5 home-img"
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
            className="home-img5-slideshow-container"
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img5-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1015/1000/600"
                alt="Image 1"
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img5-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1010/1000/600"
                alt="Image 1"
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img5-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1016/1000/600"
                alt="Image 1"
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img5-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1015/1000/600"
                alt="Image 1"
              />
            </div>
          </div>
        </div>
        <div
          style={{
            transition: "transform 0.15s ease",
            willChange: "transform",
          }}
          className="home-img6 home-img"
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
            className="home-img6-slideshow-container"
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img6-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1015/1000/600"
                alt="Image 1"
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img6-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1010/1000/600"
                alt="Image 1"
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img6-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1016/1000/600"
                alt="Image 1"
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img6-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1015/1000/600"
                alt="Image 1"
              />
            </div>
          </div>
        </div>
        <div
          style={{
            transition: "transform 0.15s ease",
            willChange: "transform",
          }}
          className="home-img7 home-img"
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
            className="home-img7-slideshow-container"
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img7-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1015/1000/600"
                alt="Image 1"
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img7-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1010/1000/600"
                alt="Image 1"
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img7-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1016/1000/600"
                alt="Image 1"
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img7-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1015/1000/600"
                alt="Image 1"
              />
            </div>
          </div>
        </div>
        <div
          style={{
            transition: "transform 0.15s ease",
            willChange: "transform",
          }}
          className="home-img8 home-img"
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
            className="home-img8-slideshow-container"
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img8-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1015/1000/600"
                alt="Image 1"
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img8-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1010/1000/600"
                alt="Image 1"
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img8-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1016/1000/600"
                alt="Image 1"
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img8-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1015/1000/600"
                alt="Image 1"
              />
            </div>
          </div>
        </div>
        <div
          style={{
            transition: "transform 0.15s ease",
            willChange: "transform",
          }}
          className="home-img9 home-img"
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
            className="home-img9-slideshow-container"
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img9-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1015/1000/600"
                alt="Image 1"
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img9-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1010/1000/600"
                alt="Image 1"
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img9-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1016/1000/600"
                alt="Image 1"
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img9-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1015/1000/600"
                alt="Image 1"
              />
            </div>
          </div>
        </div>
        <div
          style={{
            transition: "transform 0.15s ease",
            willChange: "transform",
          }}
          className="home-img10 home-img"
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
            className="home-img10-slideshow-container"
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img10-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1015/1000/600"
                alt="Image 1"
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img10-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1010/1000/600"
                alt="Image 1"
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img10-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1016/1000/600"
                alt="Image 1"
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img10-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1015/1000/600"
                alt="Image 1"
              />
            </div>
          </div>
        </div>
        <div
          style={{
            transition: "transform 0.15s ease",
            willChange: "transform",
          }}
          className="home-img11 home-img"
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
            className="home-img11-slideshow-container"
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img11-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1015/1000/600"
                alt="Image 1"
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img11-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1010/1000/600"
                alt="Image 1"
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img11-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1016/1000/600"
                alt="Image 1"
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img11-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1015/1000/600"
                alt="Image 1"
              />
            </div>
          </div>
        </div>
        <div
          style={{
            transition: "transform 0.15s ease",
            willChange: "transform",
          }}
          className="home-img12 home-img"
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
            className="home-img12-slideshow-container"
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img12-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1015/1000/600"
                alt="Image 1"
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img12-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1010/1000/600"
                alt="Image 1"
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img12-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1016/1000/600"
                alt="Image 1"
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              className="home-img12-slideshow-item"
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                fill
                src="https://picsum.photos/id/1015/1000/600"
                alt="Image 1"
              />
            </div>
          </div>
        </div> */}
        <div
          ref={containerRef}
          onMouseEnter={handleHover}
          className={`home-center-ai-feature center ${bruno_ace.className}`}
        >
          <svg
            style={{
              position: "absolute",
            }}
            xmlns="http://www.w3.org/2000/svg"
            width={`${svgSize}`}
            height={`${svgSize}`}
            viewBox="0 0 220 220"
            fill="none"
          >
            <path
              d="M220 110.001C220 132.638 213.016 154.724 200.001 173.245C186.986 191.766 168.573 205.822 147.276 213.493C125.978 221.164 102.831 222.077 80.9953 216.108C59.1596 210.139 39.697 197.578 25.2629 180.14L26.1242 179.427C40.4116 196.688 59.6765 209.121 81.2903 215.029C102.904 220.937 125.815 220.034 146.897 212.441C167.978 204.848 186.203 190.935 199.086 172.602C211.969 154.269 218.882 132.408 218.882 110.001H220ZM63.6897 10.2234C84.2229 0.693127 107.197 -2.27003 129.477 1.73803C151.756 5.74607 172.257 16.5302 188.181 32.6189L187.386 33.406C171.624 17.4808 151.331 6.80593 129.279 2.83861C107.226 -1.12862 84.4848 1.80371 64.1604 11.2371C43.836 20.6704 26.9177 36.1458 15.7121 55.5496C4.5066 74.9534 -0.439936 97.3422 1.54807 119.661L0.433816 119.76C-1.5745 97.2119 3.42301 74.5939 14.7434 54.991C26.064 35.3879 43.1566 19.7537 63.6897 10.2234Z"
              fill="#808080"
            />
          </svg>
          <svg
            style={{
              position: "absolute",
            }}
            xmlns="http://www.w3.org/2000/svg"
            width={`${svgSize * 1.136}`}
            height={`${svgSize * 1.136}`}
            viewBox="0 0 279 279"
            fill="none"
          >
            <circle
              cx="139.5"
              cy="139.5"
              r="138"
              stroke="#808080"
              strokeWidth="3"
            />
          </svg>

          <svg
            style={{
              position: "absolute",
            }}
            xmlns="http://www.w3.org/2000/svg"
            width={`${svgSize * 1.27}`}
            height={`${svgSize * 1.27}`}
            viewBox="0 0 280 280"
            fill="none"
          >
            <path
              d="M2.04639 135.921C1.33849 163.106 8.70755 189.891 23.2222 212.889C37.737 235.886 58.7461 254.062 83.5913 265.12C108.437 276.178 136.004 279.621 162.805 275.012C189.606 270.402 214.44 257.949 234.164 239.227L235.54 240.677C215.529 259.671 190.334 272.305 163.143 276.981C135.952 281.658 107.984 278.166 82.7778 266.947C57.5714 255.729 36.2566 237.288 21.5308 213.956C6.805 190.624 -0.670907 163.449 0.0473633 135.868L2.04639 135.921ZM112.285 2.68066C139.345 -2.7019 167.394 0.0608176 192.884 10.6191C218.374 21.1776 240.161 39.0576 255.49 61.998C270.818 84.9386 279 111.91 279 139.5H277C277 112.305 268.935 85.721 253.827 63.1094C238.718 40.4977 217.243 22.8739 192.119 12.4668C166.994 2.05982 139.347 -0.663851 112.674 4.6416C86.0022 9.94716 61.5015 23.0429 42.272 42.2725L40.8579 40.8584C60.3672 21.3491 85.2245 8.06337 112.285 2.68066Z"
              fill="#808080"
            />
          </svg>

          <span>
            AI Virtual <br /> Try On
          </span>
        </div>
        <div className="home-center-spiral center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={`${svgSize / 3.67}`}
            height={`${svgSize / 1.4}`}
            viewBox="0 0 60 157"
            fill="none"
          >
            <g filter="url(#filter0_i_667_1343)">
              <path
                d="M18.9576 149.352C36.7741 146.611 62.8771 135.464 24.7568 112.809C-7.23075 92.3428 14.8246 82.8827 29.8507 80.711C45.6841 76.6423 68.9009 64.329 35.1013 47.625C-8.96382 21.5968 20.9204 10.4428 41.3707 8.11938"
                stroke="#00A6FF"
                strokeWidth="15"
              />
            </g>
            <defs>
              <filter
                id="filter0_i_667_1343"
                x="0.849609"
                y="0.666992"
                width="59.1187"
                height="166.098"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="10" />
                <feGaussianBlur stdDeviation="7.5" />
                <feComposite
                  in2="hardAlpha"
                  operator="arithmetic"
                  k2="-1"
                  k3="1"
                />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.945512 0 0 0 0 1 0 0 0 0 0.869231 0 0 0 1 0"
                />
                <feBlend
                  mode="normal"
                  in2="shape"
                  result="effect1_innerShadow_667_1343"
                />
              </filter>
            </defs>
          </svg>
        </div>
        <div className={`home-center-heading ${bruno_ace.className}`}>
          <div className="home-center-heading-wrapper1">Bluebox</div>
          <div className="home-center-heading-wrapper2">Bluebox</div>
          <div className="home-center-heading-wrapper3">Bluebox</div>
          <div className={`home-center-text ${ibm_plex_mono.className}`}>
            Elevate your style with our AI Tools
          </div>
        </div>
        <div className={`home-bottom-text ${ibm_plex_mono.className}`}>
          <div className="home-bottom-text-line1">
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "50%",
              }}
              className="home-bottom-text-line-text"
            >
              <span
                style={{
                  fontSize: "2vw",
                  width: "40%",
                  height: "60%",
                }}
              >
                3417
              </span>
              <span
                style={{
                  width: "20%",
                  height: "50%",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={`${svgSize / 6.285}`}
                  height={`${svgSize / 6.285}`}
                  viewBox="0 0 37 23"
                  fill="none"
                >
                  <path
                    d="M24.75 2.75H34.75V12.75"
                    stroke="#00A6FF"
                    strokeWidth="3.57143"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M34.75 2.75L20.625 16.875C20.3913 17.104 20.0772 17.2323 19.75 17.2323C19.4228 17.2323 19.1087 17.104 18.875 16.875L13.125 11.125C12.8913 10.896 12.5772 10.7677 12.25 10.7677C11.9228 10.7677 11.6087 10.896 11.375 11.125L2.25 20.25"
                    stroke="#00A6FF"
                    strokeWidth="3.57143"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>

            <span
              style={{
                position: "relative",
                width: "50%",
                height: "100%",
              }}
            >
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                src={"/NicePng_rem-re-zero-png_1645922.png"}
                alt=""
                fill
              />
            </span>
          </div>
          <div className="home-bottom-text-line2">
            Happy customers and counting...
          </div>
        </div>
      </section>
    </>
  );
}
