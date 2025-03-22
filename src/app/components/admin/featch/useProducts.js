// hooks/useProducts.js
import { useState, useEffect } from "react";
import { getAllProducts } from "../../../backend/controllers/product.controller";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [productloading, setProductLoading] = useState(false);

  useEffect(() => {
    setProductLoading(true);
    const fetchData = async () => {
      try {
        const res = await getAllProducts();
        // console.log("res..in", res);
        setProducts(res);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setProductLoading(false);
      }
    };

    fetchData();
  }, []);

  return { products, productloading };
};

export default useProducts;
