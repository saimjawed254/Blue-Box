"use client";

import { Poppins } from "next/font/google";
import "./ProductsSideBar.css";
import { useEffect, useState } from "react";
import { Product } from "@/src/db/schema/products";

export interface ProductFilters {
  brands?: string[];
  priceRange?: [number, number];
  colors?: string[];
  discounts?: string;
}

type ProductsSidebarProps = {
  slug: string;
  totalCount: string;
  products: Product[];
  onApplyFilters: (filters: ProductFilters) => void;
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "400", "200"],
});

export function lightenHexColor(hex: string, amount: number): string {
  const h = hex.replace("#", "");
  let r = parseInt(h.slice(0, 2), 16);
  let g = parseInt(h.slice(2, 4), 16);
  let b = parseInt(h.slice(4, 6), 16);

  const max = Math.max(r, g, b);

  if (r === max) r = Math.max(0, r - amount);
  else if (g === max) g = Math.max(0, g - amount);
  else if (b === max) b = Math.max(0, b - amount);

  return `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
}

export default function ProductsSidebar({
  slug,
  totalCount = "0",
  onApplyFilters,
  products,
}: ProductsSidebarProps) {
  const discountFilters = [">10%", ">20%", ">30%", ">40%", ">50%", ">60%"];

  const [selectedBrandFilters, setSelectedBrandFilters] = useState<string[]>(
    []
  );
  const [selectedDiscountFilter, setSelectedDiscountFilter] =
    useState<string>();
  const [selectedColorFilters, setSelectedColorFilters] = useState<string[]>(
    []
  );
  const [minValue, setMinValue] = useState<number>(1);
  const [maxValue, setMaxValue] = useState<number>(10000);

  const [brands, setBrands] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(1);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  useEffect(() => {
    if (!products || products.length === 0) return;

    const brandSet = new Set<string>();
    const colorSet = new Set<string>();
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;

    for (const product of products) {
      brandSet.add(product.brand);
      colorSet.add(product.color);

      if (product.price < min) min = product.price;
      if (product.price > max) max = product.price;
    }

    setBrands(Array.from(brandSet));
    setColors(Array.from(colorSet));
    setMinPrice(min);
    setMaxPrice(max);
    setMinValue(min);
    setMaxValue(max);
  }, [products]);

  const handleApply = () => {
    console.log(selectedBrandFilters);
    console.log(selectedColorFilters);
    console.log(selectedDiscountFilter);
    console.log(minValue, maxValue);
    if (
      selectedBrandFilters.length === 0 &&
      minValue === minPrice &&
      maxValue === maxPrice &&
      selectedColorFilters.length === 0 &&
      selectedDiscountFilter === undefined
    ) {
      return;
    }
    onApplyFilters({
      brands: selectedBrandFilters,
      priceRange: [minValue, maxValue],
      colors: selectedColorFilters,
      discounts: selectedDiscountFilter,
    });
  };

  const clearAllSelections = () => {
    setSelectedBrandFilters([]);
    setSelectedColorFilters([]);
    setSelectedDiscountFilter("");
    setMinValue(minPrice);
    setMaxValue(maxPrice);
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val < maxValue) {
      setMinValue(Number(e.target.value));
    }
  };
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val > minValue) {
      setMaxValue(Number(e.target.value));
    }
  };
  const handleCheckboxChange = (label: string) => {
    setSelectedBrandFilters(
      (prev) =>
        prev.includes(label)
          ? prev.filter((item) => item !== label) // Remove from filters
          : [...prev, label] // Add to filters
    );
  };

  const handleColorCheckboxChange = (label: string) => {
    setSelectedColorFilters(
      (prev) =>
        prev.includes(label)
          ? prev.filter((item) => item !== label) // Remove from filters
          : [...prev, label] // Add to filters
    );
  };

  const handleDiscountCheckboxChange = (label: string) => {
    setSelectedDiscountFilter(label);
  };

  return (
    <section className={`products-sidebar ${poppins.className}`}>
      <div className="scrollable-sidebar">
        <div className="psb-top-buffer"></div>
        <div className="psb-info">
          <div className="psb-info-slug">
            bluebox / products /&nbsp;
            <span style={{ fontWeight: 600 }}>{slug}</span>
          </div>
          <div className="psb-info-total">
            Total Products:&nbsp;
            <span style={{ color: "rgb(var(--pure-black))" }}>
              {totalCount}
            </span>
          </div>
        </div>
        <div className="psb-filters">
          <div className="psb-filters-header">
            <span>FILTERS&nbsp; </span>
            <span onClick={clearAllSelections}
              style={{
                color: "rgb(var(--red))",
                fontSize: "0.875vw",
                fontWeight: 400,
                cursor:"pointer"
              }}
            >
              Clear All&nbsp;{" "}
            </span>
          </div>
          <div className="psb-filters-brand">
            <div
              style={{ fontWeight: 600 }}
              className="psb-filters-brand-header"
            >
              BRANDS
            </div>
            {brands.map((label) => (
              <div key={label} className="psb-filters-brand-name">
                <input
                  className="psb-filters-checkbox"
                  type="checkbox"
                  id={label}
                  onChange={() => handleCheckboxChange(label)}
                  checked={selectedBrandFilters.includes(label)}
                />
                <label htmlFor={label}>&nbsp;&nbsp;&nbsp;{label}</label>
                <div className="psb-filters-brand-quantity">
                  &nbsp;&nbsp;(7)
                </div>
              </div>
            ))}

            {/* <h3>Filtered Results:</h3>
          <ul>
            {selectedFilters.map((item, index) => (
              <li key={index}>
                {item}
              </li>
            ))}
          </ul> */}
          </div>
          <div className="psb-filters-price">
            <div className="psb-filters-price-header">PRICE</div>
            <div className="psb-filters-price-slider">
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={minValue}
                onChange={handleMinChange}
                className=""
              />
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={maxValue}
                onChange={handleMaxChange}
                className=""
              />
              <div className="range-track" />
            </div>
            <div className="psb-filters-price-text">
              <div className="">&#x20B9;{minValue}</div>
              <div className="">&#x20B9;{maxValue}</div>
            </div>
          </div>
          <div className="psb-filters-color">
            <div className="psb-filters-color-header">COLORS</div>
            <div className="psb-filters-color-checkboxes">
              {colors.map((label) => {
                return (
                  <div
                    key={label}
                    onClick={() => handleColorCheckboxChange(label)}
                    style={{
                      backgroundColor: label,
                      border: `0.25vh solid ${lightenHexColor(label, 25)}`,
                    }}
                    className="psb-filters-color-name"
                  ></div>
                );
              })}
              {/* <h3>Filtered Results:</h3>
          <ul>
            {selectedColorFilters.map((item, index) => (
              <li key={index}>
                {item}
              </li>
            ))}
          </ul> */}
            </div>
          </div>
          <div className="psb-filters-discount">
            <div className="psb-filters-discount-header">DISCOUNTS</div>
            {discountFilters.map((label) => (
              <div key={label} className="psb-filters-discount-title">
                <input
                  className="psb-filters-radio"
                  type="radio"
                  name="psb-filters-discount-radio"
                  id={label}
                  onChange={() => handleDiscountCheckboxChange(label)}
                  checked={selectedDiscountFilter === label}
                />
                <span className="custom-radio-circle" />
                <label htmlFor={label}>&nbsp;&nbsp;&nbsp;{label}</label>
                <span className="psb-filters-brand-quantity">
                  &nbsp;&nbsp;(7)
                </span>
              </div>
            ))}
          </div>
          <div className="psb-filters-apply">
            <div className="psb-filters-apply-header">
              <div onClick={clearAllSelections} className="psb-filters-apply-header-cancel center">
                Cancel
              </div>
              <div
                onClick={handleApply}
                className="psb-filters-apply-header-apply"
              >
                Apply
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
