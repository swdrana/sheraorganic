// hooks/useProducts.js
"use client";

import { useState, useEffect } from "react";
import { getAllProducts } from "../../../backend/controllers/product.controller";

// ── Module-level cache ──────────────────────────────────────────────────────
// Persists across React re-renders and page navigations within the same session.
// Once products are fetched they are never re-fetched unless explicitly cleared.
let _cachedProducts = null;      // null = not yet fetched
let _fetchPromise   = null;      // deduplicate concurrent requests

/**
 * Kick off a background prefetch so that when the user navigates to /products
 * the data is already available and no loading spinner is shown.
 * Call this from the home page (or any early-loading component).
 */
export function prefetchProducts() {
  if (_cachedProducts !== null || _fetchPromise !== null) return; // already done / in-flight
  _fetchPromise = getAllProducts()
    .then((res) => {
      _cachedProducts = res;
      _fetchPromise   = null;
    })
    .catch(() => {
      _fetchPromise = null; // allow retry on failure
    });
}

const useProducts = () => {
  const [products, setProducts]           = useState(_cachedProducts || []);
  const [productsLoading, setProductsLoading] = useState(_cachedProducts === null);

  useEffect(() => {
    // Data is already cached — no loading needed
    if (_cachedProducts !== null) {
      setProducts(_cachedProducts);
      setProductsLoading(false);
      return;
    }

    // If a prefetch is already in-flight, wait for it
    if (_fetchPromise !== null) {
      setProductsLoading(true);
      _fetchPromise.then(() => {
        setProducts(_cachedProducts || []);
        setProductsLoading(false);
      });
      return;
    }

    // First visit — fetch now
    setProductsLoading(true);
    const fetchData = async () => {
      try {
        const res = await getAllProducts();
        _cachedProducts = res;
        setProducts(res);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setProductsLoading(false);
      }
    };
    fetchData();
  }, []);

  return { products, productsLoading };
};

export default useProducts;
