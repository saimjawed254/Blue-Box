"use-client";

import { Poppins } from "next/font/google";
import "./PrimaryButton.css"

export const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

export default function PrimaryButton(){
    return(
        <>
        <div className={`primary-button center blur ${poppins.className}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            viewBox="0 0 33 34"
            fill="none"
          >
            <path
              d="M12.5334 6.1356L15.9285 13.6048L23.3976 16.9998L15.9285 20.3949L12.5334 27.864L9.13834 20.3949L1.66919 16.9998L9.13834 13.6048L12.5334 6.1356ZM12.5334 12.6949L11.1754 15.6418L8.22846 16.9998L11.1754 18.3578L12.5334 21.3048L13.8914 18.3578L16.8383 16.9998L13.8914 15.6418L12.5334 12.6949ZM26.1137 12.9257L24.4026 9.20474L20.6816 7.49363L24.4026 5.7961L26.1137 2.06152L27.8112 5.7961L31.5458 7.49363L27.8112 9.20474L26.1137 12.9257ZM26.1137 31.9381L24.4026 28.2171L20.6816 26.506L24.4026 24.8085L26.1137 21.0739L27.8112 24.8085L31.5458 26.506L27.8112 28.2171L26.1137 31.9381Z"
              fill="#3F3F37"
            />
          </svg>
          &nbsp;Show All&nbsp;&nbsp;
        </div>
        </>
    )
}