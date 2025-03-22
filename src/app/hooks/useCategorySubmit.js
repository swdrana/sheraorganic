"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { readyToParentAndChildrenCategory } from "./random";
import { useMainContext } from "../components/admin/context/mainContext";

import {
  categoryStatusUpdate,
  categoryUpdate,
  getCategoryById,
} from "../backend/actions/category.action";
import { addCategory } from "../backend/controllers/category.controller";
import { toast } from "react-toastify";

const useCategorySubmit = (categories) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const categoryList = readyToParentAndChildrenCategory(categories);
  const {
    categoryDetails,
    isOpenCategoryDrawer,
    setIsOpenCategoryDrawer,
    selectCategoryName,
    setSelectCategoryName,
    checked,
    setSubmitting,
    setChecked,
    setChildCategoryUpdate,
    setUpdateCategory,
  } = useMainContext();
  const [imageUrl, setImageUrl] = useState("");
  // console.log("imageUrl in use category", imageUrl);
  useEffect(() => {
    if (categoryDetails?._id) {
      setValue("name", categoryDetails.name);
      setValue("description", categoryDetails.description);

      setImageUrl(categoryDetails.icon);
    }
    // if (categoryList !== undefined && categoryList[0]?._id !== undefined) {
    //   setChecked(categoryList[0]._id);
    // }

    if (!categoryDetails?._id) {
      setChecked(categoryList[0]?._id);
      // setValue("parentName","Home")
    }

    if (!isOpenCategoryDrawer) {
      setValue("icon");
      setImageUrl("");
      setValue("name");
      setValue("description");

      // setValue("image", categoryDetails.image);
      setImageUrl();
      setSelectCategoryName();
      setChecked();
    }
  }, [categoryDetails, isOpenCategoryDrawer]);

  // console.log("isOpenCategoryDrawer..", isOpenCategoryDrawer);

  // console.log("imageUrl", imageUrl);
  // handel category and and update
  const handelCategorySubmit = async (data) => {
    setUpdateCategory(false);
    if (!imageUrl) {
      setSubmitting(false);
      return toast.error("Image is required");
    }
    if (categoryDetails._id) {
      setSubmitting(true);
      const categoryData = {
        name: data.name,
        description: data.description,
        icon: imageUrl,
        status: data?.status === "show" ? "hide" : "show",
        // lang: language,
      };
      //  console.log('category update data',categoryData)
      const res = await categoryUpdate(categoryDetails?._id, categoryData);
      // console.log("res..in c up", res);
      if (res?.message) {
        setSubmitting(false);
        setIsOpenCategoryDrawer(false);
        toast.success(`${res?.message}` || "update successfully");
        setUpdateCategory(true);
        setChildCategoryUpdate(true);
      } else {
        setSubmitting(false);
        toast.error(`${res?.error?.message}` || "somethings error");
      }
    } else {
      setSubmitting(true);
      // console.log("data...", data);
      // const result = await uploadImage(data.image[0]);
      // console.log("img result.....", result);
      const categoryData = {
        name: data.name,
        description: data.description,
        icon: imageUrl,
        status: data.status === "show" ? "hide" : "show",
        // lang: language,
      };

      const res = await addCategory(categoryData);
      if (res?.status === 200) {
        setSubmitting(false);
        reset();
        setIsOpenCategoryDrawer(false);
        toast.success(`${res?.message}`);
        setUpdateCategory(true);
      } else {
        setSubmitting(false);
        toast.error(res?.error?.message || "something error");
      }
    }
  };

  // category status update
  const handelCategoryStatusUpdate = async (category) => {
    setUpdateCategory(false);
    setSubmitting(true);
    const categoryUpdateData = {
      name: category.name,
      description: category.description,
      parentId: category.parentId,
      parentName: category.parentName,
      status: category.status === "show" ? "hide" : "show",
      icon: category.icon,
    };
    // console.log("category details in useCategory submit", category);
    const res = await categoryStatusUpdate(category._id, categoryUpdateData);
    // console.log("res is category stattus update", res);

    if (res?.message) {
      setSubmitting(false);
      setIsOpenCategoryDrawer(false);
      toast.success(`${res?.message}` || "update successfully");
      setUpdateCategory(true);
      // setChildCategoryUpdate(true);
    } else {
      setSubmitting(false);
    }
  };

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        title: category.name,
        key: category._id,
        children:
          category?.children?.length > 0 && renderCategories(category.children),
        // children: category.children ? renderCategories(category.children) : null
      });
    }

    //  console.log('my category',myCategories)
    return myCategories;
  };

  const findObject = (obj, target) => {
    return obj._id === target
      ? obj
      : obj?.children?.reduce(
          (acc, obj) => acc ?? findObject(obj, target),
          undefined
        );
  };

  const handleSelect = async (key) => {
    // console.log("key...", key);
    if (key === undefined) return;
    if (categoryDetails._id) {
      const parentCategoryId = await getCategoryById(key);
      // console.log("parentCategory by id", parentCategoryId);

      if (categoryDetails._id === key) {
        return toast.error("This can't be select as a parent category...!");
      } else if (categoryDetails._id === parentCategoryId?.parentId) {
        return toast.error("This can't be select as a parent category!");
      } else {
        if (key === undefined) return;
        setChecked(key);

        const obj = categoryList[0];
        const result = findObject(obj, key);

        setSelectCategoryName(result?.name);
      }
    } else {
      if (key === undefined) return;
      setChecked(key);

      const obj = categoryList[0];
      const result = findObject(obj, key);

      setSelectCategoryName(result?.name);
    }
  };

  return {
    handleSelect,
    handelCategorySubmit,
    handleSubmit,
    errors,
    register,
    renderCategories,
    categoryList,
    handelCategoryStatusUpdate,
    imageUrl,
    setImageUrl,
  };
};

export default useCategorySubmit;
