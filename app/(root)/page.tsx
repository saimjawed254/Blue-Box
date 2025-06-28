"use client";

import Image from "next/image";
import "./page.css";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Children, useEffect, useRef, useState } from "react";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import LocomotiveScroll from "locomotive-scroll";
import {
  Orbitron,
  Poppins,
  Bruno_Ace,
  IBM_Plex_Mono,
  Cinzel_Decorative,
  Italiana,
} from "next/font/google";
import ProductCard from "@/components/UI/Cards/ProductCard";
import PrimaryButton from "@/components/UI/Buttons/PrimaryButton";
import ReviewCard from "@/components/UI/Cards/ReviewCard";
import FAQCard from "@/components/UI/Cards/FAQCard";
import ShaderWrapper from "@/components/BG/RippleWrapper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { hideShader, setShaderOwner, showShader } from "@/store/slices/uiSlice";
import NACardUp from "@/components/UI/Cards/NACardUp";
import NACardDown from "@/components/UI/Cards/NACardDown";
import { useUser } from "@clerk/nextjs";
import { Product } from "@/src/db/schema/products";
import Link from "next/link";
import Landing from "@/components/UI/Pages/Landing";
import Home from "@/components/UI/Pages/Home";
import WhyChooseUs from "@/components/UI/Pages/WhyChooseUs";
import Reviews from "@/components/UI/Pages/Reviews";
import SquareButton from "@/components/UI/Buttons/SquareButton";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400"] });
const bruno_ace = Bruno_Ace({ subsets: ["latin"], weight: ["400"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "300", "200", "100"],
});
const ibm_plex_mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
});
const cinzel_decorative = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400"],
});
const italiana = Italiana({ subsets: ["latin"], weight: ["400"] });

