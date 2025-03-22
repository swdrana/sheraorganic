// hooks/useProducts.js
"use client";

// import { getAllProducts } from "@/app/controlers/product.controler";
import { useState, useEffect } from "react";
import { getAllProducts } from "../../../backend/controllers/product.controller";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);

  useEffect(() => {
    setProductsLoading(true);
    const fetchData = async () => {
      try {
        const res = await getAllProducts();
        // console.log("res..in", res);
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
