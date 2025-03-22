"use client";
import { useState } from "react";
import useProducts from "./components/admin/featch/useProducts";
import useCategory from "./components/store/dataFetching/useCategory";
import useSetting from "./components/store/dataFetching/useSetting";
import BannerOne from "./components/store/home/BannerOne";
import BannerTwo from "./components/store/home/BannerTwo";
import Blog from "./components/store/home/Blog";
import Category from "./components/store/home/Category";
import FeatureProduct from "./components/store/home/FeatureProduct";
import FeedbackSection from "./components/store/home/FeedbackSection";
import Hero from "./components/store/home/Hero";
import TrendingProducts from "./components/store/home/TrendingProducts";
import WeeklyBestDeals from "./components/store/home/WeeklyBestDeals";
import { useEffect } from "react";
import useBlog from "./components/store/dataFetching/useBlog";
import PreLoader from "./components/store/common/others/PreLoader";

const page = () => {
  const { setting, settingLoading } = useSetting();
  const { products, productloading } = useProducts();
  const { categorys, categoryLoading } = useCategory();
  const { blogs, blogLoading } = useBlog();
  console.log(
    "productsLoading",
    productloading,
    settingLoading,
    categoryLoading
  );
  return (
    <>
      {settingLoading || categoryLoading || productloading ? (
        <PreLoader />
      ) : (
        <>
          <Hero setting={setting} />
          <Category categorys={categorys} products={products} />
          <FeatureProduct products={products} setting={setting} />
          <TrendingProducts products={products} setting={setting} />
          <BannerOne setting={setting} />
          <WeeklyBestDeals products={products} setting={setting} />
          <BannerTwo setting={setting} />
          <FeedbackSection setting={setting} />
          <Blog blogs={blogs} />
        </>
      )}
    </>
  );
};

export default page;
