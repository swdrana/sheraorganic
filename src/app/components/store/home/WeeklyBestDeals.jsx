"use client";
import { useMemo } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getProductByIds } from "../../../backend/controllers/product.controller";
import WeeklyBestDealsCard from "../common/card/WeeklyBestDealsCard";
import useAddToCart from "../hooks/useAddToCart";
import WeeklyBestDealsOfferTime from "./WeeklyBestDealsOfferTime";
const WeeklyBestDeals = ({ setting, products }) => {
  const router = useRouter();
  // const { products, productsLoading } = useProducts();
  // const { setting, settingLoading } = useSetting();
  // console.log("settinsg", setting);

  const bestWeeklyDeals = products?.filter((p) => p?.prices?.discount >= 10);
  //   console.log("products..", products, "bestWeeklyDeals", bestWeeklyDeals);
  const { handelAddItem, addToCardLoading } = useAddToCart();
  // console.log("addToLoading..", addToCardLoading);
  const weeklyBestDealsProductIds = useMemo(
    () => [
      `${setting?.home?.weekly_best_delas_product_one?.id}`,
      `${setting?.home?.weekly_best_delas_product_two?.id}`,
      `${setting?.home?.weekly_best_delas_product_three?.id}`,
      `${setting?.home?.weekly_best_delas_product_four?.id}`,
    ],
    [setting]
  );
  // console.log("weeklyBestDealsProductIds", weeklyBestDealsProductIds);
  const [weeklyBestProducts, setWeeklyBestProducts] = useState([]);

  useEffect(() => {
    // Filter out invalid IDs (undefined or empty strings)
    const validIds = weeklyBestDealsProductIds.filter(
      (id) => id && id !== "undefined"
    );

    if (validIds.length === 0) {
      return; // If no valid IDs, don't make a request
    }

    const fetchData = async () => {
      try {
        const res = await getProductByIds(validIds);
        // console.log("Fetched weekly best deals products:", res);
        setWeeklyBestProducts(res?.products); // Set the fetched products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [weeklyBestDealsProductIds]); // Use the actual array as a dependency

  return (
    <>
      <section className="pb-120 position-relative z-1 pt-120">
        <div className="container">
          <div className="row g-4 align-items-center justify-content-center">
            <div className="col-xxl-4 col-xl-5 order-2 order-xxl-1">
              <div className="banner-box banner-color-green position-relative overflow-hidden z-1 rounded-2 pe-0 pb-0">
                <span className="gshop-subtitle text-secondary mb-1">
                  {setting?.home?.weekly_best_deals_sub_title}
                </span>

                <h2 className="mb-2 fw-bold">
                  {" "}
                  {setting?.home?.weekly_best_deals_banner_title}
                </h2>
                <p className="fw-medium mb-5">
                  {setting?.home?.weekly_best_deals_offer_title}
                </p>
                <Link href="/products" className="btn btn-primary btn-md">
                  Show Now
                  <span className="ms-2">
                    <i className="fas fa-arrow-right"></i>
                  </span>
                </Link>
                <div className="banner-img-wrapper d-flex justify-content-end mt--40">
                  <img
                    src="/img/banner/vegetables.png"
                    alt="vegetables"
                    className=""
                  />
                </div>
              </div>
            </div>
            <div className="col-xxl-8 order-1 order-xxl-2">
              <div className="timing-box d-flex align-items-center justify-content-center justify-content-sm-between rounded-3 flex-wrap gap-3">
                <h2 className="mb-0 fw-bold">
                  {" "}
                  {setting?.home?.weekly_best_deals_title}
                </h2>
                <ul className="timing-countdown countdown-timer d-flex align-items-center gap-2">
                  {setting?.home?.weekly_best_deals_end_time && (
                    <WeeklyBestDealsOfferTime
                      expiryTimestamp={
                        new Date(setting.home.weekly_best_deals_end_time)
                      }
                    />
                  )}
                </ul>
              </div>
              <div className="mt-4">
                <div className="row g-4">
                  {weeklyBestProducts?.slice(0, 4).map((product) => (
                    <WeeklyBestDealsCard product={product} key={product._id} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WeeklyBestDeals;
