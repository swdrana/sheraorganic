"use client";

import { optimizeCloudinaryUrl } from "@/app/utils/cloudinary";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useCart } from "react-use-cart";
import { useMainContext } from "../../provider/MainContextStore";

const CartPopup = () => {
  const { cartPopup, setCartPopup } = useMainContext();
  const { cartTotal, totalItems } = useCart();
  const [mounted, setMounted] = useState(false);
  const timerRef = useRef(null);

  const close = useCallback(
    () => setCartPopup({ open: false, product: null }),
    [setCartPopup]
  );
  const startTimer = useCallback(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(close, 4000);
  }, [close]);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (cartPopup.open) startTimer();
    return () => clearTimeout(timerRef.current);
  }, [cartPopup.open, cartPopup.product, startTimer]);

  if (!mounted || !cartPopup.open || !cartPopup.product) return null;
  const product = cartPopup.product;

  return (
    <div
      className="bg-white border rounded-3 shadow p-3"
      onMouseEnter={() => clearTimeout(timerRef.current)}
      onMouseLeave={startTimer}
      style={{
        position: "fixed",
        right: 16,
        bottom: "clamp(24px, 12vw, 90px)",
        zIndex: 1080,
        width: "calc(100vw - 32px)",
        maxWidth: 320,
      }}
      role="status"
      aria-live="polite"
    >
      <button
        type="button"
        className="btn-close position-absolute top-0 end-0 m-2"
        aria-label="Close"
        onClick={close}
      />
      <div className="d-flex gap-2 pe-4">
        <img
          src={optimizeCloudinaryUrl(product.image?.[0], 80)}
          alt={product.name}
          width="56"
          height="56"
          style={{ objectFit: "contain" }}
        />
        <div className="min-w-0">
          <strong className="d-block text-success small">✓ কার্টে যোগ হয়েছে</strong>
          <span className="d-block small text-truncate">{product.name}</span>
          <span className="text-muted fs-xxs">
            কার্টে {totalItems} টি · ৳{cartTotal}
          </span>
        </div>
      </div>
      <div className="d-flex gap-2 mt-3">
        <Link href="/cart" className="btn btn-sm btn-outline-secondary flex-grow-1" onClick={close}>
          View Cart
        </Link>
        <Link href="/checkout" className="btn btn-sm btn-primary flex-grow-1" onClick={close}>
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartPopup;
