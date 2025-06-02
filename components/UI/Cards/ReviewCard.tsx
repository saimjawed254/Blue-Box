import { Poppins } from "next/font/google";
import "./ReviewCard.css";

export const poppins = Poppins({ subsets: ["latin"], weight: ["400", "300"] });

export default function ReviewCard() {
  return (
    <>
      <div className={`review-card ${poppins.className}`}>
        <div className="review-card-view-box blur"></div>
                <div className="review-ratings-star">
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
        <div className="review-card-date">
            01-06-2025
        </div>
        <div className="review-text">
          Uncompromising quality, effortless versatility, and statement-making
          designs Uncompromising quality, effortless versatility, and
          statement-making designs Uncompromising quality, effortless
          versatility, and statement-making designs
        </div>
        <div className="review-customer-image"></div>

        <div className="review-customer-name">Saim Jawed</div>
        <div className="review-customer-location">Patna, Bihar</div>
      </div>
    </>
  );
}
