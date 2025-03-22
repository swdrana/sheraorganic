"use client";

import React, { createContext, useContext, useState } from "react";

const MainContext = createContext();

export function useMainContext() {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export function MainContextProvider({ children }) {
  // common
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [checked, setChecked] = useState("");
  const [published, setPublished] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // product
  const [isProductDrawerOpen, setIsProductDrawerOpen] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const [productId, setProductId] = useState("");
  const [productSubmitting, setProductSubmitting] = useState(false);
  const [updateProduct, setUpdateProduct] = useState(false);

  // attribute
  const [openChildAttributeDrawer, setOpenChildAttributeDrawer] =
    useState(false);
  const [isOpenAttributeDrawer, setIsOpenAttributeDrawer] = useState(false);
  const [attributeDetails, setAttributeDetails] = useState({});
  const [attributeId, setAttributeId] = useState("");
  const [variantId, setVariantsId] = useState("");
  const [variants, setVariants] = useState([]);
  const [singleVariant, setSingleVariant] = useState({});
  const [updateAttribute, setUpdateAttribute] = useState(false);

  // category
  const [isOpenCategoryDrawer, setIsOpenCategoryDrawer] = useState(false);
  const [categoryDetails, setCategoryDetails] = useState({});
  const [categoryId, setCategoryId] = useState("");
  const [selectCategoryName, setSelectCategoryName] = useState("home");
  const [childCategoryUpdate, setChildCategoryUpdate] = useState(false);
  const [updateCategory, setUpdateCategory] = useState(false);

  // brand
  const [isOpenBrandDrawer, setIsOpenBrandDrawer] = useState(false);
  const [brandDetails, setBrandDetails] = useState({});
  const [brandId, setBrandId] = useState("");
  const [brandUpdate, setBrandUpdate] = useState(false);

  // staff
  const [isOpenStaffDrawer, setIsOpenStaffDrawer] = useState(false);
  const [staffDetails, setStaffDetails] = useState({});
  const [staffId, setStaffId] = useState("");
  const [staffUpdate, setStaffUpdate] = useState(false);

  //customers
  const [isOpenCustomerDrawer, setIsOpenCustomerDrawer] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({});
  const [customerId, setCustomerId] = useState("");

  // coupon
  const [isOpenCouponDrawer, setIsOpenCouponDrawer] = useState(false);
  const [couponDetails, setCouponDetails] = useState({});
  const [couponId, setCouponId] = useState("");
  const [updateCoupon, setUpdateCoupon] = useState(false);

  // blog
  const [isOpenBlogDrawer, setIsOpenBlogDrawer] = useState(false);
  const [blogDetails, setBlogDetails] = useState({});
  const [blogUpdate, setBlogUpdate] = useState(false);

  //order
  const [updateOrderStatus, setUpdateOrderStatus] = useState(false);

  const contextValue = {
    isOpenCategoryDrawer,
    setIsOpenCategoryDrawer,
    categoryDetails,
    setCategoryDetails,
    categoryId,
    updateCategory,
    setUpdateCategory,
    selectCategoryName,
    setSelectCategoryName,
    setCategoryId,
    published,
    setPublished,
    submitting,
    setSubmitting,
    updateAttribute,
    setUpdateAttribute,
    updateProduct,
    setUpdateProduct,
    isDeleteModal,
    setIsDeleteModal,
    openChildAttributeDrawer,
    setOpenChildAttributeDrawer,
    isOpenAttributeDrawer,
    setIsOpenAttributeDrawer,
    attributeDetails,
    setAttributeDetails,
    attributeId,
    setAttributeId,
    variants,
    setVariants,
    singleVariant,
    setSingleVariant,
    variantId,
    setVariantsId,
    checked,
    setChecked,
    childCategoryUpdate,
    setChildCategoryUpdate,
    isProductDrawerOpen,
    setIsProductDrawerOpen,
    productDetails,
    setProductDetails,
    productId,
    setProductId,
    productSubmitting,
    setProductSubmitting,
    sidebarOpen,
    setSidebarOpen,
    isOpenStaffDrawer,
    setIsOpenStaffDrawer,
    staffDetails,
    setStaffDetails,
    staffId,
    setStaffId,
    isOpenCouponDrawer,
    setIsOpenCouponDrawer,
    couponDetails,
    setCouponDetails,
    couponId,
    setCouponId,
    isOpenCustomerDrawer,
    setIsOpenCustomerDrawer,
    customerDetails,
    setCustomerDetails,
    customerId,
    setCustomerId,
    updateOrderStatus,
    setUpdateOrderStatus,
    staffUpdate,
    setStaffUpdate,
    updateCoupon,
    setUpdateCoupon,
    isOpenBrandDrawer,
    setIsOpenBrandDrawer,
    brandDetails,
    setBrandDetails,
    brandId,
    setBrandId,
    brandUpdate,
    setBrandUpdate,
    isOpenBlogDrawer,
    setIsOpenBlogDrawer,
    blogDetails,
    setBlogDetails,
    blogUpdate,
    setBlogUpdate,
  };

  return (
    <MainContext.Provider value={contextValue}>{children}</MainContext.Provider>
  );
}
