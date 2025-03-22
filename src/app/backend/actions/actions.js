"use server";
import { revalidateTag } from "next/cache";

//product revalidate
export const getProductsRevalidate = () => {
  revalidateTag("collection");
  // revalidateTag(["collection", "category"]);
};

// category revalidateTag
export const getCategoryRevalidate = () => {
  revalidateTag("category");
};

// attribute revalidateTag
export const getAttributeRevalidate = () => {
  revalidateTag("attribute");
};

// coupon revalidateTag
export const getCouponRevalidate = () => {
  revalidateTag("coupon");
};

// staff revalidateTag
export const getStaffRevalidate = () => {
  revalidateTag("staff");
};

// order revalidateTag
export const getOrderRevalidate = () => {
  revalidateTag("order");
};
