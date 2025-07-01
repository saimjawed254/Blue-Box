"use client";

import Link from "next/link";
import "./Navbar.css";
import {
  Bruno_Ace,
  Cinzel_Decorative,
  IBM_Plex_Mono,
  Poppins,
} from "next/font/google";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const cinzel = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400"],
});
const bruno_ace = Bruno_Ace({ subsets: ["latin"], weight: ["400"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });
const ibm_plex_mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoaded, isSignedIn, user } = useUser();
  console.log(user);

  const AUTH_ROUTES = ["/log-in", "/sign-in", "/mobile-blocked"];
  const hideNavbar = AUTH_ROUTES.includes(pathname);

  if (hideNavbar) {
    return null;
  }
  const [svgSize, setSvgSize] = useState(1);
  const [toggle, setToggle] = useState(true);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!query.trim()) return;

    router.push(`/products/search?query=${encodeURIComponent(query.trim())}`);
    setToggle(true)
  }

  useEffect(() => {
    const vwToPx = (vw: number) => (window.innerWidth * vw) / 100;
    const vhToPx = (vh: number) => (window.innerHeight * vh) / 100;
    setSvgSize(vwToPx(2.4));
  }, []);

  return (
    <>
      <section
        style={{
          width: toggle ? `0vw` : `70vw`,
        }}
        className="search-layer center"
      >
        <div
          style={{
            visibility: toggle ? "hidden" : "visible",
          }}
          className={`search-layer-heading ${poppins.className}`}
        >
          <span
            className={`${ibm_plex_mono.className}`}
            style={{
              fontSize: "2.5vw",
            }}
          >
            Just describe it!
          </span>
          <br />
          Our AI Powered Search will find the most suitable <br /> products for
          you within seconds
        </div>

        <form onSubmit={handleSearch} className="search-layer-input center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for suits, cargos, colors, brands..."
            className={`${ibm_plex_mono.className}`}
          />
          <button
            type="submit"
            disabled={loading}
            className={`${ibm_plex_mono.className}`}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        <div className={`search-layer-text ${poppins.className}`}>
          Try: “something green in cargo with rough look under 1500”
        </div>
      </section>
      <nav className={`${ibm_plex_mono.className}`}>
        <div className={`nav-logo center `}>Bluebox © 2025</div>
        <div className="navigate center">
          <Link href={"/"} className={`nav-home nav-link center`}>
            <span className="dot-fill"></span>
            <span className="nav-label">• Home</span>
          </Link>
          <Link
            href={"/products/newest-arrivals"}
            className="nav-na nav-link center"
          >
            <span className="dot-fill"></span>
            <span className="nav-label">• New Arrivals</span>
          </Link>
          <Link href={`/products/cargos`} className="nav-mc nav-link center">
            <span className="dot-fill"></span>
            <span className="nav-label">• Cargos</span>
          </Link>
          <Link href={`/products/suits`} className="nav-ls nav-link center">
            <span className="dot-fill"></span>
            <span className="nav-label">• Suits</span>
          </Link>
          <div
            onClick={() => {
              setToggle(!toggle);
            }}
            className="nav-ai-search-icon center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={`${svgSize / 1.25}`}
              height={`${svgSize / 1.25}`}
              viewBox="0 0 27 30"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.125 5.3374C11.85 5.3374 12.5625 5.4099 13.2487 5.5499C13.5736 5.61587 13.859 5.80821 14.042 6.08459C14.2251 6.36097 14.2909 6.69876 14.225 7.02365C14.159 7.34854 13.9666 7.63392 13.6903 7.817C13.4139 8.00008 13.0761 8.06587 12.7512 7.9999C11.1768 7.67873 9.54254 7.83158 8.05502 8.43913C6.56749 9.04669 5.29351 10.0817 4.39414 11.4132C3.49477 12.7447 3.0104 14.313 3.00227 15.9198C2.99414 17.5266 3.46261 19.0997 4.34846 20.4403C5.2343 21.7809 6.49775 22.8287 7.97905 23.4513C9.46035 24.0738 11.093 24.2432 12.6705 23.938C14.2481 23.6328 15.6997 22.8667 16.8419 21.7365C17.9841 20.6063 18.7656 19.1629 19.0875 17.5887C19.1201 17.4278 19.1841 17.2749 19.2759 17.1388C19.3676 17.0027 19.4853 16.886 19.6221 16.7953C19.759 16.7046 19.9124 16.6418 20.0735 16.6105C20.2346 16.5791 20.4003 16.5797 20.5612 16.6124C20.7221 16.6451 20.8749 16.7091 21.0111 16.8008C21.1472 16.8926 21.2639 17.0102 21.3545 17.1471C21.4452 17.2839 21.508 17.4373 21.5394 17.5984C21.5708 17.7596 21.5701 17.9253 21.5375 18.0862C21.233 19.5769 20.6119 20.9849 19.7162 22.2149L19.47 22.5399L24.035 27.1049C24.2615 27.3293 24.3937 27.6319 24.4046 27.9506C24.4154 28.2693 24.304 28.5801 24.0931 28.8194C23.8823 29.0586 23.588 29.2083 23.2704 29.2377C22.9529 29.267 22.6361 29.1739 22.385 28.9774L22.2675 28.8724L17.7025 24.3074C16.3718 25.3561 14.8096 26.0714 13.1462 26.3935C11.4829 26.7157 9.7666 26.6354 8.14059 26.1594C6.51458 25.6834 5.02599 24.8254 3.799 23.6571C2.57201 22.4887 1.64221 21.0439 1.08717 19.4431C0.532137 17.8424 0.367959 16.1321 0.608336 14.455C0.848713 12.7778 1.48667 11.1825 2.469 9.80209C3.45132 8.42167 4.74951 7.29618 6.25527 6.51952C7.76103 5.74286 9.43069 5.33755 11.125 5.3374ZM21.75 4.0874C21.9838 4.0874 22.213 4.153 22.4114 4.27674C22.6098 4.40048 22.7696 4.57741 22.8725 4.7874L22.9324 4.93365L23.095 5.40615C23.2665 5.90888 23.5428 6.36944 23.9057 6.75733C24.2686 7.14522 24.7097 7.45159 25.2 7.65615L25.4312 7.74365L25.9037 7.9049C26.1377 7.98473 26.3428 8.13215 26.493 8.32852C26.6432 8.52489 26.7318 8.7614 26.7475 9.00812C26.7633 9.25485 26.7056 9.50071 26.5817 9.71463C26.4577 9.92854 26.2731 10.1009 26.0512 10.2099L25.9037 10.2699L25.4312 10.4324C24.9285 10.6039 24.4679 10.8803 24.08 11.2431C23.6921 11.606 23.3858 12.0472 23.1812 12.5374L23.0937 12.7687L22.9324 13.2412C22.8525 13.4751 22.7049 13.68 22.5085 13.8301C22.3121 13.9802 22.0755 14.0686 21.8288 14.0843C21.5821 14.1 21.3363 14.0421 21.1224 13.9181C20.9086 13.794 20.7363 13.6093 20.6274 13.3874L20.5675 13.2412L20.405 12.7687C20.2334 12.2659 19.9571 11.8054 19.5942 11.4175C19.2313 11.0296 18.7902 10.7232 18.2999 10.5187L18.0687 10.4312L17.5962 10.2699C17.3622 10.1901 17.1572 10.0427 17.007 9.84628C16.8567 9.64991 16.7682 9.41341 16.7524 9.16668C16.7366 8.91996 16.7943 8.67409 16.9183 8.46017C17.0422 8.24626 17.2268 8.0739 17.4487 7.9649L17.5962 7.9049L18.0687 7.7424C18.5714 7.5709 19.032 7.29455 19.4199 6.93166C19.8078 6.56877 20.1141 6.12761 20.3187 5.6374L20.4062 5.40615L20.5675 4.93365C20.6517 4.68689 20.8109 4.47263 21.023 4.32089C21.235 4.16915 21.4892 4.08751 21.75 4.0874ZM21.75 8.0824C21.4543 8.45453 21.1171 8.79171 20.7449 9.0874C21.1183 9.38323 21.4533 9.71824 21.75 10.0924C22.0458 9.71907 22.3808 9.38407 22.755 9.0874C22.3828 8.79171 22.0456 8.45453 21.75 8.0824Z"
                fill="#000000"
              />
            </svg>
          </div>
          <Link
            href={isSignedIn ? `/user/cart` : `/sign-in`}
            className="nav-cart center"
          >
            Cart
          </Link>
        </div>
        <div className="nav-credentials center rounded-corners">
          {isSignedIn ? (
            <>
              <Link
                href="/user/account"
                className={`nav-cred-account nav-link ${ibm_plex_mono.className}`}
              >
                <span className="dot-fill"></span>
                <span className="nav-label">• Account</span>
              </Link>
              <Link href="/user/account" className="nav-cred-user-image center">
                <Image
                  className="rounded-corners"
                  alt=""
                  fill
                  src={user?.imageUrl || "/"}
                  objectFit="cover"
                />
              </Link>
            </>
          ) : (
            <>
              <Link href="/sign-in" className="nav-cred-signin center nav-link">
                <span className="dot-fill"></span>
                <span className="nav-label">• Sign In</span>
              </Link>
              <Link href="/sign-in" className="nav-cred-arrow center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={`${svgSize}`}
                  height={`${svgSize}`}
                  viewBox="0 0 50 50"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.73998 23.3724C15.535 23.2974 29.6533 23.2174 44.095 23.1324C37.0783 16.1074 32.0083 11.0283 28.885 7.89493C28.5275 7.44743 28.49 6.50993 29.165 5.77743C29.84 5.04493 31.045 5.07493 31.39 5.42743C37.295 11.3574 43.32 17.3824 49.465 23.5024C49.8233 23.8274 50.0025 24.2466 50.0025 24.7599C50.0093 24.9956 49.9647 25.2299 49.8719 25.4466C49.7791 25.6633 49.6402 25.8573 49.465 26.0149C43.1356 32.2031 36.8022 38.3873 30.465 44.5674C30.1022 44.8697 29.6375 45.0217 29.1662 44.9924C28.6949 44.9632 28.2526 44.7548 27.93 44.4099C27.2725 43.6924 27.205 42.9399 28.0825 41.9549C33.0858 37.0549 38.325 31.9466 43.8 26.6299C29.5167 26.7249 15.4966 26.8058 1.73998 26.8724C1.50674 26.8712 1.27611 26.8233 1.06162 26.7317C0.847143 26.64 0.653146 26.5064 0.491038 26.3387C0.328929 26.171 0.20198 25.9726 0.117651 25.7552C0.033322 25.5377 -0.00668459 25.3056 -1.72418e-05 25.0724C-1.72418e-05 23.8049 0.969983 23.3724 1.73998 23.3724Z"
                    fill="black"
                  />
                </svg>
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
