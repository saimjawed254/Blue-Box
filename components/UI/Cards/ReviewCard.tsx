"use client";

import { Poppins } from "next/font/google";
import "./ReviewCard.css";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "300"] });

export default function ReviewCard() {
  const [isClient, setIsClient] = useState(false);
  const [svgSize,setSvgSize]=useState(1);

  useEffect(() => {
    // Mark hydration complete
        const vwToPx = (vw: number) => (window.innerWidth * vw) / 100;
    const vhToPx = (vh: number) => (window.innerHeight * vh) / 100;
    setSvgSize(vwToPx(2.4));
    setIsClient(true);
  }, []);

  const image = useMemo(() => {
    const srcArray = [
      "/aiony-haust-3TLl_97HNJo-unsplash.jpg",
      "/jurica-koletic-7YVZYZeITc8-unsplash.jpg",
      "/philip-martin-5aGUyCW_PJw-unsplash.jpg",
    ];
    const randomIndex = Math.floor(Math.random() * srcArray.length);
    return srcArray[randomIndex];
  }, []);

  if (!isClient) return null;
  return (
    <>
      <div className={`review-card center ${poppins.className}`}>
        <div className="review-card-view-box">
          <Image
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            src={image}
            alt=""
            fill
          />
        </div>
        <div className="review-card-view-box "></div>
        <div className="review-content">
          <div className="review-text">
            Uncompromising quality, effortless versatility, and statement-making
            designs Uncompromising quality, effortless versatility, and
            statement-making designs
          </div>
          <div className="review-rating">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={`${svgSize/2}`}
              height={`${svgSize/2}`}
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M7.76669 28.0002L10.8667 17.8668L2.66669 12.0002H12.8L16 1.3335L19.2 12.0002H29.3334L21.1334 17.8668L24.2334 28.0002L16 21.7335L7.76669 28.0002Z"
                fill="#00D8F9"
              />
            </svg>
            &nbsp;
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={`${svgSize/2}`}
              height={`${svgSize/2}`}
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M7.76669 28.0002L10.8667 17.8668L2.66669 12.0002H12.8L16 1.3335L19.2 12.0002H29.3334L21.1334 17.8668L24.2334 28.0002L16 21.7335L7.76669 28.0002Z"
                fill="#00D8F9"
              />
            </svg>
            &nbsp;
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={`${svgSize/2}`}
              height={`${svgSize/2}`}
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M7.76669 28.0002L10.8667 17.8668L2.66669 12.0002H12.8L16 1.3335L19.2 12.0002H29.3334L21.1334 17.8668L24.2334 28.0002L16 21.7335L7.76669 28.0002Z"
                fill="#00D8F9"
              />
            </svg>
            &nbsp;
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={`${svgSize/2}`}
              height={`${svgSize/2}`}
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M7.76669 28.0002L10.8667 17.8668L2.66669 12.0002H12.8L16 1.3335L19.2 12.0002H29.3334L21.1334 17.8668L24.2334 28.0002L16 21.7335L7.76669 28.0002Z"
                fill="#00D8F9"
              />
            </svg>
          </div>
          <div className="review-date">12 Jun 2025</div>
          <div className="review-username">Saim Jawed</div>
          <div className="review-location">Patna, Bihar</div>
        </div>
        {/* <div className="review-ratings-star">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M7.76669 28.0002L10.8667 17.8668L2.66669 12.0002H12.8L16 1.3335L19.2 12.0002H29.3334L21.1334 17.8668L24.2334 28.0002L16 21.7335L7.76669 28.0002Z"
              fill="#00D8F9"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M7.76669 28.0002L10.8667 17.8668L2.66669 12.0002H12.8L16 1.3335L19.2 12.0002H29.3334L21.1334 17.8668L24.2334 28.0002L16 21.7335L7.76669 28.0002Z"
              fill="#00D8F9"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M7.76669 28.0002L10.8667 17.8668L2.66669 12.0002H12.8L16 1.3335L19.2 12.0002H29.3334L21.1334 17.8668L24.2334 28.0002L16 21.7335L7.76669 28.0002Z"
              fill="#00D8F9"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M7.76669 28.0002L10.8667 17.8668L2.66669 12.0002H12.8L16 1.3335L19.2 12.0002H29.3334L21.1334 17.8668L24.2334 28.0002L16 21.7335L7.76669 28.0002Z"
              fill="#00D8F9"
            />
          </svg>
        </div>
        <div className="review-card-date">01-06-2025</div>
        <div className="review-text">
          Uncompromising quality, effortless versatility, and statement-making
          designs Uncompromising quality, effortless versatility, and
          statement-making designs Uncompromising quality, effortless
          versatility, and statement-making designs
        </div>
        <div className="review-customer-image"></div>

        <div className="review-customer-name">Saim Jawed</div>
        <div className="review-customer-location">Patna, Bihar</div> */}
      </div>
    </>
  );
}
