// hooks/usebrands.js
"use client";
import { getAllBrands } from "@/app/backend/controllers/brand.controller";
import { useSharedData } from "./sharedFetch";

const usebrands = ({ enabled = true } = {}) => {
  const [brands, brandLoading] = useSharedData("brands", getAllBrands, [], enabled);
  return { brands, brandLoading };
};

export default usebrands;
