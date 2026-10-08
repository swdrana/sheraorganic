"use client";

import { getAllAttributes } from "@/app/backend/controllers/attribute.controller";
import { useSharedData } from "./sharedFetch";

const useAttributes = ({ enabled = true } = {}) => {
  const [attributes, attributesLoading] = useSharedData("attributes", getAllAttributes, [], enabled);
  return { attributes, attributesLoading };
};

export default useAttributes;
