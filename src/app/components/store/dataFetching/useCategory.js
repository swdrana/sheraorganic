// hooks/useCategory.js
"use client";
import { useMemo } from "react";
import { getAllCategories } from "@/app/backend/controllers/category.controller";
import { onlyVisible } from "@/app/utils/visibility";
import { useSharedData } from "./sharedFetch";

// One shared request for every component on the page (Navbar, Footer, Offcanvas, …).
// The shared cache keeps the full list; hidden categories are dropped per caller unless an admin
// screen asks for them with includeHidden.
const useCategory = ({ includeHidden = false } = {}) => {
  const [all, categoryLoading] = useSharedData("categories", getAllCategories, []);
  const categorys = useMemo(() => (includeHidden ? all : onlyVisible(all)), [all, includeHidden]);
  return { categorys, categoryLoading };
};

export default useCategory;
