"use server";
import { revalidateTag } from "next/cache";
import { requireStaff } from "../utils/apiAuth";

//product revalidate
export const getProductsRevalidate = async () => {
  await requireStaff();
  revalidateTag("collection");
  // revalidateTag(["collection", "category"]);
};

// category revalidateTag
export const getCategoryRevalidate = async () => {
  await requireStaff();
  revalidateTag("category");
};

// attribute revalidateTag
export const getAttributeRevalidate = async () => {
  await requireStaff();
  revalidateTag("attribute");
};

// coupon revalidateTag
export const getCouponRevalidate = async () => {
  await requireStaff();
  revalidateTag("coupon");
};

// staff revalidateTag
export const getStaffRevalidate = async () => {
  await requireStaff();
  revalidateTag("staff");
};

// order revalidateTag
export const getOrderRevalidate = async () => {
  await requireStaff();
  revalidateTag("order");
};
