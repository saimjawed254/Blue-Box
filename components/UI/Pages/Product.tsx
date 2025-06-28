"use client";

import { Poppins } from "next/font/google";
import ProductCard from "../Cards/ProductCard";
import "./Product.css";
import Image from "next/image";
import { lightenHexColor } from "../ProductsSideBar";
import { Product } from "@/src/db/schema/products";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

type ProductPageProps = {
  product: Product;
};

export default function ProductPage({ product }: ProductPageProps) {
  let category = "";
  if (product.category === "CARGO") {
    category = "cargo";
  } else if (product.category === "LADIES' SUIT") {
    category = "suit";
  }

  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const [similarProductData, setSimilarProductData] = useState<Product[]>();
  const [productCodeData, setProductCodeData] = useState<Product[]>();
  const [sizeColorMap, setSizeColorMap] = useState<Record<string, string[]>>(
    {}
  );
  const [uniqueColors, setUniqueColors] = useState<string[]>([]);
  const [currentSizeColors, setCurrentSizeColors] = useState<string[]>([]);
  const [isAdding, setIsAdding] = useState(true);
  const wishlistIconRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [svgSize,setSvgSize]=useState(1);

  const handleShare = async () => {
    const shareData = {
      title: "Check this out!",
      text: "Here’s something interesting!",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log("Shared successfully");
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Clipboard copy failed:", err);
      }
    }
  };

  const handleSavePincode = async () => {
    if (loading) {
      return;
    }
    if (!pincode.trim()) {
      alert("Pincode cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/address/save-pincode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pincode }),
      });

      const data = await res.json();
      console.log(data.message);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (loading) {
      return;
    }
    if (!address.trim()) {
      alert("Address cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/address/save-address", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      });

      const data = await res.json();
      console.log(data.message);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGetLocation = () => {
    if (loading) {
      return;
    }

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setCoords({ lat, lon });
        console.log(lat, lon);
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
          );
          const data = await res.json();
          setAddress(data.display_name || "Address not found");
          console.log(data);
        } catch (error) {
          console.error(error);
          setAddress("Failed to fetch address");
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error(error);
        alert("Failed to get location: " + error.message);
        setLoading(false);
      }
    );
  };

  const handleColorClick = (isActive: boolean, color: string) => {
    if (isActive) {
      productCodeData?.map((data) => {
        if (data.size === product.size && data.color === color) {
          router.push(`/product/${category}?id=${data.product_id}`);
        }
      });
    } else {
      productCodeData?.map((data) => {
        if (data.size !== product.size && data.color === color) {
          router.push(`/product/${category}?id=${data.product_id}`);
        }
      });
    }
  };

  const handleAddToCart = async () => {
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }
    const payload = {
      user_id: user.id,
      product_id: product.product_id,
      size: product.size,
      color: product.color,
      quantity: 1,
    };
    try {
      const response = await fetch("/api/add-to-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Add to cart failed:", data.error || response.statusText);
        return { success: false, error: data.error || "Failed to add item" };
      }

      return { success: true, message: data.message };
    } catch (err) {
      console.error("Add to cart error:", err);
      return { success: false, error: "Something went wrong" };
    }
  };

  const handleAddToWishlist = async () => {
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }
    const body = {
      clerk_id: user.id,
      product_id: product.product_id,
      color: product.color,
      size: product.size,
    };

    if (isAdding) {
      wishlistIconRef.current?.classList.add("pdc-wishlist-button-pink");
      setIsAdding(!isAdding);
      try {
        const res = await fetch("/api/wishlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        const data = await res.json();
        console.log("Wishlist", data);

        if (!res.ok) throw new Error(data.error || "Failed to add to wishlist");
        return data;
      } catch (err) {
        console.log("Add to wishlist error:", err);
        throw err;
      }
    } else {
      wishlistIconRef.current?.classList.remove("pdc-wishlist-button-pink");
      setIsAdding(!isAdding);
      try {
        const res = await fetch("/api/wishlist", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        const data = await res.json();
        console.log("Wishlist", data);

        if (!res.ok)
          throw new Error(data.error || "Failed to delete from wishlist");
        return data;
      } catch (err) {
        console.log("Remove from wishlist error:", err);
        throw err;
      }
    }
  };

  useEffect(() => {
    if (!isLoaded) {
      return;
    }
        const vwToPx = (vw: number) => (window.innerWidth * vw) / 100;
    const vhToPx = (vh: number) => (window.innerHeight * vh) / 100;
    setSvgSize(vwToPx(2.4));
    const fetchIsWishlist = async () => {
      try {
        const res = await fetch(
          `/api/wishlist?clerk_id=${user?.id}&product_id=${product.product_id}`
        );
        const data = await res.json();
        if (data.length > 0) {
          wishlistIconRef.current?.classList.add("pdc-wishlist-button-pink");
          setIsAdding(!isAdding);
        }
      } catch (err) {
        console.log(err);
      }
    };
    const buildSizeColorMap = (variants: Product[] | undefined) => {
      const sizeColorMap: Record<string, Set<string>> = {};
      if (!variants) {
        return;
      }
      for (const variant of variants) {
        const { size, color } = variant;

        if (!sizeColorMap[size]) {
          sizeColorMap[size] = new Set();
        }

        sizeColorMap[size].add(color);
      }

      // Convert all Sets to arrays
      const result: Record<string, string[]> = {};
      for (const size in sizeColorMap) {
        result[size] = Array.from(sizeColorMap[size]);
      }
      setSizeColorMap(result);
      console.log(result);
      setCurrentSizeColors(result[product.size]);
      const allColors = Object.values(result).flat();
      setUniqueColors(Array.from(new Set(allColors)));
    };

    const fetchProductsByProductCode = async () => {
      try {
        const res = await fetch(
          `/api/product/by-code?product_code=${product.product_code}`
        );

        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProductCodeData(data);
        buildSizeColorMap(data);

        return data;
      } catch (err) {
        console.error("Error fetching by product_code:", err);
        return [];
      }
    };

    const fetchProductsByTags = async () => {
      try {
        const queryString = product.tags
          .map((tag) => `tags=${encodeURIComponent(tag)}`)
          .join("&");
        const res = await fetch(
          `/api/product/by-tags?${queryString}&page=1&limit=10`
        );

        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        console.log(data);
        setSimilarProductData(data.data);
        return data; // assumed to be an array of products
      } catch (err) {
        console.error("Error fetching by tags:", err);
        return [];
      }
    };
    fetchIsWishlist();
    fetchProductsByTags();
    fetchProductsByProductCode();
  }, [user?.id]);
  return (
    <>
      <section className={`product-page ${poppins.className}`}>
        <section className="p-page-header">
          <div className="pph-limited"></div>
          <div className="pph-navigate">
            <span>
              BlueBox / Product /{" "}
              {product.category === "CARGO" ? `Cargo` : `Ladies' Suit`} /
            </span>
            <span
              style={{
                fontWeight: "600",
                color: "rgb(var(--pure-black))",
              }}
            >
              &nbsp;{product.brand} &gt; {product.title}
            </span>
          </div>
        </section>
        <section className="product-display">
          <div className="pd-images">
            <div className="pd-image">
              <Image
                src={product.image_urls[0]}
                alt=""
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="pd-image">
              <Image
                src={product.image_urls[1]}
                alt=""
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="pd-image">
              <Image
                src={product.image_urls[2]}
                alt=""
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="pd-image">
              <Image
                src={product.image_urls[3]}
                alt=""
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="pd-image">
              <Image
                src={product.image_urls[4]}
                alt=""
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <div className="pd-content">
            <div className="pdc-company">
              {product.brand}
              <span
                onClick={handleShare}
                className={
                  copied
                    ? "pdc-share-button done center"
                    : "pdc-share-button center"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={`${svgSize/1.25}`}
                  height={`${svgSize/1.25}`}
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <path
                    d="M28.3333 36.6668C26.9444 36.6668 25.7638 36.1807 24.7916 35.2085C23.8194 34.2363 23.3333 33.0557 23.3333 31.6668C23.3333 31.5002 23.3749 31.1113 23.4583 30.5002L11.7499 23.6668C11.3055 24.0835 10.7916 24.4102 10.2083 24.6468C9.62492 24.8835 8.99992 25.0013 8.33325 25.0002C6.94436 25.0002 5.76381 24.5141 4.79159 23.5418C3.81936 22.5696 3.33325 21.3891 3.33325 20.0002C3.33325 18.6113 3.81936 17.4307 4.79159 16.4585C5.76381 15.4863 6.94436 15.0002 8.33325 15.0002C8.99992 15.0002 9.62492 15.1185 10.2083 15.3552C10.7916 15.5918 11.3055 15.9179 11.7499 16.3335L23.4583 9.50016C23.4027 9.30572 23.3682 9.1185 23.3549 8.9385C23.3416 8.7585 23.3344 8.55683 23.3333 8.3335C23.3333 6.94461 23.8194 5.76405 24.7916 4.79183C25.7638 3.81961 26.9444 3.3335 28.3333 3.3335C29.7221 3.3335 30.9027 3.81961 31.8749 4.79183C32.8471 5.76405 33.3333 6.94461 33.3333 8.3335C33.3333 9.72239 32.8471 10.9029 31.8749 11.8752C30.9027 12.8474 29.7221 13.3335 28.3333 13.3335C27.6666 13.3335 27.0416 13.2152 26.4583 12.9785C25.8749 12.7418 25.361 12.4157 24.9166 12.0002L13.2083 18.8335C13.2638 19.0279 13.2988 19.2157 13.3133 19.3968C13.3277 19.5779 13.3344 19.7791 13.3333 20.0002C13.3321 20.2213 13.3255 20.4229 13.3133 20.6052C13.301 20.7874 13.266 20.9746 13.2083 21.1668L24.9166 28.0002C25.361 27.5835 25.8749 27.2574 26.4583 27.0218C27.0416 26.7863 27.6666 26.6679 28.3333 26.6668C29.7221 26.6668 30.9027 27.1529 31.8749 28.1252C32.8471 29.0974 33.3333 30.278 33.3333 31.6668C33.3333 33.0557 32.8471 34.2363 31.8749 35.2085C30.9027 36.1807 29.7221 36.6668 28.3333 36.6668ZM28.3333 33.3335C28.8055 33.3335 29.2016 33.1741 29.5216 32.8552C29.8416 32.5363 30.001 32.1402 29.9999 31.6668C29.9988 31.1935 29.8388 30.798 29.5199 30.4802C29.201 30.1624 28.8055 30.0024 28.3333 30.0002C27.861 29.9979 27.4655 30.1579 27.1466 30.4802C26.8277 30.8024 26.6677 31.198 26.6666 31.6668C26.6655 32.1357 26.8255 32.5318 27.1466 32.8552C27.4677 33.1785 27.8633 33.3379 28.3333 33.3335ZM8.33325 21.6668C8.80547 21.6668 9.20158 21.5068 9.52158 21.1868C9.84158 20.8668 10.001 20.4713 9.99992 20.0002C9.99881 19.5291 9.83881 19.1335 9.51992 18.8135C9.20103 18.4935 8.80547 18.3335 8.33325 18.3335C7.86103 18.3335 7.46547 18.4935 7.14659 18.8135C6.8277 19.1335 6.6677 19.5291 6.66659 20.0002C6.66547 20.4713 6.82547 20.8674 7.14659 21.1885C7.4677 21.5096 7.86325 21.6691 8.33325 21.6668ZM28.3333 10.0002C28.8055 10.0002 29.2016 9.84016 29.5216 9.52016C29.8416 9.20016 30.001 8.80461 29.9999 8.3335C29.9988 7.86239 29.8388 7.46683 29.5199 7.14683C29.201 6.82683 28.8055 6.66683 28.3333 6.66683C27.861 6.66683 27.4655 6.82683 27.1466 7.14683C26.8277 7.46683 26.6677 7.86239 26.6666 8.3335C26.6655 8.80461 26.8255 9.20072 27.1466 9.52183C27.4677 9.84294 27.8633 10.0024 28.3333 10.0002Z"
                    fill="black"
                  />
                </svg>
              </span>
            </div>
            <div className="pdc-title">{product.title}</div>
            <div className="pdc-price">
              <span style={{ fontWeight: "500" }}>
                &#x20B9;{product.price}&nbsp;&nbsp;&nbsp;
              </span>
              <span
                style={{
                  fontSize: "1.25vw",
                  textDecoration: "line-through",
                  color: "rgb(var(--off-text))",
                }}
              >
                &#x20B9;{product.mrp}&nbsp;
              </span>
              <span style={{ color: "rgb(var(--blue))" }}>
                &nbsp;&nbsp;&nbsp;{product.discount}% off
              </span>
            </div>
            <div className="pdc-taxes">inclusive of all taxes</div>
            <div className="pdc-fee">
              +&#x20B9;99 delivery fee
              <span
                style={{
                  color: "rgb(var(--orange))",
                  fontWeight: "500",
                }}
              >
                &nbsp;&nbsp;Learn more
              </span>
            </div>
            <div className="pdc-sizes">
              <div className="pdc-sizes-header">AVAILABLE SIZES</div>
              <div className="pdc-sizes-box">
                <div key={product.product_id} className="pdc-size-current">
                  {product.size}
                  <div className="pdc-qty">Qty: {product.quantity}</div>
                </div>
                {productCodeData?.map((codeProduct) =>
                  codeProduct.product_id !== product.product_id &&
                  codeProduct.size !== product.size ? (
                    <Link
                      href={`${category}?id=${codeProduct.product_id}`}
                      key={codeProduct.product_id}
                      className="pdc-size"
                    >
                      {codeProduct.size}
                      <div className="pdc-qty">Qty: {codeProduct.quantity}</div>
                    </Link>
                  ) : (
                    <div key={codeProduct.product_id}></div>
                  )
                )}
              </div>
            </div>
            <div className="pdc-colors">
              <div className="pdc-colors-header">AVAILABLE COLORS</div>
              <div className="pdc-colors-box">
                <div
                  style={{
                    background: `${product.color}`,
                    border: `0.5vh solid ${lightenHexColor(
                      `${product.color}`,
                      30
                    )}`,
                  }}
                  className="pdc-color-current"
                ></div>
                {uniqueColors.map((color) => {
                  const isActive = currentSizeColors.includes(color);
                  const isCurrent = product.color === color;
                  return color !== product.color ? (
                    <div
                      onClick={() => handleColorClick(isActive, color)}
                      key={color}
                      style={{
                        background: color,
                        border: `0.5vh solid ${lightenHexColor(color, 30)}`,
                        opacity: isActive ? 1 : 0.3,
                      }}
                      className={isCurrent ? "pdc-color-current" : "pdc-color"}
                    />
                  ) : (
                    <div key={color}></div>
                  );
                })}
                {/* {productCodeData?.map((codeProduct) => (
                  <div
                    key={codeProduct.product_id}
                    style={{
                      background: `${codeProduct.color}`,
                      border: `0.5vh solid ${lightenHexColor(
                        `${codeProduct.color}`,
                        30
                      )}`,
                    }}
                    className="pdc-color"
                  ></div>
                ))} */}
              </div>
            </div>
            <div className="pdc-buttons">
              <div className="pdc-buttons-buffer">
                <div className="pdc-ai-text">
                  <span
                    style={{
                      fontSize: "1.25vw",
                      color: "rgb(var(--pure-black))",
                    }}
                  >
                    Want to Try it Out?
                  </span>
                  <span
                    style={{
                      fontSize: "1vw",
                      color: "rgb(var(--off-text))",
                    }}
                  >
                    ...use our AI Virtual Try On feature.
                  </span>
                </div>
                <div className="pdc-ai-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={`${svgSize/1.25}`}
                    height={`${svgSize/1.25}`}
                    viewBox="0 0 33 34"
                    fill="none"
                  >
                    <path
                      d="M12.5334 6.13609L15.9285 13.6052L23.3976 17.0003L15.9285 20.3954L12.5334 27.8645L9.13834 20.3954L1.66919 17.0003L9.13834 13.6052L12.5334 6.13609ZM12.5334 12.6954L11.1754 15.6423L8.22846 17.0003L11.1754 18.3583L12.5334 21.3053L13.8914 18.3583L16.8383 17.0003L13.8914 15.6423L12.5334 12.6954ZM26.1137 12.9262L24.4026 9.20523L20.6816 7.49412L24.4026 5.79659L26.1137 2.06201L27.8112 5.79659L31.5458 7.49412L27.8112 9.20523L26.1137 12.9262ZM26.1137 31.9386L24.4026 28.2176L20.6816 26.5065L24.4026 24.809L26.1137 21.0744L27.8112 24.809L31.5458 26.5065L27.8112 28.2176L26.1137 31.9386Z"
                      fill="black"
                    />
                  </svg>
                  &nbsp;&nbsp;AI VIRTUAL TRY ON
                </div>
                <div className="pdc-3buttons">
                  <div
                    onClick={handleAddToCart}
                    className="pdc-cart-button center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={`${svgSize/1.5}`}
                      height={`${svgSize/1.5}`}
                      viewBox="0 0 30 30"
                      fill="none"
                    >
                      <path
                        d="M11.1084 26.6665C12.1439 26.6665 12.9834 25.827 12.9834 24.7915C12.9834 23.756 12.1439 22.9165 11.1084 22.9165C10.0729 22.9165 9.2334 23.756 9.2334 24.7915C9.2334 25.827 10.0729 26.6665 11.1084 26.6665Z"
                        fill="black"
                      />
                      <path
                        d="M22.5 26.6665C23.5355 26.6665 24.375 25.827 24.375 24.7915C24.375 23.756 23.5355 22.9165 22.5 22.9165C21.4645 22.9165 20.625 23.756 20.625 24.7915C20.625 25.827 21.4645 26.6665 22.5 26.6665Z"
                        fill="black"
                      />
                      <path
                        d="M18.8083 5.83317C18.7703 5.557 18.7508 5.2786 18.75 4.99984C18.7508 4.72107 18.7703 4.44267 18.8083 4.1665H9.57495L10.1166 5.83317H18.8083Z"
                        fill="black"
                      />
                      <path
                        d="M24.9999 11.2501H24.6499L23.6082 15.8334H11.1082L7.29991 3.77507C7.25872 3.64712 7.18718 3.53103 7.09141 3.43671C6.99564 3.34239 6.87847 3.27264 6.74991 3.2334L3.33324 2.1834C3.22818 2.15112 3.1178 2.13985 3.00838 2.15022C2.89897 2.1606 2.79267 2.19243 2.69555 2.24389C2.49942 2.34781 2.35261 2.5254 2.28741 2.73757C2.22221 2.94974 2.24397 3.17913 2.34789 3.37526C2.45182 3.57139 2.6294 3.7182 2.84158 3.7834L5.83324 4.70007L9.65824 16.7834L8.29158 17.9001L8.18324 18.0084C7.84519 18.398 7.65358 18.8932 7.64141 19.4089C7.62924 19.9246 7.79728 20.4283 8.11658 20.8334C8.34371 21.1096 8.63233 21.3288 8.95936 21.4736C9.28638 21.6183 9.64274 21.6844 9.99991 21.6667H23.9082C24.1293 21.6667 24.3412 21.5789 24.4975 21.4227C24.6538 21.2664 24.7416 21.0544 24.7416 20.8334C24.7416 20.6124 24.6538 20.4004 24.4975 20.2441C24.3412 20.0879 24.1293 20.0001 23.9082 20.0001H9.86658C9.77061 19.9968 9.67712 19.9688 9.59512 19.9189C9.51313 19.8689 9.4454 19.7986 9.39849 19.7149C9.35157 19.6311 9.32706 19.5366 9.32731 19.4406C9.32755 19.3446 9.35256 19.2503 9.39991 19.1667L11.4082 17.5001H24.2749C24.4675 17.5048 24.6559 17.4426 24.8078 17.3241C24.9597 17.2056 25.0659 17.0381 25.1082 16.8501L26.4166 11.0917C25.9519 11.1984 25.4766 11.2515 24.9999 11.2501Z"
                        fill="black"
                      />
                      <path
                        d="M24.9999 9.16683C27.3011 9.16683 29.1666 7.30135 29.1666 5.00016C29.1666 2.69898 27.3011 0.833496 24.9999 0.833496C22.6987 0.833496 20.8333 2.69898 20.8333 5.00016C20.8333 7.30135 22.6987 9.16683 24.9999 9.16683Z"
                        fill="black"
                      />
                    </svg>
                    &nbsp;&nbsp;ADD TO CART
                  </div>
                  <Link href={"/checkout"} className="pdc-buy-button center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={`${svgSize/1.5}`}
                      height={`${svgSize/1.5}`}
                      viewBox="0 0 30 30"
                      fill="none"
                    >
                      <path
                        d="M8.75 2.5V16.25H12.5V27.5L21.25 12.5H16.25L21.25 2.5H8.75Z"
                        fill="black"
                      />
                    </svg>
                    &nbsp;&nbsp;BUY NOW
                  </Link>
                  <div
                    onClick={handleAddToWishlist}
                    ref={wishlistIconRef}
                    className="pdc-wishlist-button center"
                  >
                    {!isAdding ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={`${svgSize/1.5}`}
                        height={`${svgSize/1.5}`}
                        viewBox="0 0 35 35"
                        fill="none"
                      >
                        <path
                          d="M17.5001 8.02094L16.7126 8.77927C16.8146 8.88512 16.9369 8.96932 17.0722 9.02683C17.2075 9.08434 17.3531 9.11399 17.5001 9.11399C17.6471 9.11399 17.7926 9.08434 17.9279 9.02683C18.0632 8.96932 18.1856 8.88512 18.2876 8.77927L17.5001 8.02094ZM10.2099 23.9459C9.98555 23.7614 9.69711 23.6736 9.40804 23.7018C9.11896 23.73 8.85291 23.8718 8.66842 24.0961C8.48392 24.3205 8.3961 24.6089 8.42427 24.898C8.45244 25.1871 8.59429 25.4531 8.81862 25.6376L10.2099 23.9459ZM3.4155 19.5578C3.48444 19.6838 3.57753 19.795 3.68945 19.8851C3.80137 19.9751 3.92993 20.0422 4.06778 20.0826C4.20564 20.1229 4.3501 20.1357 4.4929 20.1203C4.63571 20.1048 4.77407 20.0613 4.90008 19.9924C5.0261 19.9235 5.1373 19.8304 5.22734 19.7184C5.31737 19.6065 5.38449 19.478 5.42484 19.3401C5.4652 19.2023 5.478 19.0578 5.46253 18.915C5.44706 18.7722 5.40361 18.6338 5.33467 18.5078L3.4155 19.5578ZM4.0105 13.3249C4.0105 10.1895 5.78237 7.55864 8.20175 6.45177C10.5526 5.37698 13.7113 5.66135 16.7126 8.77927L18.2876 7.26406C14.7292 3.56427 10.5934 2.95323 7.29175 4.4626C4.063 5.93989 1.823 9.36989 1.823 13.3249H4.0105ZM12.3915 28.4376C13.1397 29.0268 13.9417 29.6539 14.754 30.1293C15.5663 30.6047 16.4938 30.9897 17.5001 30.9897V28.8022C17.048 28.8022 16.5172 28.6272 15.858 28.2407C15.1974 27.8557 14.5134 27.3249 13.7463 26.7197L12.3915 28.4376ZM22.6086 28.4376C24.6882 26.797 27.3482 24.9186 29.4336 22.5693C31.5584 20.1776 33.1772 17.2128 33.1772 13.3249H30.9897C30.9897 16.5303 29.6772 18.9993 27.7988 21.1168C25.8811 23.2751 23.4647 24.977 21.2538 26.7197L22.6086 28.4376ZM33.1772 13.3249C33.1772 9.36989 30.9386 5.93989 27.7084 4.4626C24.4067 2.95323 20.2738 3.56427 16.7126 7.2626L18.2876 8.77927C21.2888 5.66281 24.4476 5.37698 26.7984 6.45177C29.2178 7.55864 30.9897 10.188 30.9897 13.3249H33.1772ZM21.2538 26.7197C20.4867 27.3249 19.8028 27.8557 19.1422 28.2407C18.4815 28.6257 17.9522 28.8022 17.5001 28.8022V30.9897C18.5063 30.9897 19.4338 30.6032 20.2461 30.1293C21.0599 29.6539 21.8605 29.0268 22.6086 28.4376L21.2538 26.7197ZM13.7463 26.7197C12.5855 25.8053 11.4057 24.9303 10.2099 23.9459L8.81862 25.6376C10.029 26.6336 11.3095 27.5845 12.3915 28.4376L13.7463 26.7197ZM5.33467 18.5093C4.45605 16.9233 4.00006 15.138 4.0105 13.3249H1.823C1.823 15.7136 2.4355 17.7655 3.4155 19.5578L5.33467 18.5093Z"
                          fill="#FFFFFF"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={`${svgSize/1.5}`}
                        height={`${svgSize/1.5}`}
                        viewBox="0 0 35 35"
                        fill="none"
                      >
                        <path
                          d="M17.5001 8.02094L16.7126 8.77927C16.8146 8.88512 16.9369 8.96932 17.0722 9.02683C17.2075 9.08434 17.3531 9.11399 17.5001 9.11399C17.6471 9.11399 17.7926 9.08434 17.9279 9.02683C18.0632 8.96932 18.1856 8.88512 18.2876 8.77927L17.5001 8.02094ZM10.2099 23.9459C9.98555 23.7614 9.69711 23.6736 9.40804 23.7018C9.11896 23.73 8.85291 23.8718 8.66842 24.0961C8.48392 24.3205 8.3961 24.6089 8.42427 24.898C8.45244 25.1871 8.59429 25.4531 8.81862 25.6376L10.2099 23.9459ZM3.4155 19.5578C3.48444 19.6838 3.57753 19.795 3.68945 19.8851C3.80137 19.9751 3.92993 20.0422 4.06778 20.0826C4.20564 20.1229 4.3501 20.1357 4.4929 20.1203C4.63571 20.1048 4.77407 20.0613 4.90008 19.9924C5.0261 19.9235 5.1373 19.8304 5.22734 19.7184C5.31737 19.6065 5.38449 19.478 5.42484 19.3401C5.4652 19.2023 5.478 19.0578 5.46253 18.915C5.44706 18.7722 5.40361 18.6338 5.33467 18.5078L3.4155 19.5578ZM4.0105 13.3249C4.0105 10.1895 5.78237 7.55864 8.20175 6.45177C10.5526 5.37698 13.7113 5.66135 16.7126 8.77927L18.2876 7.26406C14.7292 3.56427 10.5934 2.95323 7.29175 4.4626C4.063 5.93989 1.823 9.36989 1.823 13.3249H4.0105ZM12.3915 28.4376C13.1397 29.0268 13.9417 29.6539 14.754 30.1293C15.5663 30.6047 16.4938 30.9897 17.5001 30.9897V28.8022C17.048 28.8022 16.5172 28.6272 15.858 28.2407C15.1974 27.8557 14.5134 27.3249 13.7463 26.7197L12.3915 28.4376ZM22.6086 28.4376C24.6882 26.797 27.3482 24.9186 29.4336 22.5693C31.5584 20.1776 33.1772 17.2128 33.1772 13.3249H30.9897C30.9897 16.5303 29.6772 18.9993 27.7988 21.1168C25.8811 23.2751 23.4647 24.977 21.2538 26.7197L22.6086 28.4376ZM33.1772 13.3249C33.1772 9.36989 30.9386 5.93989 27.7084 4.4626C24.4067 2.95323 20.2738 3.56427 16.7126 7.2626L18.2876 8.77927C21.2888 5.66281 24.4476 5.37698 26.7984 6.45177C29.2178 7.55864 30.9897 10.188 30.9897 13.3249H33.1772ZM21.2538 26.7197C20.4867 27.3249 19.8028 27.8557 19.1422 28.2407C18.4815 28.6257 17.9522 28.8022 17.5001 28.8022V30.9897C18.5063 30.9897 19.4338 30.6032 20.2461 30.1293C21.0599 29.6539 21.8605 29.0268 22.6086 28.4376L21.2538 26.7197ZM13.7463 26.7197C12.5855 25.8053 11.4057 24.9303 10.2099 23.9459L8.81862 25.6376C10.029 26.6336 11.3095 27.5845 12.3915 28.4376L13.7463 26.7197ZM5.33467 18.5093C4.45605 16.9233 4.00006 15.138 4.0105 13.3249H1.823C1.823 15.7136 2.4355 17.7655 3.4155 19.5578L5.33467 18.5093Z"
                          fill="#000"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="pdc-address">
              <div className="pdc-pincode">
                <div className="pdc-pincode-header">DELIVERY PINCODE</div>
                <div className="pdc-pincode-text-box">
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter pincode"
                    className={`pdc-address-input-field ${poppins.className}`}
                  />
                  <span
                    onClick={handleSavePincode}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "rgb(var(--orange))",
                      cursor: "pointer",
                    }}
                  >
                    {loading ? "Saving..." : "Add"}
                  </span>
                </div>
              </div>
              <div className="pdc-estimated-delivery">
                <div className="pdc-est-del-header">
                  EST. DELIVERY:
                  <span
                    style={{
                      fontWeight: "600",
                    }}
                  >
                    &nbsp;&nbsp;7 working days
                  </span>
                </div>
                <div className="pdc-est-del-text-box">
                  We are a small business. We cannot provide 2 day delivery like
                  FilpKart or Amazon. Thank you for your patience.
                </div>
              </div>
              <div className="pdc-full-address">
                <div className="pdc-address-header">ADDRESS</div>
                <div className="pdc-address-text-box">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter full delivery address"
                    className={`pdc-address-input-field ${poppins.className}`}
                  />
                  {address.trim() === "" ? (
                    <span
                      onClick={handleGetLocation}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "rgb(var(--orange))",
                        cursor: "pointer",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={`${svgSize/2}`}
                        height={`${svgSize/2}`}
                        viewBox="0 0 25 25"
                        fill="none"
                      >
                        <path
                          d="M11.4583 2.0835V4.23975C9.6249 4.47224 7.92083 5.30755 6.61407 6.61431C5.30731 7.92108 4.47199 9.62514 4.2395 11.4585H2.08325V13.5418H4.2395C4.47199 15.3752 5.30731 17.0793 6.61407 18.386C7.92083 19.6928 9.6249 20.5281 11.4583 20.7606V22.9168H13.5416V20.7606C15.3749 20.5281 17.079 19.6928 18.3858 18.386C19.6925 17.0793 20.5278 15.3752 20.7603 13.5418H22.9166V11.4585H20.7603C20.5278 9.62514 19.6925 7.92108 18.3858 6.61431C17.079 5.30755 15.3749 4.47224 13.5416 4.23975V2.0835M11.4583 6.3335V8.3335H13.5416V6.34391C16.1458 6.771 18.2291 8.85433 18.6666 11.4585H16.6666V13.5418H18.6562C18.2291 16.146 16.1458 18.2293 13.5416 18.6668V16.6668H11.4583V18.6564C8.85409 18.2293 6.77075 16.146 6.33325 13.5418H8.33325V11.4585H6.34367C6.77075 8.85433 8.85409 6.771 11.4583 6.3335ZM12.4999 11.4585C12.2237 11.4585 11.9587 11.5682 11.7633 11.7636C11.568 11.9589 11.4583 12.2239 11.4583 12.5002C11.4583 12.7764 11.568 13.0414 11.7633 13.2367C11.9587 13.4321 12.2237 13.5418 12.4999 13.5418C12.7762 13.5418 13.0411 13.4321 13.2365 13.2367C13.4318 13.0414 13.5416 12.7764 13.5416 12.5002C13.5416 12.2239 13.4318 11.9589 13.2365 11.7636C13.0411 11.5682 12.7762 11.4585 12.4999 11.4585Z"
                          fill="#F95700"
                        />
                      </svg>
                      {loading ? "Locating..." : "Detect My Location"}
                    </span>
                  ) : (
                    <span
                      onClick={handleSave}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "rgb(var(--orange))",
                        cursor: "pointer",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={`${svgSize/2}`}
                        height={`${svgSize/2}`}
                        viewBox="0 0 25 25"
                        fill="none"
                      >
                        <path
                          d="M11.4583 2.0835V4.23975C9.6249 4.47224 7.92083 5.30755 6.61407 6.61431C5.30731 7.92108 4.47199 9.62514 4.2395 11.4585H2.08325V13.5418H4.2395C4.47199 15.3752 5.30731 17.0793 6.61407 18.386C7.92083 19.6928 9.6249 20.5281 11.4583 20.7606V22.9168H13.5416V20.7606C15.3749 20.5281 17.079 19.6928 18.3858 18.386C19.6925 17.0793 20.5278 15.3752 20.7603 13.5418H22.9166V11.4585H20.7603C20.5278 9.62514 19.6925 7.92108 18.3858 6.61431C17.079 5.30755 15.3749 4.47224 13.5416 4.23975V2.0835M11.4583 6.3335V8.3335H13.5416V6.34391C16.1458 6.771 18.2291 8.85433 18.6666 11.4585H16.6666V13.5418H18.6562C18.2291 16.146 16.1458 18.2293 13.5416 18.6668V16.6668H11.4583V18.6564C8.85409 18.2293 6.77075 16.146 6.33325 13.5418H8.33325V11.4585H6.34367C6.77075 8.85433 8.85409 6.771 11.4583 6.3335ZM12.4999 11.4585C12.2237 11.4585 11.9587 11.5682 11.7633 11.7636C11.568 11.9589 11.4583 12.2239 11.4583 12.5002C11.4583 12.7764 11.568 13.0414 11.7633 13.2367C11.9587 13.4321 12.2237 13.5418 12.4999 13.5418C12.7762 13.5418 13.0411 13.4321 13.2365 13.2367C13.4318 13.0414 13.5416 12.7764 13.5416 12.5002C13.5416 12.2239 13.4318 11.9589 13.2365 11.7636C13.0411 11.5682 12.7762 11.4585 12.4999 11.4585Z"
                          fill="#F95700"
                        />
                      </svg>
                      {loading ? "Submitting..." : "Submit Address"}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="pdc-offers">
              <div className="pdc-offers-header">
                BEST OFFERS
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={`${svgSize/1.5}`}
                  height={`${svgSize/1.5}`}
                  viewBox="0 0 35 35"
                  fill="none"
                >
                  <path
                    d="M8.02091 13.1252C8.60108 13.1252 9.15747 12.8947 9.56771 12.4845C9.97795 12.0742 10.2084 11.5178 10.2084 10.9377C10.2084 10.3575 9.97795 9.8011 9.56771 9.39087C9.15747 8.98063 8.60108 8.75016 8.02091 8.75016C7.44075 8.75016 6.88435 8.98063 6.47412 9.39087C6.06388 9.8011 5.83341 10.3575 5.83341 10.9377C5.83341 11.5178 6.06388 12.0742 6.47412 12.4845C6.88435 12.8947 7.44075 13.1252 8.02091 13.1252ZM25.3897 16.8877C25.9147 17.4127 26.2501 18.1418 26.2501 18.9585C26.2501 19.7606 25.9292 20.4897 25.3897 21.0147L18.098 28.3064C17.8275 28.5783 17.506 28.794 17.1518 28.9413C16.7977 29.0885 16.418 29.1643 16.0345 29.1643C15.6509 29.1643 15.2712 29.0885 14.9171 28.9413C14.563 28.794 14.2414 28.5783 13.9709 28.3064L3.77716 18.1127C3.23758 17.5731 2.91675 16.8439 2.91675 16.0418V8.75016C2.91675 7.13141 4.21466 5.8335 5.83341 5.8335H13.1251C13.9272 5.8335 14.6563 6.15433 15.1813 6.67933L25.3897 16.8877ZM19.7459 8.32725L21.2042 6.86891L31.223 16.8877C31.7626 17.4127 32.0834 18.1564 32.0834 18.9585C32.0834 19.7606 31.7626 20.4897 31.2376 21.0147L23.3917 28.8606L21.9334 27.4022L30.2605 18.9585L19.7459 8.32725Z"
                    fill="#F95700"
                  />
                </svg>
              </div>

              <div className="pdc-offer">
                <div className="pdc-offer-header">
                  10% Discount on ICICI Bank Credit & Debit Cards
                </div>
                <div className="pdc-offer-points">
                  Min Spend ₹3500, Max Discount ₹1000.
                </div>
                <div
                  style={{
                    color: "rgb(var(--orange))",
                    fontWeight: "600",
                    paddingLeft: "1vw",
                  }}
                  className="pdc-offer-tnc"
                >
                  Terms & Conditions apply
                </div>
              </div>
              <div className="pdc-offer">
                <div className="pdc-offer-header">
                  10% Discount on ICICI Bank Credit & Debit Cards
                </div>
                <div className="pdc-offer-points">
                  Min Spend ₹3500, Max Discount ₹1000.
                </div>
                <div
                  style={{
                    color: "rgb(var(--orange))",
                    fontWeight: "600",
                    paddingLeft: "1vw",
                  }}
                  className="pdc-offer-tnc"
                >
                  Terms & Conditions apply
                </div>
              </div>
              <div className="pdc-offer">
                <div className="pdc-offer-header">
                  10% Discount on ICICI Bank Credit & Debit Cards
                </div>
                <div className="pdc-offer-points">
                  Min Spend ₹3500, Max Discount ₹1000.
                </div>
                <div
                  style={{
                    color: "rgb(var(--orange))",
                    fontWeight: "600",
                    paddingLeft: "1vw",
                  }}
                  className="pdc-offer-tnc"
                >
                  Terms & Conditions apply
                </div>
              </div>
            </div>
            <div className="pdc-details">
              <div className="pdc-details-header">PRODUCT DETAILS</div>
              <div className="pdc-details-brand">
                <div className="pdc-details-header">Brand</div>
                <div className="pdc-details-text">{product.brand}</div>
              </div>
              <div className="pdc-details-title">
                <div className="pdc-details-header">Title</div>
                <div className="pdc-details-text">{product.title}</div>
              </div>
              <div className="pdc-details-description">
                <div className="pdc-details-header">Description</div>
                <div className="pdc-details-text">{product.description}</div>
              </div>
              <div className="pdc-details-size">
                <div className="pdc-details-header">Size & Dimensions</div>
                <div className="pdc-details-text">{product.dimensions}</div>
              </div>
              <div className="pdc-details-material">
                <div className="pdc-details-header">Material</div>
                <div className="pdc-details-text">{product.material}</div>
              </div>
              <div className="pdc-details-code">
                <div className="pdc-details-header">Product Code</div>
                <div className="pdc-details-text">{product.product_code}</div>
              </div>
            </div>
          </div>
        </section>
        <section className="rating-review">
          <div className="rnr-center-text">No reviews to show yet</div>
        </section>
        <section className="similar-products">
          <div className="simp-header">SIMILAR PRODUCTS THAT YOU MAY LIKE</div>
          <div className="simp-cards">
            {similarProductData?.map((similarProduct) => (
              <div key={similarProduct.product_id} className="simp-card">
                <ProductCard product={similarProduct} />
              </div>
            ))}
          </div>
        </section>
      </section>
    </>
  );
}
