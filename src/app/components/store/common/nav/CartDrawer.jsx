"use client";

import { optimizeCloudinaryUrl } from "@/app/utils/cloudinary";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import { useMainContext } from "../../provider/MainContextStore";

const CartDrawer = () => {
  const { openCartDrawer, setOpenCartDrawer } = useMainContext();
  const { items, updateItemQuantity, removeItem, cartTotal, totalItems } =
    useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpenCartDrawer(false);
    };
    if (openCartDrawer) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [openCartDrawer, setOpenCartDrawer]);

  return (
    <>
      {openCartDrawer && (
        <div
          className="offcanvas-backdrop"
          onClick={() => setOpenCartDrawer(false)}
        />
      )}
      <div
        className={`offcanvas_menu position-fixed ${
          openCartDrawer ? "active" : ""
        }`}
        aria-hidden={!openCartDrawer}
      >
        <button
          className="offcanvas-close"
          onClick={() => setOpenCartDrawer(false)}
          aria-label="Close cart"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h5 className="mb-3">কার্ট ({mounted ? totalItems : 0})</h5>
        {!items || items.length === 0 ? (
          <p className="text-muted">কার্ট খালি।</p>
        ) : (
          <>
            <ul
              className="list-unstyled cart-drawer-items"
              style={{ maxHeight: "60vh", overflowY: "auto" }}
            >
              {items.map((item) => (
                <li key={item.id} className="d-flex gap-2 py-2 border-bottom">
                  <img
                    src={optimizeCloudinaryUrl(item.image?.[0], 80)}
                    alt={item.name}
                    width="56"
                    height="56"
                    style={{ objectFit: "contain" }}
                  />
                  <div className="flex-grow-1">
                    <Link
                      href={`/product-details/${item._id}`}
                      onClick={() => setOpenCartDrawer(false)}
                      className="d-block text-dark small"
                    >
                      {item.name}
                    </Link>
                    <div className="d-flex align-items-center gap-2 mt-1">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity - 1)
                        }
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity + 1)
                        }
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        +
                      </button>
                      <span className="ms-auto fw-medium">
                        ৳{item.price * item.quantity}
                      </span>
                      <button
                        type="button"
                        className="btn btn-sm text-danger"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="d-flex justify-content-between fw-bold my-3">
              <span>Subtotal</span>
              <span>৳{cartTotal}</span>
            </div>
            <div className="d-grid gap-2">
              <Link
                href="/cart"
                className="btn btn-outline-secondary"
                onClick={() => setOpenCartDrawer(false)}
              >
                View Cart
              </Link>
              <Link
                href="/checkout"
                className="btn btn-primary"
                onClick={() => setOpenCartDrawer(false)}
              >
                Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
