// hooks/useSingleProduct.js
"use client";

import { getProductById } from "@/app/backend/controllers/product.controller";
import { useState, useEffect } from "react";

const useSingleProduct = (id) => {
  const [product, setProduct] = useState({});
  const [productLoading, setProductLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProductById(id);
        // console.log("res..in", res);
        setProduct(res);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setProductLoading(false);
      }
    };

    fetchData();
  }, []);

  return { product, productLoading };
};

export default useSingleProduct;
