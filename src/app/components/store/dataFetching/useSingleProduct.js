// hooks/useSingleProduct.js
"use client";

import { getProductById } from "@/app/backend/controllers/product.controller";
import { useState, useEffect, useCallback } from "react";

const useSingleProduct = (id, initialProduct) => {
  const [product, setProduct] = useState(initialProduct || {});
  const [productLoading, setProductLoading] = useState(!initialProduct);
  const refetch = useCallback(async () => {
    if (!id) return null;
    const response = await getProductById(id);
    setProduct(response);
    return response;
  }, [id]);

  useEffect(() => {
    if (!initialProduct || Object.keys(initialProduct).length === 0) {
      const fetchData = async () => {
        try {
          await refetch();
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
  }, [id, initialProduct, refetch]);

  return { product, productLoading, refetch };
};

export default useSingleProduct;
