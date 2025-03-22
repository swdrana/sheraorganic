"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";
import useSingleUser from "../dataFetching/useSingleUser";
import { useMainContext } from "../provider/MainContextStore";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
import { updateUserProfile } from "@/app/backend/controllers/user.controller";

const useUserSubmit = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const session = useSession();
  const { setUpdateUserProfile, imageUrl, setImageUrl } = useMainContext();

  const { user } = useSingleUser();
  console.log("user..", user);
  //   console.log("id in use user submit", id);
  useEffect(() => {
    setValue("name", user.name);
    setValue("address", user.address);
    setValue("phone", user.contact);
    setValue("email", user.email);
    setValue("userName", user.username);
    const formattedDate = dayjs(user.birthday).format("YYYY-MM-DD");
    setValue("birthday", formattedDate);
    setImageUrl(user?.img);
  }, [user]);

  const updateProfile = async (data) => {
    // Prepare the user data for update
    const userUpdateData = {
      address: data.address,
      name: data.name,
      phone: data.phone,
      userName: data.userName,
      img: imageUrl,
      birthday: data.birthday,
    };

    try {
      // Attempt to update the user profile
      const res = await updateUserProfile(
        session?.data?.user?.id,
        userUpdateData
      );

      if (res?.message) {
        toast.success(res.message);
        setUpdateUserProfile(true);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    } finally {
      // Ensure setUpdateUserProfile is reset to false
    }
  };

  return {
    updateProfile,
    handleSubmit,
    errors,
    register,

    imageUrl,
    setImageUrl,
  };
};

export default useUserSubmit;
