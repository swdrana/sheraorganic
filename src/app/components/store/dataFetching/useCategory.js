// hooks/useCategory.js
"use client";
import { getAllCategories } from "@/app/backend/controllers/category.controller";
import { useSharedData } from "./sharedFetch";

// One shared request for every component on the page (Navbar, Footer, Offcanvas, …).
const useCategory = () => {
  const [categorys, categoryLoading] = useSharedData("categories", getAllCategories, []);
  return { categorys, categoryLoading };
};

export default useCategory;
