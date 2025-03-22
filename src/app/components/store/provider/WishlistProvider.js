"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

// Create Context
const WishlistContext = createContext();

// Create a Provider Component
export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  // console.log("wishlist...", wishlist);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  const handleWishlist = (item) => {
    const exists = wishlist.some((w) => w._id === item._id);

    if (exists) {
      // If the item exists, remove it from the wishlist
      removeWishlist(item);
    } else {
      // If the item does not exist, add it to the wishlist
      const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      // console.log("store wishlist..", storedWishlist);
      setWishlist(storedWishlist);
      // console.log("wishlist in else..", wishlist);
      const updatedWishlist = [...storedWishlist, item];
      setWishlist(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    }
  };

  const removeWishlist = (item) => {
    // console.log("item...in wishlist provider", item);
    const updatedWishlist = wishlist.filter(
      (wishlistItem) => wishlistItem._id !== item._id
    );
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <WishlistContext.Provider
      value={{ handleWishlist, wishlist, removeWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// Custom Hook to use Wishlist Context
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
