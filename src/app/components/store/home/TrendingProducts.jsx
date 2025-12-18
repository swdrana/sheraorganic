"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useProducts from "../dataFetching/useProducts";
import TrendingProductCard from "../common/card/TrendingProductCard";
import ProductCard from "../common/card/ProductCard";
import useSetting from "../dataFetching/useSetting";
import Loading from "../common/others/Loading";

const TrendingProducts = ({ products, setting }) => {
  const [hasMore, setHasMore] = useState(true);
  const [endSlice, setEndSlice] = useState(15);
  const [activeTrendingProduct, setActiveTrendingProduct] =
    useState("all products");
  // const { products, productsLoading } = useProducts();
  // const { setting, settingLoading } = useSetting();
  const filteredProducts = products?.filter((p) => {
    if (activeTrendingProduct === "all products") {
      const featuredCategories = [
        `${setting?.home?.featured_category_one
          .replace(/\s+/g, "")
          .toLowerCase()}`,
        `${setting?.home?.featured_category_two
          .replace(/\s+/g, "")
          .toLowerCase()}`,
        `${setting?.home?.featured_category_three
          .replace(/\s+/g, "")
          .toLowerCase()}`,
        `${setting?.home?.featured_category_four
          .replace(/\s+/g, "")
          .toLowerCase()}`,
        `${setting?.home?.featured_category_five
          .replace(/\s+/g, "")
          .toLowerCase()}`,
      ];
      return featuredCategories.includes(
        p.category.replace(/\s+/g, "").toLowerCase()
      );
    } else {
      return (
        p.category.replace(/\s+/g, "").toLowerCase() === activeTrendingProduct
      );
    }
  });
  const handleEndSlice = () => {
    const newEndSlice = endSlice + 5;
    if (newEndSlice >= filteredProducts?.length) {
      // When newEndSlice exceeds or matches the total products length
      setEndSlice(filteredProducts?.length); // Set to the maximum available length
      setHasMore(false); // No more items to load
    } else {
      // Increment endSlice by 5
      setEndSlice(newEndSlice);
      setHasMore(true); // Keep loading available
    }
  };

  return (
    <>
      <section className="pt-8 pb-120 bg-white position-relative overflow-hidden z-1 trending-products-area">
        <img
          src="/img/shapes/garlic.png"
          alt="garlic"
          className="position-absolute garlic z--1"
          data-parallax='{"y": 100}'
        />
        <img
          src="/img/shapes/carrot.png"
          alt="carrot"
          className="position-absolute carrot z--1"
          data-parallax='{"y": -100}'
        />
        <img
          src="/img/shapes/mashrom.png"
          alt="mashrom"
          className="position-absolute mashrom z--1"
          data-parallax='{"x": 100}'
        />
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-5">
              <div className="section-title text-center text-xl-start">
                <h2 className="mb-0 fw-bold">
                  {" "}
                  {setting?.home?.featured_trending_product_title}
                </h2>
              </div>
            </div>
            <div className="col-xl-7">
              <div className="filter-btns gshop-filter-btn-group text-center text-xl-end mt-4 mt-xl-0">
                <button
                  className={`${
                    activeTrendingProduct === "all products" ? "active" : ""
                  }`}
                  onClick={() => setActiveTrendingProduct("all products")}
                >
                  All Products
                </button>
                <button
                  className={`${
                    activeTrendingProduct ===
                    `${setting?.home?.featured_category_one
                      .replace(/\s+/g, "")
                      .toLowerCase()}`
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setActiveTrendingProduct(
                      `${setting?.home?.featured_category_one
                        .replace(/\s+/g, "")
                        .toLowerCase()}`
                    )
                  }
                >
                  {setting?.home?.featured_category_one}
                </button>
                <button
                  className={`${
                    activeTrendingProduct ===
                    `${setting?.home?.featured_category_two
                      .replace(/\s+/g, "")
                      .toLowerCase()}`
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setActiveTrendingProduct(
                      `${setting?.home?.featured_category_two
                        .replace(/\s+/g, "")
                        .toLowerCase()}`
                    )
                  }
                >
                  {setting?.home?.featured_category_two}
                </button>
                <button
                  className={`${
                    activeTrendingProduct ===
                    `${setting?.home?.featured_category_three
                      .replace(/\s+/g, "")
                      .toLowerCase()}`
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setActiveTrendingProduct(
                      `${setting?.home?.featured_category_three
                        .replace(/\s+/g, "")
                        .toLowerCase()}`
                    )
                  }
                >
                  {setting?.home?.featured_category_three}
                </button>
                <button
                  className={`${
                    activeTrendingProduct ===
                    `${setting?.home?.featured_category_four
                      .replace(/\s+/g, "")
                      .toLowerCase()}`
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setActiveTrendingProduct(
                      `${setting?.home?.featured_category_four
                        .replace(/\s+/g, "")
                        .toLowerCase()}`
                    )
                  }
                >
                  {setting?.home?.featured_category_four}
                </button>
                <button
                  className={`${
                    activeTrendingProduct ===
                    `${setting?.home?.featured_category_five
                      .replace(/\s+/g, "")
                      .toLowerCase()}`
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setActiveTrendingProduct(
                      `${setting?.home?.featured_category_five
                        .replace(/\s+/g, "")
                        .toLowerCase()}`
                    )
                  }
                >
                  {setting?.home?.featured_category_five}
                </button>
              </div>
            </div>
          </div>
          <div className="row row-cols-xxl-5 g-3 justify-content-center justify-content-md-start mt-5 filter_group">
            {filteredProducts?.slice(0, endSlice).map((product, i) => (
              <TrendingProductCard key={i} product={product} />
            ))}
          </div>
          {activeTrendingProduct === "all products" && (
            <div className="text-center mt-6">
              <button
                onClick={handleEndSlice}
                disabled={!hasMore}
                className="btn btn-primary btn-sm px-4 py-2 font-weight-semibold"
              >
                {hasMore ? "View More" : "No More Products"}
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default TrendingProducts;
