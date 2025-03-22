"use client";
import { CartProvider } from "react-use-cart";

const CartProviderContext = ({ children }) => {
  return <CartProvider>{children}</CartProvider>;
};

export default CartProviderContext;
