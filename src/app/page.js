import BannerOne from "./components/store/home/BannerOne";
import BannerTwo from "./components/store/home/BannerTwo";
import Blog from "./components/store/home/Blog";
import Category from "./components/store/home/Category";
import FeatureProduct from "./components/store/home/FeatureProduct";
import FeedbackSection from "./components/store/home/FeedbackSection";
import Hero from "./components/store/home/Hero";
import TrendingProducts from "./components/store/home/TrendingProducts";
import WeeklyBestDeals from "./components/store/home/WeeklyBestDeals";
import FacebookPixelTracker from "./components/store/common/others/FacebookPixelTracker";
import {
  getCachedSettings,
  getCachedProducts,
  getCachedCategories,
  getCachedBlogs,
} from "./data/cachedData";

const page = async () => {
  // Fetch all initial data directly on the server with 60s cache revalidation
  const [setting, products, categorys, blogs] = await Promise.all([
    getCachedSettings(),
    getCachedProducts(),
    getCachedCategories(),
    getCachedBlogs(),
  ]);

  return (
    <>
      {/* Track client-side Facebook Pixel PageView */}
      <FacebookPixelTracker />

      {/* Render all sections immediately with server-side data (No client-side skeleton blocks on load!) */}
      <Hero setting={setting} />
      <Category categorys={categorys || []} products={products || []} />
      <FeatureProduct products={products || []} setting={setting || {}} />
      <TrendingProducts products={products || []} setting={setting || {}} />
      <BannerOne setting={setting || {}} />
      <WeeklyBestDeals products={products || []} setting={setting || {}} />
      <BannerTwo setting={setting || {}} />
      <FeedbackSection setting={setting || {}} />
      <Blog blogs={blogs || []} />
    </>
  );
};

export default page;
