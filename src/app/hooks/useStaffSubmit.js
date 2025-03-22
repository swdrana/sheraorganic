"use client";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMainContext } from "../components/admin/context/mainContext";
import { notifyError, notifySuccess } from "../utils/toast";
import { addStaff, updateStaff } from "../backend/controllers/staff.controller";
import { getStaffRevalidate } from "../backend/actions/actions";
import { staffUpdate } from "../backend/actions/staff.action";

const useStaffSubmit = () => {
  const {
    isOpenStaffDrawer,
    setIsOpenStaffDrawer,
    staffDetails,
    setStaffUpdate,
  } = useMainContext();
  const [imageUrl, setImageUrl] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    dayjs(new Date()).format("YYYY-MM-DD")
  );
  // console.log("staff details", staffDetails);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  // console.log("errors..", errors);

  const onSubmit = async (data) => {
    // console.log("staff data", data, selectedDate);
    setStaffUpdate(false);
    try {
      setIsSubmitting(true);

      const staffData = {
        name: data.name,

        email: data.email,
        password: data.password,
        contact: data.contact,
        role: data.role,
        joiningDate: selectedDate
          ? selectedDate
          : dayjs(new Date()).format("YYYY-MM-DD"),
        image: imageUrl,
      };

      if (staffDetails._id) {
        // console.log("click............");
        const res = await updateStaff({
          updateStaffData: staffData,
          id: staffDetails?._id,
        });

        setIsSubmitting(false);
        notifySuccess(res.message);
        setIsOpenStaffDrawer(false);
        setStaffUpdate(true);
      } else {
        const res = await addStaff(staffData);

        if (res?.error) {
          notifyError(res.error || "error");
          setIsSubmitting(false);
        } else {
          // console.log("res is add staff,res", res);
          setIsSubmitting(false);
          notifySuccess(res.message);
          setIsOpenStaffDrawer(false);
          getStaffRevalidate();
          setStaffUpdate(true);
        }
      }
    } catch (err) {
      notifyError(err ? err?.response?.data?.message : err?.message);
      setIsSubmitting(false);
      //   setIsOpenStaffDrawer(false);
    }
  };

  useEffect(() => {
    if (!isOpenStaffDrawer) {
      setValue("name");
      setValue("email");
      setValue("password");
      setValue("contact");
      setValue("role");
      setValue("joiningDate");
      setImageUrl("");
      clearErrors("name");
      clearErrors("email");
      clearErrors("password");
      clearErrors("role");
      clearErrors("joiningDate");
      setImageUrl("");
    }

    setValue("name", staffDetails.name);
    setValue("email", staffDetails.email);
    setValue("password");
    setValue("contact", staffDetails.contact);
    setValue("role", staffDetails.role);
    setSelectedDate(dayjs(staffDetails.joiningDate).format("YYYY-MM-DD"));
    setImageUrl(staffDetails.image);
  }, [staffDetails, isOpenStaffDrawer, clearErrors, setValue]);

  // staff status update
  const handelStaffStatusUpdate = async (item) => {
    setStaffUpdate(false);
    const updateStatus = item.status === "show" ? "hide" : "show";
    const updateStaffData = { ...item, status: updateStatus };
    const res = await staffUpdate(item._id, updateStaffData);
    // console.log("res in useStaffSubmit", res);
    if (res.message) {
      notifySuccess(res.message);
      setStaffUpdate(true);
    } else {
      notifyError("something is error");
      // setIsSubmitting(false);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setImageUrl,
    imageUrl,
    selectedDate,
    setSelectedDate,
    isSubmitting,
    handelStaffStatusUpdate,
  };
};

export default useStaffSubmit;
