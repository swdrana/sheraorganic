"use client";

import { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import { useMainContext } from "../../provider/MainContextStore";

const FloatingCartButton = () => {
  const { totalItems, cartTotal } = useCart();
  const { setOpenCartDrawer } = useMainContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted || totalItems === 0) return null;

  return (
    <button
      type="button"
      className="btn btn-secondary d-none d-lg-flex align-items-center gap-2 shadow"
      onClick={() => setOpenCartDrawer(true)}
      style={{ position: "fixed", right: 24, bottom: 96, zIndex: 1060 }}
      aria-label="Open cart"
    >
      <i className="fa-solid fa-cart-shopping"></i>
      <span className="badge bg-danger">{totalItems}</span>
      <strong>৳{cartTotal}</strong>
    </button>
  );
};

export default FloatingCartButton;
