"use client";

import React, { createContext, useContext, useState } from "react";

const MainContextStore = createContext();

export function useMainContext() {
  const context = useContext(MainContextStore);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export function MainContextProviderStore({ children }) {
  const [updateUserProfile, setUpdateUserProfile] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [openProductModal, setOpenProductModal] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const [openOffcanvas, setOpenOffcanvas] = useState(false);
  const [openCartDrawer, setOpenCartDrawer] = useState(false);
  const [cartPopup, setCartPopup] = useState({ open: false, product: null });
  const [openCategoryDrawer, setOpenCategoryDrawer] = useState(false);
  const [reviewReminder, setReviewReminder] = useState({ open: false, items: [] });

  const contextValue = {
    updateUserProfile,
    setUpdateUserProfile,
    imageUrl,
    setImageUrl,
    openProductModal,
    setOpenProductModal,
    productDetails,
    setProductDetails,
    openOffcanvas,
    setOpenOffcanvas,
    openCartDrawer,
    setOpenCartDrawer,
    cartPopup,
    setCartPopup,
    openCategoryDrawer,
    setOpenCategoryDrawer,
    reviewReminder,
    setReviewReminder,
  };

  return (
    <MainContextStore.Provider value={contextValue}>
      {children}
    </MainContextStore.Provider>
  );
}