export default function Page() {
  const { user } = useUser();
  const alreadyInserted = useRef(false);
  console.log(user, alreadyInserted);

  const [bestsellersCargosData, setBestsellersCargosData] =
    useState<Product[]>();
  const [bestsellersSuitsData, setBestsellersSuitsData] = useState<Product[]>();
  const [newestArrivalsCargosData, setNewestArrivalsCargosData] =
    useState<Product[]>();
  const [newestArrivalsSuitsData, setNewestArrivalsSuitsData] =
    useState<Product[]>();
  const [leftBar, setLeftBar] = useState("/Rem.png");
  const [rightBar, setRightBar] = useState("/Rem.png");
  const [svgSize, setSvgSize] = useState(0);
  const [shadersVisible,setShadersVisible]=useState(true)

  useEffect(() => {
    if (user && !alreadyInserted.current) {
      console.log(user.primaryEmailAddress);
      alreadyInserted.current = true;

      fetch("api/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerk_id: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          name: user.fullName,
          avatar_url: user.imageUrl,
        }),
      }).then((res) => {
        console.log("RES", res);
      });
    }

    const fetchBestsellersCargo = async () => {
      try {
        const res = await fetch(
          "/api/products/best-sellers/cargos?page=1&limit=10"
        );
        const data = await res.json();
        setBestsellersCargosData(data.data);
        console.log("Fetched bestsellers cargos:", data.data);
      } catch (err) {
        console.error("Error fetching bestsellers:", err);
      }
    };

    const fetchBestsellersSuits = async () => {
      try {
        const res = await fetch(
          "/api/products/best-sellers/suits?page=1&limit=10"
        );
        const data = await res.json();
        setBestsellersSuitsData(data.data);
        console.log("Fetched bestsellers suits:", data.data);
      } catch (err) {
        console.error("Error fetching bestsellers:", err);
      }
    };

    const fetchNewestArrivalsCargos = async () => {
      try {
        const res = await fetch(
          "/api/products/newest-arrivals?page=1&limit=7&category=CARGO"
        );
        const data = await res.json();
        setNewestArrivalsCargosData(data.data);
        const cargos = data.data ?? [];
        const product = cargos[6];
        setLeftBar(product?.image_urls[0] || "/Rem.png");
        console.log("Fetched Newest Arrivals Cargos:", data.data);
      } catch (err) {
        console.error("Error fetching Newest Arrivals:", err);
      }
    };

    const fetchNewestArrivalsSuits = async () => {
      try {
        const res = await fetch(
          "/api/products/newest-arrivals?page=1&limit=8&category=LADIES' SUIT"
        );
        const data = await res.json();
        setNewestArrivalsSuitsData(data.data);
        const suits = data.data ?? [];
        const product = suits[7];
        setRightBar(product?.image_urls[0] || "/Rem.png");
        console.log("Fetched Newest Arrivals suits:", data.data);
      } catch (err) {
        console.error("Error fetching Newest Arrivals:", err);
      }
    };

    fetchBestsellersCargo();
    fetchBestsellersSuits();
    fetchNewestArrivalsCargos();
    fetchNewestArrivalsSuits();
  }, [user]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    function vwToPx(e: number) {
      return (window.innerWidth * e) / 100;
    }
    function vhToPx(e: number) {
      return (window.innerHeight * e) / 100;
    }
    window.addEventListener("scroll", () => {
      console.log(window.scrollY);
      const container = document.querySelector(
        ".na-container"
      ) as HTMLElement | null;
      const naPage = document.querySelector(
        ".newest-arrivals"
      ) as HTMLElement | null;

      if (window.scrollY > vhToPx(500)) {
        if (container && naPage) {
          container.style.visibility = "visible";
          naPage.style.visibility = "hidden";
        }
      }
      if (window.scrollY < vhToPx(500)) {
        if (container && naPage) {
          container.style.visibility = "hidden";
          naPage.style.visibility = "visible";
        }
      }

      if (scrollY > vhToPx(400) && scrollY < vhToPx(2400)) {
        setShadersVisible(false)
      }

      if (scrollY <= vhToPx(400) || scrollY >= vhToPx(2400)) {
        setShadersVisible(true)
      }

      // if (window.scrollY > vhToPx(385) && window.scrollY < vhToPx(2385)) {
      //   dispatch(hideShader());
      // }
      // if (window.scrollY > vhToPx(2385) || window.scrollY < vhToPx(385)) {
      //   dispatch(showShader());
      // }
    });

    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: ".newest-arrivals",
        pin: true,
        pinSpacing: false,
        start: "center center",
        end: `+=${vhToPx(200)}`,
        scrub: true,
      },
      defaults: { ease: "power2.out" },
    });

    tl1
      .from(".newest-arrivals", {
        scale: 0.1,
        borderRadius: `${vwToPx(50)}`,
        duration: 1,
      })
      .to(
        ".newest-arrivals",
        {
          borderRadius: 0,
          duration: 1,
        },
        "<"
      )
      .from(
        ".na-black-overlay",
        {
          borderRadius: `${vwToPx(50)}`,
          duration: 1,
        },
        "<"
      )
      .to(
        ".na-black-overlay",
        {
          opacity: 1,
          borderRadius: 0,
          duration: 1,
        },
        "<"
      );

    // const tl2 = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: ".na-close",
    //     pin: true,
    //     pinSpacing: false,
    //     start: `${vhToPx(1285)}`,
    //     end: `+=${vhToPx(200)}`,
    //     scrub: 1,
    //   },
    //   defaults: { ease: "none" },
    // });
    // tl2.to(".na-close", {
    //   scale: 0.6,
    // })

    // t1.from(naGSAP, {
    //   scale: 0.6,
    //   ease: "power2.inOut",
    // });
    // .to(naGSAP, {
    //   height: "300%",
    // })
    // .to(naGSAP, {
    //   height: "100%",
    // })
    // .to(naGSAP, {
    //   scale: 0.6,
    //   ease: "power2.inOut",
    // });

    gsap.to(".bs-sidebar-text", {
      yPercent: -100,
      repeat: -1,
      duration: 15,
      ease: "linear",
    });

    // gsap.to(".rr-card", {
    //   xPercent: -100,
    //   repeat: -1,
    //   duration: 5,
    //   ease: "linear",
    // });

    ScrollTrigger.create({
      trigger: ".na-marquee",
      pin: true,
      pinSpacing: false,
      start: `center center`,
      end: `+=${vhToPx(200)}`,
    });

    gsap.to(".na-marq", {
      xPercent: -100,
      repeat: -1,
      duration: 5,
      ease: "linear",
    });

    // gsap.to(".nap2-marq1", {
    //   yPercent: -100,
    //   repeat: -1,
    //   duration: 5,
    //   ease: "linear",
    // });
    // gsap.to(".nap2-marq2", {
    //   yPercent: -100,
    //   repeat: -1,
    //   duration: 5,
    //   ease: "linear",
    // });
    // const t2 = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: ".faqs-header",
    //     pin: true,
    //     pinSpacing: false,
    //     start: "top top",
    //     end: `+=${vhToPx(207)}`,
    //     scrub: 1,
    //   },
    //   defaults: { ease: "none" },
    // });

    // t2.set(".faqs-header", {
    //   zIndex: -5,
    // });
    const items = gsap.utils.toArray(".na-panels");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".na-container",
        pin: true,
        scrub: 1,
        start: "top top",
        end: `+=${vhToPx(2000)}`,
      },
      defaults: {
        ease: "power2.inOut",
      },
    });

    tl.to(
      items,
      {
        x: `-${vwToPx(500)}`,
        duration: vhToPx(2000),
      },
      0
    );

    tl.to(
      ".nap1-product-image1",
      {
        x: vwToPx(60),
        rotation: 360,
        transformOrigin: "center center",
        duration: vhToPx(600),
        ease: "power2.inOut",
      },
      vhToPx(100)
    );

    gsap.set(".nap1-img2", {
      scale: 1.5,
      transformOrigin: "90% 0%",
    });

    tl.to(
      ".nap1-product-image2",
      {
        x: vwToPx(50),
        ease: "power2.inOut",
        duration: vhToPx(600),
      },
      vhToPx(100)
    );

    tl.to(
      ".nap1-img2",
      {
        x: vwToPx(10),
        scale: 1,
        ease: "power2.inOut",
        duration: vhToPx(1000),
      },
      vhToPx(100)
    );

    tl.to(
      ".nap1-product-image3",
      {
        x: -vwToPx(60),
        rotation: -360,
        transformOrigin: "center center",
        duration: vhToPx(600),
        ease: "power2.inOut",
      },
      vhToPx(100)
    );

    gsap.set(".nap2-lb-img1", {
      scale: 1.5,
      transformOrigin: "90% 0%",
    });

    tl.to(
      ".nap2-lb-img1",
      {
        x: vwToPx(10),
        ease: "power2.inOut",
        duration: vhToPx(600),
      },
      vhToPx(500)
    );

    // gsap.set(".nap2-lb-img2", {
    //   scale: 1.5,
    //   transformOrigin: "100% 0%",
    // });

    // tl.to(
    //   ".nap2-lb-img2",
    //   {
    //     x: -vwToPx(5),
    //     ease: "power2.inOut",
    //     duration: vhToPx(525),
    //   },
    //   vhToPx(500)
    // );

    tl.from(
      ".nap2-left-bar-image",
      {
        x: -vwToPx(15),
        ease: "power2.inOut",
        duration: vhToPx(525),
      },
      vhToPx(525)
    );

    gsap.set(".nap2-rb-img1", {
      scale: 1.5,
      transformOrigin: "100% 0%",
    });

    tl.to(
      ".nap2-rb-img1",
      {
        x: vwToPx(10),
        ease: "power2.inOut",
        duration: vhToPx(550),
      },
      vhToPx(725)
    );

    // gsap.set(".nap2-rb-img2", {
    //   scale: 1.5,
    //   transformOrigin: "100% 0%",
    // });

    // tl.to(
    //   ".nap2-rb-img2",
    //   {
    //     x: -vwToPx(10),
    //     ease: "power2.inOut",
    //     duration: vhToPx(550),
    //   },
    //   vhToPx(700)
    // );

    tl.to(
      ".nap2-right-bar-image",
      {
        x: vwToPx(15),
        ease: "power2.inOut",
        duration: vhToPx(550),
      },
      vhToPx(700)
    );

    gsap.set(".na-card-img", {
      scale: 1.5,
    });

    const images = gsap.utils.toArray<HTMLElement>(".na-card-img");

    images.forEach((img, i) => {
      let position;

      switch (i) {
        case 0:
          position = vhToPx(950);
          break;
        case 1:
          position = vhToPx(1025);
          break;
        case 2:
          position = vhToPx(1100);
          break;
        case 3:
          position = vhToPx(1175);
          break;
        case 4:
          position = vhToPx(1250);
          break;
        case 5:
          position = vhToPx(1325);
          break;
        default:
          position = vhToPx(2000 + (i - 6) * 400); // fallback for rest
          break;
      }

      tl.to(
        img,
        {
          x: vwToPx(5),
          ease: "linear",
          duration: () => vhToPx(150 + i * 75),
        },
        position
      );
    });

    gsap.set(".na-card-img-up", {
      scale: 1.5,
    });

    const imagesup = gsap.utils.toArray<HTMLElement>(".na-card-img-up");

    imagesup.forEach((img, i) => {
      let position;

      switch (i) {
        case 0:
          position = vhToPx(987.5);
          break;
        case 1:
          position = vhToPx(1062.5);
          break;
        case 2:
          position = vhToPx(1137.5);
          break;
        case 3:
          position = vhToPx(1212.5);
          break;
        case 4:
          position = vhToPx(1287.5);
          break;
        case 5:
          position = vhToPx(1362.5);
          break;
        default:
          position = vhToPx(2000 + (i - 6) * 400); // fallback for rest
          break;
      }

      tl.to(
        img,
        {
          x: vwToPx(5),
          ease: "linear",
          duration: () => vhToPx(150 + i * 75),
        },
        position
      );
    });

    gsap.utils.toArray<HTMLElement>(".n1vt").forEach((line, i) => {
      const masked = SplitText.create(line, {
        type: "lines",
        mask: "lines",
        preserveWhiteSpace: true,
      });

      gsap.from(masked.lines, {
        rotationY: -100,
        transformOrigin: `50% 50% -${vwToPx(10)}px`,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".na-container",
          start: "top top",
          toggleActions: "play none none reverse",
        },
      });
    });

    gsap.utils.toArray<HTMLElement>(".n1ht").forEach((line, i) => {
      const masked = SplitText.create(line, {
        type: "lines",
        mask: "lines",
        preserveWhiteSpace: true,
      });

      gsap.from(masked.lines, {
        rotationX: -100,
        transformOrigin: `50% 50% -${vwToPx(10)}px`,
        opacity: 0,
        duration: 1.2,
        delay: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".na-container",
          start: "top top",
          toggleActions: "play none none reverse",
        },
      });
    });

    gsap.utils.toArray<HTMLElement>(".n3bt").forEach((line, i) => {
      const masked = SplitText.create(line, {
        type: "lines",
        mask: "lines",
        preserveWhiteSpace: true,
      });

      tl.from(
        masked.lines,
        {
          rotationY: -100,
          transformOrigin: `50% 50% -${vwToPx(10)}px`,
          opacity: 0,
          duration: vhToPx(300),
          ease: "power3.out",
        },
        vhToPx(1700)
      );
    });

    const masked = SplitText.create(".nap3-end-top-text", {
      type: "lines",
      mask: "lines",
      preserveWhiteSpace: true,
    });

    tl.from(
      masked.lines,
      {
        rotationX: 100,
        transformOrigin: `50% 50% -${vwToPx(10)}px`,
        opacity: 0,
        duration: vhToPx(300),
        ease: "power3.out",
      },
      vhToPx(1700)
    );

    const tlFaq = gsap.timeline({
      scrollTrigger: {
        trigger: ".faqs-header",
        pin: true,
        pinSpacing: false,
        scrub: true,
        start: `${vhToPx(2865)}`,
        end: `${vhToPx(3070)}`,
        invalidateOnRefresh: true,
      },
    });

    const maskedFaq = SplitText.create(".faqs-text", {
      type: "lines",
      mask: "lines",
      preserveWhiteSpace: true,
    });

    tlFaq.from(
      maskedFaq.lines,
      {
        // rotationX: -100,
        // transformOrigin: `50% 50% -${vwToPx(2)}px`,
        y: vwToPx(2.5),
        duration: 1,
        ease: "linear",
      },
      0
    );
    tlFaq.to({}, { duration: 4 });

    ScrollTrigger.refresh();
  });
  return (
    <>

      <div>
        {shadersVisible && (
          <ShaderWrapper/>
        )}
      </div>
      {/* -------------------------Hero-------------------------- */}
      <Home />
      {/* <section className={`hero ${ibm_plex_mono.className}`}>
        <div className="hero-ll">
          <div className="hero-ll-head">
            BEYOND FASHION <br />
            &nbsp;&nbsp;&nbsp;&nbsp;—BUILT FOR YOU.
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
                fillOpacity="0.5"
              />
            </svg>
          </div>
        </div>
        <div className="hero-ml">
          <div className="hero-ml-head">WE SELL MEN'S CARGO.</div>
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
                fillOpacity="0.5"
              />
            </svg>
          </div>
        </div>
        <div className="hero-mr">
          <div className="hero-mr-head">WE SELL MEN'S CARGO.</div>
          <div className="hero-mr-text">
            Utility Meets Edge <br /> <br />
            Dynamic fits, rugged function, and street-ready impact for your
            everyday bold moves
          </div>
          <div className="hero-mr-svg center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="70"
              height="70"
              viewBox="0 0 64 70"
              fill="none"
            >
              <path
                d="M67.0692 0L67.0691 70H0L67.0692 0Z"
                fill="#F0F1FA"
                fillOpacity="0.5"
              />
            </svg>
          </div>
        </div>
        <div className="hero-rr">
          <div className="hero-rr-head">
            BEYOND FASHION <br />
            —BUILT FOR YOU.&nbsp;&nbsp;&nbsp;&nbsp;
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
                fillOpacity="0.5"
              />
            </svg>
          </div>
        </div>
        <div className={`hero-name center ${cinzel_decorative.className}`}>
          BLUE BOX
        </div>
      </section> */}

      {/* -------------------------Why Choose Us-------------------------- */}

      <WhyChooseUs />
      {/* -------------------------Newest Arrivals-------------------------- */}

      <section className="na">
        <div className={`na-marquee ${bruno_ace.className}`}>
          <section className="na-marq">Newest Arrivals&nbsp;</section>
          <section className="na-marq">Newest Arrivals&nbsp;</section>
          <section className="na-marq">Newest Arrivals&nbsp;</section>
        </div>

        <section className="newest-arrivals">
          <div className="na-black-overlay"></div>
        </section>
      </section>
      <section className="na-buffer"></section>

      <section className="na-container">
        <div
          style={{
            zIndex: -1,
          }}
        >
          {!shadersVisible && (
            <ShaderWrapper />
          )}
        </div>
        <div className="na-panel-1 na-panels">
          <div className={`nap1-vertical-text ${poppins.className}`}>
            <div className="n1vt">Innovation</div>
            <div className="n1vt">Timeless</div>
            <div className="n1vt">Elegant</div>
            <div className="n1vt">Flair</div>
            <div className="n1vt">AI</div>
          </div>
          <div className="nap1-button-1 center">
            <PrimaryButton
              link={"/products/newest-arrivals"}
              borderColor={"rgb(var(--bronze))"}
              fillColor={"#000000"}
            />
          </div>
          <div className="nap1-tertiary-text-up n1ht">
            Newest Arrivals – Elevate Your Experience
          </div>
          <div
            className={`nap1-tertiary-text-bottom n1ht ${italiana.className}`}
          >
            Discover the Collection.
          </div>
          <div className={`nap1-tertiary-text n1ht ${poppins.className}`}>
            Each piece in our newest collection embodies craftsmanship,
            refinement, and exclusivity. Indulge in design that speaks of
            effortless sophistication
          </div>
          <div className="nap1-tagline-secondary n1ht center">
            Latest in Stock.
          </div>
          <div className="nap1-tagline-main n1ht center">
            Latest in Fashion.
          </div>
          <div className={`nap1-centre-text n1ht ${poppins.className}`}>
            Indulge in the ultimate design experience. Be among the first to
            explore our newest arrivals. Limited availability. Secure yours
            today.
          </div>
          <div className={`nap1-centre-heading1 n1ht ${italiana.className}`}>
            Shop Now!
          </div>
          <div className={`nap1-centre-heading2 n1ht ${poppins.className}`}>
            Before it's gone.
          </div>
          <div className="nap1-button-2 center">
            <PrimaryButton
              link="/products/newest-arrivals"
              borderColor={"rgb(var(--bronze))"}
              fillColor={"#000000"}
            />
          </div>
          {(() => {
            const suits = newestArrivalsSuitsData ?? [];
            const product = suits[5];
            const fallback = "/Rem.png";

            const imageSrc =
              product?.image_urls?.[0] && product.image_urls[0].length > 0
                ? product.image_urls[0]
                : fallback;

            return (
              <Link
                href={
                  product?.product_id
                    ? `/product/suit?id=${product.product_id}`
                    : `/products/newest-arrivals`
                }
                className="nap1-product-image1"
              >
                <Image
                  className="nap1-img1"
                  src={imageSrc}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                />
              </Link>
            );
          })()}
          {(() => {
            const cargos = newestArrivalsCargosData ?? [];
            const product = cargos[5];
            const fallback = "/Rem.png";

            const imageSrc =
              product?.image_urls?.[0] && product.image_urls[0].length > 0
                ? product.image_urls[0]
                : fallback;

            return (
              <div className="nap1-product-image2">
                <Link
                  href={
                    product?.product_id
                      ? `/product/cargo?id=${product.product_id}`
                      : "/products/newest-arrivals"
                  }
                  className="nap1-p2"
                >
                  <Image
                    className="nap1-img2"
                    src={imageSrc}
                    alt=""
                    layout="fill"
                    objectFit="cover"
                  />
                </Link>
              </div>
            );
          })()}
          {(() => {
            const suits = newestArrivalsSuitsData ?? [];
            const product = suits[6];
            const fallback = "/Rem.png";

            const imageSrc =
              product?.image_urls?.[0] && product.image_urls[0].length > 0
                ? product.image_urls[0]
                : fallback;

            return (
              <Link
                href={
                  product?.product_id
                    ? `/product/suit?id=${product.product_id}`
                    : "/products/newest-arrivals"
                }
                className="nap1-product-image3"
              >
                <Image src={imageSrc} alt="" layout="fill" objectFit="cover" />
              </Link>
            );
          })()}
        </div>
        <div className="na-panel-2 na-panels">
          <div style={{ background: `black cover` }} className="nap2-left-bar">
            <Image
              className="nap2-lb-img1"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
              src={leftBar}
              alt=""
              layout="fill"
            />
          </div>
          {(() => {
            const cargos = newestArrivalsCargosData ?? [];
            const product = cargos[6];
            const fallback = "/Rem.png";
            const imageSrc =
              product?.image_urls?.[0] && product.image_urls[0].length > 0
                ? product.image_urls[0]
                : fallback;

            return (
              <Link
                href={
                  product?.product_id
                    ? `/product/cargo?id=${product.product_id}`
                    : "/products/newest-arrivals"
                }
                className="nap2-left-bar-image"
              >
                <Image
                  className="nap2-lb-img2"
                  src={imageSrc}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                />
              </Link>
            );
          })()}

          <div className={`nap2-marquee1`}>
            <section className="nap2-marq1">
              Cargo&nbsp;Cargo&nbsp;Cargo
            </section>
            <section className="nap2-marq1">
              Cargo&nbsp;Cargo&nbsp;Cargo
            </section>
            <section className="nap2-marq1">
              Cargo&nbsp;Cargo&nbsp;Cargo
            </section>
            <section className="nap2-marq1">
              Cargo&nbsp;Cargo&nbsp;Cargo
            </section>
            <section className="nap2-marq1">
              Cargo&nbsp;Cargo&nbsp;Cargo
            </section>
            <section className="nap2-marq1">
              Cargo&nbsp;Cargo&nbsp;Cargo
            </section>
          </div>
          <div className={`nap2-marquee2`}>
            <section className="nap2-marq2">
              Suits&nbsp;Suits&nbsp;Suits&nbsp;
            </section>
            <section className="nap2-marq2">
              Suits&nbsp;Suits&nbsp;Suits&nbsp;
            </section>
            <section className="nap2-marq2">
              Suits&nbsp;Suits&nbsp;Suits&nbsp;
            </section>
            <section className="nap2-marq2">
              Suits&nbsp;Suits&nbsp;Suits&nbsp;
            </section>
            <section className="nap2-marq2">
              Suits&nbsp;Suits&nbsp;Suits&nbsp;
            </section>
            <section className="nap2-marq2">
              Suits&nbsp;Suits&nbsp;Suits&nbsp;
            </section>
          </div>
          <div className="nap2-collections-cargo">
            <div className={`nap2-cc-heading1 ${italiana.className}`}>
              The Newly added Collections of{" "}
            </div>
            <div className="nap2-cc-heading2">Men's Cargo</div>
            <div className={`nap2-cc-brand blur ${italiana.className}`}>
              <div className="nap2-cc-brand-serial">01</div>
              <div className="nap2-cc-brand-name">Pantaloons</div>
            </div>
            <div className={`nap2-cc-brand blur ${italiana.className}`}>
              <div className="nap2-cc-brand-serial">01</div>
              <div className="nap2-cc-brand-name">HRX</div>
            </div>
            <div className={`nap2-cc-brand blur ${italiana.className}`}>
              <div className="nap2-cc-brand-serial">01</div>
              <div className="nap2-cc-brand-name">Levis</div>
            </div>
            <div className={`nap2-cc-brand blur ${italiana.className}`}>
              <div className="nap2-cc-brand-serial">01</div>
              <div className="nap2-cc-brand-name">GodSpeed</div>
            </div>
            <div className={`nap2-cc-brand blur ${italiana.className}`}>
              <div className="nap2-cc-brand-serial">01</div>
              <div className="nap2-cc-brand-name">Denim & Co.</div>
            </div>
          </div>
          <div className="nap2-collections-suits">
            <div className={`nap2-cs-heading1 ${italiana.className}`}>
              The Newly added Collections of{" "}
            </div>
            <div className="nap2-cs-heading2">
              Ladies' <br />
              Suits
            </div>
            <div className={`nap2-cs-brand blur ${italiana.className}`}>
              <div className="nap2-cs-brand-serial">01</div>
              <div className="nap2-cs-brand-name">Zara</div>
            </div>
            <div className={`nap2-cs-brand blur ${italiana.className}`}>
              <div className="nap2-cs-brand-serial">01</div>
              <div className="nap2-cs-brand-name">Gucci</div>
            </div>
            <div className={`nap2-cs-brand blur ${italiana.className}`}>
              <div className="nap2-cs-brand-serial">01</div>
              <div className="nap2-cs-brand-name">Saanjh</div>
            </div>
            <div className={`nap2-cs-brand blur ${italiana.className}`}>
              <div className="nap2-cs-brand-serial">01</div>
              <div className="nap2-cs-brand-name">GodSpeed</div>
            </div>
            <div className={`nap2-cs-brand blur ${italiana.className}`}>
              <div className="nap2-cs-brand-serial">01</div>
              <div className="nap2-cs-brand-name">Denim & Co.</div>
            </div>
            <div className={`nap2-cs-brand blur ${italiana.className}`}>
              <div className="nap2-cs-brand-serial">01</div>
              <div className="nap2-cs-brand-name">Sharjah</div>
            </div>
          </div>
          <div style={{ background: `black cover` }} className="nap2-right-bar">
            <Image
              className="nap2-rb-img1"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
              src={rightBar}
              alt=""
              layout="fill"
            />
          </div>

          {(() => {
            const suits = newestArrivalsSuitsData ?? [];
            const product = suits[7];
            const fallback = "/Rem.png";

            const imageSrc =
              product?.image_urls?.[0] && product.image_urls[0].length > 0
                ? product.image_urls[0]
                : fallback;

            return (
              <Link
                href={
                  product?.product_id
                    ? `/product/cargo?id=${product.product_id}`
                    : "/products/newest-arrivals"
                }
                className="nap2-right-bar-image"
              >
                <Image
                  className="nap2-rb-img2"
                  src={imageSrc}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                />
              </Link>
            );
          })()}
        </div>
        <div className="na-panel-3 na-panels">
          <div className="na-cards-container">
            {(() => {
              const cargos = newestArrivalsCargosData ?? [];
              const suits = newestArrivalsSuitsData ?? [];

              return Array.from({ length: 5 }).map((_, i) => (
                <div className="center" key={i}>
                  <div className="na-cards">
                    <NACardUp product={cargos[i]} />
                  </div>
                  <div className="na-cards">
                    <NACardDown product={suits[i]} />
                  </div>
                </div>
              ));
            })()}
          </div>
          <div className="nap3-end">
            <div className="nap3-end-top-text">That's it!</div>
            <div className="nap3-end-button center">
              <PrimaryButton
                link={`products/newest-arrivals`}
                borderColor="rgb(var(--bronze))"
                fillColor="#000000"
              />
            </div>
            <div className="nap3-end-bottom-text1 n3bt">You know</div>
            <div className="nap3-end-bottom-text2 n3bt">Quality</div>
            <div className="nap3-end-bottom-text3 n3bt">when</div>
            <div className="nap3-end-bottom-text4 n3bt">you see</div>
            <div className="nap3-end-bottom-text5 n3bt">it... Don't wait!</div>
          </div>
        </div>
      </section>

      {/* -------------------------Ratings and Reviews-------------------------- */}
      <Reviews />
      {/* -------------------------Best Sellers-------------------------- */}

      <section className="best-sellers">
        <div className="bs-sidebar">
          <div
            id="bs-marqueeOne"
            className={`bs-sidebar-text ${bruno_ace.className}`}
          >
            Best Sellers Best Sellers&nbsp;
          </div>
          <div
            id="bs-marqueeTwo"
            className={`bs-sidebar-text ${bruno_ace.className}`}
          >
            Best Sellers Best Sellers&nbsp;
          </div>
        </div>
        <div className="bs-display">
          <div className="bsd-cargo-header">
            <div className={`bsdch-text ${poppins.className}`}>
              <div className="svg-floral">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                  fill="none"
                >
                  <path
                    d="M30.9354 30.7835L38.4562 38.2335L34.925 41.7272L27.4042 34.2793C27.0874 33.9644 26.7116 33.7151 26.2984 33.5457C25.8851 33.3762 25.4425 33.29 24.9958 33.2918C24.0792 33.2918 23.2333 33.6397 22.5875 34.2793L15.0667 41.7293L11.5375 38.2335L19.0583 30.7835H30.9354ZM32.1896 28.6377L42.4604 31.3585L43.75 26.5793L33.4792 23.8564C33.0475 23.744 32.6424 23.547 32.2873 23.2771C31.9322 23.0071 31.6342 22.6694 31.4104 22.2835C31.186 21.9005 31.0404 21.4765 30.9821 21.0365C30.9238 20.5965 30.954 20.1492 31.0708 19.721L33.8208 9.55016L28.9958 8.271L26.2458 18.446L32.1833 28.6293L32.1896 28.6377ZM17.8104 28.6377L7.53958 31.3585L6.25 26.5793L16.5208 23.8564C16.9525 23.744 17.3576 23.547 17.7127 23.2771C18.0678 23.0071 18.3658 22.6694 18.5896 22.2835C18.814 21.9005 18.9596 21.4765 19.0179 21.0365C19.0762 20.5965 19.046 20.1492 18.9292 19.721L16.1792 9.55016L21.0042 8.271L23.7542 18.446L17.8167 28.6293L17.8104 28.6377Z"
                    fill="black"
                  />
                </svg>
              </div>
              &nbsp;Cargo Best Sellers
            </div>
            <div className="bsdch-button-show-all">
              <SquareButton link={`products/best-sellers/cargos`} />
            </div>
            <div className="bsdch-button-left center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 55 50"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.5417 27.2084C15.9565 26.6224 15.6278 25.8282 15.6278 25C15.6278 24.1719 15.9565 23.3776 16.5417 22.7917L28.3251 11.0042C28.9113 10.4182 29.7063 10.0892 30.5352 10.0894C30.9456 10.0895 31.352 10.1704 31.7311 10.3275C32.1102 10.4847 32.4547 10.715 32.7449 11.0052C33.035 11.2955 33.2651 11.6401 33.4221 12.0193C33.5791 12.3985 33.6598 12.8049 33.6597 13.2154C33.6596 13.6258 33.5787 14.0321 33.4215 14.4113C33.2644 14.7904 33.0341 15.1349 32.7438 15.425L23.1709 25L32.7459 34.575C33.0445 34.8632 33.2827 35.2079 33.4467 35.5891C33.6106 35.9703 33.697 36.3803 33.7008 36.7952C33.7046 37.2101 33.6258 37.6217 33.4688 38.0058C33.3119 38.3899 33.08 38.7389 32.7867 39.0325C32.4934 39.326 32.1446 39.5582 31.7607 39.7156C31.3767 39.8729 30.9652 39.9521 30.5503 39.9487C30.1354 39.9453 29.7253 39.8593 29.3439 39.6957C28.9626 39.5321 28.6176 39.2942 28.3292 38.9959L16.5376 27.2084H16.5417Z"
                  fill="black"
                />
              </svg>
            </div>
            <div className="bsdch-button-right center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 55 50"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.5417 27.2084C15.9565 26.6224 15.6278 25.8282 15.6278 25C15.6278 24.1719 15.9565 23.3776 16.5417 22.7917L28.3251 11.0042C28.9113 10.4182 29.7063 10.0892 30.5352 10.0894C30.9456 10.0895 31.352 10.1704 31.7311 10.3275C32.1102 10.4847 32.4547 10.715 32.7449 11.0052C33.035 11.2955 33.2651 11.6401 33.4221 12.0193C33.5791 12.3985 33.6598 12.8049 33.6597 13.2154C33.6596 13.6258 33.5787 14.0321 33.4215 14.4113C33.2644 14.7904 33.0341 15.1349 32.7438 15.425L23.1709 25L32.7459 34.575C33.0445 34.8632 33.2827 35.2079 33.4467 35.5891C33.6106 35.9703 33.697 36.3803 33.7008 36.7952C33.7046 37.2101 33.6258 37.6217 33.4688 38.0058C33.3119 38.3899 33.08 38.7389 32.7867 39.0325C32.4934 39.326 32.1446 39.5582 31.7607 39.7156C31.3767 39.8729 30.9652 39.9521 30.5503 39.9487C30.1354 39.9453 29.7253 39.8593 29.3439 39.6957C28.9626 39.5321 28.6176 39.2942 28.3292 38.9959L16.5376 27.2084H16.5417Z"
                  fill="black"
                />
              </svg>
            </div>
          </div>

          <div className="bsdc-cards">
            {bestsellersCargosData?.map((product) => (
              <ProductCard key={product.product_id} product={product} />
            ))}
          </div>
          <div className="bsd-suits-header">
            <div className={`bsdsh-text ${poppins.className}`}>
              <div className="svg-floral">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                  fill="none"
                >
                  <path
                    d="M30.9354 30.7835L38.4562 38.2335L34.925 41.7272L27.4042 34.2793C27.0874 33.9644 26.7116 33.7151 26.2984 33.5457C25.8851 33.3762 25.4425 33.29 24.9958 33.2918C24.0792 33.2918 23.2333 33.6397 22.5875 34.2793L15.0667 41.7293L11.5375 38.2335L19.0583 30.7835H30.9354ZM32.1896 28.6377L42.4604 31.3585L43.75 26.5793L33.4792 23.8564C33.0475 23.744 32.6424 23.547 32.2873 23.2771C31.9322 23.0071 31.6342 22.6694 31.4104 22.2835C31.186 21.9005 31.0404 21.4765 30.9821 21.0365C30.9238 20.5965 30.954 20.1492 31.0708 19.721L33.8208 9.55016L28.9958 8.271L26.2458 18.446L32.1833 28.6293L32.1896 28.6377ZM17.8104 28.6377L7.53958 31.3585L6.25 26.5793L16.5208 23.8564C16.9525 23.744 17.3576 23.547 17.7127 23.2771C18.0678 23.0071 18.3658 22.6694 18.5896 22.2835C18.814 21.9005 18.9596 21.4765 19.0179 21.0365C19.0762 20.5965 19.046 20.1492 18.9292 19.721L16.1792 9.55016L21.0042 8.271L23.7542 18.446L17.8167 28.6293L17.8104 28.6377Z"
                    fill="black"
                  />
                </svg>
              </div>
              &nbsp;Suits Best Sellers
            </div>
            <div className="bsdsh-button-show-all">
              <SquareButton link={`products/best-sellers/suits`} />
            </div>
            <div className="bsdsh-button-left center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 55 50"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.5417 27.2084C15.9565 26.6224 15.6278 25.8282 15.6278 25C15.6278 24.1719 15.9565 23.3776 16.5417 22.7917L28.3251 11.0042C28.9113 10.4182 29.7063 10.0892 30.5352 10.0894C30.9456 10.0895 31.352 10.1704 31.7311 10.3275C32.1102 10.4847 32.4547 10.715 32.7449 11.0052C33.035 11.2955 33.2651 11.6401 33.4221 12.0193C33.5791 12.3985 33.6598 12.8049 33.6597 13.2154C33.6596 13.6258 33.5787 14.0321 33.4215 14.4113C33.2644 14.7904 33.0341 15.1349 32.7438 15.425L23.1709 25L32.7459 34.575C33.0445 34.8632 33.2827 35.2079 33.4467 35.5891C33.6106 35.9703 33.697 36.3803 33.7008 36.7952C33.7046 37.2101 33.6258 37.6217 33.4688 38.0058C33.3119 38.3899 33.08 38.7389 32.7867 39.0325C32.4934 39.326 32.1446 39.5582 31.7607 39.7156C31.3767 39.8729 30.9652 39.9521 30.5503 39.9487C30.1354 39.9453 29.7253 39.8593 29.3439 39.6957C28.9626 39.5321 28.6176 39.2942 28.3292 38.9959L16.5376 27.2084H16.5417Z"
                  fill="black"
                />
              </svg>
            </div>
            <div className="bsdsh-button-right center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 55 50"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.5417 27.2084C15.9565 26.6224 15.6278 25.8282 15.6278 25C15.6278 24.1719 15.9565 23.3776 16.5417 22.7917L28.3251 11.0042C28.9113 10.4182 29.7063 10.0892 30.5352 10.0894C30.9456 10.0895 31.352 10.1704 31.7311 10.3275C32.1102 10.4847 32.4547 10.715 32.7449 11.0052C33.035 11.2955 33.2651 11.6401 33.4221 12.0193C33.5791 12.3985 33.6598 12.8049 33.6597 13.2154C33.6596 13.6258 33.5787 14.0321 33.4215 14.4113C33.2644 14.7904 33.0341 15.1349 32.7438 15.425L23.1709 25L32.7459 34.575C33.0445 34.8632 33.2827 35.2079 33.4467 35.5891C33.6106 35.9703 33.697 36.3803 33.7008 36.7952C33.7046 37.2101 33.6258 37.6217 33.4688 38.0058C33.3119 38.3899 33.08 38.7389 32.7867 39.0325C32.4934 39.326 32.1446 39.5582 31.7607 39.7156C31.3767 39.8729 30.9652 39.9521 30.5503 39.9487C30.1354 39.9453 29.7253 39.8593 29.3439 39.6957C28.9626 39.5321 28.6176 39.2942 28.3292 38.9959L16.5376 27.2084H16.5417Z"
                  fill="black"
                />
              </svg>
            </div>
          </div>

          <div className="bsds-cards">
            {bestsellersSuitsData?.map((product) => (
              <ProductCard key={product.product_id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------Faqs-------------------------- */}

      <section className="faqs">
        <section className="faqs-header">
          <div className={`faqs-text ${poppins.className}`}>
            We understand customers have their doubts and <br />
            we are here to answer them.
          </div>
          <div className={`faqs-heading ${bruno_ace.className}`}>FAQS</div>
        </section>
        <section className="faqs-cards">
          <div className="faqs-cards-line1 center">
            <FAQCard visibility="visible" />
            <FAQCard visibility="hidden" />
            <FAQCard visibility="hidden" />
            <FAQCard visibility="visible" />
          </div>
          <div className="faqs-cards-line2 center">
            <FAQCard visibility="hidden" />
            <FAQCard visibility="visible" />
            <FAQCard visibility="visible" />
            <FAQCard visibility="hidden" />
          </div>
          <div className="faqs-cards-line3 center">
            <FAQCard visibility="visible" />
            <FAQCard visibility="hidden" />
            <FAQCard visibility="visible" />
            <FAQCard visibility="visible" />
          </div>
          <div className="faqs-cards-line4 center">
            <FAQCard visibility="hidden" />
            <FAQCard visibility="visible" />
            <FAQCard visibility="hidden" />
            <FAQCard visibility="visible" />
          </div>
        </section>
      </section>
    </>
  );
}
