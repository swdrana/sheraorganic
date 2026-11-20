// hooks/useProducts.js
"use client";

import { useMemo } from "react";
import { getAllProducts } from "../../../backend/controllers/product.controller";
import { onlyVisible } from "@/app/utils/visibility";
import { useSharedData } from "./sharedFetch";

// All components share one products request (fixes the old race where two components
// mounting together both downloaded the full list). Hidden products are dropped unless
// includeHidden is set.
const useProducts = ({ enabled = true, includeHidden = false } = {}) => {
  const [all, productsLoading] = useSharedData("products", getAllProducts, [], enabled);
  const products = useMemo(() => (includeHidden ? all : onlyVisible(all)), [all, includeHidden]);
  return { products, productsLoading };
};

export default useProducts;
