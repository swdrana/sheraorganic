"use client";
import { useCart } from "react-use-cart";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useMainContext } from "../provider/MainContextStore";

const useAddToCart = () => {
  const session = useSession();
  const { setCartPopup } = useMainContext();
  // console.log("session in add to cart", session);
  const [quantity, setQuantity] = useState(1);
  const [addToCardLoading, setAddToCardLoading] = useState(false);
  const { addItem, items, updateItemQuantity } = useCart();

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  const handelAddItem = (product) => {
    // console.log("Setting loading to...");
    setAddToCardLoading(true);

    if (session?.data) {
      if (session.data.user?.role !== "Customer") {
        toast.error("You are not a customer");
        setAddToCardLoading(false);
        return;
      }
    }

    const existingProduct = items.find((p) => p.id === product.id);
    if (existingProduct) {
      const newQuantity = Number(existingProduct.quantity) + Number(quantity);
      updateItemQuantity(existingProduct.id, newQuantity);
      setAddToCardLoading(false);
    } else {
      const newItem = {
        ...product,
        id: product.id,
        price: product.prices.price,
        quantity,
      };
      addItem(newItem, quantity);
      setAddToCardLoading(false);
    }
    setCartPopup({ open: true, product });
    setQuantity(1);
  };

  useEffect(() => {
    // console.log("addToCardLoading state changed:", addToCardLoading);
  }, [addToCardLoading]);

  return {
    handelAddItem,
    quantity,
    handleIncrement,
    handleDecrement,
    addToCardLoading,
  };
};

export default useAddToCart;
