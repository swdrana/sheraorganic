// hooks/useProducts.js
"use client";

import { getAllProducts } from "../../../backend/controllers/product.controller";
import { useSharedData } from "./sharedFetch";

// All components share one products request (fixes the old race where two components
// mounting together both downloaded the full list).
const useProducts = ({ enabled = true } = {}) => {
  const [products, productsLoading] = useSharedData("products", getAllProducts, [], enabled);
  return { products, productsLoading };
};

export default useProducts;
