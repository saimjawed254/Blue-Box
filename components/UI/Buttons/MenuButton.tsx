"use client";

import { IBM_Plex_Mono, Poppins } from "next/font/google";
import "./MenuButton.css";
import { useState } from "react";
import { useClerk } from "@clerk/nextjs";

export const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });
export const ibm_plex_mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
});

export default function MenuButton() {
  const { signOut }=useClerk()

  const [active, setActive] = useState(false);

  const handleOnClick = () => {
    setActive(!active);
  };

  return (
    <>
      <div onClick={handleOnClick} className={`menu-button center blur ${ibm_plex_mono.className}`}>
        <div className="menu-text">&#x2022; Menu&nbsp;</div>
        <div className="menu-hamburger center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="33"
            height="32"
            viewBox="0 0 33 32"
            fill="none"
          >
            <path
              d="M5.69958 8.00033C5.69958 7.6467 5.84006 7.30757 6.09011 7.05752C6.34016 6.80747 6.6793 6.66699 7.03292 6.66699H25.6996C26.0532 6.66699 26.3923 6.80747 26.6424 7.05752C26.8924 7.30757 27.0329 7.6467 27.0329 8.00033C27.0329 8.35395 26.8924 8.69309 26.6424 8.94313C26.3923 9.19318 26.0532 9.33366 25.6996 9.33366H7.03292C6.6793 9.33366 6.34016 9.19318 6.09011 8.94313C5.84006 8.69309 5.69958 8.35395 5.69958 8.00033ZM5.69958 16.0003C5.69958 15.6467 5.84006 15.3076 6.09011 15.0575C6.34016 14.8075 6.6793 14.667 7.03292 14.667H25.6996C26.0532 14.667 26.3923 14.8075 26.6424 15.0575C26.8924 15.3076 27.0329 15.6467 27.0329 16.0003C27.0329 16.3539 26.8924 16.6931 26.6424 16.9431C26.3923 17.1932 26.0532 17.3337 25.6996 17.3337H7.03292C6.6793 17.3337 6.34016 17.1932 6.09011 16.9431C5.84006 16.6931 5.69958 16.3539 5.69958 16.0003ZM7.03292 22.667C6.6793 22.667 6.34016 22.8075 6.09011 23.0575C5.84006 23.3076 5.69958 23.6467 5.69958 24.0003C5.69958 24.3539 5.84006 24.6931 6.09011 24.9431C6.34016 25.1932 6.6793 25.3337 7.03292 25.3337H25.6996C26.0532 25.3337 26.3923 25.1932 26.6424 24.9431C26.8924 24.6931 27.0329 24.3539 27.0329 24.0003C27.0329 23.6467 26.8924 23.3076 26.6424 23.0575C26.3923 22.8075 26.0532 22.667 25.6996 22.667H7.03292Z"
              fill="black"
            />
          </svg>
        </div>
        {active ? (
          <div onClick={()=>{signOut({redirectUrl:"/"})}} className="menu-options">
            Logout
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
