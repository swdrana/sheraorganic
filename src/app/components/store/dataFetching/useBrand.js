// hooks/usebrands.js
"use client";
import { useMemo } from "react";
import { getAllBrands } from "@/app/backend/controllers/brand.controller";
import { onlyVisible } from "@/app/utils/visibility";
import { useSharedData } from "./sharedFetch";

// Hidden brands are dropped unless includeHidden is set.
const usebrands = ({ enabled = true, includeHidden = false } = {}) => {
  const [all, brandLoading] = useSharedData("brands", getAllBrands, [], enabled);
  const brands = useMemo(() => (includeHidden ? all : onlyVisible(all)), [all, includeHidden]);
  return { brands, brandLoading };
};

export default usebrands;
