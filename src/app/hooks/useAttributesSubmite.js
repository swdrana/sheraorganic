"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  addAttribute,
  updateAttribute,
} from "../backend/controllers/attribute.controller";
import { useMainContext } from "../components/admin/context/mainContext";

const useAttributeSubmit = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const {
    setIsOpenAttributeDrawer,
    attributeDetails,
    variants,
    setVariants,
    setUpdateAttribute,
  } = useMainContext();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setValue("name", attributeDetails?.name);
    setValue("title", attributeDetails?.title);
    setValue("option", attributeDetails?.option);
  }, [attributeDetails, setValue]);

  const variantArrayOfObject = variants?.map((name) => ({ name }));

  const handelAttributeAdd = async (data) => {
    setUpdateAttribute(false);
    setSubmitting(true);
    if (!attributeDetails._id && variants?.length === 0) {
      toast.error("Minimum one value is required for add attribute!");
      setSubmitting(false);
      return;
    }

    const attributeData = {
      title: data.title,
      name: data.name,
      variants: variantArrayOfObject,
      option: data.option,
    };

    const updateAttributeData = {
      ...attributeData,
      variants: attributeDetails.variants,
    };

    const res = attributeDetails._id
      ? await updateAttribute(attributeDetails._id, updateAttributeData)
      : await addAttribute(attributeData);

    if (res) {
      toast.success(
        `attribute ${attributeDetails._id ? "update" : "add"} successfully`
      );
      setUpdateAttribute(true);
      setIsOpenAttributeDrawer(false);
      if (!attributeDetails._id) {
        reset();
        setVariants([]);
      }
    } else {
      toast.error(`attribute ${attributeDetails._id ? "update" : "add"} error`);
    }
    setSubmitting(false);
  };

  const removeVariant = (indexToRemove) =>
    setVariants(variants?.filter((_, index) => index !== indexToRemove));

  const addVariant = (e) => {
    e.preventDefault();
    if (e.target.value) {
      setVariants([...variants, e.target.value]);
      e.target.value = "";
    }
  };

  const handelAttributeStatus = async (data) => {
    setUpdateAttribute(false);
    setSubmitting(true);
    const attributeData = {
      ...data,
      status: data.status === "show" ? "hide" : "show",
    };

    const res = await updateAttribute(data._id, attributeData);
    if (res?.status === 200) {
      toast.success(res.message);
      setUpdateAttribute(true);
    }
    setSubmitting(false);
  };

  return {
    addVariant,
    removeVariant,
    handelAttributeAdd,
    register,
    handleSubmit,
    submitting,
    errors,
    handelAttributeStatus,
  };
};

export default useAttributeSubmit;
