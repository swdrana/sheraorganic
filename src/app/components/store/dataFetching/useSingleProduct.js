// hooks/useSingleProduct.js
"use client";

import { getProductById } from "@/app/backend/controllers/product.controller";
import { useState, useEffect } from "react";

const useSingleProduct = (id, initialProduct) => {
  const [product, setProduct] = useState(initialProduct || {});
  const [productLoading, setProductLoading] = useState(!initialProduct);

  useEffect(() => {
    if (!initialProduct || Object.keys(initialProduct).length === 0) {
      const fetchData = async () => {
        try {
          const res = await getProductById(id);
          setProduct(res);
        } catch (error) {
          console.error("Failed to fetch products:", error);
        } finally {
          setProductLoading(false);
        }
      };

      fetchData();
    } else {
      setProduct(initialProduct);
      setProductLoading(false);
    }
  }, [id, initialProduct]);

  return { product, productLoading };
};

export default useSingleProduct;
