"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { addBlog, updateBlog } from "../backend/controllers/blog.controller";
import { useMainContext } from "../components/admin/context/mainContext";

const useBlogSubmit = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const {
    setSubmitting,
    blogUpdate,
    setBlogUpdate,
    isOpenBlogDrawer,
    setIsOpenBlogDrawer,
    blogDetails,
  } = useMainContext();
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  // console.log("imageUrl in use category", imageUrl);
  useEffect(() => {
    if (blogDetails?._id) {
      setValue("title", blogDetails.title);
      setValue("description", blogDetails.description);
      setCategory(blogDetails?.category);
      setImageUrl(blogDetails.img);
    }
    // if (categoryList !== undefined && categoryList[0]?._id !== undefined) {
    //   setChecked(categoryList[0]._id);
    // }

    if (!isOpenBlogDrawer) {
      setValue("icon");
      setImageUrl("");
      setValue("title");
      setValue("description");
      setCategory("");

      // setValue("image", blogDetails.image);
      setImageUrl();
    }
  }, [blogDetails, isOpenBlogDrawer]);

  // console.log("isOpenBlogDrawer..", isOpenBlogDrawer);

  // console.log("imageUrl", imageUrl);
  // handel category and and update
  const handelBlogSubmit = async (data) => {
    setBlogUpdate(false);
    if (!imageUrl) {
      setSubmitting(false);
      return toast.error("Image is required");
    }
    if (blogDetails._id) {
      setSubmitting(true);
      const blogData = {
        title: data.title,
        description: data.description,
        category: category,
        img: imageUrl,
        status: data?.status === "show" ? "hide" : "show",
        // lang: language,
      };
      //  console.log('category update data',categoryData)
      const res = await updateBlog({ id: blogDetails?._id, blogData });
      // console.log("res..in c up", res);
      if (res?.message) {
        setSubmitting(false);
        setIsOpenBlogDrawer(false);
        toast.success(`${res?.message}` || "update successfully");
        setBlogUpdate(true);
      } else {
        setSubmitting(false);
        toast.error(`${res?.error?.message}` || "somethings error");
      }
    } else {
      setSubmitting(true);
      const blogData = {
        title: data.title,
        description: data.description,
        img: imageUrl,
        category: category,
        status: data.status === "show" ? "hide" : "show",
        // lang: language,
      };

      const res = await addBlog(blogData);
      // console.log("res in blog submit", res);
      if (res?.message) {
        setSubmitting(false);
        reset();
        setIsOpenBlogDrawer(false);
        toast.success(`Blog add successfully`);
        setBlogUpdate(true);
      } else {
        setSubmitting(false);
        toast.error(res?.error?.message || "something error");
      }
    }
  };

  // category status update
  const handelBlogStatusUpdate = async (data) => {
    setBlogUpdate(false);
    setSubmitting(true);

    const blogData = {
      title: data.title,
      description: data.description,
      category: data?.category,
      img: data.img,
      status: data?.status === "show" ? "hide" : "show",
      // lang: language,
    };

    // console.log("blogData details in useBlog submit", data);
    const res = await updateBlog({ id: data?._id, blogData });
    // console.log("res is category stattus update", res);

    if (res?.message) {
      setSubmitting(false);
      setIsOpenBlogDrawer(false);
      toast.success(`${res?.message}` || "update successfully");
      setBlogUpdate(true);
      // setChildCategoryUpdate(true);
    } else {
      setSubmitting(false);
    }
  };

  return {
    handelBlogSubmit,
    handleSubmit,
    errors,
    register,
    handelBlogStatusUpdate,
    imageUrl,
    setImageUrl,
    setCategory,
    category,
  };
};

export default useBlogSubmit;
