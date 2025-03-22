"use client";
import { useEffect, useState } from "react";

const useCouponFilter = (coupons) => {
  const [filterCoupon, setFilterCoupon] = useState(coupons);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 9;
  const pageCount = Math.ceil(coupons?.length / itemsPerPage);

  // Handle pagination change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    // Create a copy of coupons array
    if (coupons?.length === undefined) return;
    let updateCoupon = [...coupons];

    // Apply additional filtering based on search text if present
    if (searchText) {
      updateCoupon = updateCoupon?.filter(
        (coupon) =>
          coupon.title.toLowerCase().includes(searchText.toLowerCase()) ||
          coupon.couponCode.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentCoupon = updateCoupon?.slice(startIndex, endIndex);

    setFilterCoupon(currentCoupon);
  }, [searchText, coupons, currentPage]);

  return {
    searchText,
    setSearchText,
    currentPage,
    setCurrentPage,
    handlePageChange,
    pageCount,
    filterCoupon,
  };
};

export default useCouponFilter;
