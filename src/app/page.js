import Category from "./components/store/home/Category";
import FeatureProduct from "./components/store/home/FeatureProduct";
import TrendingProducts from "./components/store/home/TrendingProducts";
import WeeklyBestDeals from "./components/store/home/WeeklyBestDeals";
import FacebookPixelTracker from "./components/store/common/others/FacebookPixelTracker";
import dynamic from "next/dynamic";
import Hero from "./components/store/home/Hero";

const BannerOne = dynamic(() => import("./components/store/home/BannerOne"), { ssr: false });
const BannerTwo = dynamic(() => import("./components/store/home/BannerTwo"), { ssr: false });
const Blog = dynamic(() => import("./components/store/home/Blog"), { ssr: false });
const FeedbackSection = dynamic(() => import("./components/store/home/FeedbackSection"), { ssr: false });
import {
  getCachedSettings,
  getCachedProducts,
  getCachedCategories,
  getCachedBlogs,
} from "./data/cachedData";

const page = async () => {
  // Initial data comes straight from the shared server data cache (tag-revalidated)
  const [setting, allProducts, categorys, blogs] = await Promise.all([
    getCachedSettings(),
    getCachedProducts(),
    getCachedCategories(),
    getCachedBlogs(),
  ]);
  // Product cards never show the long HTML description; dropping it keeps the home page's RSC
  // payload small (it was ~30% of the HTML). ProductModal looks it up on demand.
  const products = (allProducts || []).map(({ description, ...rest }) => rest);

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
