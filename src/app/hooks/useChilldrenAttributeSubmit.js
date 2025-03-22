"use client";
import { useForm } from "react-hook-form";
import { useMainContext } from "../components/admin/context/mainContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  addChildAttributeValue,
  updateChildAttributes,
  updateChildAttributesStatus,
} from "../backend/actions/attribute.action";

const useChildrenAttributeSubmit = (attributeChildrenId) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("hide");

  const {
    openChildAttributeDrawer,
    setOpenChildAttributeDrawer,
    singleVariant,
    setUpdateAttribute,
  } = useMainContext();

  useEffect(() => {
    setValue("name", singleVariant?.name);
    setStatus(singleVariant?.status === "show" ? "show" : "hide");
  }, [singleVariant, openChildAttributeDrawer, setValue]);

  const handelChildrenAttributeAddUpdate = async (data) => {
    setUpdateAttribute(false);
    // console.log("click.....");
    setSubmitting(true);
    const attributeData = {
      name: data.name,
      status: status,
    };

    const res = singleVariant._id
      ? await updateChildAttributes(
          attributeChildrenId,
          singleVariant._id,
          attributeData
        )
      : await addChildAttributeValue(attributeChildrenId, attributeData);

    // console.log("res is use children submit", res);

    if (res) {
      toast.success(
        `attribute ${singleVariant._id ? "update" : "add"} successfully`
      );
      setUpdateAttribute(true);
      setOpenChildAttributeDrawer(false);
    } else {
      toast.error("There was an error");
    }
    setSubmitting(false);
  };
  const handelChildAttributeStatus = async (data) => {
    setUpdateAttribute(false);
    setSubmitting(true);
    const updateStatus = {
      status: data.status === "show" ? "hide" : "show",
    };
    // console.log('data..',data)
    const variantId = data._id;
    const res = await updateChildAttributesStatus(
      attributeChildrenId,
      variantId,
      updateStatus
    );
    // console.log("res..in update porudct ", res);
    if (res) {
      setSubmitting(false);
      toast.success(`attribute value status successfully updated`);
      setUpdateAttribute(true);
    } else {
      setSubmitting(false);
    }
  };

  return {
    register,
    handleSubmit,
    submitting,
    status,
    errors,
    setStatus,
    handelChildrenAttributeAddUpdate,
    handelChildAttributeStatus,
  };
};

export default useChildrenAttributeSubmit;
