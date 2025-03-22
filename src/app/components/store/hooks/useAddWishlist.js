"use client";

import { useEffect, useState } from "react";

const useAddWishlist = () => {
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
    const updatedWishlist = wishlist.filter(
      (wishlistItem) => wishlistItem._id !== item._id
    );
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return {
    handleWishlist,
    wishlist,
    removeWishlist,
  };
};

export default useAddWishlist;
