"use client";
import { Bruno_Ace, IBM_Plex_Mono, Poppins } from "next/font/google";
import "./Landing.css";
import Image from "next/image";

const bruno_ace = Bruno_Ace({ weight: ["400"] });
const ibm_plex_mono = IBM_Plex_Mono({ weight: ["400"] });
const poppins = Poppins({ weight: ["300", "400", "600"] });

export default function Landing() {
  return (
    <>
      <section className="landing">
        <section className={`landing-sold-box ${ibm_plex_mono.className}`}>
          <div className="landing-sold-box-count">
            <span
              style={{
                fontSize: "3vw",
                color: "rgb(var(--yellow))",
              }}
            >
              3417
            </span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="30"
                viewBox="0 0 50 30"
                fill="none"
              >
                <path
                  d="M33.9286 2.5H48.2143V16.7857"
                  stroke="#FFFB00"
                  strokeWidth="3.57143"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M48.2143 2.5L28.0357 22.6786C27.7019 23.0058 27.2531 23.189 26.7857 23.189C26.3183 23.189 25.8695 23.0058 25.5357 22.6786L17.3214 14.4643C16.9876 14.1371 16.5388 13.9538 16.0714 13.9538C15.604 13.9538 15.1552 14.1371 14.8214 14.4643L1.78571 27.5"
                  stroke="#FFFB00"
                  strokeWidth="3.57143"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span
              style={{
                position: "relative",
                width: "5vw",
                aspectRatio: "1/1",
              }}
            >
              <Image src={"/NicePng_rem-re-zero-png_1645922.png"} fill alt="" />
            </span>
          </div>
          <div
            style={{
              fontSize: "1.25vw",
            }}
            className="landing-sold-box-text"
          >
            HAPPY CUSTOMERS AND COUNTING
          </div>
        </section>
        <section className={`landing-brand-name ${bruno_ace.className}`}>
          BLUEBOX
        </section>
        <section className={`landing-tagline ${ibm_plex_mono.className}`}>
          Your AI Powered Wardrobe is here <br />
          Trend-forward essentials—enhanced by intelligent design
        </section>
        <section className="landing-ai-card blur">
          <div
            style={{
              fontSize: "1.25vw",
            }}
            className={`left-cargo-header ${bruno_ace.className}`}
          >
            ELEVATE YOUR STYLE
          </div>
          <div
            style={{
              fontSize: "1vw",
              color: "rgb(var(--pure-white))",
              textAlign: "right",
              width: "100%",
            }}
            className={`left-cargo-heading-text ${ibm_plex_mono.className}`}
          >
            ...with our AI Tools
          </div>

          <div
            style={{
              fontSize: "1.25vw",
              color:"rgb(var(--yellow))",
            }}
            className={`left-cargo-header ${bruno_ace.className}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M13.1656 13.457L17.1767 17.9103L15.2933 19.9988L11.2822 15.5467C11.1133 15.3585 10.9129 15.2094 10.6925 15.1081C10.4721 15.0069 10.236 14.9553 9.99778 14.9564C9.50889 14.9564 9.05778 15.1644 8.71333 15.5467L4.70222 20L2.82 17.9103L6.83111 13.457H13.1656ZM13.8344 12.1743L19.3122 13.8007L20 10.944L14.5222 9.31631C14.292 9.24909 14.076 9.13138 13.8866 8.97C13.6972 8.80861 13.5382 8.60675 13.4189 8.37609C13.2992 8.14715 13.2216 7.89372 13.1905 7.63069C13.1594 7.36765 13.1754 7.10031 13.2378 6.84433L14.7044 0.764633L12.1311 0L10.6644 6.08219L13.8311 12.1694L13.8344 12.1743ZM6.16556 12.1743L0.687778 13.8007L0 10.944L5.47778 9.31631C5.708 9.24909 5.92405 9.13138 6.11343 8.97C6.30281 8.80861 6.46177 8.60675 6.58111 8.37609C6.70078 8.14715 6.77844 7.89372 6.80954 7.63069C6.84064 7.36765 6.82455 7.10031 6.76222 6.84433L5.29556 0.764633L7.86889 0L9.33556 6.08219L6.16889 12.1694L6.16556 12.1743Z"
                fill="rgb(var(--yellow))"
              />
            </svg>{" "}
            AI VIRTUAL TRY ON
          </div>
          <div
            style={{
              fontSize: "0.875vw",
              color: "rgb(var(--pure-white))",
            }}
            className={`left-cargo-heading-text ${ibm_plex_mono.className}`}
          >
            Worried about how it will look on you?...don’t worry try our AI
            Virtual Try On and easily make the right choice
          </div>

          <div
            style={{
              fontSize: "1.25vw",
              color:"rgb(var(--yellow))",
            }}
            className={`left-cargo-header ${bruno_ace.className}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M13.1656 13.457L17.1767 17.9103L15.2933 19.9988L11.2822 15.5467C11.1133 15.3585 10.9129 15.2094 10.6925 15.1081C10.4721 15.0069 10.236 14.9553 9.99778 14.9564C9.50889 14.9564 9.05778 15.1644 8.71333 15.5467L4.70222 20L2.82 17.9103L6.83111 13.457H13.1656ZM13.8344 12.1743L19.3122 13.8007L20 10.944L14.5222 9.31631C14.292 9.24909 14.076 9.13138 13.8866 8.97C13.6972 8.80861 13.5382 8.60675 13.4189 8.37609C13.2992 8.14715 13.2216 7.89372 13.1905 7.63069C13.1594 7.36765 13.1754 7.10031 13.2378 6.84433L14.7044 0.764633L12.1311 0L10.6644 6.08219L13.8311 12.1694L13.8344 12.1743ZM6.16556 12.1743L0.687778 13.8007L0 10.944L5.47778 9.31631C5.708 9.24909 5.92405 9.13138 6.11343 8.97C6.30281 8.80861 6.46177 8.60675 6.58111 8.37609C6.70078 8.14715 6.77844 7.89372 6.80954 7.63069C6.84064 7.36765 6.82455 7.10031 6.76222 6.84433L5.29556 0.764633L7.86889 0L9.33556 6.08219L6.16889 12.1694L6.16556 12.1743Z"
                fill="rgb(var(--yellow))"
              />
            </svg>{" "}
            AI POWERED SEARCH
          </div>
          <div
            style={{
              fontSize: "0.875vw",
              color: "rgb(var(--pure-white))",
            }}
            className={`left-cargo-heading-text ${ibm_plex_mono.className}`}
          >
            Search fast Search easily
          </div>
        </section>
        <section className="landing-left">
          <section className="left-cargo-box center">
            <section className="left-cargo-box-image"></section>
            <section className="left-cargo-box-buttons">
              <div className="left-cargo-box-buttons-row1 center">
                <div className="left-cargo-box-buttons-row1-button1"></div>
                <div className="left-cargo-box-buttons-row1-button2"></div>
                <div className="left-cargo-box-buttons-row1-button3"></div>
              </div>
              <div className="left-cargo-box-buttons-row2 center">
                <div className="left-cargo-box-buttons-row2-button1"></div>
                <div className="left-cargo-box-buttons-row2-button2"></div>
                <div className="left-cargo-box-buttons-row2-button3"></div>
              </div>
            </section>
            <section className="left-cargo-box-stats"></section>
          </section>
          <section className="left-cargo-heading">
            <div
              style={{
                fontSize: "2vw",
              }}
              className={`left-cargo-header ${bruno_ace.className}`}
            >
              MEN'S CARGO
            </div>
            <div
              style={{
                fontSize: "0.875vw",
                color: "rgb(var(--pure-white))",
              }}
              className={`left-cargo-heading-text ${ibm_plex_mono.className}`}
            >
              Dynamic fits, rugged function, and street-ready impact for your
              everyday bold moves
            </div>
          </section>
          <section
            className={`left-cargo-explore center ${bruno_ace.className}`}
          >
            <div className="left-cargo-text">
              <span
                style={{
                  fontSize: "1vw",
                  lineHeight: "4vh",
                }}
              >
                JUN
              </span>
              <br />
              <span
                style={{
                  fontSize: "0.775vw",
                }}
              >
                COLLECTION
              </span>
            </div>
            <svg
              style={{
                position: "absolute",
                top: "0",
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 240 300"
              preserveAspectRatio="xMidYMid meet"
              className="nausean-svg"
            >
              <defs>
                <pattern
                  id="imgPattern2"
                  patternUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <image
                    href="/mark-adriane-1533MrY5liQ-unsplash.jpg"
                    width="240"
                    height="300"
                    className="nausean-image"
                    preserveAspectRatio="xMidYMid slice"
                  />
                </pattern>
              </defs>

              <path
                d="M0 268.5C0 285.897 14.103 300 31.5 300H105C113.284 300 120 293.284 120 285C120 276.716 126.716 270 135 270H165C173.284 270 180 263.284 180 255C180 246.716 186.716 240 195 240H210C226.569 240 240 226.569 240 210V31.5C240 14.103 225.897 0 208.5 0H31.5C14.103 0 0 14.103 0 31.5V268.5Z"
                fill="url(#imgPattern2)"
              />
            </svg>

            <svg
              style={{
                position: "absolute",
                top: "0",
                pointerEvents: "none",
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 240 300"
              fill="none"
            >
              <path
                d="M0 268.5C0 285.897 14.103 300 31.5 300H105C113.284 300 120 293.284 120 285C120 276.716 126.716 270 135 270H165C173.284 270 180 263.284 180 255C180 246.716 186.716 240 195 240H210C226.569 240 240 226.569 240 210V31.5C240 14.103 225.897 0 208.5 0H31.5C14.103 0 0 14.103 0 31.5V268.5Z"
                fill="black"
                fillOpacity="0.4"
              />
            </svg>
            <div
              style={{
                pointerEvents: "none",
              }}
              className="left-cargo-button center"
            >
              EXPLORE
            </div>
          </section>
        </section>
        <section className="landing-right">
          <section className="right-suits-box center">
            <section className="right-suits-box-image"></section>
            <section className="right-suits-box-buttons">
              <div className="right-suits-box-buttons-row1 center">
                <div className="right-suits-box-buttons-row1-button1"></div>
                <div className="right-suits-box-buttons-row1-button2"></div>
                <div className="right-suits-box-buttons-row1-button3"></div>
              </div>
              <div className="right-suits-box-buttons-row2 center">
                <div className="right-suits-box-buttons-row2-button1"></div>
                <div className="right-suits-box-buttons-row2-button2"></div>
                <div className="right-suits-box-buttons-row2-button3"></div>
              </div>
            </section>
            <section className="right-suits-box-stats"></section>
          </section>
          <section className="right-suits-heading">
            <div
              style={{
                fontSize: "2vw",
              }}
              className={`right-suits-header ${bruno_ace.className}`}
            >
              LADIES' SUITS
            </div>
            <div
              style={{
                fontSize: "0.875vw",
                color: "rgb(var(--pure-white))",
              }}
              className={`right-suits-heading-text ${ibm_plex_mono.className}`}
            >
              Where sophistication meets effortless comfort because power
              dressing should feel this good
            </div>
          </section>
          <section
            className={`right-suits-explore center ${bruno_ace.className}`}
          >
            <div className="right-suits-text">
              <span
                style={{
                  fontSize: "0.875vw",
                  lineHeight: "3vh",
                }}
              >
                JUN
              </span>
              <br />
              <span
                style={{
                  fontSize: "0.6vw",
                }}
              >
                COLLECTION
              </span>
            </div>
            <svg
              style={{
                position: "absolute",
                top: "0",
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 200 250"
              className="nausean-svg"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <pattern
                  id="imgPattern"
                  patternUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <image
                    href="/mark-adriane-1533MrY5liQ-unsplash.jpg"
                    width="100%"
                    height="100%"
                    className="nausean-image"
                    preserveAspectRatio="xMidYMid slice"
                  />
                </pattern>
              </defs>

              <path
                d="M200 218.5C200 235.897 185.897 250 168.5 250H112.5C105.596 250 100 244.404 100 237.5V237.5C100 230.596 94.4036 225 87.5 225H62.5C55.5964 225 50 219.404 50 212.5V212.5C50 205.596 44.4036 200 37.5 200H25C11.1929 200 0 188.807 0 175V31.5C0 14.103 14.103 0 31.5 0H168.5C185.897 0 200 14.103 200 31.5V218.5Z"
                fill="url(#imgPattern)"
              />
            </svg>
            <svg
              style={{
                position: "absolute",
                top: "0",
                pointerEvents: "none",
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 200 250"
              fill="none"
            >
              <path
                d="M200 218.5C200 235.897 185.897 250 168.5 250H112.5C105.596 250 100 244.404 100 237.5V237.5C100 230.596 94.4036 225 87.5 225H62.5C55.5964 225 50 219.404 50 212.5V212.5C50 205.596 44.4036 200 37.5 200H25C11.1929 200 0 188.807 0 175V31.5C0 14.103 14.103 0 31.5 0H168.5C185.897 0 200 14.103 200 31.5V218.5Z"
                fill="black"
                fillOpacity="0.4"
              />
            </svg>
            <div
              style={{
                pointerEvents: "none",
              }}
              className="right-suits-button center"
            >
              EXPLORE
            </div>
          </section>
        </section>
      </section>
    </>
  );
}
