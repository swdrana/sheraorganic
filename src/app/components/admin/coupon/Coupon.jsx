"use client";
import React, { useEffect, useState } from "react";
import CouponTable from "./CouponTable";
import { useMainContext } from "../context/mainContext";
import DeleteModal from "../modal/DeleteModal";
import CouponDrawer from "../drawer/CouponDrawer";
import { FiSearch } from "react-icons/fi";
import useCouponFilter from "@/app/hooks/useCouponFilter";
import { getAllCoupons } from "@/app/backend/controllers/coupon.controller";
import TableLoading from "../loader/TableLoading";


const Coupon = () => {
  const [loading,setLoading]=useState(true)
  const [coupons,setCoupons]=useState([])
  const { couponId, setIsOpenCouponDrawer, setCouponDetails,updateCoupon } =
    useMainContext();
  const handelCouponUpdate = (item) => {
    setCouponDetails(item);
    setIsOpenCouponDrawer(true);
  };

  const {
    searchText,
    setSearchText,
    handlePageChange,
    pageCount,
    filterCoupon,
  } = useCouponFilter(coupons);

  useEffect(() => {
    const fetchData = async () => {
    const  res = await getAllCoupons()
    // console.log('res..in',res )
    setCoupons(res)
      setLoading(false)
    };

    fetchData();
  }, [updateCoupon]);


  return (
    <>
      <CouponDrawer />
      <DeleteModal couponId={couponId} />

      <section className="mx-auto w-full px-4 py-4">
        <div className="flex flex-col space-y-4  md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-lg font-semibold">Coupons</h2>
          </div>

          <div>
            <button
              onClick={() => {
                setIsOpenCouponDrawer(true), setCouponDetails({});
              }}
              type="button"
              className="rounded-md bg-secondary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Add new coupon
            </button>
          </div>
        </div>

        <div className=" relative my-10">
          <input
            type="text"
            placeholder="search couponName/couponCode"
            value={searchText}
            // onKeyPress={handleSearch}
            onChange={(e) => setSearchText(e.target.value)}
            className="block w-full rounded-md border-0 py-2 text-gray-900  shadow-sm  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-transparent sm:text-sm sm:leading-6 px-10 outline-none"
          />
          <p className="absolute top-3 left-3">
            <FiSearch size={20} />
          </p>
        </div>

        {
          loading ? <> <TableLoading/></> : <CouponTable
          pageCount={pageCount}
          handlePageChange={handlePageChange}
          coupons={filterCoupon}
          handelCouponUpdate={handelCouponUpdate}
        />
        }
      </section>
    </>
  );
};

export default Coupon;
