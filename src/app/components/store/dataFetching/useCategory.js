// hooks/useCategory.js
"use client";
import { getAllCategories } from "@/app/backend/controllers/category.controller";
// import { getAllCategories } from "@/app/controlers/category.controler";
import { useState, useEffect } from "react";

const useCategory = () => {
  const [categorys, setCategorys] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllCategories();
        // console.log("res..in", res);
        setCategorys(res);
      } catch (error) {
        console.error("Failed to fetch categorys:", error);
      } finally {
        setCategoryLoading(false);
      }
    };

    fetchData();
  }, []);

  return { categorys, categoryLoading };
};

export default useCategory;
