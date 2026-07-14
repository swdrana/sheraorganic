"use client";
import { useEffect } from "react";
import { prefetchProducts } from "@/app/components/store/dataFetching/useProducts";

/**
 * Invisible component — renders nothing.
 * On mount it kicks off a background prefetch of all products so that when
 * the user navigates to /products the data is already in the module-level
 * cache and no loading spinner is shown.
 */
const ProductPrefetcher = () => {
  useEffect(() => {
    prefetchProducts();
  }, []);

  return null;
};

export default ProductPrefetcher;
