"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMainContext } from "../components/admin/context/mainContext";

import { toast } from "react-toastify";
import { addBrand, updateBrand } from "../backend/controllers/brand.controller";

const useBrandSubmit = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const {
    brandDetails,
    setIsOpenBrandDrawer,
    isOpenBrandDrawer,
    setBrandUpdate,
    setSubmitting,
  } = useMainContext();
  const [imageUrl, setImageUrl] = useState("");
  // console.log("imageUrl in use category", imageUrl);
  useEffect(() => {
    if (brandDetails?._id) {
      setValue("name", brandDetails.name);
      setImageUrl(brandDetails.icon);
    }

    if (!isOpenBrandDrawer) {
      setImageUrl("");
      setValue("name");
    }
  }, [brandDetails, isOpenBrandDrawer]);

  // console.log("isOpenCategoryDrawer..", isOpenCategoryDrawer);

  // console.log("imageUrl", imageUrl);
  // handel category and and update
  const handelBrandSubmit = async (data) => {
    setBrandUpdate(false);
    if (!imageUrl) {
      setSubmitting(false);
      return toast.error("Image is required");
    }
    if (brandDetails._id) {
      setSubmitting(true);
      const updateBrandData = {
        name: data.name,
        icon: imageUrl,
        status: brandDetails?.status,
        // lang: language,
      };
      //  console.log('category update data',categoryData)
      const res = await updateBrand({ id: brandDetails?._id, updateBrandData });
      // console.log("res..in c up", res);
      if (res?.message) {
        setSubmitting(false);
        setIsOpenBrandDrawer(false);
        toast.success(`${res?.message}` || "update successfully");
        setBrandUpdate(true);
      } else {
        setSubmitting(false);
        toast.error(`${res?.error?.message}` || "somethings error");
        setBrandUpdate(false);
      }
    } else {
      setSubmitting(true);
      const brandData = {
        name: data.name,
        icon: imageUrl,
        status: data.status === "show" ? "hide" : "show",
        // lang: language,
      };

      const res = await addBrand(brandData);
      if (res?.status === 200) {
        setSubmitting(false);
        reset();
        setIsOpenBrandDrawer(false);
        toast.success(`${res?.message}`);
        setBrandUpdate(true);
      } else {
        setSubmitting(false);
        toast.error(res?.error?.message || "something error");
      }
    }
  };

  // category status update
  const handelBrandStatusUpdate = async (brand) => {
    setBrandUpdate(false);
    setSubmitting(true);
    const updateBrandData = {
      name: brand.name,
      status: brand.status === "show" ? "hide" : "show",
      icon: brand.icon,
    };
    // console.log("category details in useCategory submit", category);
    const res = await updateBrand({ id: brand._id, updateBrandData });
    // console.log("res is category stattus update", res);

    if (res?.message) {
      setSubmitting(false);
      setIsOpenBrandDrawer(false);
      toast.success(`${res?.message}` || "update successfully");
      setBrandUpdate(true);
      // setChildCategoryUpdate(true);
    } else {
      setSubmitting(false);
    }
  };

  return {
    handelBrandSubmit,
    handleSubmit,
    errors,
    register,
    handelBrandStatusUpdate,
    imageUrl,
    setImageUrl,
  };
};

export default useBrandSubmit;
