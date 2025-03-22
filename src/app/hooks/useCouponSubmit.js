"use client";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMainContext } from "../components/admin/context/mainContext";
import { notifyError, notifySuccess } from "../utils/toast";
import {
  addCoupon,
  updateCoupon,
} from "../backend/controllers/coupon.controller";
import { getCouponRevalidate } from "../backend/actions/actions";
import { toast } from "react-toastify";

const useCouponSubmit = () => {
  const {
    couponDetails,
    setIsOpenCouponDrawer,
    isOpenCouponDrawer,
    setUpdateCoupon,
  } = useMainContext();
  const [imageUrl, setImageUrl] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    dayjs(new Date()).format("YYYY-MM-DD")
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  //   console.log("couponDetails", couponDetails);

  // console.log("selectedDate", selectedDate);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm();

  //handle coupon add
  const handelCouponAdd = async (data) => {
    // console.log("coupon data..", data);
    setUpdateCoupon(false);

    if (data.discountPercentage > 90) {
      toast.error("discount can not posible gater than 90% ");
      return;
    }
    setIsSubmitting(true);
    const couponData = {
      title: data.title,
      couponCode: data.couponCode,
      endTime: selectedDate,
      discountPercentage: data.discountPercentage,
      bannerImage: imageUrl,
      status: data.status === "show" ? "hide" : "show",
    };

    const res = await addCoupon(couponData);
    // console.log("res...in coupon", res);
    if (res?.status === 200) {
      setIsSubmitting(false);
      reset();
      setIsOpenCouponDrawer(false);
      toast.success(`${res?.message}` || "coupon successfully created");
      getCouponRevalidate();
      setUpdateCoupon(true);
    } else {
      setIsSubmitting(false);
      toast.error(`${res?.error?.message}` || "something is worng in coupon");
    }
  };

  //   handel coupon update
  const handelCouponUpdate = async (data) => {
    setUpdateCoupon(false);
    if (data.discountPercentage > 90) {
      toast.error("discount can not posible gater than 90% ");
      return;
    }
    // console.log("data", data);
    setIsSubmitting(true);
    const couponData = {
      title: data.title,
      couponCode: data.couponCode,
      endTime: data.endTime,
      discountPercentage: data.discountPercentage,
      bannerImage: imageUrl,
    };
    const res = await updateCoupon({
      updateCouponData: couponData,
      id: couponDetails?._id,
    });
    // console.log("click", res);
    if (res?.status === 200) {
      setIsSubmitting(false);
      setIsOpenCouponDrawer(false);
      toast.success(`${res?.message} ` || "coupon update successfully");
      getCouponRevalidate();
      setUpdateCoupon(true);
    } else {
      setIsSubmitting(false);
    }
  };

  //     try {
  //       setIsSubmitting(true);

  //       const couponData = {
  //         name: data.name,
  //         couponCode: data.email,
  //         password: data.password,
  //         contact: data.contact,
  //         role: data.role,
  //         joiningDate: selectedDate
  //           ? selectedDate
  //           : dayjs(new Date()).format("YYYY-MM-DD"),
  //         image: imageUrl,
  //       };

  //       if (couponDetails._id) {
  //         // console.log("click............");
  //         const res = await updateCoupon({
  //           updateCouponData: couponData,
  //           id: couponDetails?._id,
  //         });
  //         setIsSubmitting(false);
  //         notifySuccess(res.message);
  //         setIsOpenCouponDrawer(false);
  //         getCouponRevalidate();
  //       } else {
  //         const res = await addCoupon(couponData);
  //         setIsSubmitting(false);
  //         notifySuccess(res.message);
  //         setIsOpenCouponDrawer(false);
  //         getCouponRevalidate();
  //       }
  //     } catch (err) {
  //       notifyError(err ? err?.response?.data?.message : err?.message);
  //       setIsSubmitting(false);
  //       //   setIsOpenCouponDrawer(false);
  //     }
  //   };

  useEffect(() => {
    if (!isOpenCouponDrawer) {
      setValue("title");
      setValue("couponCode");
      setValue("endTime");
      setValue("status");
      setValue("discountPercentage");
      setImageUrl("");
      clearErrors("title");
      clearErrors("couponCode");
      clearErrors("endTime");
      clearErrors("status");
      clearErrors("discountPercentage");
      setImageUrl("");
    }

    const formattedDate = dayjs(couponDetails.endTime).format("YYYY-MM-DD");

    setValue("title", couponDetails.title);
    setValue("couponCode", couponDetails.couponCode);
    setValue("endTime", formattedDate);
    setValue("status", couponDetails.status);
    setValue("discountPercentage", couponDetails.discountPercentage);
    setImageUrl(couponDetails.bannerImage);
    setSelectedDate(formattedDate);
  }, [couponDetails, isOpenCouponDrawer]);

  // coupon status update
  const couponStatusUpdate = async (item) => {
    setUpdateCoupon(false);
    const updateStatus = item.status === "show" ? "hide" : "show";
    const updateCouponData = { ...item, status: updateStatus };
    const res = await updateCoupon({
      updateCouponData: updateCouponData,
      id: item._id,
    });
    // console.log("res in useCouponSubmit", res);
    if (res.message) {
      notifySuccess(res.message);
      getCouponRevalidate();
      setUpdateCoupon(true);
    } else {
      notifyError("something is error");
      // setIsSubmitting(false);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    setImageUrl,
    imageUrl,
    selectedDate,
    setSelectedDate,
    isSubmitting,
    couponStatusUpdate,
    handelCouponAdd,
    handelCouponUpdate,
  };
};

export default useCouponSubmit;
